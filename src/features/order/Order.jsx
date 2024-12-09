// import { useFetcher, useLoaderData } from "react-router-dom";
// import { getOrder } from "../../services/apiRestaurant";
// import {
//   calcMinutesLeft,
//   formatCurrency,
//   formatDate,
// } from "../../utilities/helpers";
// import { useEffect } from "react";
// import OrderItem from "./OrderItem";
// import OrderUpdate from "./OrderUpdate";

// function Order() {
//   const order = useLoaderData();
//   const fetcher = useFetcher();

//   useEffect(() => {
//     console.log(fetcher.state);
//     // Only load if fetcher is idle and there's no data yet
//     if (!fetcher.data && fetcher.state === "idle") {
//       fetcher.load("/menu");
//     }
//   }, [fetcher]);

//   // Log the order to verify its structure
//   console.log("Order:", order);

//   // Destructure the order object to access its properties
//   const {
//     id,
//     status,
//     priority,
//     priorityPrice,
//     orderPrice,
//     estimatedDelivery,
//     cart,
//   } = order;

//   const deliveryIn = calcMinutesLeft(estimatedDelivery);

//   return (
//     <div className="space-y-8 px-4 py-6">
//       <div className="flex flex-wrap items-center justify-between gap-2">
//         <h2 className="text-xl font-semibold">Order #{id} status</h2>

//         <div className="space-x-2">
//           {priority && (
//             <span className="rounded-full bg-red-500 px-3 py-1 text-sm font-semibold uppercase tracking-wide text-red-50">
//               Priority
//             </span>
//           )}
//           <span className="rounded-full bg-green-500 px-3 py-1 text-sm font-semibold uppercase tracking-wide text-green-50">
//             {status} order
//           </span>
//         </div>
//       </div>

//       <div className="flex flex-wrap items-center justify-between gap-2 bg-stone-200 px-6 py-5">
//         <p className="font-medium">
//           {deliveryIn >= 0
//             ? `Only ${deliveryIn} minutes left 😃`
//             : "Order should have arrived"}
//         </p>
//         <p className="text-xs text-stone-500">
//           (Estimated delivery: {formatDate(estimatedDelivery)})
//         </p>
//       </div>

//       <ul className="divide-y divide-stone-200 border-b border-t">
//         {cart.map((item) => {
//           // Log each item to verify its structure
//           console.log("Cart item:", item);

//           return (
//             <OrderItem
//               item={item}
//               key={item.name} // Ensure each key is unique
//               isLoadingIngredients={fetcher.state === "loading"}
//               ingredients={
//                 fetcher.data?.find((el) => el.id === item.pizzaId)
//                   ?.ingredients || []
//               }
//             />
//           );
//         })}
//       </ul>

//       <div className="space-y-2 bg-stone-200 px-6 py-5">
//         <p className="text-sm font-medium text-stone-600">
//           Price pizza: {formatCurrency(orderPrice)}
//         </p>
//         {priority && (
//           <p className="text-sm font-medium text-stone-600">
//             Price priority: {formatCurrency(priorityPrice)}
//           </p>
//         )}
//         <p className="font-bold">
//           To pay on delivery: {formatCurrency(orderPrice + priorityPrice)}
//         </p>
//       </div>

//       {!priority && <OrderUpdate order={order} />}
//     </div>
//   );
// }

// export async function loader({ params }) {
//   const order = await getOrder(params.orderId);
//   return order;
// }

// export default Order;
import { useFetcher, useLoaderData } from "react-router-dom";
import { getOrder } from "../../services/apiRestaurant";
import {
  calcMinutesLeft,
  formatCurrency,
  formatDate,
} from "../../utilities/helpers";
import { useEffect } from "react";
import OrderItem from "./OrderItem";
import OrderUpdate from "./OrderUpdate";

function Order() {
  const order = useLoaderData();
  const fetcher = useFetcher();

  useEffect(() => {
    console.log(fetcher.state);
    // Only load if fetcher is idle and there's no data yet
    if (!fetcher.data && fetcher.state === "idle") {
      fetcher.load("/menu");
    }
  }, [fetcher]);

  // Ensure order is properly loaded before destructuring
  if (!order) {
    return <div>Loading...</div>; // Optional: add a loading state
  }

  // Destructure order properties
  const {
    id,
    status,
    priority,
    priorityPrice,
    orderPrice,
    estimatedDelivery,
    cart,
  } = order;
  const deliveryIn = calcMinutesLeft(estimatedDelivery);

  return (
    <div className="space-y-8 px-4 py-6">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h2 className="text-xl font-semibold">Order #{id} status</h2>

        <div className="space-x-2">
          {priority && (
            <span className="rounded-full bg-red-500 px-3 py-1 text-sm font-semibold uppercase tracking-wide text-red-50">
              Priority
            </span>
          )}
          <span className="rounded-full bg-green-500 px-3 py-1 text-sm font-semibold uppercase tracking-wide text-green-50">
            {status} order
          </span>
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-2 bg-stone-200 px-6 py-5">
        <p className="font-medium">
          {deliveryIn >= 0
            ? `Only ${deliveryIn} minutes left 😃`
            : "Order should have arrived"}
        </p>
        <p className="text-xs text-stone-500">
          (Estimated delivery: {formatDate(estimatedDelivery)})
        </p>
      </div>

      <ul className="divide-y divide-stone-200 border-b border-t">
        {cart.map((item) => {
          // Log each item to verify its structure
          console.log("Cart item:", item);

          // Make sure that item is always defined
          if (!item) return null;

          const ingredients =
            fetcher.data?.find((el) => el.id === item.pizzaId)?.ingredients ||
            [];

          return (
            <OrderItem
              item={item}
              key={item.pizzaId} // Ensure each key is unique
              isLoadingIngredients={fetcher.state === "loading"}
              ingredients={ingredients}
            />
          );
        })}
      </ul>

      <div className="space-y-2 bg-stone-200 px-6 py-5">
        <p className="text-sm font-medium text-stone-600">
          Price pizza: {formatCurrency(orderPrice)}
        </p>
        {priority && (
          <p className="text-sm font-medium text-stone-600">
            Price priority: {formatCurrency(priorityPrice)}
          </p>
        )}
        <p className="font-bold">
          To pay on delivery: {formatCurrency(orderPrice + priorityPrice)}
        </p>
      </div>

      {!priority && <OrderUpdate order={order} />}
    </div>
  );
}

export async function loader({ params }) {
  const order = await getOrder(params.orderId);
  return order;
}

export default Order;
