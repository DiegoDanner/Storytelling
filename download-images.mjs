import fs from 'fs';
import path from 'path';

const prompts = [
  "A young boy standing on a front porch at night, clutching a blue suitcase, tall pine trees swaying in the background, children's storybook illustration, detailed, soft shadows, painterly style, highly detailed children's storybook illustration, not icon, not flat design",
  "A warm and cozy doorway, a kind grandmother with white hair in a green cardigan opening the door to welcome a young boy, golden light spilling out, children's storybook illustration, detailed, soft shadows, painterly style, highly detailed children's storybook illustration, not icon, not flat design",
  "A cozy kitchen bathed in warm sunlight, a grandmother handing a long wooden spoon to a young boy, baking together, children's storybook illustration, detailed, soft shadows, painterly style, highly detailed children's storybook illustration, not icon, not flat design",
  "A young boy laughing joyfully in a kitchen, holding a glass jar of sugar, a cloud of white flour puffing into the air around him, children's storybook illustration, detailed, soft shadows, painterly style, highly detailed children's storybook illustration, not icon, not flat design",
  "A grandmother and a young boy sitting together in a large red velvet armchair by a fireplace, reading a large blue book with gold details, children's storybook illustration, detailed, soft shadows, painterly style, highly detailed children's storybook illustration, not icon, not flat design",
  "A young boy sitting on a rug, pointing at a large shadow of a friendly dragon cast on the wall by a warm lamp, children's storybook illustration, detailed, soft shadows, painterly style, highly detailed children's storybook illustration, not icon, not flat design",
  "A young boy in blue pajamas hugging a brown teddy bear, standing nervously in a dark hallway, moonlight shining through a window, children's storybook illustration, detailed, soft shadows, painterly style, highly detailed children's storybook illustration, not icon, not flat design",
  "A grandmother kneeling to show a young boy a glowing glass lantern with a candle inside, warm amber light, dark hallway, children's storybook illustration, detailed, soft shadows, painterly style, highly detailed children's storybook illustration, not icon, not flat design",
  "A young boy sleeping peacefully in bed, hugging a brown teddy bear, a glowing lantern on the nightstand casting warm light, children's storybook illustration, detailed, soft shadows, painterly style, highly detailed children's storybook illustration, not icon, not flat design"
];

const dir = path.join(process.cwd(), 'public', 'images');
if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir, { recursive: true });
}

async function main() {
  // Generate Cover
  const coverFilepath = path.join(dir, `cover.jpg`);
  if (!fs.existsSync(coverFilepath)) {
    const coverPrompt = "A grandmother and a young boy baking together in a sunny kitchen, the boy is pouring flour into a bowl, warm and joyful, children's storybook illustration, detailed, soft shadows, painterly style, highly detailed children's storybook illustration, not icon, not flat design";
    const encodedCover = encodeURIComponent(coverPrompt);
    const coverUrl = `https://image.pollinations.ai/prompt/${encodedCover}?width=800&height=1000&nologo=true&seed=42`;
    console.log(`Downloading cover.jpg...`);
    try {
      const response = await fetch(coverUrl);
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      const arrayBuffer = await response.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      fs.writeFileSync(coverFilepath, buffer);
      console.log(`Saved cover.jpg`);
    } catch (e) {
      console.error(`Failed to download cover.jpg:`, e);
    }
  }

  for (let i = 0; i < prompts.length; i++) {
    const filepath = path.join(dir, `page-${i + 1}.jpg`);
    // We want to overwrite the old images since the story changed
    const prompt = prompts[i];
    const encodedPrompt = encodeURIComponent(prompt);
    const url = `https://image.pollinations.ai/prompt/${encodedPrompt}?width=800&height=1000&nologo=true&seed=42`;
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
    const fallbackUrl = `https://image.pollinations.ai/prompt/${encodedFallback}?width=800&height=1000&nologo=true&seed=42`;
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
