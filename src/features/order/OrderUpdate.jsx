import { useFetcher } from "react-router-dom";
import Button from "../../ui/Button";
import { updateOrder } from "../../services/apiRestaurant";

/* eslint-disable react/prop-types   */
function OrderUpdate() {
  const fetcher = useFetcher();
  return (
    <fetcher.Form method="PATCH" className="text-right">
      <Button type="primary">Priority</Button>
    </fetcher.Form>
  );
}

///// request, params }
export async function action({ params }) {
  const data = { priority: true };
  await updateOrder(params.orderId, data);

  return null;
}
export default OrderUpdate;
