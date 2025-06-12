import { useSearch } from "@/app/search/useSearch";
import React from "react";

interface PaginationProps {
  onChange: (page: number) => void;
  totalPages: number;
  current: number;
}

const Pagination = () => {
  const { handlePageChange, pagingInfo } = useSearch();
  const { totalResults, current, resultsPerPage } = pagingInfo;
  if (!totalResults) {
    return null;
  }
  const totalPages = Math.ceil(totalResults / resultsPerPage);
  if (totalPages === 1) {
    return <></>;
  }

  return (
    <PaginationView
      onChange={handlePageChange}
      totalPages={totalPages}
      current={current}
    />
  );
};

export default Pagination;

const PaginationView = ({ onChange, totalPages, current }: PaginationProps) => {
  const isMobile =
    typeof window !== "undefined" &&
    window.matchMedia("(max-width: 600px)").matches;

  const getPageNumbers = () => {
    const delta = isMobile ? 1 : 2;
    const range = [];
    for (
      let i = Math.max(2, current - delta);
      i <= Math.min(totalPages - 1, current + delta);
      i++
    ) {
      range.push(i);
    }

    if (current + delta < totalPages - 1) {
      range.push("...");
    }

    range.unshift(1);
    if (totalPages !== 1) {
      range.push(totalPages);
    }

    return range;
  };

  return (
    <div className="flex items-center gap-2 text-sm md:text-base">
      {/* hide farthest left page controls on mobile */}
       {totalPages >2 &&  <button
        onClick={() => onChange(1)}
        disabled={current === 1}
        className="hidden md:block md:p-1 disabled:hidden"
        aria-label="First page"
      >
     <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="11 17 6 12 11 7"></polyline>
          <polyline points="18 17 13 12 18 7"></polyline>
        </svg>
      </button>}
      <button
        onClick={() => onChange(Math.max(1, current - 1))}
        disabled={current === 1}
        className="md:p-1 disabled:opacity-50"
        aria-label="Previous page"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="15 18 9 12 15 6"></polyline>
        </svg>
      </button>

      {getPageNumbers().map((pageNumber, index) => {
        if (typeof pageNumber !== "number") {
          return (
            <div
              key={index}
              className="w-auto flex items-center justify-center"
            >
              {pageNumber}
            </div>
          );
        }
        return (
          <button
            key={index}
            onClick={() =>
              typeof pageNumber === "number" && onChange(pageNumber)
            }
            className={`h-10 w-10 flex items-center justify-center rounded-md ${
              pageNumber === current
                ? "bg-orange-400 text-white"
                : "bg-white text-gray-700 hover:bg-gray-100"
            } ${typeof pageNumber !== "number" ? "cursor-default" : ""}`}
            disabled={typeof pageNumber !== "number"}
          >
            {pageNumber}
          </button>
        );
      })}

      <button
        onClick={() => onChange(Math.min(totalPages, current + 1))}
        disabled={current === totalPages || totalPages < 2}
        className="md:p-1 disabled:opacity-50"
        aria-label="Next page"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="9 18 15 12 9 6"></polyline>
        </svg>
      </button>

      {/* hide farthest right page controls on mobile */}
     {totalPages > 2 &&  <button
        onClick={() => onChange(totalPages)}
        disabled={current === totalPages}
        className="hidden md:block md:p-1 disabled:hidden"
        aria-label="Last page"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="13 17 18 12 13 7"></polyline>
          <polyline points="6 17 11 12 6 7"></polyline>
        </svg>
      </button>}
    </div>
  );
};
