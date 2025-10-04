import { motion } from "framer-motion";

export default function AnimatedCard({ title, children }) {
  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="bg-[rgba(255,255,255,0.02)] p-6 rounded-2xl shadow-soft">
      <h3 className="text-lg font-semibold mb-3">{title}</h3>
      {children}
    </motion.div>
  );
}
