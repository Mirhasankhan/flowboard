import ApiError from "../errors/ApiErrors";
import prisma from "../shared/prisma";

export const checkBoardEditorAccess = async (
  boardId: string,
  userId: string,
) => {
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
    throw new ApiError(
      403,
      "You are not authorized to perform action on this board",
    );
  }

  return member;
};