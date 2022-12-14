import { useEffect, useState } from "react";
import productsApi from "../api/productsApi";
import ProductFilter from "../components/ProductFilters/ProductFilter";
import ProductlistLoading from "../components/ProductListLoading";
import ProductThumbnail from "../components/ProductThumbnail";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Pagination from "@mui/material/Pagination";
const Products = () => {
  const [filters, setFilters] = useState({
    categoryIds: [],
    size: [],
    colors: [],
    active: false,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [order, setOrder] = useState("asc");
  const [filterProductList, setFilterProductList] = useState([]);
  const [totalPage, setTotalPage] = useState(6);
  const [isFilterBarOpen, setIsFilterBarOpen] = useState(false);
  useEffect(() => {
    (async () => {
      try {
        setIsLoading(true);
        const data = await productsApi.getAll({
          _page: page,
          _limit: 9,
          _sort: "originalPrice",
          _order: order,
          category: filters.categoryIds,
          color: filters.colors,
          size: filters.size,
        });
        setFilterProductList(data);
        setIsLoading(false);
      } catch {
        console.log("error");
      }
    })();
  }, [page, order, filters]);

  useEffect(() => {
    (async () => {
      try {
        const data = await productsApi.getAll({
          category: filters.categoryIds,
          color: filters.colors,
          size: filters.size,
        });
        const totalProduct = data.length;
        totalProduct
          ? setTotalPage(Math.ceil(totalProduct / 9))
          : setTotalPage(1);
      } catch {
        console.log("error");
      }
    })();
  }, [page, order, filters]);

  useEffect(() => {
    setPage(1);
  }, [filters]);

  const handleChangePage = (e, value) => {
    setPage(value);
  };
  const handleOrderChangeAsc = () => {
    setOrder("asc");
  };
  const handleOrderChangeDesc = () => {
    setOrder("desc");
  };
  const handleOpenFilterBar = () => {
    setIsFilterBarOpen(true);
  };
  const handleFilterChange = (newFilters) => {
    setFilters((prev) => {
      return { ...prev, ...newFilters };
    });
  };
  return (
    <div className="my-20 lg:my-28">
      <div className="container px-4 lg:px-8 mx-auto">
        <div className="mb-8">
          <h4 className="text-xl font-semibold mb-3">FOR YOU</h4>
          <p className="text-base font-light">
            T???t c??? nh???ng s???n ph???m M???i nh???t n???m trong BST ???????c m??? b??n H??ng Tu???n
            s??? ???????c c???p nh???t li??n t???c t???i ????y. Ch???c ch???n b???n s??? t??m th???y nh???ng
            s???n ph???m ?????p Nh???t - V???a V???n Nh???t - Ph?? H???p nh???t v???i phong c??ch c???a
            m??nh.
          </p>
        </div>
        <div
          className="fixed bottom-4 right-4 z-30 text-sm font-medium px-4 py-1 mb-4 inline-block border border-solid border-gray-500  text-white bg-black hover:text-black hover:bg-white hover:cursor-pointer lg:hidden animate-pulse"
          onClick={handleOpenFilterBar}
        >
          B??? L???C
        </div>

        <div className="flex justify-between">
          <div className="h-full w-1/4 hidden lg:flex flex-col">
            <ProductFilter filters={filters} onChange={handleFilterChange} />
          </div>
          <div
            className={`lg:hidden fixed inset-y-0 left-0 z-40 h-full px-4 py-7 overflow-y-auto transition duration-300 ease-out transform translate-x-0 bg-white border-r-2 ${
              isFilterBarOpen
                ? "ease-out translate-x-0"
                : "ease-in -translate-x-full"
            }`}
          >
            <div className="mb-2 flex justify-end">
              <FontAwesomeIcon
                icon="fa-solid fa-arrow-left"
                className="opacity-70 hover:opacity-100 hover:cursor-pointer"
                onClick={() => setIsFilterBarOpen(false)}
              />
            </div>
            <ProductFilter filters={filters} onChange={handleFilterChange} />
          </div>
          <div className="w-full lg:w-3/4">
            <div className="flex  justify-center md:justify-end">
              {filterProductList.length ? (
                <div className="flex border border-solid border-gray-500  ">
                  <p
                    className={
                      order === "asc"
                        ? "text-sm font-medium px-4 py-1 hover:cursor-pointer text-white bg-black "
                        : "text-sm font-medium px-4 py-1 hover:cursor-pointer hover:text-white hover:bg-black "
                    }
                    onClick={handleOrderChangeAsc}
                  >
                    Gi?? t??ng d???n
                  </p>
                  <p
                    className={
                      order === "desc"
                        ? "text-sm font-medium px-4 py-1 hover:cursor-pointer text-white bg-black"
                        : "text-sm font-medium px-4 py-1 hover:cursor-pointer hover:text-white hover:bg-black"
                    }
                    onClick={handleOrderChangeDesc}
                  >
                    Gi?? gi???m d???n
                  </p>
                </div>
              ) : null}
            </div>
            <ul className="flex flex-wrap my-8 sm:-mx-2 md:-mx-2 lg:-mx-2.5">
              {isLoading ? (
                <ProductlistLoading />
              ) : (
                filterProductList.map((product) => {
                  return (
                    <li
                      key={product.id}
                      className="sm:px-2 md:px-2 lg:px-2 mb-2 w-full sm:w-1/2 md:w-1/2 lg:w-1/3"
                    >
                      <ProductThumbnail product={product} />
                    </li>
                  );
                })
              )}
            </ul>
            <div className="flex justify-center">
              {isLoading === false && !filterProductList.length && (
                <p>Kh??ng t??m ???????c s???n ph???m ph?? h???p</p>
              )}
            </div>
            <div className="flex justify-center">
              {filterProductList.length ? (
                <Pagination
                  count={totalPage}
                  page={page}
                  onChange={handleChangePage}
                />
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Products;
