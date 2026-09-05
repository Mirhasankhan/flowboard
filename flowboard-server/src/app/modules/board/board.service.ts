import { Board } from "@prisma/client";
import prisma from "../../../shared/prisma";
import ApiError from "../../../errors/ApiErrors";

const createNewBoardIntoDB = async (ownerId: string, payload: Board) => {
  return await prisma.$transaction(async (tx) => {
    // Create board
    const board = await tx.board.create({
      data: {
        title: payload.title,
        description: payload.description,
        ownerId,
      },
    });

    // Add owner as board member
    await tx.boardMember.create({
      data: {
        boardId: board.id,
        userId: ownerId,
        role: "OWNER",
      },
    });

    return;
  });
};

const getUserWiseBoardsFromDB = async (userId: string) => {
  const boards = await prisma.boardMember.findMany({
    where: {
      userId,
    },
    select: {
      role: true,
      board: {
        select: {
          id: true,
          title: true,
          description: true,
          members: {
            where: {
              userId: {
                not: userId,
              },
            },
            select: {
              user: {
                select: {
                  profileImage: true,
                },
              },
            },
          },
        },
      },
    },
  });

  return boards;
};

const getBoardByIdFromDB = async (boardId: string) => {
  const board = await prisma.board.findUniqueOrThrow({
    where: {
      id: boardId,
    },
    select: {
      id: true,
      title: true,
      description: true,
      columns: {
        select: {
          id: true,
          title: true,
          position: true,
          tasks: {
            select: {
              title: true,
              position: true,
            },
          },
        },
      },
      members: {
        select: {
          id: true,
          role: true,
          user: {
            select: {
              id: true,
              fullName: true,
              email: true,
              profileImage: true,
            },
          },
        },
      },
    },
  });

  return board;
};

const updateBoardByIdInDB = async (
  userId: string,
  boardId: string,
  payload: Board,
) => {
  const existingBoard = await prisma.board.findUniqueOrThrow({
    where: {
      id: boardId,
    },
  });

  const member = await prisma.boardMember.findFirst({
    where: {
      boardId,
      userId,
      role: {
        in: ["OWNER", "EDITOR"],
      },
    },
  });

  if (!member) {
    throw new ApiError(403, "You are not authorized to update this board");
  }

  await prisma.board.update({
    where: {
      id: boardId,
    },
    data: {
      title: payload.title ?? existingBoard.title,
      description: payload.description ?? existingBoard.description,
    },
  });

  return;
};

const deleteBoardByIdInDB = async (userId: string, boardId: string) => {
  await prisma.board.findUniqueOrThrow({
    where: {
      id: boardId,
    },
  });

  const member = await prisma.boardMember.findFirst({
    where: {
      boardId,
      userId,
      role: {
        in: ["OWNER", "EDITOR"],
      },
    },
  });

  if (!member) {
    throw new ApiError(403, "You are not authorized to delete this board");
  }

  await prisma.board.delete({
    where: {
      id: boardId,
    },
  });

  return;
};

 

export const boardService = {
  createNewBoardIntoDB,
  getUserWiseBoardsFromDB,
  getBoardByIdFromDB,
  updateBoardByIdInDB,
  deleteBoardByIdInDB,
};
