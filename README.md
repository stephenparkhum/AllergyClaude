# Allergy Agents

An AI-powered web application that analyzes food ingredient photos to detect allergens and help users make informed decisions about food safety.

## Features

- 📸 Upload photos of food ingredient labels
- 🤖 AI-powered ingredient analysis using Google Gemini vision models
- ⚠️ Real-time allergen detection based on user's allergies
- 🎨 Minimal dashboard UI with widgets built using HeroUI
- 🌙 Light/Dark theme toggle
- 📱 Responsive design optimized for mobile and desktop
- ✨ Lucide icons throughout the interface
- 🎯 Typography: Oswald for headings, Quattrocento for body text

## Tech Stack

- **Frontend**: Next.js 15 with TypeScript
- **UI Components**: HeroUI with dashboard widget layout
- **Icons**: Lucide React icons
- **Themes**: Next-themes for light/dark mode
- **Typography**: Oswald & Quattrocento Google Fonts
- **AI Integration**: Vercel AI SDK with Google Gemini
- **Styling**: Tailwind CSS
- **Image Processing**: Drag-and-drop upload with preview

## Setup Instructions

1. **Clone and install dependencies:**
   ```bash
   cd allergy-agents
   npm install
   ```

2. **Set up environment variables:**
   ```bash
   cp .env.example .env.local
   ```
   
   Then edit `.env.local` and add your API key:
   ```
   GOOGLE_GENERATIVE_AI_API_KEY=your_google_ai_api_key_here
   ```
   
   Or if using other providers:
   ```
   ANTHROPIC_API_KEY=your_anthropic_api_key_here
   OPENAI_API_KEY=your_openai_api_key_here
   ```

3. **Run the development server:**
   ```bash
   npm run dev
   ```

4. **Open in browser:**
   Navigate to [http://localhost:3000](http://localhost:3000)

## How to Use

1. **Enter your allergies** in the text area (e.g., "peanuts, shellfish, dairy")
2. **Upload a photo** of food ingredient labels by:
   - Clicking the upload area and selecting a file
   - Dragging and dropping an image
3. **Click "Analyze Ingredients"** to get AI-powered analysis
4. **Review results** showing:
   - Whether the food is safe for you
   - Detected allergens that match your allergies
   - Complete ingredient list
   - Detailed analysis and recommendations

## API Configuration

The app uses the Vercel AI SDK and can work with:
- **Google Gemini** (currently configured, excellent for vision tasks)
- **Anthropic Claude** (recommended alternative for vision tasks)
- **OpenAI GPT-4 Vision**

Update the model in `src/app/api/analyze/route.ts` if needed.

## Building for Production

```bash
npm run build
npm start
```

## License

MIT License