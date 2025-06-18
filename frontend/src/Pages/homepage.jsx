import bodybg from "../assets/122383e7-33a9-4bf6-b17a-35ee0248d4ab.png";
import { Link } from "react-router";

const Homepage = () => {
  return (
    <div>
      <img src={bodybg} alt="bg-img" className="h-screen w-full relative" />
      <div>
        <div className="absolute top-1/5 left-1/4 w-[600px] p-2">
        <h1 className="text-gray-600 font-bold text-4xl text-center">
          Welcome to Message Saver
        </h1>
        <br />
        <p className="text-gray-600 text-xl font-bold text-center">your personal space to save thoughts,
          notes, and quick reminders with just a click. Sign up to get started
          or log in to access your saved messages anytime, from any device</p>
      </div>
      <div className="absolute top-1/2 left-3/7 p-2 w-[200px]">
        <Link to="/signup" className="border rounded p-2 font-bold text-gray-600 hover:text-gray-900">
          Signup
        </Link>
        <Link to="/login" className="border rounded p-2 font-bold ml-3 text-gray-600 hover:text-gray-900">
          Login
        </Link>
      </div>
      </div>
    </div>
  );
};

export default Homepage;
