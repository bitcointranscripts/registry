import * as React from "react";
import { SVGProps } from "react";
const PencilIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width={25}
    height={25}
    viewBox="0 0 25 25"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M15.7141 6.48239L17.1158 5.08063C17.89 4.30646 19.1452 4.30646 19.9194 5.08063C20.6935 5.8548 20.6935 7.10998 19.9194 7.88415L18.5176 9.28591M15.7141 6.48239L7.48023 14.7163C6.43493 15.7616 5.91226 16.2842 5.55637 16.9211C5.20047 17.558 4.8424 19.0619 4.5 20.5C5.93809 20.1576 7.44199 19.7995 8.07889 19.4436C8.71579 19.0877 9.23844 18.5651 10.2838 17.5198L18.5176 9.28591M15.7141 6.48239L18.5176 9.28591"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M11.5 20.5H17.5"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
    />
  </svg>
);
export default PencilIcon;
