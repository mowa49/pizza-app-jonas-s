import { Outlet, useNavigation } from "react-router-dom";
import Header from "./Header";
import CartOverview from "../features/cart/CartOverview";
import Loader from "./Loader";

function AppLayout() {
  const navigation = useNavigation();

  const isLoading = navigation.state === "loading";
  return (
    <div className="bg-stone grid h-screen grid-rows-[auto_1fr_auto] focus:outline-none focus:ring focus:ring-amber-600 focus:ring-offset-2">
      {/* {true && <Loader />} */}
      {isLoading && <Loader />}
      <Header />
      <div className="overflow-scroll">
        <main className="mx-auto max-w-3xl overflow-scroll">
          <Outlet />
        </main>
      </div>
      <CartOverview />
    </div>
  );
}

export default AppLayout;
