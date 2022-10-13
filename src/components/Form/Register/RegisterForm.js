import { yupResolver } from "@hookform/resolvers/yup";
import TextField from "../FormFields/TextField";
import EmailField from "../FormFields/EmailField";
import PasswordField from "../FormFields/PasswordField";
import ConfirmPassword from "../FormFields/ConfirmPassword";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { Link } from "react-router-dom";
const RegisterForm = () => {
  const schema = yup
    .object()
    .shape({
      username: yup.string().required("* Vui lòng nhập tên tài khoản của bạn"),
      email: yup
        .string()
        .required("* Vui lòng nhập địa chỉ email")
        .email("Vui lòng điền địa chỉ email hợp lệ"),
      password: yup
        .string()
        .required("* Vui lòng nhập mật khẩu")
        .min(8, "Vui lòng nhập ít nhất 8 kí tự"),
      confirmPassword: yup
        .string()
        .required("* Vui lòng nhập mật khẩu xác nhận")
        .oneOf([yup.ref("password")], "Chưa trùng khớp với mật khẩu trên"),
    })
    .required();
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    mode: "onBlur",
    resolver: yupResolver(schema),
  });
  const submitFormHandler = (data) => console.log(data);
  return (
    <div className="mt-14 w-full">
      <div className="container px-4 lg:px-8 mx-auto flex items-center justify-center">
        <div className="max-w-xs w-full space-y-8 my-8 md:px-6 py-8 md:shadow-md md:shadow-gray-300">
          <div>
            <h2 className="text-center text-xl font-medium">
              Tạo tài khoản mới
            </h2>
          </div>
          <form
            className="mt-8 space-y-6"
            onSubmit={handleSubmit(submitFormHandler)}
          >
            <div>
              <TextField
                name="username"
                control={control}
                error={errors.username}
              />
              <EmailField name="email" control={control} error={errors.email} />
              <PasswordField
                name="password"
                control={control}
                error={errors.password}
              />
              <ConfirmPassword
                name="confirmPassword"
                control={control}
                error={errors.confirmPassword}
              />
            </div>
            <div className="flex items-center justify-between">
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-amber-300 hover:bg-amber-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-400"
              >
                Đăng kí
              </button>
            </div>
            <div className="flex items-center justify-between">
              <p className="text-sm">
                Bạn đã có tài khoản?
                <Link
                  to="/login"
                  className="font-normal ml-1 text-indigo-600 hover:text-indigo-500"
                >
                  Đăng nhập
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
export default RegisterForm;
