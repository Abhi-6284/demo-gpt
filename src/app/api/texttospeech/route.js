import fs from "fs/promises"; // Updated import to use fs.promises
import OpenAI from "openai";
import { NextResponse } from "next/server";
import path from "path";

export async function POST(request) {
  try {
    const { text } = await request.json();
    const apiKey = process.env.OPENAI_API_KEY;

    // Check if the API key is available
    if (!apiKey) {
      return NextResponse.json(
        { error: "Missing OpenAI API Key" },
        { status: 400 }
      );
    }

    const openai = new OpenAI({ apiKey }); // Pass the API key to OpenAI constructor

    console.log("text:: ", text);

    const mp3FileName = `${Math.floor(Math.random() * 100000) + 1}`;
    const speechFile = path.resolve(`./public/audio/${mp3FileName}.mp3`);

    try {
      const mp3 = await openai.audio.speech.create({
        model: "tts-1",
        voice: "alloy",
        input: "Today is a wonderful day to build something people love!",
      });

      const buffer = Buffer.from(await mp3.arrayBuffer());
      await fs.writeFile(speechFile, buffer);

      return NextResponse.json({ message: "Speech generated successfully" });
    } catch (apiError) {
      console.error("OpenAI API Error:", apiError);
      return NextResponse.json(
        { error: "OpenAI API Error", details: apiError.message },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error", details: error.message },
      { status: 500 }
    );
  }
}
