import { Link } from "react-router-dom";
import ProductQuantity from "../ProductQuantity";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch } from "react-redux";
import { cartActions } from "../../lib/store";
const CartItem = ({ product }) => {
  const dispatch = useDispatch();
  const removeItemHandler = () => {
    if (window.confirm("Bạn muốn xoá sản phẩm?")) {
      dispatch(cartActions.removeItem(product.id));
    } else return;
  };
  return (
    <li className="mb-3 flex items-center text-base font-normal bg-slate-50">
      <div className="flex flex-col md:flex-row w-1/3 items-center">
        <img src={product.image} width={140} height={140} alt={product.title} />
        <p className="md:pl-4 w-full truncate">
          <Link to={`/products/${product.id}`}>
            Giày Vans Old Skool All Black
          </Link>
        </p>
      </div>
      <div className="w-2/3 flex justify-between items-center">
        <div className="w-4/5 flex flex-col md:flex-row">
          <p className="w-full md:w-1/3 mb-1 md:mb-0 pl-4 ">
            {new Intl.NumberFormat("vi-VN", {
              style: "currency",
              currency: "VND",
            }).format(product.salePrice)}
          </p>
          <div className="w-36 md:w-1/3 mb-1 md:mb-0 pl-4 text-center">
            <ProductQuantity
              quantity={product.amount}
              onIncre={() => dispatch(cartActions.addToCart(product))}
              onDecre={() =>
                dispatch(cartActions.decreaseItemsToCart(product.id))
              }
              onUpdate={() => console.log(product)}
            />
          </div>
          <p className="w-full md:w-1/3 mb-1 md:mb-0 pl-4 ">
            {new Intl.NumberFormat("vi-VN", {
              style: "currency",
              currency: "VND",
            }).format(product.salePrice * product.amount)}
          </p>
        </div>
        <div className="w-1/5 text-right lg:text-left">
          <FontAwesomeIcon
            onClick={removeItemHandler}
            icon="fa-solid fa-trash-can "
            className="p-2.5 text-xs hover:opacity-70 hover:cursor-pointer"
          />
        </div>
      </div>
    </li>
  );
};
export default CartItem;
