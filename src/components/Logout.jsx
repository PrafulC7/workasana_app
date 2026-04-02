import { useNavigate } from "react-router-dom";

const Logout = () => {
    const navigate = useNavigate();
    const handleLogout = () => {
  localStorage.removeItem("token");
  navigate("/login");
};
  return (
    <>
    <button onClick={handleLogout} className="logout-btn">
  Logout
</button>
  </>
  )
}

export default Logout