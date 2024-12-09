import { useDispatch } from "react-redux";
import Button from "../../ui/Button";
import { decreaseItemQuanttity, increaseItemQuantitiy } from "./cartSlice";
/* eslint-disable react/prop-types */
function UpdateItemQuantity({ pizzaId, currentQuantity }) {
  const dispatch = useDispatch();

  return (
    <div className="m-1 flex items-center gap-0.5 md:gap-1">
      <Button
        type="round"
        onClick={() => dispatch(decreaseItemQuanttity(pizzaId))}
      >
        -
      </Button>
      <span>{currentQuantity}</span>
      <Button
        type="round"
        onClick={() => dispatch(increaseItemQuantitiy(pizzaId))}
      >
        +
      </Button>
    </div>
  );
}

export default UpdateItemQuantity;
