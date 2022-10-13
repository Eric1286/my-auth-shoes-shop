import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const ProductQuantity = ({ quantity, onIncre, onDecre, onUpdate }) => {
  return (
    <div className=" flex items-center border border-spacing-2  border-black">
      <p
        onClick={() => {
          if (quantity < 2) {
            onUpdate(1);
            alert("Nhập ít nhất 1 sản phẩm");
          } else {
            onDecre();
          }
        }}
        className="grow border-r border-black leading-4 hover:cursor-pointer hover:text-white hover:bg-black"
      >
        <FontAwesomeIcon icon="fa-solid fa-minus" className="p-2.5 text-xs" />
      </p>
      <p className=" w-16 text-center">
        <input
          className="w-full outline-none text-center"
          type="text"
          value={quantity}
          onChange={(e) => onUpdate(+e.target.value)}
        />
      </p>
      <p
        onClick={() => onIncre()}
        className="grow border-l border-black text-center leading-4 hover:cursor-pointer hover:text-white hover:bg-black"
      >
        <FontAwesomeIcon icon="fa-solid fa-plus" className="p-2.5 text-xs" />
      </p>
    </div>
  );
};
export default ProductQuantity;
