import React from "react";

export interface PageState {
  skip: number;
  take: number;
  count: number;
}

interface PaginationProps {
  pageState: PageState;
  onPageChange: (newState: PageState) => void;
}

const Pagination: React.FC<PaginationProps> = ({ pageState, onPageChange }) => {
  const { skip, take, count } = pageState;

  const totalPages = Math.ceil(count / take);
  const currentPage = Math.ceil(skip / take) + 1;

  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === totalPages;

  const handlePageChange = (newSkip: number) => {
    onPageChange({
      ...pageState,
      skip: Math.max(0, Math.min(newSkip, count - take)),
    });
  };

  const handleFirstPage = () => handlePageChange(0);
  const handlePreviousPage = () => handlePageChange(skip - take);
  const handleNextPage = () => handlePageChange(skip + take);
  const handleLastPage = () => handlePageChange((totalPages - 1) * take);

  return (
    <div className="flex justify-center items-center w-[300px]">
      <div className="flex items-center justify-center space-x-2 py-4">
        <button
          className={`px-3 py-1 border rounded ${
            isFirstPage
              ? "cursor-not-allowed text-gray-400 disabled"
              : "hover:bg-gray-200"
          }`}
          onClick={handleFirstPage}
          disabled={isFirstPage}
        >
          &laquo;
        </button>
        <button
          className={`px-3 py-1 border rounded ${
            isFirstPage
              ? "cursor-not-allowed text-gray-400 disabled"
              : "hover:bg-gray-200"
          }`}
          onClick={handlePreviousPage}
          disabled={isFirstPage}
        >
          &lsaquo;
        </button>
        <span className="px-4">
          Page {currentPage} of {totalPages}
        </span>
        <button
          className={`px-3 py-1 border rounded ${
            isLastPage
              ? "cursor-not-allowed text-gray-400 disabled"
              : "hover:bg-gray-200"
          }`}
          onClick={handleNextPage}
          disabled={isLastPage}
        >
          &rsaquo;
        </button>
        <button
          className={`px-3 py-1 border rounded ${
            isLastPage
              ? "cursor-not-allowed text-gray-400 disabled"
              : "hover:bg-gray-200"
          }`}
          onClick={handleLastPage}
          disabled={isLastPage}
        >
          &raquo;
        </button>
      </div>
    </div>
  );
};

export default Pagination;
