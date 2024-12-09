import { Link } from "react-router-dom";

/* eslint-disable react/prop-types   */
function Button({ children, disabled, to, type, onClick }) {
  const base =
    "inline-block rounded-full bg-yellow-500 font-semibold uppercase tracking-wider text-stone-800 transition-colors hover:bg-orange-500 focus:outline-none focus:ring focus:ring-amber-600 focus:ring-offset-2 disabled:cursor-not-allowed ";

  const styles = {
    primary: base + "px-4 py-3 md:px-10",
    small: base + "px-1 py-1.5 md:px-2",
    round: base + "px-2 py-2 md:px-3 md:py-1  m-1",
    secondary:
      "inline-block px-4 py-3 md:px-10 rounded-full bg-stone-200/50 font-semibold uppercase tracking-wider text-stone-700 transition-colors hover:bg-stone-300 focus:outline-none focus:ring focus:ring-stone-600 focus:ring-offset-2 disabled:cursor-not-allowed ",
  };

  if (to)
    return (
      <Link to={to} className={styles[type]}>
        {children}
      </Link>
    );
  if (onClick)
    return (
      <button disabled={disabled} className={styles[type]} onClick={onClick}>
        {children}
      </button>
    );
  return (
    <button disabled={disabled} className={styles[type]}>
      {children}
    </button>
  );
}

export default Button;
