import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import bodybg from "../assets/122383e7-33a9-4bf6-b17a-35ee0248d4ab.png";

const SignupForm = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [dob, setDob] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState({});
  const [touched, setTouched] = useState({});
  const [popup, setPopup] = useState(false);

  const validateField = (fieldName) => {
    const newErr = { ...error };

    if (fieldName === "name") {
      if (!name.trim()) newErr.name = "Name Is Required";
      else delete newErr.name;
    }

    if (fieldName === "email") {
      if (!email.trim()) {
        newErr.email = "Email Is Required";
      } else {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) newErr.email = "Invalid Email Address";
        else delete newErr.email;
      }
    }

    if (fieldName === "password") {
      if (!password.trim()) {
        newErr.password = "Password Is Required";
      } else {
        const passwordRegex =
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
        if (!passwordRegex.test(password))
          newErr.password = "Password Too Weak";
        else delete newErr.password;
      }
    }
    if (fieldName === "dob") {
      if (!dob.trim()) newErr.dob = "DOB Is Required";
      else delete newErr.dob;
    }

    setError(newErr);
    return Object.keys(newErr).length === 0;
  };

  const isvalid =
    name && email && password && dob && Object.keys(error).length === 0;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const allFieldsValid =
      validateField("name") &&
      validateField("email") &&
      validateField("password") &&
      validateField("dob");

    if (allFieldsValid) {
      const formData = { name, email, password, dob };

      try {
        const res = await fetch("http://localhost:5000/api/auth/signup", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });
        const data = await res.json();
        if (!res.ok) {
          window.alert("signup failed" + (data.error || "unkown error"));
        }
        setPopup(true);
        setTimeout(() => {
          setPopup(false);
          navigate("/login");
        }, 1500);
      } catch (err) {
        console.error(err, "signup error");
        window.alert("signup failed" + err.message);
      }
    }
  };

  return (
    <div>
      <img src={bodybg}
      className="relative"
      alt="" />
      <div className="h-[500px] w-[900px] flex items-center justify-end absolute top-2 p-5 mt-10 left-1/8 text-gray-600">
      <div className="h-[500px] w-[900px] bg-white opacity-70 relative blur-md"></div>
      <div className="absolute left-1/10 ">
        <h1 className="text-2xl text-gray-600">Signup now to Start using the <br /> message saver</h1>
        <p className="text-xl text-gray-600 mt-10 bg-orange-100 p-2">password must contain:- <br /> one uppar case character <br /> one number 
        <br /> one symbol
        <br /> minimum 8 characters
        </p>
      </div>
      <div className="border-2 rounded-xl h-[450px] w-[350px] flex justify-center absolute">
        <form onSubmit={handleSubmit} className="mt-10">
          <label
            htmlFor="signupForm"
            className="font-bold text-xl justify-center"
          >
            Sign Up Form
          </label>
          <div
            name="signup"
            id="signupForm"
            className="mt-4 flex flex-col gap-2"
          >
            <div id="input" className="flex flex-col gap-2">
              <input
                onChange={(e) => {
                  setName(e.target.value);
                  if (touched.name) validateField("name");
                }}
                type="text"
                onBlur={() => {
                  setTouched((prev) => ({ ...prev, name: true }));
                  validateField("name");
                }}
                placeholder="Enter Name"
                className={`placeholder-gray-400 placeholder:font-medium p-2 rounded border w-[220px]
              ${touched.name && error.name ? "border-red-500" : "border"}`}
              />
              {error.name && (
                <p className="text-sm text-red-500">{error.name}</p>
              )}

              <input
                type="text"
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (touched.email) validateField("email");
                }}
                onBlur={() => {
                  setTouched((prev) => ({ ...prev, email: true }));
                  validateField("email");
                }}
                placeholder="Enter Email"
                className={`placeholder-gray-400 placeholder:font-medium p-2 rounded border w-[220px] ${
                  touched.email && error.email ? "border-red-500" : "border"
                }`}
              />
              {error.email && (
                <p className="text-sm text-red-500">{error.email}</p>
              )}
              {}
              <input
                type="password"
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (touched.password) validateField("password");
                }}
                onBlur={() => {
                  setTouched((prev) => ({ ...prev, password: true }));
                  validateField("password");
                }}
                placeholder="Enter Password"
                className={`placeholder-gray-400 placeholder:font-medium p-2 rounded border w-[220px] ${
                  touched.password && error.password
                    ? "border-red-500"
                    : "border"
                }`}
              />
              {error.password && (
                <p className="text-sm text-red-500 text-wrap">
                  {error.password}
                </p>
              )}
              <input
                type="date"
                onChange={(e) => {
                  setDob(e.target.value);
                  if (touched.dob) validateField("dob");
                }}
                onBlur={() => {
                  setTouched((prev) => ({ ...prev, dob: true }));
                  validateField("dob");
                }}
                placeholder="DOB"
                className={`placeholder:text-gray-400 placeholder:font-medium p-2 rounded border w-[220px]
                ${touched.dob && error.dob ? "border-red-500" : "border"}
                `}
              />
            </div>
            <div className="flex justify-center mt-4 flex-col gap-2">
              <button
                className={`rounded border font-bold px-3 py-2
               ${
                 !isvalid
                   ? "bg-gray-400 hover:bg-gray-500"
                   : "bg-green-300 hover:bg-green-400"
               }
                `}
                type="submit"
                disabled={!isvalid}
                onClick={handleSubmit}
              >
                SignUp
              </button>
              <Link to="/" className="rounded border font-bold px-3 py-2 bg-green-300 hover:bg-green-400 text-center">Back To Home</Link>
            </div>
          </div>
        </form>
        {popup && (
          <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-40 flex items-center justify-center z-50">
            <div className="bg-white text-center rounded-xl shadow-lg p-6 w-[300px]">
              <h2 className="text-lg font-bold text-green-600 mb-2">
                Success!
              </h2>
              <p className="text-gray-700">You’ve successfully signed up.</p>
            </div>
          </div>
        )}
      </div>
    </div>
    </div>
    
  );
};

export default SignupForm;
