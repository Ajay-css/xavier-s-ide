import { motion } from "framer-motion";
import { FileText, FolderPlus, Trash2 } from "lucide-react";
import { useProject } from "../context/ProjectContext";
import axios from "../utils/axios.js";
import toast from "react-hot-toast";

function Sidebar() {
  const { projects, setProjects, setActiveProject, activeProject, setFiles } = useProject();

  const createProject = async () => {
    const name = prompt("Project name");
    if (!name) return;
    try {
      const { data } = await axios.post("/projects", { name });
      setProjects(prev => [data, ...prev]);
      setActiveProject(data);
      toast.success("Project created");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to create");
    }
  };

  // 🔥 Delete Project
  const deleteProject = async (id) => {
    if (!confirm("Delete this project and all its files?")) return;
    try {
      await axios.delete(`/projects/${id}`);
      setProjects(prev => prev.filter(p => p._id !== id));
      setFiles([]); // clear files when project deleted
      if (activeProject?._id === id) setActiveProject(null);
      toast.success("Project deleted");
    } catch (err) {
      toast.error("Failed to delete project");
    }
  };

  return (
    <aside className="w-72 bg-[rgba(255,255,255,0.02)] p-4 rounded-xl shadow-soft">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold">Projects</h3>
        <button onClick={createProject} className="p-2 rounded bg-cyan-600 hover:bg-cyan-500">
          <FolderPlus size={16} />
        </button>
      </div>

      <div className="space-y-2 overflow-auto max-h-[60vh]">
        {projects.length === 0 && <div className="text-xs text-gray-400">No projects yet</div>}
        {projects.map((p) => (
          <motion.div
            key={p._id}
            className={`flex items-center justify-between overflow-hidden p-3 rounded-lg cursor-pointer ${
              activeProject?._id === p._id
                ? "bg-gradient-to-r from-cyan-600/20 to-blue-500/10 border border-cyan-600/20"
                : "hover:bg-white/2"
            }`}
            whileHover={{ x: 5 }}
          >
            {/* Project name */}
            <div onClick={() => setActiveProject(p)} className="flex items-center gap-3">
              <FileText size={18} />
              <div>
                <div className="text-sm font-medium">{p.name}</div>
              </div>
            </div>

            {/* Delete project btn */}
            <button
              onClick={() => deleteProject(p._id)}
              className="p-1 hover:text-red-400 transition"
              title="Delete project"
            >
              <Trash2 size={16} />
            </button>
          </motion.div>
        ))}
      </div>
    </aside>
  );
}

export default Sidebar;