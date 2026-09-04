"use client";
import { useSetAvailabilityMutation } from "@/redux/features/availability/availability.api";
import Container from "@/utils/Container";
import {
  generateTimeOptions,
  isOverlap,
  timeToMinutes,
} from "@/utils/isOverlap";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";

const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const WeeklyAvailabilityPage = () => {
  const [createAvailability, { isLoading }] = useSetAvailabilityMutation();

  const [availability, setAvailability] = useState<
    Record<
      string,
      {
        active: boolean;
        slots: { start: string; end: string; error?: string }[];
      }
    >
  >({});
  const [timeOptions, setTimeOptions] = useState<string[]>([]);

  useEffect(() => {
    setTimeOptions(generateTimeOptions());

    const init: any = {};
    days.forEach((d) => {
      init[d] = { active: true, slots: [{ start: "9:00 AM", end: "5:00 PM" }] };
    });
    setAvailability(init);
  }, []);

  const updateSlot = (
    day: string,
    idx: number,
    field: "start" | "end",
    value: string
  ) => {
    setAvailability((prev) => {
      const updated = { ...prev };
      updated[day] = { ...updated[day], slots: [...updated[day].slots] };
      updated[day].slots[idx] = { ...updated[day].slots[idx], [field]: value };

      // Validate this slot
      const slot = updated[day].slots[idx];
      if (timeToMinutes(slot.start) >= timeToMinutes(slot.end)) {
        updated[day].slots[idx].error =
          "Start time must be earlier than end time";
      } else {
        updated[day].slots[idx].error = undefined;
      }

      // Validate conflicts
      for (let i = 0; i < updated[day].slots.length; i++) {
        const s1: any = updated[day].slots[i];
        s1.errorConflict = undefined; // reset
        for (let j = 0; j < updated[day].slots.length; j++) {
          if (i === j) continue; // skip itself
          const s2 = updated[day].slots[j];
          if (isOverlap(s1.start, s1.end, s2.start, s2.end)) {
            s1.errorConflict = "This slot conflicts with another slot";
            break; // no need to check further
          }
        }
      }

      return updated;
    });
  };

  const addSlot = (day: string) => {
    setAvailability((prev) => {
      const updated = { ...prev };
      updated[day] = { ...updated[day], slots: [...updated[day].slots] };
      updated[day].slots.push({ start: "6:00 PM", end: "8:00 PM" });
      return updated;
    });
  };

  const removeSlot = (day: string, idx: number) => {
    setAvailability((prev) => {
      const updated = { ...prev };
      updated[day] = { ...updated[day], slots: [...updated[day].slots] };
      updated[day].slots.splice(idx, 1);
      return updated;
    });
  };

  const toggleDay = (day: string) => {
    setAvailability((prev) => {
      const updated = { ...prev };
      updated[day] = { ...updated[day] };
      updated[day].active = !updated[day].active;
      return updated;
    });
  };

  const validateSlots = () => {
    for (const d of days) {
      const obj: any = availability[d];
      if (!obj.active) continue;
      for (const slot of obj.slots) {
        if (!slot.start || !slot.end || slot.error || slot.errorConflict)
          return false;
      }
    }
    return true;
  };

  const isSubmitDisabled =
    Object.keys(availability).length === 0 || !validateSlots();

  const handleSubmit = async () => {
    const formatted = Object.entries(availability).flatMap(
      ([dayName, data]) => {
        if (!data.active) return [];
        const dayIndex = days.indexOf(dayName);
        return data.slots.map((slot) => ({
          dayOfWeek: dayIndex,
          slots: [{ startTime: slot.start, endTime: slot.end }],
        }));
      }
    );

    
    const data = { availability: formatted };  
    const response = await createAvailability(data);
    if(response.data){
      toast.success(response.data.message)
    }
  };

  if (Object.keys(availability).length === 0 || timeOptions.length === 0)
    return null;

  return (
    <Container>
      <h1 className="text-2xl font-bold my-5">Weekly Availability</h1>

      <div className="grid text-white lg:grid-cols-2 grid-cols-1 gap-5">
        {days.map((day) => (
          <div key={day} className="mb-6 bg-[#1f1f1f] p-4 rounded-[6px]">
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-lg font-semibold">{day}</h2>
              <label className="cursor-pointer">
                <input
                  type="checkbox"
                  checked={availability[day]?.active || false}
                  onChange={() => toggleDay(day)}
                  className="accent-orange-600 w-5 h-5"
                />
              </label>
            </div>

            {availability[day]?.active &&
              availability[day].slots.map((slot: any, idx) => (
                <div key={idx} className="mb-3">
                  <div className="flex gap-3 items-center mb-1">
                    <select
                      value={slot.start}
                      onChange={(e) =>
                        updateSlot(day, idx, "start", e.target.value)
                      }
                      className="bg-black px-3 py-2 rounded-[6px] border border-gray-600"
                    >
                      {timeOptions.map((t) => (
                        <option key={t}>{t}</option>
                      ))}
                    </select>

                    <span>—</span>

                    <select
                      value={slot.end}
                      onChange={(e) =>
                        updateSlot(day, idx, "end", e.target.value)
                      }
                      className="bg-black px-3 py-2 rounded-[6px] border border-gray-600"
                    >
                      {timeOptions.map((t) => (
                        <option key={t}>{t}</option>
                      ))}
                    </select>

                    {idx > 0 && (
                      <button
                        onClick={() => removeSlot(day, idx)}
                        className="text-red-400 text-sm"
                      >
                        ✕
                      </button>
                    )}
                  </div>

                  {/* Error messages */}
                  {slot.error && (
                    <p className="text-red-400 text-xs">{slot.error}</p>
                  )}
                  {slot.errorConflict && (
                    <p className="text-red-400 text-xs">{slot.errorConflict}</p>
                  )}
                </div>
              ))}

            {availability[day]?.active && (
              <button
                onClick={() => addSlot(day)}
                className="text-orange-400 text-sm"
              >
                + Add Time Interval
              </button>
            )}
          </div>
        ))}
      </div>

      <button
        disabled={isSubmitDisabled}
        onClick={handleSubmit}
        className={`px-4 py-2 rounded-[6px] mb-5 text-white font-medium bg-orange-600 ${
          isSubmitDisabled
            ? "opacity-40 cursor-not-allowed"
            : "hover:bg-orange-700"
        }`}
      >
        {isLoading ? "Submitting...." : "Submit Availability"}
      </button>
    </Container>
  );
};

export default WeeklyAvailabilityPage;
