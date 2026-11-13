import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true, maxlength: 120 },
  excerpt: { type: String, required: true, trim: true, maxlength: 260 },
  content: { type: String, required: true, trim: true },
  category: { type: String, default: "Founder Stories", trim: true },
  readTime: { type: Number, default: 4, min: 1, max: 60 },
  coverImage: { type: String, default: "" },
  slug: { type: String, unique: true, index: true },
  published: { type: Boolean, default: true }
}, { timestamps: true });

postSchema.pre("validate", async function () {
  if (!this.slug && this.title) {
    const base = this.title.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
    this.slug = `${base}-${Date.now().toString(36)}`;
  }
});

export default mongoose.model("Post", postSchema);
