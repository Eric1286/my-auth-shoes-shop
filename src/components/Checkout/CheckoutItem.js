const CheckoutItem = ({ product }) => {
  const currencyFormat = (number) =>
    new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(number);

  return (
    <li className="mb-3 flex items-center text-sm font-nomal bg-slate-50">
      <div className="flex flex-col md:flex-row w-1/2 items-center ">
        <div>
          <img
            src={product.image}
            width={140}
            height={140}
            alt={product.title}
          />
        </div>
        <div className="pr-4 w-full truncate">
          <p>{product.title}</p>
        </div>
      </div>
      <div className="w-1/2 flex flex-col md:flex-row justify-between items-center">
        <p className="w-full md:w-1/3 mb-1 md:mb-0 pl-4 ">
          {currencyFormat(product.salePrice)}
        </p>
        <div className="w-full md:w-1/3 mb-1 md:mb-0 pl-4">
          <p className="w-8 flex items-center ">
            <span className="px-2 border border-spacing-2 border-black">
              {product.amount}
            </span>
          </p>
        </div>
        <p className="w-full md:w-1/3 mb-1 md:mb-0 pl-4 ">
          {currencyFormat(product.salePrice * product.amount)}
        </p>
      </div>
    </li>
  );
};
export default CheckoutItem;
