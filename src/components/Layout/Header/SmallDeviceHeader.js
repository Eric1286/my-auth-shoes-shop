import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { Fragment } from "react";
import SideBar from "./SideBar";
import { useState } from "react";
import { useSelector } from "react-redux";
import { set } from "react-hook-form";
const SmallDeviceHeader = () => {
  const products = useSelector((state) => state.cart);
  const [sideBarIsOpen, setSideBarIsOpen] = useState(false);
  const totalProducts = products
    .map((product) => product.amount)
    .reduce((el, accu) => el + accu, 0);
  return (
    <Fragment>
      <div className="container px-4  mx-auto">
        <div className="flex justify-between items-center lg:hidden">
          <div className="w-1/3 leading-[4rem] ">
            <FontAwesomeIcon
              icon="fa-solid fa-bars"
              className="text-base "
              onClick={() => setSideBarIsOpen(true)}
            />
          </div>
          <div className="w-1/3  leading-[4rem] text-center">
            <Link
              to="/"
              className="text-2xl text-amber-400 font-bold text-shadow-md shadow-yellow-200"
            >
              MStore
            </Link>
          </div>
          <div className="w-1/3 leading-[4rem] text-right">
            <Link to="/cart">
              <p className="relative inline">
                <FontAwesomeIcon
                  icon="fa-solid fa-cart-plus"
                  className="text-base "
                />
                <span className="absolute px-1 text-xs font-medium text-white bg-red-600 -top-3 -right-1.5 rounded-full">
                  {totalProducts}
                </span>
              </p>
            </Link>
          </div>
        </div>
      </div>
      <SideBar
        sideBar={sideBarIsOpen}
        onCloseSideBar={() => setSideBarIsOpen(false)}
      />
      )
    </Fragment>
  );
};
export default SmallDeviceHeader;
