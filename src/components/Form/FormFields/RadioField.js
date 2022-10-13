import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useController } from "react-hook-form";

const RadioField = (props) => {
  const { field } = useController(props);
  const methods = [
    {
      id: 1,
      title: "Thanh toán thẻ (ATM, Visa , MasterCard)",
      icon: "fa-solid fa-credit-card",
    },
    {
      id: 2,
      title: "Thanh toán bằng ví ShopeePay",
      icon: "fa-solid fa-wallet",
    },
    {
      id: 3,
      title: "Thanh toán khi giao hàng (COD)",
      icon: "fa-solid fa-truck-moving",
    },
  ];
  return (
    <ul className="mt-2">
      {methods.map((method) => {
        return (
          <li key={method.id}>
            <input
              {...field}
              type="radio"
              name={props.name}
              value={method.title}
              id={method.id}
            />
            <label className="text-sm font-normal pl-2" htmlFor={method.id}>
              <FontAwesomeIcon icon={method.icon} className="text-2xs pr-1" />
              {method.title}
            </label>
          </li>
        );
      })}
      <p className="text-xs text-red-600 ">{props.error?.message}</p>
    </ul>
  );
};
export default RadioField;
