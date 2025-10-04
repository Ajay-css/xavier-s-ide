import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Code2, LogIn, UserPlus, LogOut, Sun, Moon } from "lucide-react";
import { useAuth } from "../context/AuthContext.jsx";
import { useTheme } from "../context/ThemeContext.jsx";

function Navbar() {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();

  return (
    <motion.nav
      className="flex items-center justify-between px-6 py-3 bg-black/30 backdrop-blur-lg sticky top-0 z-50"
      initial={{ y: -60 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.45 }}
    >
      <Link
        to="/"
        className="flex items-center space-x-3 text-lg font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-blue-400"
      >
        <Code2 size={24} />
        <span>Xavier's CodeIDE</span>
      </Link>

      <div className="flex items-center gap-4">
        <button
          onClick={toggleTheme}
          className="flex items-center gap-2 px-3 py-2 rounded-md bg-gray-800/40 hover:bg-gray-800/60 transition"
          aria-label="Toggle theme"
        >
          {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
          <span className="hidden md:inline text-sm">
            {theme === "dark" ? "Light" : "Dark"}
          </span>
        </button>

        {user ? (
          <>
            <span className="text-sm text-gray-200 hidden md:inline">Hi, {user.username}</span>
            <button onClick={logout} className="px-3 py-2 rounded-md bg-gray-800/40 hover:bg-gray-800/60">
              <LogOut size={16} /> <span className="sr-only">Logout</span>
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="text-sm text-gray-200 hover:text-cyan-300 flex items-center gap-2">
              <LogIn size={16} /> Login
            </Link>
            <Link to="/register" className="text-sm text-gray-200 hover:text-cyan-300 flex items-center gap-2">
              <UserPlus size={16} /> Register
            </Link>
          </>
        )}
      </div>
    </motion.nav>
  );
}

export default Navbar;