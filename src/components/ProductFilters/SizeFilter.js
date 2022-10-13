import { useEffect, useState } from "react";
const SizeFilter = ({ filters, onChange }) => {
  const sizeList = [36, 37, 38, 39];
  const [sizes, setSizes] = useState([]);
  const handleSizeChange = (newSize) => {
    setSizes((prev) => {
      if (prev.includes(newSize)) {
        return prev.filter((el) => el !== newSize);
      } else {
        return [newSize, ...prev];
      }
    });
  };

  useEffect(() => {
    onChange(sizes);
  }, [sizes]);

  useEffect(() => {
    setSizes([]);
  }, [filters.active]);
  return (
    <div className="mb-8">
      <h6 className="text-xl font-medium mt-3">KÍCH CỠ</h6>
      <ul>
        {sizeList.map((size) => {
          return (
            <li key={size}>
              <label className="checkbox-container">
                <input
                  type="checkbox"
                  onChange={() => handleSizeChange(size)}
                  checked={sizes.includes(size)}
                />
                <span className="checkmark"></span>
                {size}
              </label>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
export default SizeFilter;
