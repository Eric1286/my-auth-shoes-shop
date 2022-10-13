import productsApi from "../api/productsApi";
import ProductSlideLoading from "./ProductSlideLoading";
import ProductThumbnail from "./ProductThumbnail";
import Slider from "react-slick";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
const BestSale = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const sliderSettings = {
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: false,
    autoplaySpeed: 2000,
    arrows: true,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          arrows: false,
        },
      },
    ],
  };

  useEffect(() => {
    setIsLoading(true);
    const fetchProducts = async () => {
      const response = await productsApi.getAll();
      setProducts(response);
      setIsLoading(false);
    };
    fetchProducts();
  }, []);

  const saleProduct = products.filter((product) => {
    return product.promotionPercent >= 25;
  });

  return (
    <div className="mt-12">
      <div className="flex justify-between items-baseline">
        <p className="relative text-2xl font-bold pl-2 mb-4 bg-amber-300 section-title">
          Giảm giá sốc
        </p>
        <Link
          to="/products"
          className="text-sm font-medium hover:cursor-pointer hover:opacity-70 "
        >
          ...xem tất cả
        </Link>
      </div>
      <ul className=" sm:-mx-2 md:-mx-2 lg:-mx-2">
        {isLoading ? (
          <ProductSlideLoading />
        ) : (
          <Slider {...sliderSettings}>
            {saleProduct.map((product) => {
              return (
                <li key={product.id} className="sm:-mx-2 md:-mx-2 lg:-mx-2">
                  <ProductThumbnail product={product} />
                </li>
              );
            })}
          </Slider>
        )}
      </ul>
    </div>
  );
};
export default BestSale;
