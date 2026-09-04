"use client";
import Container from "@/utils/Container";
import { Calendar, Clock, Clock1, DollarSign, User, Video } from "lucide-react";
import Image from "next/image";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { useSearchParams } from "next/navigation";
import { useLawyerDetailsQuery } from "@/redux/features/auth/authApi";
import { useState } from "react";
import StripeModal from "@/components/shared/CreatePayment";
import { useDayWiseSlotsQuery } from "@/redux/features/availability/availability.api";
import { GoLaw } from "react-icons/go";
import { VscLaw } from "react-icons/vsc";

const BookingPage = () => {
  const searchParams = useSearchParams();
  const lawyerId = searchParams.get("lawyerId");

  // ALWAYS RUN HOOKS (never behind a return)
  const { data: lawyerData, isLoading: lawyerLoading } =
    useLawyerDetailsQuery(lawyerId);

  const lawyer = lawyerData?.data?.lawyer;

  const [selectedDate, setSelectedDate] = useState("");
  const [dayNumber, setDayNumber] = useState<number | null>(null);
  const [selectedTime, setSelectedTime] = useState("");
  const [consultationType, setConsultationType] = useState("");
  const [selectedLawArea, setSelectedLawArea] = useState("");
  const [description, setDescription] = useState("");
  const [serviceId, setServiceId] = useState("");

  // SLOT HOOK ALWAYS EXECUTES — SKIP HANDLES CONDITIONALITY
  const { data: slotData, isLoading: slotLoading } = useDayWiseSlotsQuery(
    { day: dayNumber ?? 0, lawyerId },
    { skip: dayNumber === null },
  );

  // Convert date → weekday (0–6)
  const handleDateChange = (value: string) => {
    setSelectedDate(value);
    const day = new Date(value).getDay();
    setDayNumber(day);
    setSelectedTime("");
  };

  const handleLawAreaChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const name = e.target.value;
    setSelectedLawArea(name);

    const service = lawyer?.specialization?.find(
      (x: any) => x.serviceName === name,
    );
    setServiceId(service?._id || "");
  };

  const consultationOptions =
    lawyer?.serviceType === "Both"
      ? ["Online", "In_Person"]
      : lawyer?.serviceType === "Online"
        ? ["Online"]
        : ["In_Person"];

  const isFormComplete =
    selectedDate &&
    selectedTime &&
    consultationType &&
    serviceId &&
    description;

  return (
    <div className="bg-[#f8f8f8] pb-[320px] lg:pb-12 pt-2 lg:pt-12">
      <Container>
        {/* Skeleton if lawyer loading but still allowing hooks to run */}
        {lawyerLoading ? (
          <p className="text-center py-10">Loading...</p>
        ) : (
          <>
            {/* Header */}
            <div className="flex items-center gap-1">
              <Image
                alt={lawyer?.fullName}
                height={200}
                width={700}
                className="border-2 h-16 w-16 rounded-full object-cover"
                src={
                  lawyer?.profileImage ||
                  "https://res.cloudinary.com/dddrm7ep8/image/upload/v1781532954/y7gdxfkl9uznjt96cjea.png"
                }
              />
              <div>
                <h1 className="font-medium text-xl lg:text-3xl">
                  Book Consultation
                </h1>
                <small className="text-gray-500 font-medium">
                  with {lawyer?.fullName}
                </small>
              </div>
            </div>

            <div className="grid grid-cols-3 my-6 gap-6">
              <div className="col-span-3 lg:col-span-2">
                {/* Date Picker */}
                <div className="lg:flex gap-5">
                  <div className="border w-full bg-white p-3 lg:p-6  rounded-[6px]">
                    <div className="flex items-center pb-2 gap-1">
                      <Calendar className="text-secondary" />
                      <p className="font-medium text-gray-700">Select a date</p>
                    </div>
                    <input
                      type="date"
                      value={selectedDate}
                      min={new Date().toISOString().split("T")[0]}
                      onChange={(e) => handleDateChange(e.target.value)}
                      className="w-full border rounded-[4px] mt-2 p-2"
                    />
                  </div>
                  <div className="border mt-4 lg:mt-0 w-full bg-white p-3 lg:p-6  rounded-[6px]">
                    <div className="flex items-center pb-2 gap-1">
                      <GoLaw size={20} className="text-secondary" />
                      <p className="font-medium text-gray-700">
                        Select area of law
                      </p>
                    </div>
                    <select
                      value={selectedLawArea}
                      onChange={handleLawAreaChange}
                      className="w-full border p-2.5 mt-2 rounded-[4px]"
                    >
                      <option value="">Select specialization</option>
                      {lawyer?.specialization?.map((area: any, i: number) => (
                        <option key={i} value={area.serviceName}>
                          {area.serviceName}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Dynamic Slots */}
                <div className="border mt-4 bg-white p-3 lg:p-6 rounded-[6px]">
                  <div className="flex items-center pb-2 gap-1">
                    <Clock className="text-secondary" />
                    <p className="font-medium text-gray-700">Available Slots</p>
                  </div>

                  {slotLoading && <p>Loading slots...</p>}

                  {!slotLoading &&
                    (dayNumber === null || slotData?.data?.length === 0) && (
                      <p className="text-red-500">
                        Select A Date To Get Lawyer Available Slots{" "}
                      </p>
                    )}

                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
                    {!slotLoading &&
                      slotData?.data?.map((slot: any, idx: number) => (
                        <button
                          key={idx}
                          onClick={() => setSelectedTime(slot.start)}
                          className={`border py-2 rounded-[4px] text-center font-medium ${
                            selectedTime === slot.start
                              ? "bg-primary text-white"
                              : "hover:bg-gray-100"
                          }`}
                        >
                          {slot.start}
                        </button>
                      ))}
                  </div>
                </div>

                {/* Consultation Type */}
                <div className="border mt-4 bg-white p-3 lg:p-6  rounded-[6px]">
                  <h1 className="font-medium pb-2">Consultation Type</h1>
                  <div className="lg:flex gap-5">
                    {consultationOptions.map((type) => (
                      <div
                        key={type}
                        onClick={() => setConsultationType(type)}
                        className={`flex items-center mt-1 border rounded-[6px] p-3 gap-2 w-full cursor-pointer ${
                          consultationType === type
                            ? "border-primary bg-blue-50"
                            : ""
                        }`}
                      >
                        <input
                          type="radio"
                          checked={consultationType === type}
                          onChange={() => setConsultationType(type)}
                        />
                        <Video className="text-secondary" />
                        <div className="flex flex-col leading-none">
                          <p className="font-medium pb-1">{type}</p>
                          <small className="text-gray-500">
                            {type === "Online"
                              ? "Video call consultation"
                              : "Offline visit"}
                          </small>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Description */}
                <div className="mt-6">
                  <label className="block pb-2 text-gray-700 font-medium">
                    Describe your need shortly
                  </label>
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Write short description"
                    className="w-full border rounded-[4px] p-2"
                  />
                </div>
              </div>

              {/* Summary */}
              <div className="col-span-3 lg:col-span-1 bg-white rounded-[6px] max-h-[480px] fixed bottom-0 left-4 right-4 max-w-screen-md w-auto lg:sticky lg:top-8 lg:left-auto lg:right-auto lg:w-auto">
                <div className="flex lg:bg-primary/70 text-secondary lg:text-white py-2 lg:py-8 justify-center gap-2 rounded-t-[12px]">
                  <IoMdCheckmarkCircleOutline size={25} />
                  <h1 className="font-medium">Booking Summary</h1>
                </div>

                <div className="p-4 space-y-1 lg:space-y-2">
                  <div className="flex border-b lg:py-3 py-1 justify-between">
                    <div className="flex items-center gap-1">
                      <Calendar
                        size={30}
                        className="p-1 bg-gray-100 rounded-[5px] text-gray-800"
                      ></Calendar>
                      <span className="font-medium">Date:</span>
                    </div>
                    <span className="font-medium border bg-gray-100 px-3 rounded-[5px] text-gray-700">
                      {selectedDate || "Not selected"}
                    </span>
                  </div>

                  <div className="flex border-b lg:py-3 py-1 justify-between">
                    <div className="flex items-center gap-1">
                      <Clock1
                        size={30}
                        className="p-1 bg-gray-100 rounded-[5px] text-gray-800"
                      ></Clock1>
                      <span className="font-medium">Time:</span>
                    </div>

                    <span className="font-medium border bg-gray-100 px-3 rounded-[5px] text-gray-700">
                      {selectedTime || "Not selected"}
                    </span>
                  </div>

                  <div className="flex border-b lg:py-3 py-1 justify-between">
                    <div className="flex items-center gap-1">
                      <DollarSign
                        size={30}
                        className="p-1 bg-gray-100 rounded-[5px] text-gray-800"
                      ></DollarSign>
                      <span className="font-medium">Fee:</span>
                    </div>
                    <span className="font-medium">${lawyer?.fee ?? "—"}</span>
                  </div>

                  <div className="flex border-b lg:py-3 py-1 justify-between">
                    <div className="flex items-center gap-1">
                      {consultationType == "Online" ? (
                        <Video
                          size={30}
                          className="p-1 bg-gray-100 rounded-[5px] text-gray-800"
                        ></Video>
                      ) : (
                        <User
                          size={30}
                          className="p-1 bg-gray-100 rounded-[5px] text-gray-800"
                        ></User>
                      )}

                      <span className="font-medium">Consultation Type:</span>
                    </div>
                    <span className="font-medium border bg-gray-100 px-3 rounded-[5px] text-gray-700">
                      {consultationType || "Not selected"}
                    </span>
                  </div>

                  <div className="flex border-b lg:py-3 py-1 justify-between">
                    <div className="flex items-center gap-1">
                      <VscLaw
                        size={30}
                        className="p-1 bg-gray-100 rounded-[5px] text-gray-800"
                      ></VscLaw>
                      <span className="font-medium">Service Type:</span>
                    </div>

                    <span className="font-medium border bg-gray-100 px-3 rounded-[5px] text-gray-700">
                      {selectedLawArea || "Not selected"}
                    </span>
                  </div>

                  <StripeModal
                    bookingData={{
                      date: selectedDate,
                      time: selectedTime,
                      serviceType: consultationType,
                      serviceId,
                      serviceDescription: description,
                      lawyerId: lawyer?._id,
                      fee: lawyer?.fee,
                    }}
                    disabled={!isFormComplete}
                  />
                </div>
              </div>
            </div>
          </>
        )}
      </Container>
    </div>
  );
};

export default BookingPage;
