import { Board, Role } from "@prisma/client";
import prisma from "../../../shared/prisma";
import ApiError from "../../../errors/ApiErrors";
import sendEmail from "../../../helpers/sendEmail";
import { boardInvitationEmailBody } from "../../../helpers/emailBody";
import { checkBoardEditorAccess } from "../../../helpers/checkEditorAccess";

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
            // where: {
            //   userId: {
            //     not: userId,
            //   },
            // },
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

const getBoardByIdFromDB = async (userId: string, boardId: string) => {
  const userRole = await prisma.boardMember.findFirst({
    where: {
      boardId,
      userId,
    },
    select: {
      role: true,
    },
  });

  if (!userRole) {
    throw new ApiError(404, "You are not a member of this board");
  }
  const board = await prisma.board.findUniqueOrThrow({
    where: {
      id: boardId,
    },
    select: {
      id: true,
      title: true,
      description: true,
      columns: {
        orderBy: { position: "asc" },
        select: {
          id: true,
          title: true,
          position: true,
          tasks: {
            orderBy: { position: "asc" },
            select: {
              id: true,
              title: true,
              position: true,
              columnId: true,
              createdAt: true,
              updatedAt: true,
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

  return {
    board,
    role: userRole.role,
  };
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

  await checkBoardEditorAccess(boardId, userId);

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

const getUnInvitedMembersByBoardIdFromDB = async (boardId: string) => {
  await prisma.board.findUniqueOrThrow({
    where: {
      id: boardId,
    },
  });

  const unInvitedMembers = await prisma.user.findMany({
    where: {
      boardMembers: {
        none: {
          boardId,
        },
      },
    },
    select: {
      id: true,
      fullName: true,
      email: true,
      profileImage: true,
    },
  });

  return unInvitedMembers;
};

const inviteMemberToBoardInDB = async (userId:string,payload: {
  boardId: string;
  memberId: string;
  role: Role;
}) => {
  const board = await prisma.board.findUniqueOrThrow({
    where: {
      id: payload.boardId,
    },
    select: {
      id: true,
      title: true,
      members: true,
    },
  });

  const user = await prisma.user.findUniqueOrThrow({
    where: {
      id: payload.memberId,
    },
    select: {
      email: true,
      fullName: true,
    },
  });

  await checkBoardEditorAccess(payload.boardId, userId)

  if (board.members.some((member) => member.userId === payload.memberId)) {
    throw new ApiError(409, "User is already a member of this board");
  }

  const html = boardInvitationEmailBody(user.fullName, board.title, payload.role);

  await sendEmail(
    user.email,
    "You have been invited to a Flowboard board",
    html,
  );

  await prisma.boardMember.create({
    data: {
      boardId: payload.boardId,
      userId: payload.memberId,
      role: payload.role,
    },
  });

  return;
};

const removeMemberFromBoardInDB = async (userId: string, memberId: string) => {
  const member = await prisma.boardMember.findUniqueOrThrow({
    where: {
      id: memberId,

    },
    include: {
      board: {
        select: {
          id: true
        }
      }
    }
  });

  await checkBoardEditorAccess(member.board.id, userId)

  await prisma.boardMember.delete({
    where: {
      id: memberId
    }
  })

  return;
}


const updateMemberRoleInDB = async(userId:string, memberId:string) =>{
    const member = await prisma.boardMember.findUniqueOrThrow({
    where: {
      id: memberId,

    },
    include: {
      board: {
        select: {
          id: true
        }
      }
    }
  });

  await checkBoardEditorAccess(member.board.id, userId)

  await prisma.boardMember.update({
    where:{
      id: memberId
    },
    data:{
      role: member.role == "VIEWER" ? "EDITOR" : "VIEWER"
    }
  })

  return {
    message : `Member role has been updated to ${member.role == "VIEWER" ? "EDITOR" : "VIEWER"} successfully.`
  }
}

export const boardService = {
  createNewBoardIntoDB,
  getUserWiseBoardsFromDB,
  getBoardByIdFromDB,
  updateBoardByIdInDB,
  deleteBoardByIdInDB,
  getUnInvitedMembersByBoardIdFromDB,
  inviteMemberToBoardInDB,
  removeMemberFromBoardInDB,
  updateMemberRoleInDB
};
