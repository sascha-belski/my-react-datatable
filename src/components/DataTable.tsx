// composes everything and manages sorting & pagination logic.

import React, { useState, useMemo } from 'react';

export interface DataRow {
  [key: string]: string | number;
}

interface DataTableProps {
  data: DataRow[];
  pageSize: number;
}

type SortKey = string | null;

type SortConfig = {
  key: SortKey;
  direction: 'asc' | 'desc';
};

const DataTable: React.FC<DataTableProps> = ({ data, pageSize }) => {
  const [sortConfig, setSortConfig] = useState<SortConfig>({ key: null, direction: 'asc' });
  const [currentPage, setCurrentPage] = useState(1);

  const columns = useMemo(() => (data.length > 0 ? Object.keys(data[0]) : []), [data]);

  const sortedData = useMemo(() => {
    if (!sortConfig.key) return data;

    return [...data].sort((a, b) => {
      const aValue = a[sortConfig.key!];
      const bValue = b[sortConfig.key!];

      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return sortConfig.direction === 'asc'
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      }
      if (typeof aValue === 'number' && typeof bValue === 'number') {
        return sortConfig.direction === 'asc' ? aValue - bValue : bValue - aValue;
      }
      return 0;
    });
  }, [data, sortConfig]);

  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize;
    return sortedData.slice(startIndex, startIndex + pageSize);
  }, [sortedData, currentPage, pageSize]);

  const totalPages = Math.ceil(data.length / pageSize);

  const requestSort = (key: SortKey) => {
    if (!key) return;

    let direction: 'asc' | 'desc' = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') direction = 'desc';
    setSortConfig({ key, direction });
    setCurrentPage(1); // reset to first page on sort
  };

  const onPageChange = (page: number) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  return (
    <>
      <table className="table table-striped table-hover">
        <thead>
          <tr>
            {columns.map((col) => {
              const isActive = sortConfig.key === col;
              const arrow = isActive ? (sortConfig.direction === 'asc' ? '▲' : '▼') : '';

              return (
                <th
                  key={col}
                  role="button"
                  onClick={() => requestSort(col)}
                  style={{ cursor: 'pointer' }}
                  scope="col"
                  aria-sort={
                    isActive
                      ? sortConfig.direction === 'asc'
                        ? 'ascending'
                        : 'descending'
                      : 'none'
                  }
                >
                  {col.charAt(0).toUpperCase() + col.slice(1)} {arrow}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {paginatedData.map((row, idx) => (
            <tr key={idx}>
              {columns.map((col) => (
                <td key={col}>{row[col]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

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
    </>
  );
};

export default DataTable;
