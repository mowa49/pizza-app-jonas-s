import { useSelector } from "react-redux";
import { formatCurrency } from "../../utilities/helpers";
import DeleteItem from "./DeleteItem";
import { getCurrentQuantitybyId } from "./cartSlice";
import UpdateItemQuantity from "./UpdateItemQuantity";

/* eslint-disable react/prop-types   */
function CartItem({ item }) {
  const { pizzaId, name, quantity, totalPrice } = item;
  const currentQuantity = useSelector(getCurrentQuantitybyId(pizzaId));
  const isInCart = currentQuantity > 0;

  return (
    <li className="items-center py-3 sm:flex sm:justify-between">
      <p>
        {quantity}&times; {name}
      </p>
      <div className="flex items-center justify-between sm:gap-6">
        <>
          {isInCart && (
            <UpdateItemQuantity
              pizzaId={pizzaId}
              currentQuantity={currentQuantity}
            />
          )}
          <p>{formatCurrency(totalPrice)}</p>
          <DeleteItem pizzaId={pizzaId} />
        </>
      </div>
    </li>
  );
}

export default CartItem;
