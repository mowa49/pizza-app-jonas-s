import { useSelector } from "react-redux";
import CreateUser from "../features/user/CreateUser";
import Button from "./Button";

function Home() {
  const username = useSelector((state) => state.user.username);
  return (
    <div className="font-pizza my-10 text-center sm:my-16">
      <h1 className="mb-10 p-8 text-xl font-extrabold text-stone-700 md:text-3xl">
        The best pizza.
        <br />
        <span className="font-semi-bold text-yellow-600">
          Straight out of the oven, straight to you.
        </span>
      </h1>
      {username === "" ? (
        <CreateUser />
      ) : (
        <Button to="/menu" type="primary">
          Go to Menu
        </Button>
      )}
    </div>
  );
}

export default Home;

/////////// code for border surrond
//////////focus:outline-none focus:ring focus:ring-amber-600 focus:ring-offset-2
