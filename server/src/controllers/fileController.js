import File from "../models/File.js";

export const createFile = async (req, res) => {
  try {
    const file = await File.create({
      name: req.body.name,
      language: req.body.language,
      project: req.body.projectId
    });
    res.status(201).json(file);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getFiles = async (req, res) => {
  try {
    const { projectId } = req.query;  // ✅ query param
    if (!projectId) {
      return res.status(400).json({ message: "Project ID is required" });
    }

    const files = await File.find({ project: projectId });
    res.json(files);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getFile = async (req, res) => {
  try {
    const file = await File.findById(req.params.id);
    if (!file) return res.status(404).json({ message: "File not found" });
    res.json(file);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const updateFile = async (req, res) => {
  try {
    const file = await File.findByIdAndUpdate(
      req.params.id,
      { content: req.body.content },
      { new: true }
    );
    if (!file) return res.status(404).json({ message: "File not found" });
    res.json(file);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const deleteFile = async (req, res) => {
  try {
    await File.findByIdAndDelete(req.params.id);
    res.json({ message: "File deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};