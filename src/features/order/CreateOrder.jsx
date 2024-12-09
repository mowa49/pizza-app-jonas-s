// import { useState } from "react";

import { Form, redirect, useActionData, useNavigation } from "react-router-dom";
import { createOrder } from "../../services/apiRestaurant";
import Button from "../../ui/Button";
import { useDispatch, useSelector } from "react-redux";
import { clearCart, getCart, getTotlalCartPrice } from "../cart/cartSlice";
import EmptyCart from "../cart/EmptyCart";
import store from "../../store";
import { formatCurrency } from "../../utilities/helpers";
import { useState } from "react";
import { fetchAddress } from "../user/userSlice";

// https://uibakery.io/regex-library/phone-number
const isValidPhone = (str) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str,
  );

function CreateOrder() {
  const {
    username,
    status: addressStatus,
    position,
    address,
    error: errorAddress,
  } = useSelector((state) => state.user);
  const isLoadingAddress = addressStatus === "loading";
  const totalCartPrice = useSelector(getTotlalCartPrice);
  const navigation = useNavigation();
  console.log(navigation);
  const isSubmitting = navigation.state === "submitting";
  const [withPriority, setWithPriority] = useState(false);
  const priorityPrice = withPriority ? totalCartPrice * 0.2 : 0;
  const totalPrice = totalCartPrice + priorityPrice;
  const dispatch = useDispatch();

  console.log(errorAddress);
  const formErrors = useActionData();

  const cart = useSelector(getCart);
  if (!cart.length) return <EmptyCart />;

  return (
    <div className="mx-3">
      <h2 className="mx-1 my-3">Ready to order? Lets go!</h2>

      {/* <Form method="POST" action="/order/new">*/}
      <Form method="POST">
        <div className="flex flex-col justify-center gap-3 sm:flex-row sm:items-center">
          <label className="sm:w-40">First Name</label>
          <input
            className="input w-full"
            type="text"
            name="customer"
            defaultValue={username}
            required
          />
        </div>

        <div className="flex flex-col justify-center gap-3 sm:flex-row sm:items-center">
          <label className="sm:w-40">Phone number</label>
          <div className="flex w-full flex-col">
            <input type="tel" className="input" name="phone" required />
            {formErrors?.phone && (
              <p className="rounded-full bg-red-100 px-4 text-xs text-red-800">
                console.log(ss){formErrors.phone}
              </p>
            )}
          </div>
        </div>

        <div className="relative flex flex-col justify-center gap-3 sm:flex-row sm:items-center">
          <label className="sm:basis-40">Address</label>
          <input
            className="input"
            type="text"
            name="address"
            required
            defaultValue={address}
            disabled={isLoadingAddress}
          />

          {!position.latitude && !position.longitute && (
            <span className="<-5 absolute end-0 top-3 z-10">
              <Button
                type="small"
                disabled={isLoadingAddress}
                onClick={(e) => {
                  e.preventDefault();
                  dispatch(fetchAddress());
                }}
              >
                Get Position
              </Button>
            </span>
          )}
        </div>
        <div className="m-2 flex items-center gap-5">
          <input
            type="checkbox"
            name="priority"
            id="priority"
            value={withPriority}
            onChange={(e) => setWithPriority(e.target.checked)}
          />
          <label htmlFor="priority">Want to yo give your order priority?</label>
        </div>

        <div className="flex flex-col">
          <div>{totalCartPrice}</div>
          <input type="hidden" name="cart" value={JSON.stringify(cart)} />
          <input
            type="hidden"
            name="position "
            value={
              position.longitute && position.latitude
                ? `${position.latitude} ${position.longitute}`
                : ""
            }
          ></input>
          <Button type="primary" disabled={isSubmitting || isLoadingAddress}>
            {isSubmitting
              ? "Placing Order ..."
              : `Order now for ${formatCurrency(totalPrice)}`}
          </Button>
        </div>
      </Form>
    </div>
  );
}

export async function action({ request }) {
  //////////// get the data from the form
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  const order = {
    ...data,
    cart: JSON.parse(data.cart),
    priority: data.priority === "on",
  };
  // console.log(order);
  const errors = {};
  if (!isValidPhone(order.phone))
    errors.phone = "please give us your correct phone number. we might need";
  // console.log(newOrder);
  if (Object.keys(errors).length > 0) return errors;
  //////// is everything is ok create new order and redirect
  const newOrder = await createOrder(order);
  store.dispatch(clearCart());
  return redirect(`/order/${newOrder.id}`);
}

export default CreateOrder;
