import { useState } from "react";
import { useNavigate } from "react-router-dom";

function SearchOrder() {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    if (!query) return;
    console.log(query);

    navigate(`/order/${query}`);
  }
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          className="w-40 rounded-full bg-yellow-100 px-4 py-2 text-sm shadow-inner transition-all duration-300 placeholder:text-stone-400 focus:outline-none focus:ring focus:ring-amber-600 focus:ring-offset-2 sm:w-64 sm:focus:w-96"
          placeholder="Search order #"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </form>
    </div>
  );
}

export default SearchOrder;
