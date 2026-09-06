import { Column } from "@prisma/client";
import prisma from "../../../shared/prisma";
import { checkBoardEditorAccess } from "../../../helpers/checkEditorAccess";

const POSITION_GAP = 1024;

const createNewColumn = async (userId: string, payload: Column) => {
  await checkBoardEditorAccess(payload.boardId, userId);

  const last = await prisma.column.findFirst({
    where: { boardId: payload.boardId },
    orderBy: { position: "desc" },
    select: { position: true },
  });

  await prisma.column.create({
    data: {
      title: payload.title,
      boardId: payload.boardId,
      position: (last?.position ?? 0) + POSITION_GAP,
    },
  });

  return;
};

const updateColumnTitle = async (
  userId: string,
  columnId: string,
  title: string,
) => {
  const column = await prisma.column.findUniqueOrThrow({
    where: { id: columnId },
    select: { boardId: true },
  });

  await checkBoardEditorAccess(column.boardId, userId);

  await prisma.column.update({
    where: { id: columnId },
    data: { title },
  });
};

const reorderColumn = async (
  userId: string,
  columnId: string,
  targetIndex: number,
) => {
  const column = await prisma.column.findUniqueOrThrow({
    where: { id: columnId },
    select: { boardId: true },
  });
  await checkBoardEditorAccess(column.boardId, userId);

  const siblings = await prisma.column.findMany({
    where: { boardId: column.boardId, id: { not: columnId } },
    orderBy: { position: "asc" },
    select: { id: true, position: true },
  });

  const before = siblings[targetIndex - 1];
  const after = siblings[targetIndex];

  const newPosition = !before
    ? after
      ? after.position - POSITION_GAP
      : POSITION_GAP
    : !after
      ? before.position + POSITION_GAP
      : (before.position + after.position) / 2;

  return prisma.column.update({
    where: { id: columnId },
    data: { position: newPosition },
  });
};

const deleteColumnById = async (userId: string, columnId: string) => {
  const column = await prisma.column.findUniqueOrThrow({
    where: { id: columnId },
    select: { boardId: true },
  });

  await checkBoardEditorAccess(column.boardId, userId);

  await prisma.column.delete({
    where: { id: columnId },
  });

  return;
};

export const columnService = {
  createNewColumn,
  reorderColumn,
  updateColumnTitle,
  deleteColumnById,
};
