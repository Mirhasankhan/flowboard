"use client";

import React, { useState, useEffect, useMemo } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import { generateTimeOptions, timeToMinutes } from "@/utils/isOverlap";
import { useUpdateSlotMutation } from "@/redux/features/availability/availability.api";
import { FiEdit } from "react-icons/fi";
import { toast } from "react-toastify";

interface UpdateSlotModalProps {
  slotId: string;
  startTime: string;
  endTime: string;
}

const UpdateSlotModal: React.FC<UpdateSlotModalProps> = ({
  slotId,
  startTime,
  endTime,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [start, setStart] = useState<string>("");
  const [end, setEnd] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [timeOptions, setTimeOptions] = useState<string[]>([]);

  const [updateSlot, { isLoading }] = useUpdateSlotMutation();

  // 1) build options once
  useEffect(() => {
    setTimeOptions(generateTimeOptions());
  }, []);

  // helper to normalize an incoming time string to an option in timeOptions
  const normalizeToOption = (value: string) => {
    if (!value || timeOptions.length === 0) return "";
    // exact match first
    const exact = timeOptions.find((t) => t === value);
    if (exact) return exact;

    // match by minutes (handles slightly different formatting)
    try {
      const target = timeToMinutes(value);
      const byMinutes = timeOptions.find((t) => timeToMinutes(t) === target);
      if (byMinutes) return byMinutes;
    } catch {
      /* fallthrough */
    }

    // fallback: leave empty so select will show first option only if needed
    return "";
  };

  // 2) set start/end only after timeOptions available OR when props change
  useEffect(() => {
    if (timeOptions.length === 0) return;
    const normalizedStart = normalizeToOption(startTime);
    const normalizedEnd = normalizeToOption(endTime);

    // if normalization fails (""), fallback to original prop if it's already valid, else first option
    setStart(normalizedStart || startTime || timeOptions[0]);
    setEnd(normalizedEnd || endTime || timeOptions[0]);
    setError(null);
  }, [timeOptions, startTime, endTime]);

  // 3) when opening the dialog, make sure we reset to the (normalized) defaults
  useEffect(() => {
    if (!isOpen) return;
    if (timeOptions.length === 0) return; // options not ready yet
    const normalizedStart = normalizeToOption(startTime);
    const normalizedEnd = normalizeToOption(endTime);
    setStart(normalizedStart || startTime || timeOptions[0]);
    setEnd(normalizedEnd || endTime || timeOptions[0]);
    setError(null);
  }, [isOpen, timeOptions, startTime, endTime]);

  // change detection
  const isChanged = useMemo(() => {
    return start !== startTime || end !== endTime;
  }, [start, end, startTime, endTime]);

  const handleUpdate = async () => {
    setError(null);

    if (timeToMinutes(start) >= timeToMinutes(end)) {
      setError("Start time must be earlier than end time");
      return;
    }

    const payload = { slotId, slot: { startTime: start, endTime: end } };
    const response: any = await updateSlot(payload);
    if (response.data) {
      toast.success(response.data.message);
      setIsOpen(false);
    } else {
      setError(response.error?.data?.message || "Update failed");
      toast.error(response.error.data.message)
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <button>
          <FiEdit />
        </button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[400px] bg-white !rounded-[8px] p-4">
        <DialogHeader>
          <DialogTitle>Update Slot</DialogTitle>
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
            onClick={handleUpdate}
            disabled={isLoading || !isChanged}
          >
            {isLoading ? "Updating..." : "Update Slot"}
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateSlotModal;
