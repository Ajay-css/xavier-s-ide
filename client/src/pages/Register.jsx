import { useState } from "react";
import axios from "../utils/axios.js";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import SpaceBackground from "../components/SpaceBackground.jsx";

export default function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const register = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("/auth/register", { username, email, password });
      localStorage.setItem("token", data.token);
      toast.success("Account Created Successfully!");
      window.location.href = "/dashboard";
    } catch (err) {
      toast.error(err.response?.data?.message || "Registration Failed");
    }
  };

  return (
    <div className="relative flex items-center justify-center min-h-screen text-white overflow-hidden">
      {/* 🌌 3D Animated Space Background */}
      <SpaceBackground />

      {/* ✨ Floating Register Card */}
      <motion.form
        onSubmit={register}
        initial={{ opacity: 0, scale: 0.8, y: 60 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="relative z-10 w-full max-w-md p-8 rounded-2xl bg-white/10 backdrop-blur-lg border border-cyan-400/30 shadow-[0_0_25px_rgba(34,211,238,0.3)] space-y-5"
      >
        {/* Title */}
        <motion.h2
          className="text-3xl font-extrabold text-center bg-gradient-to-r from-cyan-400 to-blue-500 text-transparent bg-clip-text drop-shadow-[0_0_12px_#22d3ee]"
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          🌠 Create Your Account
        </motion.h2>

        {/* Inputs with motion glow */}
        <motion.input
          whileFocus={{ scale: 1.05, boxShadow: "0 0 20px rgba(34,211,238,0.4)" }}
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
          className="w-full px-4 py-3 rounded-lg bg-black/40 border border-cyan-400/30 text-gray-200 placeholder-gray-400 focus:outline-none"
        />

        <motion.input
          whileFocus={{ scale: 1.05, boxShadow: "0 0 20px rgba(34,211,238,0.4)" }}
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="w-full px-4 py-3 rounded-lg bg-black/40 border border-cyan-400/30 text-gray-200 placeholder-gray-400 focus:outline-none"
        />

        <motion.input
          whileFocus={{ scale: 1.05, boxShadow: "0 0 20px rgba(34,211,238,0.4)" }}
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="w-full px-4 py-3 rounded-lg bg-black/40 border border-cyan-400/30 text-gray-200 placeholder-gray-400 focus:outline-none"
        />

        {/* Button */}
        <motion.button
          whileHover={{
            scale: 1.05,
            boxShadow: "0 0 25px #22d3ee",
          }}
          whileTap={{ scale: 0.95 }}
          type="submit"
          className="w-full py-3 rounded-lg font-semibold bg-gradient-to-r from-cyan-500 to-blue-500 text-black shadow-lg"
        >
          Register
        </motion.button>
      </motion.form>

      {/* 🌈 Floating orbs (subtle background motion effects) */}
      <motion.div
        className="absolute top-20 left-10 w-40 h-40 bg-cyan-500/20 rounded-full blur-3xl"
        animate={{ y: [0, 20, 0], opacity: [0.5, 0.8, 0.5] }}
        transition={{ repeat: Infinity, duration: 5 }}
      />
      <motion.div
        className="absolute bottom-10 right-10 w-52 h-52 bg-blue-500/20 rounded-full blur-3xl"
        animate={{ y: [0, -20, 0], opacity: [0.4, 0.7, 0.4] }}
        transition={{ repeat: Infinity, duration: 6 }}
      />
    </div>
  );
}
