import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { getTotalCartQuantity, getTotlalCartPrice } from "./cartSlice";
import { formatCurrency } from "../../utilities/helpers";
function CartOverview() {
  const totalCartPrice = useSelector(getTotlalCartPrice);
  const totalCartQuantity = useSelector(getTotalCartQuantity);
  if (!totalCartQuantity) return null;
  return (
    <div className="item-center flex justify-between bg-stone-900 p-4 px-4 py-4 text-sm uppercase text-stone-200 sm:px-6 md:text-base">
      <p className="md: space-x-4 font-semibold text-stone-300 sm:space-x-6">
        <span>{totalCartQuantity} pizzas</span>
        <span>{formatCurrency(totalCartPrice)}</span>
      </p>
      <Link to="/cart">Open cart &rarr;</Link>
    </div>
  );
}

export default CartOverview;
