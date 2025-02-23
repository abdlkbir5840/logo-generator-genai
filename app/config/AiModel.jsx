const {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} = require("@google/generative-ai");

const apiKey = process.env.GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-2.0-flash",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 8192,
  responseMimeType: "application/json",
};

export const AIDesignIdea = model.startChat({
  generationConfig,
  history: [
    {
      role: "user",
      parts: [
        {
          text: "Based on Logo of type Custom Luxury Logo Designs Generate a text prompt to create Logo for Logo title/Brand name : software developer with decription: create logo for software developer, dark, use code icon and refering to prompt: Create a set of luxurious, elegant, and professional logos with a gold metallic finish on a dark background. Include a variety of themes, such as animals, letters, symbols, and nature-inspired designs. Each logo should convey sophistication, premium quality, and modern aesthetics, suitable for any brand or industry.. Give me 4/5 Suggestion of logo idea (each idea with maximum 4-5 words), Result in JSON format with ideas feild\n",
        },
      ],
    },
    {
      role: "model",
      parts: [
        {
          text: '```json\n{\n  "ideas": [\n    "Golden Code Serpent",\n    "Abstract Metallic Code Glyph",\n    "Dark Hexagon Code",\n    "Gilded Binary Tree",\n    "Elegant Code Swan"\n  ]\n}\n```',
        },
      ],
    },
  ],
});


export const AILogoPrompt = model.startChat({
  generationConfig,
  history: [
    {
      role: "user",
      parts: [
        {text: "Generate a text prompt to create Logo for Logo Title/Brand name : AI,with description: AI, with Color combination of Ocean Blues, also include the {logoIdea} and include Cartoon Logo design idea and Referring to this Logo Prompt:Create a set of vibrant, playful logo designs featuring cartoon-style characters with puns or witty text. Each logo should include a cute anthropomorphic object, animal, or food item with expressive features like sunglasses, hats, or smiles, combined with a short, pun-based slogan. Use bold colors, clean lines, and retro aesthetics, ensuring the design is eye-catching and cheerful. Place each logo against a dark background to make the colors pop  Give me result in JSON portal with prompt field only"},
      ],
    },
    {
      role: "model",
      parts: [
        {text: "```json\n{\n  \"prompt\": \"Cartoon Logo design for AI: A friendly, cartoon-style depiction of an AI robot or brain character, designed with ocean blues color palette. Include a {logoIdea} element, such as a lightbulb or circuit board motif integrated into the character's design. The design should be vibrant, playful, with clean lines and retro aesthetics, incorporating expressive features like a smiling face. Set against a dark background to emphasize the ocean blues color combination. Referring to the prompt: Create a set of vibrant, playful logo designs featuring cartoon-style characters with puns or witty text. Each logo should include a cute anthropomorphic object, animal, or food item with expressive features like sunglasses, hats, or smiles, combined with a short, pun-based slogan. Use bold colors, clean lines, and retro aesthetics, ensuring the design is eye-catching and cheerful. Place each logo against a dark background to make the colors pop.\"\n}\n```\n"},
      ],
    },
  ],
});