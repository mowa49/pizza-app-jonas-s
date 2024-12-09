import { useSelector } from "react-redux";

function UserName() {
  const username = useSelector((state) => state.user.username);
  if (!username) return null;
  return (
    <div className="font-pizza hidden font-sans text-xl font-semibold transition-all md:block">
      <spa>👤</spa>
      {username}
    </div>
  );
}

export default UserName;
