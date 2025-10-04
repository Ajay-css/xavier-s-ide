import { Plus, Trash2 } from "lucide-react";
import { useProject } from "../context/ProjectContext.jsx";
import axios from "../utils/axios.js";
import toast from "react-hot-toast";
import { FaJs, FaPython, FaJava, FaFileCode, FaHtml5, FaCss3Alt, FaPhp } from "react-icons/fa";

const languageMap = {
  js: "javascript", jsx: "javascript",
  ts: "typescript", tsx: "typescript",
  py: "python", java: "java",
  cpp: "cpp", c: "c", cs: "csharp",
  html: "html", css: "css",
  json: "json", md: "markdown",
  php: "php", go: "go", rs: "rust",
  sql: "sql", yaml: "yaml",
};

function getLanguageFromFilename(filename) {
  const ext = filename.split(".").pop();
  return languageMap[ext] || "plaintext";
}

function getFileIcon(filename) {
  if (filename.endsWith(".js")) return <FaJs className="text-yellow-400" />;
  if (filename.endsWith(".py")) return <FaPython className="text-blue-400" />;
  if (filename.endsWith(".java")) return <FaJava className="text-red-500" />;
  if (filename.endsWith(".html")) return <FaHtml5 className="text-orange-500" />;
  if (filename.endsWith(".css")) return <FaCss3Alt className="text-blue-500" />;
  if (filename.endsWith(".php")) return <FaPhp className="text-blue-500" />;
  return <FaFileCode className="text-gray-400" />;
}

function FileExplorer() {
  const { activeProject, files, setFiles, setActiveFile, setProjects } = useProject();

  // ❌ REMOVE useEffect fetching files again (Dashboard already does this)

  const projectFiles = activeProject
    ? files.filter((f) => String(f.project) === String(activeProject._id))
    : [];

  const createFile = async () => {
    if (!activeProject) return toast.error("No active project selected");
    const name = prompt("File name (e.g. main.js)");
    if (!name) return;

    const lang = getLanguageFromFilename(name);
    try {
      const { data } = await axios.post("/files", {
        projectId: activeProject._id,
        name,
        language: lang,
      });

      setFiles((prev) => [data, ...prev]);
      setActiveFile(data);

      setProjects((prev) =>
        prev.map((p) =>
          p._id === activeProject._id ? { ...p, files: [...(p.files || []), data] } : p
        )
      );

      toast.success(`File ${name} created`);
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to create file");
    }
  };

  const deleteFile = async (id) => {
    if (!confirm("Delete this file?")) return;
    try {
      await axios.delete(`/files/${id}`);
      setFiles((prev) => prev.filter((f) => f._id !== id));

      setActiveFile((prev) => (prev && prev._id === id ? null : prev));

      setProjects((prev) =>
        prev.map((p) =>
          p._id === activeProject._id
            ? { ...p, files: (p.files || []).filter((f) => f._id !== id) }
            : p
        )
      );

      toast.success("File deleted");
    } catch (err) {
      toast.error("Failed to delete");
    }
  };

  return (
    <div className="w-64 bg-[rgba(255,255,255,0.02)] p-3 rounded-xl">
      <div className="flex items-center justify-between mb-3">
        <h4 className="text-sm font-semibold">
          Files {activeProject ? `(${activeProject.name})` : ""}
        </h4>
        <button
          onClick={createFile}
          className="p-2 rounded bg-cyan-600 hover:bg-cyan-500 transition"
          title="New file"
        >
          <Plus size={14} />
        </button>
      </div>

      <div className="space-y-2 max-h-[60vh] overflow-auto">
        {projectFiles.length === 0 && (
          <div className="text-xs text-gray-400">No files</div>
        )}
        {projectFiles.map((f) => (
          <div
            key={f._id}
            onClick={() => setActiveFile(f)}
            className="flex items-center justify-between p-2 rounded hover:bg-white/5 cursor-pointer"
          >
            <div className="flex items-center gap-2">
              {getFileIcon(f.name)}
              <div>
                <div className="text-sm">{f.name}</div>
                <div className="text-xs text-gray-400">{f.language}</div>
              </div>
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                deleteFile(f._id);
              }}
              className="p-1 hover:text-red-400 transition"
              title="Delete"
            >
              <Trash2 size={14} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FileExplorer;