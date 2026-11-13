import { Router } from "express";
import mongoose from "mongoose";
import Post from "../models/Post.js";

const router = Router();
const clean = (body) => ({
  title: String(body.title || "").trim(),
  excerpt: String(body.excerpt || "").trim(),
  content: String(body.content || "").trim(),
  category: String(body.category || "Founder Stories").trim(),
  readTime: Number(body.readTime || 4),
  coverImage: String(body.coverImage || "").trim(),
  published: body.published !== false
});
function validate(data) {
  if (!data.title || data.title.length < 4) return "Title must contain at least 4 characters.";
  if (!data.excerpt || data.excerpt.length < 10) return "Excerpt must contain at least 10 characters.";
  if (!data.content || data.content.length < 20) return "Content must contain at least 20 characters.";
  if (!Number.isFinite(data.readTime) || data.readTime < 1 || data.readTime > 60) return "Read time must be between 1 and 60 minutes.";
  return null;
}

// Public: list published posts. Add ?all=true for the admin list.
router.get("/", async (req, res, next) => {
  try {
    const filter = req.query.all === "true" ? {} : { published: true };
    const posts = await Post.find(filter).sort({ createdAt: -1 }).lean();
    res.json({ success: true, count: posts.length, data: posts });
  } catch (e) { next(e); }
});
router.get("/:id", async (req, res, next) => {
  try {
    const query = mongoose.isValidObjectId(req.params.id) ? { _id: req.params.id } : { slug: req.params.id };
    const post = await Post.findOne(query);
    if (!post) return res.status(404).json({ success: false, message: "Post not found." });
    res.json({ success: true, data: post });
  } catch (e) { next(e); }
});
router.post("/", async (req, res, next) => {
  try {
    const data = clean(req.body);
    const problem = validate(data);
    if (problem) return res.status(400).json({ success: false, message: problem });
    const post = await Post.create(data);
    res.status(201).json({ success: true, message: "Post created.", data: post });
  } catch (e) { next(e); }
});
router.put("/:id", async (req, res, next) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) return res.status(400).json({ success: false, message: "Invalid post id." });
    const data = clean(req.body);
    const problem = validate(data);
    if (problem) return res.status(400).json({ success: false, message: problem });
    const post = await Post.findByIdAndUpdate(req.params.id, data, { new: true, runValidators: true });
    if (!post) return res.status(404).json({ success: false, message: "Post not found." });
    res.json({ success: true, message: "Post updated.", data: post });
  } catch (e) { next(e); }
});
router.delete("/:id", async (req, res, next) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) return res.status(400).json({ success: false, message: "Invalid post id." });
    const post = await Post.findByIdAndDelete(req.params.id);
    if (!post) return res.status(404).json({ success: false, message: "Post not found." });
    res.json({ success: true, message: "Post deleted." });
  } catch (e) { next(e); }
});
export default router;
