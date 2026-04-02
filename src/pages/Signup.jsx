import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Signup(){

 const [name,setName] = useState("");
 const [email,setEmail] = useState("");
 const [password,setPassword] = useState("");

 const navigate = useNavigate();

 const handleSignup = async (e)=>{
  e.preventDefault();

  try{

   await axios.post("https://workasana-backend-kohl.vercel.app/auth/signup",{
    name,
    email,
    password,
   });

   alert("Account Created");

   navigate("/login");

  }catch(err){
   alert("Signup Failed");
  }

 };

 return(

  <form onSubmit={handleSignup}>
 <div className="auth-container">
      <div className="auth-card">
   <h2 className="auth-title">Signup</h2>

   <input
   className="auth-input"
    type="text"
    placeholder="Name"
    value={name}
    onChange={(e)=>setName(e.target.value)}
   />

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

   <button className="auth-button signup-button" type="submit">Signup</button>
<p className="auth-footer">
          Already have an account?{" "}
          <Link to="/login" className="auth-link">
            Login
          </Link>
        </p>
</div>
</div>
  </form>

 );

}

export default Signup;