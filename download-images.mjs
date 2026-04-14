import fs from 'fs';
import path from 'path';

const prompts = [
  "A young boy reading a book in a cozy room, warm lighting, children's storybook illustration, detailed, soft shadows, painterly style, highly detailed children's storybook illustration, not icon, not flat design",
  "A cozy attic filled with old objects, a young boy discovering a dusty old dictionary, warm light coming through a small window, children's storybook illustration, detailed, soft shadows, painterly style, highly detailed children's storybook illustration, not icon, not flat design",
  "A young boy sitting at a desk writing words in a notebook, colorful pencils around, focused expression, warm lighting, children's book illustration, detailed and soft, highly detailed children's storybook illustration, not icon, not flat design",
  "Children from different cultures smiling and greeting each other, friendly and warm atmosphere, outdoor setting, detailed children's storybook illustration, highly detailed children's storybook illustration, not icon, not flat design",
  "A group of friends sharing food and laughing together, joyful and warm scene, soft lighting, detailed children's book illustration, highly detailed children's storybook illustration, not icon, not flat design",
  "A magical glowing globe connecting people around the world with light, children holding hands, warm and inspiring, detailed storybook illustration, highly detailed children's storybook illustration, not icon, not flat design"
];

const dir = path.join(process.cwd(), 'public', 'images');
if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir, { recursive: true });
}

async function main() {
  for (let i = 0; i < prompts.length; i++) {
    const filepath = path.join(dir, `page-${i + 1}.jpg`);
    if (fs.existsSync(filepath)) {
      console.log(`Skipping page-${i + 1}.jpg`);
      continue;
    }
    const prompt = prompts[i];
    const encodedPrompt = encodeURIComponent(prompt);
    const url = `https://image.pollinations.ai/prompt/${encodedPrompt}?width=800&height=600&nologo=true&seed=42`;
    console.log(`Downloading page-${i + 1}.jpg...`);
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      const arrayBuffer = await response.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      fs.writeFileSync(filepath, buffer);
      console.log(`Saved page-${i + 1}.jpg`);
    } catch (e) {
      console.error(`Failed to download page-${i + 1}.jpg:`, e);
    }
  }

  const fallbackFilepath = path.join(dir, `fallback-illustration.jpg`);
  if (!fs.existsSync(fallbackFilepath)) {
    const fallbackPrompt = "A beautiful open storybook with glowing magical pages, highly detailed children's storybook illustration, not icon, not flat design";
    const encodedFallback = encodeURIComponent(fallbackPrompt);
    const fallbackUrl = `https://image.pollinations.ai/prompt/${encodedFallback}?width=800&height=600&nologo=true&seed=42`;
    console.log(`Downloading fallback-illustration.jpg...`);
    try {
      const response = await fetch(fallbackUrl);
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      const arrayBuffer = await response.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      fs.writeFileSync(fallbackFilepath, buffer);
      console.log(`Saved fallback-illustration.jpg`);
    } catch (e) {
      console.error(`Failed to download fallback-illustration.jpg:`, e);
    }
  }
}

main();
