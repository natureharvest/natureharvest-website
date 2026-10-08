 import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AdminLogin = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:3000";

// Login page

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    setErrorMessage("");
    setLoading(true);

    try {
      const response = await axios.post(
        `${BACKEND_URL}/api/admin/login`,
        {
          email,
          password,
        }
      );

      const data = response.data;

      if (data.success) {
        // Backend se token key match karein (token ya accessToken)
        const token = data.token || data.accessToken;

        if (token) {
          localStorage.setItem("adminToken", token);
          navigate("/admin/dashboard");
        } else {
          setErrorMessage("Token not received from server");
        }
      } else {
        setErrorMessage(data.message || "Invalid email or password");
      }
    } catch (err: any) {
      console.error(err);
      setErrorMessage(
        err.response?.data?.message ||
          "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">

        <h1 className="text-3xl font-bold text-center mb-2">
          Admin Login
        </h1>

        <p className="text-gray-500 text-center mb-8">
          Login to access admin dashboard
        </p>

        <form onSubmit={handleLogin} className="space-y-5">

          <div>
            <label className="block mb-2 font-medium">
              Email
            </label>

            <input
              type="email"
              placeholder="admin@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-black"
              required
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">
              Password
            </label>

            <input
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-black"
              required
            />
          </div>

          {errorMessage && (
            <p className="text-red-500 text-sm">
              {errorMessage}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-black text-white py-3 rounded-lg font-semibold hover:bg-gray-800 transition"
          >
            {loading ? "Logging in..." : "Login"}
          </button>

        </form>
      </div>
    </div>
  );
};

export default AdminLogin;