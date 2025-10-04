import React, { useEffect, useState } from "react";
import MonacoEditor from "@monaco-editor/react";
import { useProject } from "../context/ProjectContext.jsx";
import axios from "../utils/axios.js";
import toast from "react-hot-toast";

// Starter Templates
const starterTemplates = {
  javascript: `console.log("Welcome To CODE IDE Created By Ajay Arumugam");`,
  python: `print("Welcome To CODE IDE Created By Ajay Arumugam")`,
  java: `public class Main {
  public static void main(String[] args) {
    System.out.println("Welcome To CODE IDE Created By Ajay Arumugam");
  }
}`,
  cpp: `#include <iostream>
using namespace std;

int main() {
   cout << "Welcome To CODE IDE Created By Ajay Arumugam" << endl;
   return 0;
}`,
  c: `#include <stdio.h>

int main() {
  printf("Welcome To CODE IDE Created By Ajay Arumugam\\n");
  return 0;
}`,
  csharp: `using System;

class Program {
    static void Main() {
    Console.WriteLine("Welcome To CODE IDE Created By Ajay Arumugam");
  }
}`,
  html: `<!DOCTYPE html>
<html>
  <head>
    <title>Hello</title>
    <link rel="stylesheet" href="style.css"/>
  </head>
  <body>
    <h1>Welcome To CODE IDE Created By Ajay Arumugam</h1>
    <script src="app.js"></script>
  </body>
</html>`,
  css: `body {
  background: #121212;
  color: white;
  font-family: sans-serif;
}`,
};

// Helper to map extensions → languages
function getStarterCode(lang) {
  const map = {
    js: "javascript",
    jsx: "javascript",
    ts: "typescript",
    tsx: "typescript",
    py: "python",
    java: "java",
    cpp: "cpp",
    c: "c",
    cs: "csharp",
    html: "html",
    css: "css",
  };

  const normalized = map[lang] || lang;
  return starterTemplates[normalized] || `// Start coding in ${normalized}...`;
}

// ✅ Function to build final HTML output with CSS + JS injected
function generateBrowserOutput(files) {
  const htmlFile = files.find((f) => f.name.endsWith(".html"));
  const cssFile = files.find((f) => f.name.endsWith(".css"));
  const jsFile = files.find((f) => f.name.endsWith(".js"));

  if (!htmlFile) return "No HTML file found";

  let finalHtml = htmlFile.content;

  // Replace <link rel="stylesheet" href="...">
  if (cssFile) {
    finalHtml = finalHtml.replace(
      /<link[^>]+href=["'].*style\.css["'][^>]*>/i,
      `<style>${cssFile.content}</style>`
    );
  }

  // Replace <script src="...">
  if (jsFile) {
    finalHtml = finalHtml.replace(
      /<script[^>]+src=["'].*\.js["'][^>]*><\/script>/i,
      `<script>${jsFile.content}</script>`
    );
  }

  return finalHtml;
}

export default function EditorMonaco() {
  const { activeFile, setActiveFile, setFiles, setOutput, files } = useProject();
  const [editorValue, setEditorValue] = useState("");
  const [theme, setTheme] = useState("vs-dark");

  // Load file content
  useEffect(() => {
    if (!activeFile) {
      setEditorValue("");
      return;
    }
    const lang =
      activeFile.language || (activeFile.name?.split(".").pop() || "plaintext");
    const starter = getStarterCode(lang);
    setEditorValue(
      activeFile.content && activeFile.content.length > 0
        ? activeFile.content
        : starter
    );
  }, [activeFile]);

  // ✅ CTRL+S = Save
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "s") {
        e.preventDefault();
        handleSaveNow();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  });

  if (!activeFile) {
    return (
      <div className="h-full flex items-center justify-center text-gray-400">
        Select or create a file to start editing
      </div>
    );
  }

  // ✅ Manual Save
  const handleSaveNow = async () => {
    try {
      await axios.put(`/files/${activeFile._id}`, { content: editorValue });
      setFiles((prev) =>
        prev.map((f) =>
          f._id === activeFile._id ? { ...f, content: editorValue } : f
        )
      );
      setActiveFile((prev) =>
        prev && prev._id === activeFile._id
          ? { ...prev, content: editorValue }
          : prev
      );
      toast.success("Saved");
    } catch (err) {
      toast.error("Save failed");
    }
  };

  // ✅ Run Button
  const handleRun = async () => {
    if (!activeFile) return;

    // 🔥 If front-end project → inject HTML + CSS + JS
    if (["html", "css", "javascript"].includes(activeFile.language)) {
      const finalHtml = generateBrowserOutput(files);
      setOutput(`<iframe
        style="width:100%; height:100%; border:none; background:white;"
        srcdoc="${finalHtml.replace(/"/g, "&quot;")}"
      ></iframe>`);
      return;
    }

    // ✅ For backend languages → send to server
    try {
      setOutput(":::loading:::");
      const { data } = await axios.post("/run", {
        language: activeFile.language,
        code: editorValue,
      });
      setOutput(data.output || "");
    } catch (err) {
      setOutput("❌ Error running code");
    }
  };

  return (
    <div className="h-full flex flex-col border border-gray-700 rounded-2xl overflow-hidden shadow-lg">
      {/* Title bar */}
      <div className="flex items-center justify-between px-4 py-2 bg-gray-800 text-gray-200">
        <div className="text-sm font-mono">
          {activeFile.name} — {activeFile.language}
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() =>
              setTheme((prev) => (prev === "vs-dark" ? "light" : "vs-dark"))
            }
            className="px-3 py-1 rounded bg-cyan-600 hover:bg-cyan-500 text-sm"
          >
            {theme === "vs-dark" ? "Light" : "Dark"}
          </button>
          <button
            onClick={handleSaveNow}
            className="px-3 py-1 rounded bg-gray-700 hover:bg-gray-600 text-sm"
          >
            Save
          </button>
          <button
            onClick={handleRun}
            className="px-3 py-1 rounded bg-green-600 hover:bg-green-500 text-sm"
          >
            Run ▶
          </button>
        </div>
      </div>

      {/* Editor */}
      <div className="flex-1 min-h-0">
        <MonacoEditor
          height="350px"
          theme={theme}
          language={activeFile.language || "plaintext"}
          value={editorValue}
          onChange={(val) => setEditorValue(val || "")}
          options={{
            minimap: { enabled: false },
            fontSize: 14,
            automaticLayout: true,
            wordWrap: "on",
          }}
        />
      </div>
    </div>
  );
}