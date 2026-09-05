"use client";

import { useRouter } from "next/navigation";
import { useUserAllBoardsQuery } from "@/redux/features/board/board.api";
import { BoardCard, BoardCardSkeleton } from "./BoardCard";



const UserAllBoards = () => {
  const router = useRouter();
  const { data, isLoading, error } =
    useUserAllBoardsQuery("");

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 3 }).map((_, i) => (
          <BoardCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <p className="text-sm text-red-500">
        Failed to load boards. Please try again.
      </p>
    );
  }

  const boards = data?.result ?? [];

  if (boards.length === 0) {
    return <p className="text-xl text-center pt-12  text-red-500">No boards found.</p>;
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {boards.map(({ role, board }:any) => (
        <BoardCard
          key={board.id}
          role={role}
          board={board}
          onClick={() => router.push(`/board/${board.id}`)}
        />
      ))}
    </div>
  );
};

export default UserAllBoards;