
import express from "express";
import { supabase } from "./supabaseClient.js";

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Jiji Backend Running 🚀");
});

app.post("/ask-jiji", async (req, res) => {
  try {
    const { question, topic } = req.body;

    if (!question || typeof question !== "string") {
      return res.status(400).json({ error: "Valid question is required" });
    }

    const userId = "00000000-0000-0000-0000-000000000001";

    await supabase.from("queries").insert({
      user_id: userId,
      question: question.trim()
    });

    const searchTerm = topic || question;

    const { data: resources, error } = await supabase
      .from("resources")
      .select("*")
      .ilike("topic", `%${searchTerm}%`)
      .limit(2);

    if (error) throw error;

    const answer = `Here’s a simple explanation about "${question}". 
RAG (Retrieval-Augmented Generation) is a technique where an AI model retrieves relevant information before generating a response.`;

    res.status(200).json({
      success: true,
      answer,
      resources: resources?.map(r => ({
        title: r.title,
        description: r.description,
        ppt: r.ppt_url,
        video: r.video_url
      }))
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.listen(process.env.PORT, () =>
  console.log(`Server running on port ${process.env.PORT}`)
);
