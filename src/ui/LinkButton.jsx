import { Link, useNavigate } from "react-router-dom";
/* eslint-disable react/prop-types   */
function LinkButton({ children, to }) {
  const className = "text-sm text-blue-500 hover:text-blue-800 hover:underline";
  const navigate = useNavigate();
  if (to === "-1")
    return (
      <button className={className} to={to} onClick={() => navigate(-1)}>
        {children}
      </button>
    );
  return (
    <div>
      <Link className={className} to={to}>
        {children}
      </Link>
    </div>
  );
}

export default LinkButton;
