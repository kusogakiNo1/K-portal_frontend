import { ChevronLeft, ChevronRight } from "lucide-react";

interface ChildProps {
  totalPages: number;
  currentPage: number;
  handlePageChange: (id: number) => void;
  getPageNumbers: () => (number | string)[];
}

export function Pagination({
  totalPages,
  currentPage,
  handlePageChange,
  getPageNumbers,
}: ChildProps) {
  return (
    <div className="flex justify-center items-center space-x-2 mt-12">
      {/* 前のページへ移動する"<" */}
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`p-2 rounded-lg transition-colors ${
          currentPage === 1
            ? "text-gray-400 cursor-not-allowed"
            : "text-gray-600 hover:bg-gray-100"
        }`}
        aria-label="前のページ"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>

      <div className="flex space-x-1">
        {getPageNumbers().map((pageNum, index) => (
          <div key={index}>
            {pageNum === "..." ? (
              <span className="px-4 py-2 text-gray-500">...</span>
            ) : (
              <button
                onClick={() => handlePageChange(pageNum as number)}
                className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors ${
                  pageNum === currentPage
                    ? "bg-[#213a37] text-white"
                    : "border border-gray-300 text-gray-600 hover:bg-green-50 bg-white"
                }`}
                aria-label={`ページ${pageNum}`}
                aria-current={pageNum === currentPage ? "page" : undefined}
              >
                {pageNum}
              </button>
            )}
          </div>
        ))}
      </div>

      {/* 次のページへ移動する">"*/}
      <button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`p-2 rounded-lg transition-colors ${
          currentPage === totalPages
            ? "text-gray-400 cursor-not-allowed"
            : "text-gray-600 hover:bg-gray-100"
        }`}
        aria-label="次のページ"
      >
        <ChevronRight className="w-5 h-5" />
      </button>
    </div>
  );
}
