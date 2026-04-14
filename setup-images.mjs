import fs from 'fs';
import path from 'path';

const dir = path.join(process.cwd(), 'public', 'images');
if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir, { recursive: true });
}

const svgs = {
  'page-1.svg': `<svg width="800" height="600" viewBox="0 0 800 600" xmlns="http://www.w3.org/2000/svg"><rect width="800" height="600" fill="#fdf6e3"/><circle cx="400" cy="300" r="150" fill="#ffd180" opacity="0.5"/><path d="M300 400 L500 400 L450 250 L350 250 Z" fill="#8b5a2b" opacity="0.8"/><text x="400" y="500" font-family="serif" font-size="24" fill="#5c3a21" text-anchor="middle">Leo Reading</text></svg>`,
  'page-2.svg': `<svg width="800" height="600" viewBox="0 0 800 600" xmlns="http://www.w3.org/2000/svg"><rect width="800" height="600" fill="#f4ecd8"/><rect x="250" y="200" width="300" height="200" fill="#6d4c41" rx="10"/><rect x="270" y="220" width="260" height="160" fill="#8d6e63" rx="5"/><text x="400" y="310" font-family="serif" font-size="24" fill="#fff" text-anchor="middle">Old Dictionary</text></svg>`,
  'page-3.svg': `<svg width="800" height="600" viewBox="0 0 800 600" xmlns="http://www.w3.org/2000/svg"><rect width="800" height="600" fill="#e8f5e9"/><rect x="200" y="150" width="400" height="300" fill="#ffffff" rx="10" stroke="#c8e6c9" stroke-width="4"/><line x1="250" y1="200" x2="550" y2="200" stroke="#a5d6a7" stroke-width="4"/><line x1="250" y1="250" x2="500" y2="250" stroke="#a5d6a7" stroke-width="4"/><path d="M550 400 L600 350 L620 370 L570 420 Z" fill="#ffcc80"/><text x="400" y="400" font-family="serif" font-size="24" fill="#388e3c" text-anchor="middle">Learning Words</text></svg>`,
  'page-4.svg': `<svg width="800" height="600" viewBox="0 0 800 600" xmlns="http://www.w3.org/2000/svg"><rect width="800" height="600" fill="#e3f2fd"/><circle cx="300" cy="300" r="80" fill="#ffab91"/><circle cx="500" cy="300" r="80" fill="#ce93d8"/><path d="M250 400 Q400 450 550 400" fill="none" stroke="#64b5f6" stroke-width="10" stroke-linecap="round"/><text x="400" y="500" font-family="serif" font-size="24" fill="#1976d2" text-anchor="middle">Saying Hello</text></svg>`,
  'page-5.svg': `<svg width="800" height="600" viewBox="0 0 800 600" xmlns="http://www.w3.org/2000/svg"><rect width="800" height="600" fill="#fff3e0"/><ellipse cx="400" cy="400" rx="250" ry="80" fill="#ffcc80"/><circle cx="300" cy="380" r="40" fill="#ffab91"/><circle cx="500" cy="380" r="40" fill="#ffab91"/><circle cx="400" cy="350" r="50" fill="#ce93d8"/><text x="400" y="200" font-family="serif" font-size="24" fill="#e65100" text-anchor="middle">Sharing &amp; Laughing</text></svg>`,
  'page-6.svg': `<svg width="800" height="600" viewBox="0 0 800 600" xmlns="http://www.w3.org/2000/svg"><rect width="800" height="600" fill="#ede7f6"/><circle cx="400" cy="300" r="150" fill="#90caf9"/><circle cx="400" cy="300" r="170" fill="none" stroke="#b39ddb" stroke-width="4" stroke-dasharray="10 10"/><path d="M300 250 Q400 350 500 250" fill="none" stroke="#fff" stroke-width="8" stroke-linecap="round"/><text x="400" y="520" font-family="serif" font-size="24" fill="#512da8" text-anchor="middle">Boundless World</text></svg>`,
  'fallback-illustration.svg': `<svg width="800" height="600" viewBox="0 0 800 600" xmlns="http://www.w3.org/2000/svg"><rect width="800" height="600" fill="#fdfbf7"/><rect x="250" y="200" width="300" height="200" fill="#e2d9c8" rx="10"/><text x="400" y="310" font-family="serif" font-size="24" fill="#8b5a2b" text-anchor="middle">Illustration</text></svg>`
};

for (const [filename, content] of Object.entries(svgs)) {
  fs.writeFileSync(path.join(dir, filename), content);
}
console.log('Images generated successfully.');
