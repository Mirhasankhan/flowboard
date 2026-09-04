import {
  useAvailabilitySlotsQuery,
  useDeleteSlotMutation,
} from "@/redux/features/availability/availability.api";
import { Loader } from "lucide-react";
import React, { useState } from "react";
import { FiTrash2 } from "react-icons/fi";
import { toast } from "react-toastify";
import UpdateSlotModal from "../profile/UpdateSlotModal";
import AddSlotModal from "../profile/AddNewSlotModal";
import { SkeletonCard } from "../shared/Skeleton";

interface Slot {
  id: string;
  startTime: string;
  endTime: string;
}

interface DayAvailability {
  dayOfWeek: number;
  slots: Slot[];
}

const dayNames = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const LawyerAvailabilities: React.FC = () => {
  const { data: availabilitySlots, isLoading } = useAvailabilitySlotsQuery("");
  const [deleteSlot] = useDeleteSlotMutation();
  const [deletingSlotId, setDeletingSlotId] = useState<string | null>(null);

  const availability: DayAvailability[] = availabilitySlots?.data || [];

  const mergedAvailability: Record<number, Slot[]> = availability.reduce(
    (acc, curr) => {
      if (!acc[curr.dayOfWeek]) acc[curr.dayOfWeek] = [];
      acc[curr.dayOfWeek].push(...curr.slots);
      return acc;
    },
    {} as Record<number, Slot[]>
  );

  const handleDelete = async (slotId: string) => {
    setDeletingSlotId(slotId);
    const response: any = await deleteSlot(slotId);
    console.log(response.data);

    if (response.data) {
      setDeletingSlotId(null);
      toast.success(response.data.message);
    } else {
      setDeletingSlotId(null);
      toast.error(response.error.message);
    }
  };

  return (
    <>
      <div className="p-6">
        <h1 className="text-xl font-medium">Manage Availabilites</h1>
        <p className="text-gray-500">
          Manage your availability so that users can find and book you smoothly
        </p>
      </div>
      {isLoading && (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 px-4 mt-6 gap-6">
          {Array.from({ length: 6 }).map((_, idx) => (
            <SkeletonCard height={160} key={idx} />
          ))}
        </div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 my-6 px-4">
        {Object.entries(mergedAvailability).map(([dayIndex, slots]) => (
          <div
            key={dayIndex}
            className="bg-gradient-to-br from-white via-gray-50 to-white rounded-3xl border p-6  transition-all duration-300"
          >
            <div className="flex justify-between mb-4 items-center">
              <h3 className="text-xl font-semibold  text-gray-800">
                {dayNames[parseInt(dayIndex)]}
              </h3>
              <AddSlotModal dayOfWeek={parseInt(dayIndex)}></AddSlotModal>
            </div>
            <div className="flex flex-col gap-3">
              {slots?.map((slot) => (
                <div
                  key={slot.id}
                  className="flex justify-between items-center bg-blue-50 text-blue-900 font-semibold px-4 py-2 rounded-2xl shadow-sm hover:shadow-md transition-all duration-200"
                >
                  <span>
                    {slot.startTime} - {slot.endTime}
                  </span>
                  <div className="flex gap-2">
                    <UpdateSlotModal
                      slotId={slot.id}
                      startTime={slot.startTime}
                      endTime={slot.endTime}
                    ></UpdateSlotModal>
                    {deletingSlotId === slot.id ? (
                      <Loader className="animate-spin text-gray-500" />
                    ) : (
                      <FiTrash2
                        className="text-red-500 hover:text-red-700 cursor-pointer"
                        onClick={() => handleDelete(slot.id)}
                      />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default LawyerAvailabilities;
