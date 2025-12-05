import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";
import DataPage from "./DataPage";

const Home = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navbar */}
      <nav className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold text-indigo-600">
                Khalti Frontend{" "}
              </h1>
              <Link
                to="/"
                className="text-gray-700 hover:text-indigo-600 font-medium transition">
                Home
              </Link>
             
            </div>
            <div>
              <button
                onClick={logout}
                className="px-4 py-2 bg-indigo-600 text-white font-semibold rounded-lg shadow hover:bg-indigo-700 transition">
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>
      {/* Main content */}
      <div className="flex items-center justify-center p-6">
        <div className="bg-white shadow-lg rounded-xl p-5 w-full max-w-lg text-center mt-10">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">
            Welcome, {user?.name || "User"}!
          </h1>

          
        </div>
      </div>
      <DataPage />
    </div>
  );
};

export default Home;
