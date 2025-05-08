import * as React from "react";
import { SVGProps } from "react";
const DottedLines = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width={1}
    height={1359}
    viewBox="0 0 1 1359"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <line x1={0.5} x2={0.5} y2={1359} stroke="black" strokeDasharray="8 8" />
  </svg>
);
export default DottedLines;
