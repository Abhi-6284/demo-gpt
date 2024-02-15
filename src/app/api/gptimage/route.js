import { NextResponse } from "next/server";
import OpenAI from "openai";

// pages/api/correct-code.js
export async function POST(req, res) {
  try {
    const { text, size } = await req.json();
    const apiKey = process.env.OPENAI_API;
    // console.log(apiKey);
    const imagesize = size ? size : 256;

    const openai = new OpenAI();

    const image = await openai.images.generate({
      //   model: "dall-e-3",
      prompt: text,
      n: 1,
      size: `${imagesize}x${imagesize}`,
    });
    // "1024x1024" 256, 512

    console.log(image.data);
    return NextResponse.json({ message: image.data[0].url });
  } catch (error) {
    console.error("Error:", error);
    // res.status(500).json({ error: "Internal Server Error" });
  }
}
