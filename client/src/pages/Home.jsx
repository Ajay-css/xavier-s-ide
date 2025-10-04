import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import {
  FaJs,
  FaPython,
  FaJava,
  FaHtml5,
  FaCss3Alt,
  FaPhp,
  FaNodeJs,
  FaGithub,
  FaTwitter,
  FaLinkedin,
} from "react-icons/fa";

// Animation variants
const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.2 },
  }),
};

// Neon floating dot background
const DotBackground = () => {
  const dots = Array.from({ length: 50 });
  return (
    <div className="absolute inset-0 overflow-hidden z-0 pointer-events-none">
      {dots.map((_, i) => (
        <motion.span
          key={i}
          className="absolute w-1 h-1 bg-cyan-400 rounded-full shadow-[0_0_6px_#22d3ee]"
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -15, 0],
            opacity: [0.1, 1, 0.1],
          }}
          transition={{
            repeat: Infinity,
            duration: 3 + Math.random() * 2,
            delay: Math.random() * 2,
          }}
        />
      ))}
    </div>
  );
};

function Home() {
  return (
    <div className="overflow-hidden flex flex-col min-h-screen bg-black text-white">
      {/* 🔥 HERO SECTION */}
      <section className="relative flex flex-col items-center justify-center min-h-[80vh] text-center px-6">
        {/* Dot Background */}
        <DotBackground />

        {/* Background blobs - fixed pointer issue */}
        <motion.div
          className="absolute w-72 h-72 bg-cyan-500/20 rounded-full blur-3xl top-10 left-10 pointer-events-none z-0"
          animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.7, 0.3] }}
          transition={{ repeat: Infinity, duration: 6 }}
        />
        <motion.div
          className="absolute w-96 h-96 bg-blue-500/20 rounded-full blur-3xl bottom-10 right-10 pointer-events-none z-0"
          animate={{ scale: [1.2, 0.9, 1.2], opacity: [0.2, 0.6, 0.2] }}
          transition={{ repeat: Infinity, duration: 7 }}
        />

        <motion.h1
          className="text-5xl md:text-7xl font-extrabold bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 text-transparent bg-clip-text drop-shadow-[0_0_12px_#22d3ee] z-10"
          initial="hidden"
          animate="show"
          variants={fadeUp}
        >
          Build. Code. Collaborate.
        </motion.h1>

        <motion.p
          className="mt-6 text-lg text-gray-300 max-w-xl mx-auto z-10"
          variants={fadeUp}
          custom={1}
          initial="hidden"
          animate="show"
        >
          A futuristic online IDE with real-time collaboration, cloud storage,
          and AI-powered assistance.
        </motion.p>

        {/* Button (fixed + animated) */}
        <motion.div
          variants={fadeUp}
          custom={2}
          initial="hidden"
          animate="show"
          className="relative z-20"
        >
          <Link to="/dashboard">
            <motion.button
              className="mt-8 px-8 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-black font-semibold rounded-xl shadow-[0_0_25px_#22d3ee] flex items-center gap-2 relative overflow-hidden"
              whileHover={{ scale: 1.1, rotate: 1 }}
              whileTap={{
                scale: 0.95,
                boxShadow: "0 0 30px #22d3ee, 0 0 60px #3b82f6",
              }}
            >
              <span className="relative z-10 flex items-center gap-2">
                Get Started <ArrowRight size={18} />
              </span>

              {/* Neon pulse animation */}
              <motion.span
                className="absolute inset-0 bg-cyan-400 opacity-0 rounded-xl"
                whileTap={{ opacity: [0.6, 0, 0], scale: [1, 2, 3] }}
                transition={{ duration: 0.6 }}
              />
            </motion.button>
          </Link>
        </motion.div>
      </section>

      {/* 🚀 FEATURES SECTION */}
      <section className="py-20 px-6 text-center bg-black">
        <motion.h2
          className="text-3xl md:text-4xl font-bold mb-12 text-cyan-400 drop-shadow-[0_0_6px_#22d3ee]"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Why Choose Our IDE?
        </motion.h2>

        <div className="grid md:grid-cols-3 gap-10 max-w-5xl mx-auto">
          {[
            {
              title: "⚡ Real-time Collaboration",
              desc: "Work together with your team live, with zero conflicts.",
              color: "from-cyan-500/20 to-blue-500/20",
            },
            {
              title: "🤖 AI Assistance",
              desc: "Get smart code completions, bug fixes, and suggestions.",
              color: "from-pink-500/20 to-red-500/20",
            },
            {
              title: "☁️ Cloud Storage",
              desc: "Your code is always safe and accessible from anywhere.",
              color: "from-green-500/20 to-emerald-500/20",
            },
          ].map((f, i) => (
            <motion.div
              key={f.title}
              className={`p-6 rounded-xl border border-white/10 bg-gradient-to-br ${f.color} text-white shadow-[0_0_20px_rgba(34,211,238,0.2)]`}
              custom={i}
              initial="hidden"
              whileInView="show"
              variants={fadeUp}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05 }}
            >
              <h3 className="text-xl font-semibold mb-2 text-cyan-300 drop-shadow-[0_0_6px_#22d3ee]">
                {f.title}
              </h3>
              <p className="text-sm opacity-90">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 🌐 SUPPORTED LANGUAGES */}
      <section className="py-20 bg-black px-6 text-center">
        <motion.h2
          className="text-3xl md:text-4xl font-bold mb-12 text-cyan-400 drop-shadow-[0_0_6px_#22d3ee]"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Supported Languages
        </motion.h2>
        <div className="flex flex-wrap justify-center gap-10 text-6xl">
          {[FaJs, FaPython, FaJava, FaHtml5, FaCss3Alt, FaPhp, FaNodeJs].map(
            (Icon, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.3, rotate: 10 }}
                whileTap={{ scale: 0.9 }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="drop-shadow-[0_0_8px_#22d3ee]"
              >
                <Icon className="text-cyan-400" />
              </motion.div>
            )
          )}
        </div>
      </section>

      {/* 🎯 CTA SECTION */}
      <section className="py-20 text-center px-6 bg-black">
        <motion.h2
          className="text-3xl md:text-4xl font-bold mb-6 text-cyan-400 drop-shadow-[0_0_6px_#22d3ee]"
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Ready to Code Smarter?
        </motion.h2>
        <Link to="/dashboard">
          <motion.button
            className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-500 text-black font-semibold rounded-xl shadow-[0_0_20px_#22d3ee]"
            whileHover={{ scale: 1.1, rotate: 2 }}
            whileTap={{ scale: 0.9 }}
          >
            Start Coding Now 🚀
          </motion.button>
        </Link>
      </section>

      {/* 🌟 FOOTER */}
      <footer className="relative bg-black border-t border-white/10 text-gray-400 py-10 mt-auto">
        <div className="max-w-6xl mx-auto flex flex-col items-center gap-6 text-center">
          <motion.h3
            className="text-xl font-bold text-cyan-400 drop-shadow-[0_0_6px_#22d3ee]"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            © {new Date().getFullYear()} XAVIER'S CODE IDE. All rights reserved.
          </motion.h3>

          <div className="flex gap-6 text-2xl">
            {[FaGithub, FaTwitter, FaLinkedin].map((Icon, i) => (
              <motion.a
                key={i}
                href="#"
                className="hover:text-cyan-400"
                whileHover={{ scale: 1.2, rotate: 10 }}
                whileTap={{ scale: 0.9 }}
              >
                <Icon />
              </motion.a>
            ))}
          </div>
        </div>

        {/* Animated Glow Line */}
        <motion.div
          className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-400 via-blue-500 to-cyan-400"
          animate={{ backgroundPosition: ["0% 50%", "100% 50%"] }}
          transition={{ repeat: Infinity, duration: 6, ease: "linear" }}
          style={{ backgroundSize: "200% 200%" }}
        />
      </footer>
    </div>
  );
}

export default Home;