"use client";

import Container from "@/utils/Container";
import { useState, useEffect } from "react";

const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

// Helper functions
const timeToMinutes = (time: string) => {
  const [hms, ampm] = time.split(" ");
  const [h, m] = hms.split(":").map(Number);
  let hour = h % 12;
  if (ampm === "PM") hour += 12;
  return hour * 60 + m;
};

const isOverlap = (startA: string, endA: string, startB: string, endB: string) => {
  const sA = timeToMinutes(startA);
  const eA = timeToMinutes(endA);
  const sB = timeToMinutes(startB);
  const eB = timeToMinutes(endB);
  return sA < eB && sB < eA;
};

const generateTimeOptions = () => {
  const arr: string[] = [];
  const format = (h: number, m: number) => {
    const hour = ((h + 11) % 12) + 1;
    const ampm = h >= 12 ? "PM" : "AM";
    const min = m === 0 ? "00" : m;
    return `${hour}:${min} ${ampm}`;
  };
  for (let h = 0; h < 24; h++) {
    arr.push(format(h, 0));
    arr.push(format(h, 30));
  }
  return arr;
};

// Dummy data with multiple slots per day
const dummyData = [
  {
    dayOfWeek: 0,
    slots: [
      { id: "s1", availabilityId: "a1", startTime: "09:00 AM", endTime: "11:00 AM" },
      { id: "s2", availabilityId: "a1", startTime: "02:00 PM", endTime: "04:00 PM" },
    ],
  },
  {
    dayOfWeek: 1,
    slots: [
      { id: "s3", availabilityId: "a2", startTime: "10:00 AM", endTime: "12:00 PM" },
      { id: "s4", availabilityId: "a2", startTime: "01:00 PM", endTime: "03:00 PM" },
    ],
  },
  {
    dayOfWeek: 2,
    slots: [
      { id: "s5", availabilityId: "a3", startTime: "09:30 AM", endTime: "11:30 AM" },
      { id: "s6", availabilityId: "a3", startTime: "03:00 PM", endTime: "05:00 PM" },
    ],
  },
  {
    dayOfWeek: 3,
    slots: [
      { id: "s7", availabilityId: "a4", startTime: "08:00 AM", endTime: "10:00 AM" },
    ],
  },
  {
    dayOfWeek: 4,
    slots: [
      { id: "s8", availabilityId: "a5", startTime: "01:00 PM", endTime: "04:00 PM" },
      { id: "s9", availabilityId: "a5", startTime: "05:00 PM", endTime: "07:00 PM" },
    ],
  },
  {
    dayOfWeek: 5,
    slots: [
      { id: "s10", availabilityId: "a6", startTime: "10:00 AM", endTime: "01:00 PM" },
    ],
  },
  {
    dayOfWeek: 6,
    slots: [
      { id: "s11", availabilityId: "a7", startTime: "02:00 PM", endTime: "06:00 PM" },
      { id: "s12", availabilityId: "a7", startTime: "07:00 PM", endTime: "09:00 PM" },
    ],
  },
];

type SlotType = { id: string; start: string; end: string; error?: string; errorConflict?: string };
type DayAvailability = { slots: SlotType[]; active: boolean };

const GetAvailabilityDummyPage = () => {
  const [availability, setAvailability] = useState<Record<string, DayAvailability>>({});
  const [timeOptions, setTimeOptions] = useState<string[]>([]);

  useEffect(() => {
    setTimeOptions(generateTimeOptions());

    const init: any = {};
    dummyData.forEach((item) => {
      const dayName = days[item.dayOfWeek];
      if (!init[dayName]) init[dayName] = { active: true, slots: [] };
      item.slots.forEach((slot) => {
        init[dayName].slots.push({ id: slot.id, start: slot.startTime, end: slot.endTime });
      });
    });
    setAvailability(init);
  }, []);

  const updateSlot = (day: string, slotId: string, field: "start" | "end", value: string) => {
    setAvailability((prev) => {
      const updated = { ...prev };
      updated[day].slots = updated[day].slots.map((slot) => {
        if (slot.id === slotId) slot[field] = value;
        return slot;
      });

      // Validation
      updated[day].slots.forEach((s1, i) => {
        s1.error = timeToMinutes(s1.start) >= timeToMinutes(s1.end) ? "Start must be before end" : undefined;
        s1.errorConflict = undefined;
        updated[day].slots.forEach((s2, j) => {
          if (i !== j && isOverlap(s1.start, s1.end, s2.start, s2.end)) {
            s1.errorConflict = "This slot conflicts with another slot";
          }
        });
      });

      return updated;
    });
  };

  const removeSlot = (day: string, slotId: string) => {
    setAvailability((prev) => {
      const updated = { ...prev };
      updated[day].slots = updated[day].slots.filter((s) => s.id !== slotId);
      return updated;
    });
  };

  return (
    <Container>
      <h1 className="text-2xl font-bold mb-5">Weekly Availability (Dummy Data)</h1>
      <div className="grid text-white xl:grid-cols-2 grid-cols-1 gap-5">
        {days.map((day) => (
          <div key={day} className="mb-6 bg-[#1f1f1f] p-4 rounded-[6px]">
            <h2 className="text-lg font-semibold mb-2">{day}</h2>
            {availability[day]?.slots.map((slot) => (
              <div key={slot.id} className="mb-3 flex flex-col gap-1">
                <div className="flex gap-3 items-center">
                  <select value={slot.start} onChange={(e) => updateSlot(day, slot.id, "start", e.target.value)} className="bg-black px-3 py-2 rounded-[6px] border border-gray-600">
                    {timeOptions.map((t) => <option key={t}>{t}</option>)}
                  </select>
                  <span>—</span>
                  <select value={slot.end} onChange={(e) => updateSlot(day, slot.id, "end", e.target.value)} className="bg-black px-3 py-2 rounded-[6px] border border-gray-600">
                    {timeOptions.map((t) => <option key={t}>{t}</option>)}
                  </select>
                  <button onClick={() => removeSlot(day, slot.id)} className="text-red-400 text-sm">✕</button>
                </div>
                {slot.error && <p className="text-red-400 text-xs">{slot.error}</p>}
                {slot.errorConflict && <p className="text-red-400 text-xs">{slot.errorConflict}</p>}
              </div>
            ))}
          </div>
        ))}
      </div>
    </Container>
  );
};

export default GetAvailabilityDummyPage;
