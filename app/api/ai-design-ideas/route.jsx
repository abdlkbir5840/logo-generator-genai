import { AIDesignIdea } from "@/app/config/AiModel";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { prompt } = await req.json();

    if (!prompt) {
      return NextResponse.json({ error: "Prompt is required" }, { status: 400 });
    }

    const result = await AIDesignIdea.sendMessage(prompt);

    const responseText = await result.response.text();

    // Parse the response as JSON
    let jsonResponse;
    try {
      jsonResponse = JSON.parse(responseText); 
    } catch (parseError) {
      console.error("Failed to parse JSON:", parseError);
      return NextResponse.json({ error: "Invalid JSON response from AI model" }, { status: 500 });
    }

    return NextResponse.json(jsonResponse.ideas);
  } catch (error) {
    console.error("Error processing request:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}