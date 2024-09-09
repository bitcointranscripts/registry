import * as React from "react";
import { SVGProps } from "react";

const EyeLidsIcon = ({ width = 24, height, ...props }: SVGProps<SVGSVGElement>) => (
  // height is destructed and unused, scaling is defined by width
  <svg
  width={width}
  viewBox="0 0 20 21"
  fill="none"
  xmlns="http://www.w3.org/2000/svg"
  {...props}
>
  <path
    d="M18.3346 7.16669C18.3346 7.16669 15.0013 12.1667 10.0013 12.1667C5.0013 12.1667 1.66797 7.16669 1.66797 7.16669"
    stroke="black"
    strokeWidth={1.5}
    strokeLinecap="round"
  />
  <path
    d="M12.5 11.75L13.75 13.8333"
    stroke="black"
    strokeWidth={1.5}
    strokeLinecap="round"
    strokeLinejoin="round"
  />
  <path
    d="M16.668 9.66669L18.3346 11.3334"
    stroke="black"
    strokeWidth={1.5}
    strokeLinecap="round"
    strokeLinejoin="round"
  />
  <path
    d="M1.66797 11.3334L3.33464 9.66669"
    stroke="black"
    strokeWidth={1.5}
    strokeLinecap="round"
    strokeLinejoin="round"
  />
  <path
    d="M7.5 11.75L6.25 13.8333"
    stroke="black"
    strokeWidth={1.5}
    strokeLinecap="round"
    strokeLinejoin="round"
  />
</svg>
);
export default EyeLidsIcon;