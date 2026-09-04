// "use client";

// import { useServicesQuery } from "@/redux/features/services/services.api";

// type FiltersProps = {
//   selectedService: string | null;
//   setSelectedService: (val: string | null) => void;
//   selectedLegalService: string | null;
//   setSelectedLegalService: (val: string | null) => void;
//   selectedUrgency: string | null;
//   setSelectedUrgency: (val: string | null) => void;
// };

// const PostFilters = ({
//   selectedService,
//   setSelectedService,
//   selectedLegalService,
//   setSelectedLegalService,
//   selectedUrgency,
//   setSelectedUrgency,
// }: FiltersProps) => {
//   const { data: legalServices } = useServicesQuery("");

//   const serviceOptions = [
//     { label: "Online", value: "Online" },
//     { label: "In Person", value: "In_Person" },
//   ];

//   const urgencyOptions = [
//     { label: "Low", value: "Low" },
//     { label: "Medium", value: "Medium" },
//     { label: "High", value: "High" },
//   ];

//   const legalServiceOptions =
//     legalServices?.data?.map((service: any) => ({
//       label: service.serviceName,
//       value: service._id,
//     })) || [];

//   const renderCheckboxGroup = (
//     title: string,
//     options: { label: string; value: string }[],
//     selected: string | null,
//     setSelected: (val: string | null) => void
//   ) => (
//     <div className="pb-4 mb-4 border-b border-gray-300">
//       <h3 className="font-semibold mb-2">{title}</h3>
//       {options.map((option, index) => (
//         <label
//           key={index}
//           className="flex items-center space-x-2 cursor-pointer mb-1"
//         >
//           <input
//             type="checkbox"
//             checked={selected === option.value}
//             onChange={() =>
//               setSelected(selected === option.value ? null : option.value)
//             }
//               className="accent-orange-600 w-4 h-4"
//           />
//           <span className="text-gray-600">{option.label}</span>
//         </label>
//       ))}
//     </div>
//   );

//   return (
//     <div className="p-4 max-w-md bg-white rounded-[6px] shadow">
//         <h1 className="text-2xl font-medium pb-4">Filters</h1>
//       {renderCheckboxGroup("Service Type", serviceOptions, selectedService, setSelectedService)}

//       {renderCheckboxGroup("Urgency", urgencyOptions, selectedUrgency, setSelectedUrgency)}

//       {renderCheckboxGroup("Legal Services", legalServiceOptions, selectedLegalService, setSelectedLegalService)}
//     </div>
//   );
// };

// export default PostFilters;
"use client";

import { useState } from "react";
import { useServicesQuery } from "@/redux/features/services/services.api";

type FiltersProps = {
  selectedService: string | null;
  setSelectedService: (val: string | null) => void;
  selectedLegalService: string | null;
  setSelectedLegalService: (val: string | null) => void;
  selectedUrgency: string | null;
  setSelectedUrgency: (val: string | null) => void;
};

