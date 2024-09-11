import React from "react";

export default function Wrapper({ className, ...props }: React.ComponentPropsWithoutRef<"div">) {
  return <div className={`px-[60px] max-xl:px-5 max-lg:px-4 ${className}`} {...props} />;
}
