import { Link, NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import SmallDeviceHeader from "./SmallDeviceHeader";
import { useSelector } from "react-redux";
import AccountInfo from "./AccountInfo";

const Header = () => {
  const products = useSelector((state) => state.cart);
  const userData = useSelector((state) => state.user);
  const { isLoggedin, current } = userData;
  const totalProducts = products
    .map((product) => product.amount)
    .reduce((el, accu) => el + accu, 0);
  const navLinkClass = (navData) => {
    return navData.isActive
      ? "leading-[5rem] text-base font-semibold pb-1 active"
      : "leading-[5rem] text-base font-semibold pb-1";
  };

  return (
    <header className="w-full h-16 lg:h-20 bg-white shadow-sm shadow-gray-200 fixed top-0 z-10">
      <div className=" hidden lg:px-8 lg:flex justify-between mx-auto">
        <div>
          <Link
            to="/"
            className="leading-[5rem] text-4xl text-amber-300 font-bold text-shadow-xl shadow-yellow-400"
          >
            MStore
          </Link>
        </div>
        <div className="flex-1 text-center space-x-6">
          <NavLink
            className="leading-[5rem] text-base font-semibold pb-1"
            to="/home"
          >
            TRANG CHỦ
          </NavLink>
          <NavLink
            to="/products"
            className="leading-[5rem] text-base font-semibold pb-1"
          >
            SẢN PHẨM
          </NavLink>
          <NavLink
            className="leading-[5rem] text-base font-semibold pb-1"
            to="/contact"
          >
            LIÊN HỆ
          </NavLink>
        </div>
        <div>
          {isLoggedin ? (
            <div className="inline py-8 text-base font-light leading-[5rem] m-2 group relative">
              <span className="font-medium">Hi {current.name}</span>
              <div className="absolute z-10 w-full right-0 left-0 bg-white invisible group-hover:visible shadow-md">
                <AccountInfo />
              </div>
            </div>
          ) : (
            <Link
              to="/login"
              className="text-base font-semibold leading-[5rem] m-2 hover:cursor-pointer"
            >
              <FontAwesomeIcon icon="fa-solid fa-user" />
            </Link>
          )}

          <Link to="/cart">
            <p className="relative inline">
              <FontAwesomeIcon
                icon="fa-solid fa-cart-plus"
                className="text-base leading-[5rem]"
              />
              <span className="absolute px-1 text-xs font-medium text-white bg-red-600 -top-3 -right-1.5 rounded-full">
                {totalProducts}
              </span>
            </p>
          </Link>
        </div>
      </div>
      <SmallDeviceHeader />
    </header>
  );
};
export default Header;
