import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
const Footer = () => {
  const paymentMethod = [
    {
      id: 1,
      name: "momo",
      url: "https://tfruit.com.vn/wp-content/uploads/2020/03/logo-momo.png",
    },
    {
      id: 2,
      name: "visa",
      url:
        "https://banner2.cleanpng.com/20180802/qo/kisspng-logo-visa-electron-credit-card-debit-card-visa-logo-5b62aa9d820235.5321822515331928615325.jpg",
    },
    {
      id: 3,
      name: "mastercard",
      url: "https://pngimg.com/uploads/mastercard/mastercard_PNG23.png",
    },
    {
      id: 4,
      name: "vnpay",
      url:
        "https://play-lh.googleusercontent.com/DvCn_h3AdLNNDcv3ftqTqP83gw6h65GMEPg3x6u788wB3F3ENNFcHgrHcWJNOPy4epg",
    },
    {
      id: 5,
      name: "zalopay",
      url: "https://sharetmedia.com/wp-content/uploads/2021/08/unnamed-2.png",
    },
  ];

  const posts = [
    {
      id: 1,
      title: "Chính sách bảo mật",
      path: "#",
    },
    {
      id: 2,
      title: "Chính sách vận chuyển",
      path: "#",
    },
    {
      id: 3,
      title: "Chính sách đổi trả, bảo hành",
      path: "#",
    },
  ];
  return (
    <footer className="container mx-auto py-10 shadow-sm  px-4 lg:px-8">
      <div className="flex flex-col md:flex-row justify-between items-start mb-4">
        <div className="mb-8 md:w-1/3">
          <h6 className="text-base font-normal mb-2 md:mb-4">
            PHƯƠNG THỨC THANH TOÁN
          </h6>
          <ul className="flex flex-row ">
            {paymentMethod.map((method) => (
              <li key={method.id}>
                <img
                  src={method.url}
                  alt={method.name}
                  width={30}
                  height={30}
                ></img>
              </li>
            ))}
          </ul>
        </div>
        <div className="mb-8 md:w-1/3">
          <h6 className="text-base font-nomal mb-2 md:mb-4">CHÍNH SÁCH</h6>
          <ul>
            {posts.map((post) => (
              <li key={post.id}>
                <Link to={post.path}>{post.title}</Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="mb-8 md:w-1/3">
          <h6 className="text-base font-nomal mb-2 md:mb-4">CONTACT INFO</h6>
          <p>
            <FontAwesomeIcon icon="fa-solid fa-location-dot" /> 203 Fake St.
            Mountain View, California, USA
          </p>
          <p>
            <FontAwesomeIcon icon="fa-solid fa-phone" /> +2 392 3929 210
          </p>
          <p>
            <FontAwesomeIcon icon="fa-solid fa-envelope" /> email@domain.com
          </p>
        </div>
      </div>
      <p className=" text-sm text-center m-8">
        {" "}
        Copyright ©2022 All rights reserved | This template is made by me
      </p>
    </footer>
  );
};
export default Footer;
