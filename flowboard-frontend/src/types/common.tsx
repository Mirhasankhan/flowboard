



export interface TLoginValues {
  email: string;
  password: string;
  fullName: string;
 
}

export type MemberRole = "OWNER" | "EDITOR" | "VIEWER";

export interface BoardUser {
  id: string;
  fullName: string;
  email: string;
  profileImage: string | null;
}

export interface BoardMember {
  id: string;
  role: MemberRole;
  user: BoardUser;
}

export interface Task {
  id?: string;
  title: string;
  description?: string;
  position: number;
}

export interface Column {
  id: string;
  title: string;
  position: number;
  tasks: Task[];
}

export interface Board {
  id: string;
  title: string;
  description?: string;
  columns: Column[];
  members: BoardMember[];
}

