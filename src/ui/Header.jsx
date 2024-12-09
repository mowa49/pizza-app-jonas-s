import { Link } from "react-router-dom";
import SearchOrder from "../features/order/SearchOrder";
import UserName from "../features/user/UserName";

function Header() {
  return (
    <div className="font-pizza flex flex-col items-center justify-between border-b border-stone-400 bg-yellow-500 px-5 py-5 uppercase sm:px-6 md:flex md:flex-row md:text-3xl">
      <Link to="/" className="upercase tracking-widest">
        FastPizza Del
      </Link>
      <SearchOrder />
      <UserName />
    </div>
  );
}

export default Header;
