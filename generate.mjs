import { GoogleGenAI } from '@google/genai';
import fs from 'fs';
import path from 'path';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

const prompts = [
  { id: 1, prompt: "A young boy reading a book, children's storybook illustration, soft colors, warm lighting, simple cartoon style" },
  { id: 2, prompt: "A dusty attic with an old dictionary, children's illustration, cozy and warm, soft textures, storybook style" },
  { id: 3, prompt: "A child writing in a notebook, learning new words, colorful pencils, children's book illustration style" },
  { id: 4, prompt: "Children from different cultures greeting each other, smiling, friendly, storybook illustration style" },
  { id: 5, prompt: "Friends sharing food and laughing together, warm and joyful, children's storybook illustration" },
  { id: 6, prompt: "A magical glowing globe connecting people around the world, children's illustration, soft and inspiring" }
];

async function generate() {
  const dir = path.join(process.cwd(), 'public', 'illustrations');
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  for (const p of prompts) {
    console.log(`Generating image for page ${p.id}...`);
    try {
      const response = await ai.models.generateImages({
        model: 'imagen-3.0-generate-002',
        prompt: p.prompt,
        config: {
          numberOfImages: 1,
          outputMimeType: 'image/jpeg',
          aspectRatio: '4:3'
        }
      });
      const base64 = response.generatedImages[0].image.imageBytes;
      fs.writeFileSync(path.join(dir, `page${p.id}.jpg`), Buffer.from(base64, 'base64'));
      console.log(`Saved page${p.id}.jpg`);
    } catch (e) {
      console.error(`Failed page ${p.id}:`, e);
    }
  }
}

generate();
