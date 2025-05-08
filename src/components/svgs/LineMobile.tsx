import * as React from "react";
import { SVGProps } from "react";
const DottedLinesMobile = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width={1}
    height={800}
    viewBox="0 0 1 800"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <line x1={0.5} x2={0.5} y2={800} stroke="black" strokeDasharray="8 8" />
  </svg>
);
export default DottedLinesMobile;
