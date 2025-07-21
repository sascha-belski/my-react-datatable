// handles the sortable column headers

import React from 'react';

interface SortableHeaderProps {
  label: string;
  sortKey: string;
  currentSortKey: string | null;
  direction: 'asc' | 'desc';
  onSort: (key: string) => void;
}

const SortableHeader: React.FC<SortableHeaderProps> = ({
  label,
  sortKey,
  currentSortKey,
  direction,
  onSort,
}) => {
  const isActive = currentSortKey === sortKey;
  const arrow = isActive ? (direction === 'asc' ? '▲' : '▼') : '';

  return (
    <th
      role="button"
      onClick={() => onSort(sortKey)}
      style={{ cursor: 'pointer' }}
      scope="col"
      aria-sort={isActive ? (direction === 'asc' ? 'ascending' : 'descending') : 'none'}
    >
      {label} {arrow}
    </th>
  );
};

export default SortableHeader;
