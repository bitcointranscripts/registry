import React from "react";
import { twMerge } from "tailwind-merge";

const SidebarSection = ({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <section
      className={twMerge(
        "py-4 2xl:py-6 border-b-[1px] border-b-gray-custom-400 last-of-type:border-none",
        className
      )}
    >
      {children}
    </section>
  );
};

export default SidebarSection;
