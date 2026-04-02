import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
 const [email,setEmail] = useState("");
 const [password,setPassword] = useState("");
 const navigate = useNavigate();

 const handleLogin = async (e) => {
  e.preventDefault();

  try {

   const res = await axios.post("https://workasana-backend-kohl.vercel.app/auth/login",{
    email,
    password
   });

   localStorage.setItem("token",res.data.token);

   navigate("/dashboard");

  } catch(err){
   alert("Invalid Credentials");
  }

 };

 return (

  <form onSubmit={handleLogin}>
<div className="auth-container">
      <div className="auth-card">
   <h2 className="auth-title">Login</h2>

   <input
   className="auth-input"
    type="email"
    placeholder="Email"
    value={email}
    onChange={(e)=>setEmail(e.target.value)}
   />

   <input
   className="auth-input"
    type="password"
    placeholder="Password"
    value={password}
    onChange={(e)=>setPassword(e.target.value)}
   />

   <button className="auth-button" type="submit">Login</button>
     <p className="auth-footer">
          Don’t have an account?{" "}
          <Link to="/" className="auth-link">
            Signup
          </Link>
        </p>
</div>
</div>
  </form>

 );

}

export default Login;