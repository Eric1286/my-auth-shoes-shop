import CategoryFilter from "./CategoryFilter";
import ColorFilter from "./ColorFilter";
import SizeFilter from "./SizeFilter";

const ProductFilter = ({ filters, onChange }) => {
  const handleCategoryChange = (newCatIds) => {
    if (!onChange) return;
    const newFilters = {
      ...filters,
      categoryIds: newCatIds,
      active: true,
    };
    onChange(newFilters);
  };

  const handleSizeChange = (newSizes) => {
    const newFilters = {
      ...filters,
      size: newSizes,
      active: true,
    };
    onChange(newFilters);
  };
  const handleColorChange = (newColors) => {
    const newFilters = {
      ...filters,
      colors: newColors,
      active: true,
    };
    onChange(newFilters);
  };

  const handleRemoveFilters = () => {
    const newFiters = {
      categoryIds: [],
      size: [],
      colors: [],
      active: false,
    };
    onChange(newFiters);
  };
  return (
    <div>
      <CategoryFilter onChange={handleCategoryChange} filters={filters} />
      <SizeFilter onChange={handleSizeChange} filters={filters} />
      <ColorFilter onChange={handleColorChange} filters={filters} />
      <p
        className="text-sm font-medium mt-5 px-4 py-1.5 inline-block border border-solid border-gray-500 text-white bg-black hover:text-black hover:bg-white hover:cursor-pointer"
        onClick={handleRemoveFilters}
      >
        XÓA BỘ LỌC
      </p>
    </div>
  );
};
export default ProductFilter;
