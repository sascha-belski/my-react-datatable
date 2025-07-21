// handles pagination controls.

import React from 'react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
  return (
    <nav aria-label="Page navigation">
      <ul className="pagination">
        <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
          <button
            className="page-link"
            onClick={() => onPageChange(currentPage - 1)}
            aria-label="Previous"
            disabled={currentPage === 1}
          >
            Previous
          </button>
        </li>

        {[...Array(totalPages)].map((_, i) => (
          <li key={i} className={`page-item ${currentPage === i + 1 ? 'active' : ''}`}>
            <button
              className="page-link"
              onClick={() => onPageChange(i + 1)}
              aria-current={currentPage === i + 1 ? 'page' : undefined}
            >
              {i + 1}
            </button>
          </li>
        ))}

        <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
          <button
            className="page-link"
            onClick={() => onPageChange(currentPage + 1)}
            aria-label="Next"
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
