import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import productsApi from "../api/productsApi";
import ProductQuantity from "./ProductQuantity";
import ProductDetailLoading from "./ProductDetailLoading";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { cartActions } from "../lib/store";
import { useSnackbar } from "notistack";

const ProductDetail = () => {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [product, setProduct] = useState({});
  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    (async () => {
      try {
        setIsLoading(true);
        const data = await productsApi.get(`${id}`);
        setProduct(data);
        setIsLoading(false);
        console.log(data);
      } catch {
        console.log("error");
      }
    })();
  }, []);

  const handleIncreValue = () => {
    setQuantity((quant) => quant + 1);
  };
  const handleDecreValue = () => {
    setQuantity((quant) => quant - 1);
  };
  const handleUpdateVaule = (value) => {
    setQuantity(value);
  };
  const addToCartHandler = () => {
    dispatch(cartActions.increaseItemsToCartByAmount({ product, quantity }));
    enqueueSnackbar("Thêm thành công sản phẩm!", { variant: "success" });
  };
  return (
    <div className="my-16">
      <div className="container px-4 lg:px-8 mx-auto">
        {isLoading ? (
          <ProductDetailLoading />
        ) : (
          <div className="flex flex-col lg:flex-row justify-center lg:justify-between items-center">
            <div className="w-full lg:w-1/2 flex justify-center">
              <img
                className="block"
                src={product.image}
                alt={product.title}
                width={500}
                height={500}
              />
            </div>
            <div className="w-full lg:w-1/2">
              <h3 className="text-lg font-medium">{product.title}</h3>
              <p className="text-sm font-light mt-4">{product.description}</p>
              <p className="mt-4">
                <span className="text-base font-medium">
                  {new Intl.NumberFormat("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  }).format(product.salePrice)}
                </span>
                {product.promotionPercent === 0 ? null : (
                  <span className="text-sm mx-2 bg-yellow-200 line-through">
                    {new Intl.NumberFormat("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    }).format(product.originalPrice)}
                  </span>
                )}
              </p>
              <div className="mt-4 w-32">
                <ProductQuantity
                  quantity={quantity}
                  onIncre={handleIncreValue}
                  onDecre={handleDecreValue}
                  onUpdate={handleUpdateVaule}
                />
              </div>
              <div className="mt-5 flex">
                <button
                  onClick={addToCartHandler}
                  className="text-sm font-normal mr-2 px-4 py-1.5 inline-block border border-spacing-2 border-black text-white bg-black hover:cursor-pointer hover:text-black hover:bg-white"
                >
                  Thêm vào giỏ hàng
                </button>
                <Link
                  to="/cart"
                  className="text-sm font-normal px-4 py-1.5 inline-block border border-spacing-2 border-black hover:cursor-pointer hover:text-white hover:bg-black"
                >
                  Mua ngay
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
export default ProductDetail;
