import { useEffect } from "react";
import axios from "../utils/axios.js";
import Sidebar from "../components/Sidebar";
import FileExplorer from "../components/FileExplorer";
import EditorMonaco from "../components/EditorMonaco";
import OutputPanel from "../components/OutputPanel.jsx";
import AnimatedCard from "../components/AnimatedCard";
import { useProject } from "../context/ProjectContext";
import { motion } from "framer-motion";
import { useAuth } from "../context/AuthContext";

// 🌌 Starfield / Galaxy Background
const Starfield = () => {
  const stars = Array.from({ length: 80 });
  return (
    <div className="absolute inset-0 -z-10 bg-black overflow-hidden">
      {stars.map((_, i) => (
        <motion.span
          key={i}
          className="absolute w-1 h-1 bg-cyan-400 rounded-full shadow-[0_0_6px_#22d3ee]"
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, Math.random() * 30 - 15, 0],
            opacity: [0.2, 1, 0.2],
          }}
          transition={{
            repeat: Infinity,
            duration: 4 + Math.random() * 3,
            delay: Math.random() * 2,
          }}
        />
      ))}
    </div>
  );
};

export default function Dashboard() {
  const { projects, setProjects, activeProject, setActiveProject, setFiles } = useProject();
  const { user } = useAuth();

  // Load all projects once
  useEffect(() => {
    const loadProjects = async () => {
      try {
        const { data } = await axios.get("/projects");
        setProjects(data);
        if (data.length > 0 && !activeProject) {
          setActiveProject(data[0]);
        }
      } catch (err) {
        console.error("❌ Failed to load projects", err);
      }
    };
    if (user) loadProjects();
  }, [user]);

  // 🔥 Load files whenever activeProject changes
  useEffect(() => {
    const loadFiles = async () => {
      if (!activeProject) return;
      try {
        const { data } = await axios.get("/files", {
          params: { projectId: activeProject._id },
        });
        setFiles(data);
      } catch (err) {
        console.error("❌ Failed to load files for project", err);
        setFiles([]);
      }
    };
    loadFiles();
  }, [activeProject]);

  return (
    <div className="relative min-h-screen px-4 py-6 md:px-8 md:py-8 text-white">
      {/* 🌌 Galaxy Background */}
      <Starfield />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Sidebar */}
        <motion.div
          className="lg:col-span-3 w-full"
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <AnimatedCard title="Projects" className="bg-black/40 border border-cyan-500/20 rounded-xl shadow-lg shadow-cyan-500/10">
            <Sidebar />
          </AnimatedCard>
        </motion.div>

        {/* File Explorer */}
        <motion.div
          className="lg:col-span-3 w-full"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <AnimatedCard title="Files" className="bg-black/40 border border-blue-500/20 rounded-xl shadow-lg shadow-blue-500/10">
            <FileExplorer />
          </AnimatedCard>
        </motion.div>

        {/* Editor + Output */}
        <motion.div
          className="lg:col-span-6 w-full"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <AnimatedCard
            title="Editor"
            className="bg-black/50 border border-purple-500/20 rounded-xl shadow-xl shadow-purple-500/10"
          >
            <div className="h-[400px] md:h-[400px] rounded-lg overflow-hidden">
              <EditorMonaco />
            </div>
            <div className="mt-4 h-[200px] md:h-[300px] rounded-lg overflow-hidden">
              <OutputPanel />
            </div>
          </AnimatedCard>
        </motion.div>
      </div>
    </div>
  );
}