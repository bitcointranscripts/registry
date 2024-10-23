import React from "react";

export default function Wrapper({ className, ...props }: React.ComponentPropsWithoutRef<"div">) {
  return <div className={`w-full max-w-[1920px] px-4 lg:px-10 2xl:px-[60px] mx-auto ${className}`} {...props} />;
}
