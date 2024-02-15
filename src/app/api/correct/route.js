import { NextResponse } from "next/server";
import OpenAI from "openai";

// pages/api/correct-code.js
export async function POST(req, res) {
  try {
    const { text } = await req.json();
    const apiKey = process.env.OPENAI_API;
    const apiUrl = "your_model_api_endpoint";
    // console.log(apiKey);

    const openai = new OpenAI();

    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "user",
          content: text,
        },
      ],
      temperature: 0.7,
      max_tokens: 100,
      top_p: 1,
    });

    console.log(response.choices[0].message.content);
    return NextResponse.json({ message: response.choices[0].message.content });
  } catch (error) {
    console.error("Error:", error);
    // res.status(500).json({ error: "Internal Server Error" });
  }
}
