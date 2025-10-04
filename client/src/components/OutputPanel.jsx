import { useProject } from "../context/ProjectContext.jsx";

export default function OutputPanel() {
  const { output } = useProject();

  const isLoading = output === ":::loading:::";

  return (
    <div className="h-full w-full bg-black text-green-400 font-mono text-sm p-3 rounded-2xl overflow-auto shadow-inner flex justify-center">
      {isLoading ? (
        <div className="flex flex-col items-center justify-center gap-2">
          {/* Spinner */}
          <div className="w-8 h-8 border-4 border-green-400 border-t-transparent rounded-full animate-spin"></div>
          <span className="text-gray-400 text-xs">Running your code...</span>
        </div>
      ) : output ? (
        output.startsWith("<iframe")
          ? (
            <div
              className="bg-white w-full h-full rounded-lg overflow-hidden"
              dangerouslySetInnerHTML={{ __html: output }}
            />
          )
          : <pre>{output}</pre>
      ) : (
        <div className="text-gray-500">Output will appear here...</div>
      )}
    </div>
  );
}