const PostFilters = ({
  selectedService,
  setSelectedService,
  selectedLegalService,
  setSelectedLegalService,
  selectedUrgency,
  setSelectedUrgency,
}: FiltersProps) => {
  const { data: legalServices } = useServicesQuery("");
  const [showAllServices, setShowAllServices] = useState(false);

  const serviceOptions = [
    {
      label: "Online",
      value: "Online",
      icon: (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
          <path
            d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2z"
            stroke="currentColor"
            strokeWidth="2"
          />
          <path
            d="M2 12h20M12 2c2.5 2.7 4 6.2 4 10s-1.5 7.3-4 10c-2.5-2.7-4-6.2-4-10s1.5-7.3 4-10z"
            stroke="currentColor"
            strokeWidth="2"
          />
        </svg>
      ),
    },
    {
      label: "In Person",
      value: "In_Person",
      icon: (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
          <path
            d="M12 21s-7-6.2-7-11.2A7 7 0 0112 3a7 7 0 017 6.8C19 14.8 12 21 12 21z"
            stroke="currentColor"
            strokeWidth="2"
          />
          <circle cx="12" cy="9.8" r="2.4" stroke="currentColor" strokeWidth="2" />
        </svg>
      ),
    },
  ];

  const urgencyOptions = [
    { label: "Low", value: "Low", dot: "#3F8F5F" },
    { label: "Medium", value: "Medium", dot: "#C99A3B" },
    { label: "High", value: "High", dot: "#C24B3F" },
  ];

  const legalServiceOptions =
    legalServices?.data?.map((service: any) => ({
      label: service.serviceName,
      value: service._id,
    })) || [];

  const visibleLegalServices = showAllServices
    ? legalServiceOptions
    : legalServiceOptions.slice(0, 5);

  const hiddenCount = legalServiceOptions.length - visibleLegalServices.length;

  const appliedTags = [
    selectedService && {
      key: "service",
      label: serviceOptions.find((s) => s.value === selectedService)?.label,
      clear: () => setSelectedService(null),
    },
    selectedUrgency && {
      key: "urgency",
      label: `${selectedUrgency} urgency`,
      clear: () => setSelectedUrgency(null),
    },
    selectedLegalService && {
      key: "legal",
      label: legalServiceOptions.find(
        (s: any) => s.value === selectedLegalService
      )?.label,
      clear: () => setSelectedLegalService(null),
    },
  ].filter(Boolean) as { key: string; label: string; clear: () => void }[];

  

  return (
    <div className="max-w-sm bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
      {/* Header */}
      <div className="flex items-baseline justify-between px-5 py-4 border-b border-gray-200">
        <h2 className="font-serif text-lg font-bold text-gray-900">Filters</h2>     
      </div>

      {/* Service Type */}
      <div className="px-5 py-4 border-b border-gray-200">
        <div className="flex items-center gap-2 mb-3">
          <h3 className="text-[11px] font-bold uppercase tracking-wider text-gray-500">
            Service Type
          </h3>
          <span className="flex-1 h-px bg-gray-200" />
        </div>
        <div className="flex gap-2">
          {serviceOptions.map((option) => {
            const active = selectedService === option.value;
            return (
              <button
                key={option.value}
                type="button"
                onClick={() =>
                  setSelectedService(active ? null : option.value)
                }
                className={`flex-1 rounded-[9px] border px-1.5 py-3 text-center transition-colors ${
                  active
                    ? "border-amber-700 bg-amber-50"
                    : "border-gray-200 hover:border-gray-300"
                }`}
              >
                <span
                  className={`mx-auto mb-1.5 flex h-6.5 w-6.5 items-center justify-center rounded-full ${
                    active ? "bg-white text-amber-700" : "bg-sky-50 text-[#1E3A52]"
                  }`}
                >
                  {option.icon}
                </span>
                <span className="text-[11px] font-semibold text-gray-900">
                  {option.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Urgency */}
      <div className="px-5 py-4 border-b border-gray-200">
        <div className="flex items-center gap-2 mb-3">
          <h3 className="text-[11px] font-bold uppercase tracking-wider text-gray-500">
            Urgency
          </h3>
          <span className="flex-1 h-px bg-gray-200" />
        </div>
        <div className="flex gap-1.5">
          {urgencyOptions.map((option) => {
            const active = selectedUrgency === option.value;
            return (
              <button
                key={option.value}
                type="button"
                onClick={() =>
                  setSelectedUrgency(active ? null : option.value)
                }
                className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-[9px] border text-xs font-semibold transition-colors ${
                  active
                    ? "bg-[#1E3A52] border-[#1E3A52] text-white"
                    : "border-gray-200 text-gray-600 hover:border-gray-300"
                }`}
              >
                <span
                  className="h-1.5 w-1.5 rounded-full"
                  style={{ backgroundColor: active ? "#fff" : option.dot }}
                />
                {option.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Legal Services */}
      <div className="px-5 py-4 border-b border-gray-200">
        <div className="flex items-center gap-2 mb-3">
          <h3 className="text-[11px] font-bold uppercase tracking-wider text-gray-500">
            Legal Services
          </h3>
          <span className="flex-1 h-px bg-gray-200" />
        </div>
        <div className="flex flex-col gap-0.5">
          {visibleLegalServices.map((option: any) => {
            const active = selectedLegalService === option.value;
            return (
              <label
                key={option.value}
                className="flex items-center justify-between py-2 px-1 rounded-md cursor-pointer hover:bg-gray-50"
              >
                <span className="flex items-center gap-2.5">
                  <input
                    type="checkbox"
                    checked={active}
                    onChange={() =>
                      setSelectedLegalService(active ? null : option.value)
                    }
                    className="h-[17px] w-[17px] rounded-[5px] accent-[#1E3A52]"
                  />
                  <span className="text-sm font-medium text-gray-900">
                    {option.label}
                  </span>
                </span>
              </label>
            );
          })}
        </div>
        {hiddenCount > 0 && (
          <button
            type="button"
            onClick={() => setShowAllServices(!showAllServices)}
            className="mt-2 flex items-center gap-1 text-xs font-bold text-amber-700"
          >
            {showAllServices ? "Show less" : `Show ${hiddenCount} more`}
            <svg
              width="10"
              height="10"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              className={`transition-transform ${
                showAllServices ? "rotate-180" : ""
              }`}
            >
              <path d="M6 9l6 6 6-6" />
            </svg>
          </button>
        )}
      </div>

      {/* Applied tags */}
      {appliedTags.length > 0 && (
        <div className="px-5 py-4">
          <div className="flex flex-wrap gap-1.5">
            {appliedTags.map((tag) => (
              <span
                key={tag.key}
                className="flex items-center gap-1.5 rounded-full bg-sky-50 px-3 py-1 text-[11.5px] font-semibold text-[#1E3A52]"
              >
                {tag.label}
                <button
                  type="button"
                  onClick={tag.clear}
                  className="opacity-60 hover:opacity-100"
                >
                  &times;
                </button>
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default PostFilters;
