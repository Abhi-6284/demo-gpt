import fs, { writeFile } from "fs";
import sharp from "sharp";
import OpenAI, { toFile } from "openai";
import { NextResponse } from "next/server";

// pages/api/correct-code.js
export async function POST(request) {
  try {
    // const { fileBuffer, size } = await req.json();
    const data = await request.formData();
    const cfile = data.get("file");
    const size = data.get("size");

    const byteData = await cfile?.arrayBuffer();
    const buffer = Buffer.from(byteData);

    const apiKey = process.env.OPENAI_API;
    const imageSize = size ? parseInt(size, 10) : 256; // Convert size to integer

    const openai = new OpenAI();

    // console.log("file:: ", file);
    console.log("size:: ", imageSize);

    // Resize the image using sharp
    const resizedBuffer = await sharp(buffer).resize({ width: 40 }).toBuffer();

    // const file = resizedBuffer;

    const imageName = `image${Math.floor(Math.random() * 100000) + 1}.png`;
    console.log("buffer :: ", buffer);
    const path = `public/${imageName}`;
    console.log("Path :: ", path);
    // await writeFile(path, buffer);
    writeFile(path, buffer, (err) => {
      if (err) throw err;
      console.log("The file has been saved!");
    });
    const image = await openai.images.createVariation({
      image: fs.createReadStream(path),
    });
    // console.log(image.data);
    // "1024x1024" 256, 512

    // console.log("=>", image);
    return NextResponse.json({ message: image.data[0].url });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error", details: error.message },
      { status: 500 }
    );
  }
}
