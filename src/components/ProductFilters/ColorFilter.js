import { useState, useEffect } from "react";
const ColorFilter = ({ filters, onChange }) => {
  const colorList = ["trắng", "đen", "đỏ", "hồng", "vàng", "xanh"];
  const [colors, setColors] = useState([]);
  const handleColorFilter = (newColor) => {
    setColors((prev) => {
      if (prev.includes(newColor)) {
        return prev.filter((el) => el.color !== newColor);
      } else {
        return [newColor, ...prev];
      }
    });
    console.log(colors);
  };
  useEffect(() => {
    onChange(colors);
  }, [colors]);

  useEffect(() => {
    setColors([]);
  }, [filters.active]);
  return (
    <div className="mb-8">
      <h6 className="text-xl font-medium mt-3">MÀU SẮC</h6>
      <ul>
        {colorList.map((color) => {
          return (
            <li key={color}>
              <label className="checkbox-container">
                <input
                  type="checkbox"
                  onChange={() => handleColorFilter(color)}
                  checked={colors.includes(color)}
                />
                <span className="checkmark"></span>
                {`Màu ${color}`}
              </label>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
export default ColorFilter;
