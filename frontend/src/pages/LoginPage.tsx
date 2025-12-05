import React, { useContext, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import AxiosToastError from "../utils/AxiosErrors";
import Axios from "../utils/Axios";
import SummaryApi from "../common/SummeryApi";
import toast from "react-hot-toast";
import { AuthContext } from "../context/AuthContext";
import Loader from "../components/Loader";

interface LoginData {
  email: string;
  password: string;
}

const LoginPage: React.FC = () => {
  const [data, setData] = useState<LoginData>({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const {
    setUser,
    isAuthenticated,
    setIsAuthenticated,
    loading: authLoading,
  } = useContext(AuthContext);

  const navigate = useNavigate();

  useEffect(() => {
    if (authLoading && isAuthenticated) {
      navigate("/",{ replace: true });
    }
  }, [authLoading, isAuthenticated, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!data.email || !data.password) {
      setError("Please fill in all fields.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await Axios({
        ...SummaryApi.login,
        data,
      });

      setUser(response.data.user);
      setIsAuthenticated(true);

      toast.success("Login successful!");
      navigate("/");
    } catch (err: unknown) {
      AxiosToastError(err);
    } finally {
      setLoading(false);
    }
  };

  
  if (authLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="text-gray-600 text-lg font-medium flex items-center flex-col">
          <Loader />
          <span className="mt-2">Checking session...</span>
        </div>
      </div>
    );
  }


  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-md rounded-xl p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">Login</h1>
        {error && <p className="text-red-500 mb-4">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1 font-semibold">Email</label>
            <input
              type="email"
              value={data.email}
              onChange={(e) => setData({ ...data, email: e.target.value })}
              className="w-full p-2 border rounded"
              required
            />
          </div>

          <div>
            <label className="block mb-1 font-semibold">Password</label>
            <input
              type="password"
              value={data.password}
              onChange={(e) => setData({ ...data, password: e.target.value })}
              className="w-full p-2 border rounded"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded hover:bg-indigo-700 disabled:opacity-50">
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
        <p className="mt-4 text-center text-sm">
          Don't have an account?
          <Link to="/register" className="text-indigo-600 hover:underline">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
