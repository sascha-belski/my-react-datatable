import React from 'react';

interface PageSizeSelectorProps {
  pageSize: number;
  onPageSizeChange: (newSize: number) => void;
}

const PageSizeSelector: React.FC<PageSizeSelectorProps> = ({ pageSize, onPageSizeChange }) => {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onPageSizeChange(Number(e.target.value));
  };

  return (
    <div className="mb-3" style={{ maxWidth: '150px' }}>
      <label htmlFor="pageSizeSelect" className="form-label">
        Entries per page:
      </label>
      <select
        id="pageSizeSelect"
        className="form-select"
        value={pageSize}
        onChange={handleChange}
      >
        {[3, 5, 7, 10].map((size) => (
          <option key={size} value={size}>
            {size}
          </option>
        ))}
      </select>
    </div>
  );
};

export default PageSizeSelector;
