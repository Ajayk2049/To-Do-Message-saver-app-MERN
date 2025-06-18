import { useState } from "react";
import {Link , useNavigate } from "react-router-dom";
import image from "../assets/122383e7-33a9-4bf6-b17a-35ee0248d4ab.png";

const Login = ({ setAuthenticated }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) {
        setMessage(data.error || "login failed");
        return;
      }
      localStorage.setItem("token", data.token);
      setAuthenticated(true);
      setMessage("✅ login successful");
      navigate("/messages");
    } catch (err) {
      console.error(err, "login error");
      setMessage("Error Connecting To Server");
    }
  };

  return (
    <div>
      <img src={image} alt="" className="relative" />
      <div className="absolute top-1/5 right-2/9 flex p-5 w-[800px] h-[400px]">
            <div className="h-[400px] w-[800px] bg-white opacity-90 relative blur-md"></div>

        <div className="h-[300px] w-full flex justify-baseline items-center mt-10 absolute left-1/7">
          <div className="border p-10">
            <h2 className="font-bold text-2xl p-3">Login To Your Account</h2>
            <form className="flex flex-col gap-4" onSubmit={handleLogin}>
              <input
                type="text"
                placeholder="Enter Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="p-2 border rounded-md w-[230px] border-gray-600"
              />

              <input
                type="password"
                placeholder="Enter Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="p-2 border rounded-md w-[230px] border-gray-600"
              />

              <button className="border rounded-md bg-green-300 p-2 font-bold w-[80px]">
                Login
              </button>
               <Link to="/" className="w-[200px] rounded border font-bold px-3 py-2 bg-green-300 hover:bg-green-400 text-center">Back To Home</Link>
            </form>
            {message && <p> {message} </p>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
