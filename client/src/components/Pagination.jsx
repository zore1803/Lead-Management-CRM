import { ChevronLeft, ChevronRight } from "lucide-react";

export default function Pagination({ page, limit, total, onPageChange }) {
  const totalPages = Math.max(Math.ceil(total / limit), 1);

  return (
    <div className="pagination">
      <button className="icon-button" disabled={page === 1} onClick={() => onPageChange(page - 1)} title="Previous page">
        <ChevronLeft size={18} />
      </button>
      <span>
        Page {page} of {totalPages}
      </span>
      <button
        className="icon-button"
        disabled={page === totalPages}
        onClick={() => onPageChange(page + 1)}
        title="Next page"
      >
        <ChevronRight size={18} />
      </button>
    </div>
  );
}
