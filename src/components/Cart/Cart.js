import CartItem from "./CartItem";
import EmptyCart from "./EmptyCart";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
const Cart = () => {
  const products = useSelector((state) => state.cart);
  const totalProducts = products
    .map((product) => product.amount)
    .reduce((el, accu) => el + accu, 0);
  const totalPrice = products
    .map((product) => product.salePrice * product.amount)
    .reduce((el, accu) => el + accu, 0);
  return (
    <div className="my-28">
      <div className="container px-4 lg:px-8 mx-auto">
        {totalProducts === 0 ? (
          <EmptyCart />
        ) : (
          <div className="mt-6 flex flex-col lg:flex-row justify-center lg:justify-between">
            <div className="w-full lg:w-3/4 mr-6 flex flex-col">
              <div className="flex items-center text-xl font-medium ">
                <div className="flex w-full md:w-1/3 items-center ">
                  Sản phẩm
                </div>
                <div className="hidden w-2/3 md:flex justify-between items-center">
                  <ul className="w-4/5 flex flex-col md:flex-row ">
                    <li className="w-full md:w-1/3 mb-1 pl-4">Đơn giá</li>
                    <li className="w-full md:w-1/3 mb-1 pl-4">Số lượng</li>
                    <li className="w-full md:w-1/3 mb-1 pl-4">Thành tiền</li>
                  </ul>
                  <div className="w-1/5"></div>
                </div>
              </div>
              <ul>
                {products.map((product) => (
                  <CartItem key={product.id} product={product} />
                ))}
              </ul>
            </div>
            <div className="w-full lg:w-1/4 p-3 shadow-md">
              <div className="flex justify-between lg:flex-wrap xl:flex-nowrap text-base font-nomal">
                <div className="lg:w-full">Tổng sản phẩm</div>
                <div>{totalProducts}</div>
              </div>
              <div className="flex justify-between lg:flex-wrap xl:flex-nowrap text-base font-nomal">
                <div className="lg:w-full">Thành tiền</div>
                <div>
                  {new Intl.NumberFormat("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  }).format(totalPrice)}
                </div>
              </div>
              <div className="mt-5 flex flex-col">
                <Link
                  to="/checkout"
                  className="text-báe font-normal text-center  py-1  border border-spacing-2 border-black text-white bg-black hover:cursor-pointer hover:text-black hover:bg-white"
                >
                  ĐẶT HÀNG
                </Link>
                <Link
                  to="/products"
                  className="mt-3 text-báe font-normal text-center py-1  border border-spacing-2 border-black text-white bg-black hover:cursor-pointer hover:text-black hover:bg-white"
                >
                  TIẾP TỤC MUA SẮM
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
export default Cart;
