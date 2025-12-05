import React, { useContext, useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";
import Axios from "../utils/Axios";
import SummaryApi from "../common/SummeryApi";
import AxiosToastError from "../utils/AxiosErrors";
import { AuthContext } from "../context/AuthContext";
import Loader from "../components/Loader";

interface RegisterData {
  name: string;
  email: string;
  password: string;
  phone: string;
  confirmPassword: string;
}

const RegisterPage: React.FC = () => {
  const [data, setData] = useState<RegisterData>({
    email: "",
    password: "",
    name: "",
    phone: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);

  const {
    setUser,
    isAuthenticated,
    setIsAuthenticated,
    loading: authLoading,
  } = useContext(AuthContext);

  const navigate = useNavigate();

  useEffect(() => {
    if (authLoading && isAuthenticated) {
      navigate("/", { replace: true });
    }
  }, [authLoading, isAuthenticated, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!data.email || !data.password) {
      toast.error("Please fill in all fields.");
      return;
    }

    setLoading(true);
    try {
      const response = await Axios({
        ...SummaryApi.register,
        data: {
          name: data.name,
          email: data.email,
          password: data.password,
          phone: data.phone,
        },
      });

      setUser(response.data);
      setIsAuthenticated(true);
      toast.success("Registration successful!");
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
        <h1 className="text-2xl font-bold mb-6 text-center">Register</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1 font-semibold">Name</label>
            <input
              type="text"
              value={data.name}
              onChange={(e) => setData({ ...data, name: e.target.value })}
              className="w-full p-2 border rounded"
              placeholder="Enter your name"
              required
            />
          </div>

          <div>
            <label className="block mb-1 font-semibold">Email</label>
            <input
              type="email"
              value={data.email}
              onChange={(e) => setData({ ...data, email: e.target.value })}
              className="w-full p-2 border rounded"
              placeholder="Enter your email"
              required
            />
          </div>

          <div>
            <label className="block mb-1 font-semibold">Phone</label>
            <input
              type="number"
              value={data.phone}
              onChange={(e) => setData({ ...data, phone: e.target.value })}
              className="w-full p-2 border rounded"
              placeholder="Enter your phone number"
              maxLength={10}
              minLength={10}
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
              placeholder="Enter your password"
              required
            />
          </div>

          <div>
            <label className="block mb-1 font-semibold">Confirm Password</label>
            <input
              type="password"
              value={data.confirmPassword}
              onChange={(e) =>
                setData({ ...data, confirmPassword: e.target.value })
              }
              className="w-full p-2 border rounded"
              placeholder="Confirm your Confirm password"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded hover:bg-indigo-700 disabled:opacity-50">
            {loading ? "Registering..." : "Register"}
          </button>
        </form>

        <p className="mt-4 text-center text-sm">
          Already have an account?{" "}
          <Link to="/login" className="text-indigo-600 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
