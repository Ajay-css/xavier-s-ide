// src/pages/Login.jsx
import { useState } from "react";
import axios from "../utils/axios.js";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import SpaceBackground from "../components/SpaceBackground.jsx";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("/auth/login", { email, password });
      localStorage.setItem("token", data.token);
      toast.success("Login Successful!");
      window.location.href = "/dashboard";
    } catch (err) {
      toast.error(err.response?.data?.message || "Login Failed");
    }
  };

  return (
    <div className="relative flex items-center justify-center min-h-screen text-white overflow-hidden">
      {/* 🚀 3D Background */}
      <SpaceBackground />

      {/* 💫 Login Card */}
      <motion.form
        onSubmit={handleLogin}
        className="relative z-10 w-full max-w-md p-8 rounded-2xl bg-white/10 backdrop-blur-xl border border-cyan-400/30 shadow-[0_0_25px_rgba(34,211,238,0.3)] space-y-6"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="text-3xl font-extrabold text-center bg-gradient-to-r from-cyan-400 to-blue-500 text-transparent bg-clip-text drop-shadow-[0_0_10px_#22d3ee]">
          🚀 Login To Continue
        </h2>

        <input
          type="email"
          placeholder="Email"
          className="w-full px-4 py-3 rounded-lg bg-black/40 border border-cyan-400/30 text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full px-4 py-3 rounded-lg bg-black/40 border border-cyan-400/30 text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <motion.button
          type="submit"
          className="w-full py-3 rounded-lg font-semibold bg-gradient-to-r from-cyan-500 to-blue-500 text-black shadow-lg"
          whileHover={{ scale: 1.05, boxShadow: "0 0 25px #22d3ee" }}
          whileTap={{ scale: 0.95 }}
        >
          Login
        </motion.button>
      </motion.form>
    </div>
  );
}

export default Login;