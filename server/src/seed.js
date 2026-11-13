import "dotenv/config";
import mongoose from "mongoose";
import Post from "./models/Post.js";

const samples = [
  { title: "The elevator pitch every young founder should know", excerpt: "A clear idea deserves a clear story. Learn to explain the problem, your solution and why it matters.", content: "A strong elevator pitch starts with the problem, not the product. Explain who experiences the problem, why current solutions fall short, and how your idea creates a better outcome. Keep the language simple, focus on one clear benefit, and finish with the next step you want your listener to take.", category: "Founder Mindset", readTime: 3 },
  { title: "How to build your first product team", excerpt: "You do not need a big team to start. You need the right mix of curiosity, ownership and momentum.", content: "Your first product team should be small, curious and clear about ownership. Start by identifying the skills needed to validate the idea, design a useful experience and ship a first version. Choose collaborators who communicate openly, learn quickly and care about the problem.", category: "Building", readTime: 4 },
  { title: "From a rough idea to a working MVP", excerpt: "A practical path to validate an idea, prototype the experience and put a useful first version in users’ hands.", content: "An MVP is the smallest useful version of a product that helps you learn from real users. Interview potential users, define one core problem, map the simplest flow, and build only the features needed to test your assumption. Share it early, listen carefully and improve based on evidence.", category: "Product", readTime: 5 }
];
try {
  if (!process.env.MONGODB_URI) throw new Error("MONGODB_URI is missing");
  await mongoose.connect(process.env.MONGODB_URI);
  for (const item of samples) {
    const exists = await Post.findOne({ title: item.title });
    if (!exists) await Post.create(item);
  }
  console.log("Sample blog posts are ready.");
} catch (error) { console.error(error.message); process.exitCode = 1; }
finally { await mongoose.disconnect(); }
