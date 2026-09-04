// "use client";
// import { TRoles } from "@/types/common";
// import { sidebarItems } from "@/utils/generateSidebarItems";
// import { JWTDecode } from "@/utils/jwt";

// import Link from "next/link";
// import { usePathname } from "next/navigation";

// const Sidebar = () => {
//   const pathName = usePathname();

//   const { decoded } = JWTDecode();

//   return (
//     <div className="min-h-[85vh] rounded-[8px] pt-3 bg-white">
//       {sidebarItems(decoded?.role as TRoles).map((item, index) => (
//         <Link key={index} href={`/${item.path}`}>
//           <div
//             className={`${
//               pathName === `/${item.path}`
//                 ? "bg-primary bg-opacity-15 text-secondary border-r-4 border-secondary"
//                 : ""
//             } hover:bg-primary my-1 hover:text-secondary hover:bg-opacity-15 p-3 mx-3 rounded-[4px] font-medium flex items-center`}
//           >
//             {item.icon && <p className="mr-2 text-xl">{<item.icon />}</p>}
//             <h1>{item.title}</h1>
//           </div>
//         </Link>
//       ))}
//     </div>
//   );
// };

// export default Sidebar;
"use client";

import { useState } from "react";
import { TRoles } from "@/types/common";
import { sidebarItems } from "@/utils/generateSidebarItems";
import { JWTDecode } from "@/utils/jwt";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";

const Sidebar = () => {
  const pathname = usePathname();
  const { decoded } = JWTDecode();
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setOpen(true)}
        className="lg:hidden fixed top-24 left-4 z-50 p-2 bg-white rounded shadow"
      >
        <Menu />
      </button>

      {/* Backdrop (mobile only) */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 bg-black/40 z-40 lg:hidden"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed lg:static top-0 left-0 z-50
          h-full lg:h-auto
          w-full
          bg-white
          transform transition-transform duration-300 ease-in-out
          ${open ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0
          lg:block
          rounded-none lg:rounded-[8px]
          pt-3
        `}
      >
        {/* Close button (mobile only) */}
        <div className="flex justify-end px-4 lg:hidden">
          <button onClick={() => setOpen(false)}>
            <X />
          </button>
        </div>

        <div className="min-h-[85vh]">
          {sidebarItems(decoded?.role as TRoles).map((item, index) => (
            <Link
              key={index}
              href={`/${item.path}`}
              onClick={() => setOpen(false)}
            >
              <div
                className={`
                  mx-3 my-1 p-3 rounded-[4px]
                  font-medium flex items-center
                  hover:bg-primary/15 hover:text-secondary
                  ${
                    pathname === `/${item.path}`
                      ? "bg-primary/15 text-secondary border-r-4 border-secondary"
                      : ""
                  }
                `}
              >
                {item.icon && (
                  <span className="mr-2 text-xl">
                    <item.icon />
                  </span>
                )}
                <span>{item.title}</span>
              </div>
            </Link>
          ))}
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
