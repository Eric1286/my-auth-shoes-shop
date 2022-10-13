import { useSelector } from "react-redux";
import { NavLink, Link } from "react-router-dom";
import AccountInfo from "./AccountInfo";
const SideBar = ({ sideBar, onCloseSideBar }) => {
  const isLoggedin = useSelector((state) => state.user.isLoggedin);
  const current = useSelector((state) => state.user.current);
  return (
    <div className="flex">
      <div
        onClick={onCloseSideBar}
        className={`fixed z-20 inset-0  block transition-opacity bg-black opacity-50 ${
          sideBar ? "block" : "hidden"
        }`}
      ></div>
      <div
        className={`fixed z-30 inset-y-0 left-0  w-1/2 sm:w-1/3 overflow-y-auto transition duration-500 ease-out transform translate-x-0 bg-white border-r-2 ${
          sideBar ? "ease-out translate-x-0" : "ease-in -translate-x-full"
        }`}
      >
        <div className="flex items-center justify-center mt-8">
          <Link
            to="/"
            className="mb-2.5 text-xl font-semibold text-black"
            onClick={onCloseSideBar}
          >
            MStore
          </Link>
        </div>
        <div className="flex flex-col text-center">
          <NavLink
            to="/home"
            className="text-base font-medium m-1.5"
            onClick={onCloseSideBar}
          >
            Trang chủ
          </NavLink>
          <NavLink
            to="/products"
            className="text-base font-medium m-1.5"
            onClick={onCloseSideBar}
          >
            Sản phẩm
          </NavLink>
          <NavLink
            to="/contact"
            className="text-base font-medium m-1.5"
            onClick={onCloseSideBar}
          >
            Liên hệ
          </NavLink>
          {isLoggedin ? (
            <div className="inline text-base font-medium mt-8 group relative">
              <span className="font-medium">{current.name}</span>
              <AccountInfo />
            </div>
          ) : (
            <NavLink
              to="/login"
              className="text-base font-medium m-2 hover:cursor-pointer"
              onClick={onCloseSideBar}
            >
              Đăng nhâp
            </NavLink>
          )}
        </div>
      </div>
    </div>
  );
};
export default SideBar;
