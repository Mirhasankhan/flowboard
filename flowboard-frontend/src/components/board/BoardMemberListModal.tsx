"use client";

import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ChevronDown, Trash2, Users } from "lucide-react";
import { useState } from "react";
import { useRemoveMemberMutation } from "@/redux/features/board/board.api";
import { toast } from "react-toastify";

const DEFAULT_AVATAR =
  "https://res.cloudinary.com/dddrm7ep8/image/upload/v1781532954/y7gdxfkl9uznjt96cjea.png";

interface BoardMembersModalProps {
  members: any[];
  isEditAccess: boolean;
}

const BoardMembersModal = ({ members, isEditAccess }: BoardMembersModalProps) => {
    const [removeMember] = useRemoveMemberMutation();
  const [memberRoles, setMemberRoles] = useState<Record<string, string>>({});
  const [open, setOpen] = useState(false);

  const handleRemoveMember = async (memberId: string) => {
    try {
      const response = await removeMember(memberId).unwrap();
      if (response?.success) {
        toast.success(response?.message || "Member removed successfully");
      }
    } finally {
     
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button
          type="button"
          className="inline-flex shrink-0 items-center gap-1.5 rounded-[9px] border border-gray-200 bg-white px-2.5 py-1.5 text-xs font-semibold text-gray-700 shadow-sm transition hover:bg-gray-50"
        >
          <Users size={13} className="text-indigo-500" />
          View members
          <span className="rounded bg-indigo-50 px-1.5 py-0.5 text-[10px] font-semibold text-indigo-700">
            {members.length}
          </span>
        </button>
      </DialogTrigger>

      <DialogContent className="bg-white !rounded-[8px] p-6 sm:max-w-[440px]">
        <DialogHeader>         
            <DialogTitle className="text-lg font-semibold">
              People on this board
            </DialogTitle>         
       
        </DialogHeader>

        <div className="mt-2 flex max-h-[360px] flex-col divide-y divide-gray-100 overflow-y-auto rounded-md border border-gray-100">
          {members.map((member: any) => {
            const memberRole =
              memberRoles[member.id] || member.role || "VIEWER";
            const isMemberOwner = memberRole.toUpperCase() === "OWNER";

            return (
              <div
              
                key={member.id}
                className="flex min-w-0 items-center gap-2 bg-gray-50/60 px-2.5 py-2 first:rounded-t-md last:rounded-b-md"
              >
                <Image
                  height={26}
                  width={26}
                  src={member.user?.profileImage || DEFAULT_AVATAR}
                  alt={member.user?.fullName || "Board member"}
                  className="h-[30px] w-[30px] shrink-0 rounded-full border border-white object-cover shadow-sm"
                />
                <p className="min-w-0 flex-1 truncate text-xs font-medium text-gray-900">
                  {member.user?.fullName || "Unnamed member"} <br/>
                  <span className="text-[10px] text-gray-500">{member.user?.email}</span>
                </p>
               
                <div className="relative shrink-0">
                  <select
                    value={memberRole.toUpperCase()}
                    disabled={!isEditAccess || isMemberOwner}
                    aria-label={`Role for ${member.user?.fullName || "board member"}`}
                    title={
                      !isEditAccess
                        ? "Only board owners and editors can change member roles"
                        : isMemberOwner
                          ? "Owner role cannot be changed"
                          : "Change member role"
                    }
                    onChange={(event) => {
                      setMemberRoles((currentRoles) => ({
                        ...currentRoles,
                        [member.id]: event.target.value,
                      }));
                    }}
                    className="h-7 w-[88px] appearance-none rounded border border-gray-200 bg-white pl-2 pr-5 text-[11px] font-medium text-gray-700 shadow-sm outline-none transition focus:border-indigo-400 focus:ring-1 focus:ring-indigo-100 disabled:cursor-not-allowed disabled:bg-gray-100 disabled:text-gray-500"
                  >
                    <option value="EDITOR">Editor</option>
                    <option value="VIEWER">Viewer</option>
                    {isMemberOwner && <option value="OWNER">Owner</option>}
                  </select>
                  <ChevronDown
                    size={11}
                    className="pointer-events-none absolute right-1.5 top-1/2 -translate-y-1/2 text-gray-400"
                  />
                </div>
                <button
                  type="button"
                  disabled={!isEditAccess || isMemberOwner}
                  onClick={() => handleRemoveMember(member.id)}
                  aria-label={`Remove ${member.user?.fullName || "board member"}`}
                  title={
                    !isEditAccess
                      ? "Only board owners and editors can remove members"
                      : isMemberOwner
                        ? "Owner cannot be removed"
                        : "Remove member"
                  }
                  className="rounded p-0.5  transition text-red-500 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  <Trash2 size={13} />
                </button>
              </div>
            );
          })}

          {members.length === 0 && (
            <p className="px-3 py-6 text-center text-xs text-gray-500">
              No members have been added to this board yet.
            </p>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default BoardMembersModal;
