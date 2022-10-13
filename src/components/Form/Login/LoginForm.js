import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import EmailField from "../FormFields/EmailField";
import PasswordField from "../FormFields/PasswordField";
import "firebase/compat/auth";
import { GoogleButton } from "react-google-button";
import { signInWithGoogle } from "../../../lib/firebase";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";
import { useEffect } from "react";
library.add(fas);
const LoginForm = () => {
  const isLoggedin = useSelector((state) => state.user.isLoggedin);
  const navigate = useNavigate();
  useEffect(() => {
    if (isLoggedin) {
      navigate("/");
    }
  }, [isLoggedin]);
  const schema = yup
    .object()
    .shape({
      email: yup
        .string()
        .required("* Vui lòng nhập địa chỉ email")
        .email("Vui lòng điền địa chỉ email hợp lệ"),
      password: yup
        .string()
        .required("* Vui lòng nhập mật khẩu")
        .min(6, "*password cần tối thiểu 6 ký tự"),
    })
    .required();
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: { email: "", password: "" },
    mode: "onBlur",
    resolver: yupResolver(schema),
  });
  const submitFormHandler = (data) => console.log(data);

  return (
    <div className="mt-14 w-full ">
      <div className="container px-4 lg:px-8 mx-auto flex items-center justify-center ">
        <div className="max-w-xs w-full space-y-6 my-8 md:px-6 py-8 md:shadow-md md:shadow-gray-300">
          <div className="text-center text-xl font-medium">
            <FontAwesomeIcon icon="fa-solid fa-user" />
          </div>
          <form
            className="mt-8 space-y-4"
            onSubmit={handleSubmit(submitFormHandler)}
          >
            <EmailField control={control} name="email" error={errors.email} />
            <PasswordField
              control={control}
              name="password"
              error={errors.password}
            />
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <input
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                />
                <label
                  htmlFor="remember-me"
                  className="ml-2 block text-sm font-normal text-gray-900"
                >
                  Nhớ tài khoản
                </label>
              </div>
              <div>
                <a
                  href="#"
                  className="font-normal text-indigo-600 hover:text-indigo-500"
                >
                  Quên mật khẩu
                </a>
              </div>
            </div>
            <div>
              <button
                type="submit"
                className="group relative w-full  py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-amber-300 hover:bg-amber-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-400"
              >
                Đăng nhập
              </button>
            </div>
            <div className="text-sm">
              <p className="inline-block">Bạn chưa có tài khoản?</p>
              <Link
                to="/register"
                className="font-normal ml-1 text-indigo-600 hover:text-indigo-500"
              >
                Đăng ký
              </Link>
            </div>
            <div className="flex justify-center  ">
              <GoogleButton
                onClick={signInWithGoogle}
                className="text-[0.5rem]"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
