import { useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "../utils/axios.js";
import { useProject } from "../context/ProjectContext.jsx";
import EditorMonaco from "../components/EditorMonaco.jsx";
import Sidebar from "../components/Sidebar.jsx";
import OutputPanel from "../components/OutputPanel.jsx";
import FileExplorer from "../components/FileExplorer.jsx";

export default function EditorPage() {
  const { id } = useParams();
  const { setActiveProject, setFiles, setActiveFile } = useProject();

  useEffect(() => {
    const load = async () => {
      try {
        const { data: project } = await axios.get(`/projects/${id}`);
        setActiveProject(project);

        const { data: files } = await axios.get(`/files/${id}`);
        setFiles(files || []);

        if (files && files.length) setActiveFile(files[0]);
      } catch (err) {
        console.error(err);
      }
    };
    if (id) load();
  }, [id]);

  return (
    <div className="px-6 py-6 grid grid-cols-12 gap-6">
      <div className="col-span-3"><Sidebar /></div>
      <div className="col-span-3"><FileExplorer /></div>

      <div className="col-span-6 flex flex-col h-[80vh]">
        {/* Editor full height */}
        <div className="flex-1 min-h-0 mb-3">
          <EditorMonaco />
        </div>

        {/* Output visible bottom */}
        <div className="h-40">
          <OutputPanel />
        </div>
      </div>

    </div>
  );
}
