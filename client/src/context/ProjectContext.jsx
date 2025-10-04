import React, { createContext, useContext, useState } from "react";

const ProjectContext = createContext();

export const ProjectProvider = ({ children }) => {
  const [projects, setProjects] = useState([]);
  const [activeProject, setActiveProject] = useState(null);
  const [files, setFiles] = useState([]);
  const [activeFile, setActiveFile] = useState(null);
  const [output, setOutput] = useState("");

  return (
    <ProjectContext.Provider
      value={{
        projects, setProjects,
        activeProject, setActiveProject,
        files, setFiles,
        activeFile, setActiveFile,
        output, setOutput
      }}
    >
      {children}
    </ProjectContext.Provider>
  );
};

export const useProject = () => useContext(ProjectContext);
export default ProjectContext;