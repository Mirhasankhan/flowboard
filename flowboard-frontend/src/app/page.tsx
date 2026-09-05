"use client";

import CreateBoardModal from "@/components/board/CreateNewBoardModal";
import Container from "@/utils/Container";

const HomePage = () => {
  return (
    <main className="min-h-screen bg-white">
      <Container>
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">My Boards</h1>
            <p>Welcome to your boards</p>
          </div>
          <CreateBoardModal></CreateBoardModal>
        </div>
      </Container>
    </main>
  );
};

export default HomePage;
