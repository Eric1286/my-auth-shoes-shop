import { useEffect, useState } from "react";
import categoryApi from "../../api/categoryApi";
const CategoryFilter = ({ filters, onChange }) => {
  const [category, setCategory] = useState([]);
  const [categoryIds, setCategoryIds] = useState([]);
  useEffect(() => {
    (async () => {
      try {
        const data = await categoryApi.getAll();
        setCategory(data);
      } catch {
        console.log("error");
      }
    })();
  }, []);

  const handleChangeCategory = (id) => {
    setCategoryIds((prev) => {
      if (categoryIds.includes(id)) {
        return prev.filter((el) => el !== id);
      } else {
        return [...prev, id];
      }
    });
  };

  useEffect(() => {
    onChange(categoryIds);
  }, [categoryIds]);

  useEffect(() => {
    setCategoryIds([]);
  }, [filters.active]);
  return (
    <div className="mb-8">
      <h6 className="text-xl font-medium">DANH MỤC</h6>
      <ul>
        {category.map((cat) => {
          return (
            <li key={cat.id}>
              <label className="checkbox-container">
                <input
                  type="checkbox"
                  onChange={() => handleChangeCategory(cat.id)}
                  checked={categoryIds.includes(cat.id)}
                />
                <span className="checkmark"></span>
                {cat.name}
              </label>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
export default CategoryFilter;
