import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import TextField from "../Form/FormFields/TextField";
import EmailField from "../Form/FormFields/EmailField";
import TextareaField from "../Form/FormFields/TextareaField";
import RadioField from "../Form/FormFields/RadioField";
import { useSelector } from "react-redux";
import CheckoutItem from "./CheckoutItem";
const Checkout = () => {
  const products = useSelector((state) => state.cart);
  const subTotal = products.reduce((total, product) => {
    return total + product.amount * product.salePrice;
  }, 0);
  const orderInfor = {
    shipping: 30000,
    discount: 0,
  };
  const total = subTotal + orderInfor.shipping - orderInfor.discount;
  const currencyFormat = (number) =>
    new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(number);

  const schema = yup.object().shape({
    name: yup.string().required("* Vui lòng nhập tên của bạn"),
    email: yup
      .string()
      .required("* Vui lòng nhập địa chỉ email")
      .email("*Vui lòng nhập địa chỉ email hợp lệ"),
    phone: yup
      .string()
      .required("Vui lòng nhập số điện thoại")
      .matches(
        "^[+\0]?[0-9]{3}[-s.]?[0-9]{3}[-s.]?[0-9]{4,6}$",
        "* Vui lòng nhập số điện thoại hợp lệ"
      ),
    address: yup.string().required("* Vui lòng nhập địa chỉ của bạn"),
    paymentMethod: yup
      .string()
      .required("* Vui lòng chọn một phương thức thanh toán"),
  });
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      address: "",
      paymentMethod: "",
    },
    mode: "onSubmit",
    resolver: yupResolver(schema),
  });
  const submitFormHandler = (data) => {
    console.log({ ...data, ...orderInfor, total });
  };
  return (
    <div className="my-28">
      <div className="container px-4 lg:px-8 mx-auto">
        <form onSubmit={handleSubmit(submitFormHandler)}>
          <div className="grid grid-cols-1 xl:grid-cols-3 xl:grid-flow-col grid-flow-row xl:grid-rows-3 gap-4">
            <div className="col-span-1 xl:row-span-2 border border-solid border-spacing-2 border-gray-400 shadow-sm">
              <div className="p-4">
                <p className="mb-6 text-base font-medium">
                  THÔNG TIN NGƯỜI DÙNG
                </p>
                <TextField control={control} name="name" error={errors.name} />
                <EmailField
                  control={control}
                  name="email"
                  error={errors.email}
                />
                <TextField
                  control={control}
                  name="phone"
                  error={errors.phone}
                />
                <TextareaField
                  control={control}
                  name="address"
                  error={errors.address}
                />
              </div>
            </div>
            <div className="col-span-1 xl:row-span-1 border border-solid border-spacing-2 border-gray-400 shadow-sm">
              <div className="p-4 space-y-2">
                <p className="mb-6 text-base font-medium">
                  HÌNH THỨC THANH TOÁN
                </p>
                <RadioField
                  control={control}
                  name="paymentMethod"
                  error={errors.paymentMethod}
                />
              </div>
            </div>
            <div className=" col-span-1 xl:row-span-3 xl:col-span-2 border border-solid border-spacing-2 border-gray-400 shadow-sm">
              <div className="p-4">
                <p className="mb-6 text-base font-medium">THÔNG TIN ĐƠN HÀNG</p>
                <div>
                  <div className="flex items-center text-base font-medium ">
                    <p className="flex w-full md:w-1/2 items-center ">
                      Sản phẩm
                    </p>
                    <ul className="w-1/2 hidden md:flex justify-between items-center">
                      <li className="w-full md:w-1/3 mb-1 pl-4">Đơn giá</li>
                      <li className="w-full md:w-1/3 mb-1 pl-4">Số lượng</li>
                      <li className="w-full md:w-1/3 mb-1 pl-4">Thành tiền</li>
                    </ul>
                  </div>
                  <ul>
                    {products.map((product) => (
                      <CheckoutItem key={product.id} product={product} />
                    ))}
                  </ul>
                </div>
                <div>
                  <div className="flex justify-between  text-base font-nomal">
                    <p className="lg:w-full">Tổng:</p>
                    <p> {currencyFormat(subTotal)}</p>
                  </div>
                  <div className="flex justify-between  text-base font-nomal">
                    <p className="lg:w-full">Ưu đãi:</p>
                    <p> {currencyFormat(orderInfor.discount)}</p>
                  </div>
                  <div className="flex justify-between  text-base font-nomal">
                    <p className="lg:w-full"> Phí ship:</p>
                    <p> {currencyFormat(orderInfor.shipping)}</p>
                  </div>
                  <div className="flex justify-between  text-base font-nomal">
                    <p className="lg:w-full"> Thành tiền:</p>
                    <p> {currencyFormat(total)}</p>
                  </div>
                  <button
                    type="submit"
                    className="w-full mt-3 text-sm font-normal text-center py-1  border border-spacing-2 border-black hover:cursor-pointer text-black bg-white hover:text-white hover:bg-black"
                  >
                    HOÀN TẤT ĐƠN HÀNG
                  </button>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
export default Checkout;
