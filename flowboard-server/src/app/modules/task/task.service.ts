import { Prisma } from "@prisma/client";
import prisma from "../../../shared/prisma";
import ApiError from "../../../errors/ApiErrors";
import { checkBoardEditorAccess } from "../../../helpers/checkEditorAccess";

const POSITION_GAP = 1024;
const MIN_GAP = 0.0001;

const getBoardIdForColumn = async (columnId: string) => {
  const column = await prisma.column.findUniqueOrThrow({
    where: { id: columnId },
    select: { boardId: true },
  });

  return column.boardId;
};

const getBoardIdForTask = async (taskId: string) => {
  const task = await prisma.task.findUniqueOrThrow({
    where: { id: taskId },
    select: { column: { select: { boardId: true } } },
  });

  return task.column.boardId;
};

const createTaskInDB = async (
  userId: string,
  payload: { columnId: string, title: string }

) => {
  const boardId = await getBoardIdForColumn(payload.columnId);
  await checkBoardEditorAccess(boardId, userId);

  const last = await prisma.task.findFirst({
    where: { columnId: payload.columnId },
    orderBy: { position: "desc" },
    select: { position: true },
  });

  await prisma.task.create({
    data: {
      title: payload.title,
      columnId: payload.columnId,
      position: (last?.position ?? 0) + POSITION_GAP,
    },
  });

  return
}

const updateTaskInDB = async (
  taskId: string,
  userId: string,
  data: { title?: string; description?: string },
) => {
  const boardId = await getBoardIdForTask(taskId);
  await checkBoardEditorAccess(boardId, userId);

  return prisma.task.update({ where: { id: taskId }, data });
}

const deleteTaskInDB = async (taskId: string, userId: string) => {
  const boardId = await getBoardIdForTask(taskId);
  await checkBoardEditorAccess(boardId, userId);

  await prisma.task.delete({ where: { id: taskId } });
}

const moveTaskInDB = async (
  taskId: string,
  userId: string,
  targetColumnId: string,
  targetIndex: number,
) => {
  const sourceBoardId = await getBoardIdForTask(taskId);
  await checkBoardEditorAccess(sourceBoardId, userId);

  const destBoardId = await getBoardIdForColumn(targetColumnId);
  if (destBoardId !== sourceBoardId) {
    throw new ApiError(
      400,
      "Cannot move a task to a column on a different board",
    );
  }

  if (!Number.isInteger(targetIndex) || targetIndex < 0) {
    throw new ApiError(400, "targetIndex must be a non-negative integer");
  }

  return prisma.$transaction(
    async (tx) => {
      const task = await tx.task.findUnique({ where: { id: taskId } });
      if (!task) throw new ApiError(404, "Task not found");

      const siblings = await tx.task.findMany({
        where: { columnId: targetColumnId, id: { not: taskId } },
        orderBy: { position: "asc" },
        select: { id: true, position: true },
      });

      if (targetIndex > siblings.length) {
        throw new ApiError(
          400,
          `targetIndex ${targetIndex} out of range (column has ${siblings.length} other tasks)`,
        );
      }

      const before = siblings[targetIndex - 1];
      const after = siblings[targetIndex];

      let newPosition: number;

      if (!before && !after) {
        newPosition = POSITION_GAP;
      } else if (!before) {
        newPosition = after.position - POSITION_GAP;
      } else if (!after) {
        newPosition = before.position + POSITION_GAP;
      } else {

        newPosition = (before.position + after.position) / 2;

        if (after.position - before.position < MIN_GAP) {

          newPosition = await renormalizeAndRecompute(
            tx,
            targetColumnId,
            taskId,
            targetIndex,
          );
        }
      }

      return tx.task.update({
        where: { id: taskId },
        data: { columnId: targetColumnId, position: newPosition },
      });
    },
    { isolationLevel: Prisma.TransactionIsolationLevel.Serializable },
  );
}

async function renormalizeAndRecompute(
  tx: Prisma.TransactionClient,
  columnId: string,
  movingTaskId: string,
  targetIndex: number,
): Promise<number> {
  const siblings = await tx.task.findMany({
    where: { columnId, id: { not: movingTaskId } },
    orderBy: { position: "asc" },
    select: { id: true },
  });

  const ordered = [...siblings];
  ordered.splice(targetIndex, 0, { id: movingTaskId });

  let movedNewPosition = 0;

  await Promise.all(
    ordered.map((s, index) => {
      const position = (index + 1) * POSITION_GAP;
      if (s.id === movingTaskId) movedNewPosition = position;

      if (s.id === movingTaskId) return Promise.resolve();
      return tx.task.update({ where: { id: s.id }, data: { position } });
    }),
  );

  return movedNewPosition;
}

export const taskService = {
  createTaskInDB,
  updateTaskInDB,
  deleteTaskInDB,
  moveTaskInDB,
};
