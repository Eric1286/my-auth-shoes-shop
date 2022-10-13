import { useDispatch } from "react-redux";
import { signOutHandler } from "../../../lib/firebase";
import { UserAction } from "../../../lib/store";

const AccountInfo = () => {
  const dispatch = useDispatch();
  const handleClickLogoutBtn = () => {
    signOutHandler();
    dispatch(UserAction.logoutHandler());
  };
  return (
    <div>
      <ul>
        <li className="text-sm py-2 px-4 hover:border-l-2 hover:border-amber-300 hover:cursor-pointer hover:font-normal hover:border-l-1 shadow-sm">
          <a href="#">Tài khoản</a>
        </li>
        <li className="text-sm py-2 px-4 hover:border-l-2 hover:border-amber-300 hover:cursor-pointer hover:font-normal shadow-sm">
          <a href="#">Bộ sưu tập</a>
        </li>
        <li
          className="text-sm py-2 px-4 hover:border-l-2 hover:border-amber-300 hover:cursor-pointer hover:font-normal shadow-sm"
          onClick={handleClickLogoutBtn}
        >
          <span>Đăng xuất</span>
        </li>
      </ul>
    </div>
  );
};
export default AccountInfo;
