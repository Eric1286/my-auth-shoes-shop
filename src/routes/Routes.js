import Home from "../pages/Home";
import Products from "../pages/Products";
import ProductDetail from "../components/ProductDetail";
import LoginForm from "../components/Form/Login/LoginForm";
import Cart from "../components/Cart/Cart";
import RegisterForm from "../components/Form/Register/RegisterForm";
import Contact from "../pages/Contact";
import Checkout from "../components/Checkout/Checkout";

const publicRoutes = [
  {
    path: "/",
    component: Home,
  },
  {
    path: "/home",
    component: Home,
  },
  {
    path: "/products",
    component: Products,
  },
  {
    path: "/products/:id",
    component: ProductDetail,
  },
  {
    path: "/login",
    component: LoginForm,
  },
  { path: "/cart", component: Cart },
  { path: "/register", component: RegisterForm },
  { path: "/contact", component: Contact },
  { path: "/checkout", component: Checkout },
];

export { publicRoutes };
