import { useProject } from "../context/ProjectContext.jsx";

export default function OutputPanel() {
  const { output } = useProject();

  const isLoading = output === ":::loading:::";

  return (
    <div className="h-full w-full bg-black text-green-400 font-mono text-sm p-3 rounded-2xl overflow-auto shadow-inner">
      {isLoading ? (
        <div className="flex flex-col items-center justify-center gap-2 h-full">
          {/* Spinner */}
          <div className="w-8 h-8 border-4 border-green-400 border-t-transparent rounded-full animate-spin"></div>
          <span className="text-gray-400 text-xs">Running your code...</span>
        </div>
      ) : output ? (
        // 🧠 Detect if it's HTML-like (contains <br> or tags)
        /<\/?[a-z][\s\S]*>/i.test(output) ? (
          <div
            className="text-green-400 font-mono whitespace-pre-wrap break-words"
            dangerouslySetInnerHTML={{ __html: output }}
          />
        ) : (
          <pre className="whitespace-pre-wrap text-green-400">{output}</pre>
        )
      ) : (
        <div className="text-gray-500 text-center mt-4">
          Output will appear here...
        </div>
      )}
    </div>
  );
}