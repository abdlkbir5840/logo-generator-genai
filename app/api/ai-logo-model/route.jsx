import { AILogoPrompt } from "@/app/config/AiModel";
import prisma from "@/app/config/db";
import axios from "axios";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    // generate AI Text Prompt for logo
    const { prompt, title, desc, userId } = await req.json();

    if (!prompt) {
      return NextResponse.json(
        { error: "Prompt is required" },
        { status: 400 }
      );
    }

    const result = await AILogoPrompt.sendMessage(prompt);

    const responseText = await result.response.text();

    // Parse the response as JSON
    let jsonResponse;
    try {
      jsonResponse = JSON.parse(responseText);
    } catch (parseError) {
      console.error("Failed to parse JSON:", parseError);
      return NextResponse.json(
        { error: "Invalid JSON response from AI model" },
        { status: 500 }
      );
    }
    const generatePrompt = jsonResponse.prompt;
    // console.log(generatePrompt);
    // generate logo image from ai model
    const response = await axios.post(
      "https://router.huggingface.co/hf-inference/models/strangerzonehf/Flux-Midjourney-Mix2-LoRA",
      generatePrompt,
      {
        headers: {
          Authorization: "Bearer " + process.env.HUGGING_FACE_API_KEY,
          "Content-Type": "application/json",
        },
        responseType: "arraybuffer",
      }
    );
    //convert to base46 image
    const imageBuffer = Buffer.from(response.data, "binary").toString("base64");
    const base64ImageWithMime = `data:image/png;base64,${imageBuffer}`;
    //save to database
    await prisma.logo.create({
      data: {
        title: title,
        description: desc,
        userId: userId,
        image: base64ImageWithMime,
      },
    });

    // Return the generated image as a response
    return NextResponse.json({ image: base64ImageWithMime });
  } catch (error) {
    console.error("Error processing request:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
