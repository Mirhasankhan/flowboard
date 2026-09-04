"use client";

import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import { generateTimeOptions, timeToMinutes } from "@/utils/isOverlap";
import { FiPlus } from "react-icons/fi";
import { useCreateSlotMutation } from "@/redux/features/availability/availability.api";
import { toast } from "react-toastify";

interface AddSlotModalProps {
  dayOfWeek: number;
}

const AddSlotModal: React.FC<AddSlotModalProps> = ({ dayOfWeek }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [timeOptions, setTimeOptions] = useState<string[]>([]);

  const [addSlot, { isLoading }] = useCreateSlotMutation();

  useEffect(() => {
    setTimeOptions(generateTimeOptions());
  }, []);

  useEffect(() => {
    if (!isOpen) return;
    if (timeOptions.length === 0) return;

    setStart(timeOptions[0]);
    setEnd(timeOptions[1]);
    setError(null);
  }, [isOpen, timeOptions]);

  const handleCreate = async () => {
    setError(null);

    if (timeToMinutes(start) >= timeToMinutes(end)) {
      setError("Start must be earlier than end.");
      return;
    }

    const data = {
      slot: {
        dayOfWeek,
        startTime: start,
        endTime: end,
      },
    };

    const response: any = await addSlot(data);

    if (response.data) {
      toast.success(response.data.message);
      setIsOpen(false);
    } else {
      toast.error(response.error?.data?.message || "Failed to add slot");
      setError(response.error?.data?.message || "Failed to add slot");
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <button className=" text-secondary rounded-md flex items-center gap-1">
          <FiPlus size={20} />
        </button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[400px] bg-white !rounded-[8px] p-4">
        <DialogHeader>
          <DialogTitle>Add New Slot</DialogTitle>
        </DialogHeader>

        <div className="flex flex-col gap-4 mt-2">
          <div className="flex gap-3 items-center">
            <select
              value={start}
              onChange={(e) => setStart(e.target.value)}
              className="px-3 py-2 rounded border border-gray-600"
            >
              {timeOptions.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>

            <span>—</span>

            <select
              value={end}
              onChange={(e) => setEnd(e.target.value)}
              className="px-3 py-2 rounded border border-gray-600"
            >
              {timeOptions.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </div>

          {error && <p className="text-red-400 text-sm">{error}</p>}
        </div>

        <DialogFooter className="mt-4 flex justify-end gap-2">
          <button
            className="bg-red-600 px-4 py-1 text-white font-medium rounded-[6px]"
            onClick={() => setIsOpen(false)}
          >
            Cancel
          </button>

          <button
            className="bg-primary px-4 py-1 text-white font-medium rounded-[6px]"
            onClick={handleCreate}
            disabled={isLoading}
          >
            {isLoading ? "Adding..." : "Add Slot"}
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddSlotModal;
