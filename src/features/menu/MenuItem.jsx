import { useDispatch, useSelector } from "react-redux";
import Button from "../../ui/Button";
import { formatCurrency } from "../../utilities/helpers";
import { addItem, getCurrentQuantitybyId } from "../cart/cartSlice";
import DeleteItem from "../cart/DeleteItem";
import UpdateItemQuantity from "../cart/UpdateItemQuantity";

/* eslint-disable react/prop-types */
function MenuItem({ pizza }) {
  const dispatch = useDispatch();
  const { id, name, unitPrice, ingredients, soldOut, imageUrl } = pizza;
  const currentQuantity = useSelector(getCurrentQuantitybyId(id));
  const isInCart = currentQuantity > 0;
  function handleAddToCart() {
    const newItem = {
      pizzaId: id,
      name: name,
      quantity: 1,
      unitPrice: unitPrice,
      totalPrice: unitPrice,
    };
    // console.log(name);
    // console.log(quantity);
    dispatch(addItem(newItem));
  }
  return (
    <li className="flex gap-6 py-3">
      <img
        src={imageUrl}
        alt={name}
        className={`md:h-1' ${soldOut ? "opacity-45 grayscale" : null} `}
      />
      <div className="flex grow flex-col">
        <p className="font-semibold">{name}</p>
        <p className="capitalize">{ingredients.join(", ")}</p>
        <div className="mt-auto flex items-center justify-between">
          <div>
            {!soldOut ? (
              <p className="text-sm">{formatCurrency(unitPrice)}</p>
            ) : (
              <p className="text-sm text-stone-500">Sold out</p>
            )}
          </div>
          {isInCart && (
            <div className="flex items-center justify-between">
              <UpdateItemQuantity
                pizzaId={id}
                currentQuantity={currentQuantity}
              />
              <DeleteItem pizzaId={id} />
            </div>
          )}
          {!soldOut && !isInCart && (
            <Button type="small" className="h-2" onClick={handleAddToCart}>
              Add to cart
            </Button>
          )}
        </div>
      </div>
    </li>
  );
}

export default MenuItem;
