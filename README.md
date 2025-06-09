# Allergy Agents

An AI-powered web application that analyzes food ingredient photos to detect allergens and help users make informed decisions about food safety.

## Features

- 📸 Upload photos of food ingredient labels with drag-and-drop support
- 🤖 AI-powered ingredient analysis using Google Gemini vision models
- ⚠️ Real-time allergen detection based on user's allergies
- 🎨 Modern UI with Material-UI components and custom design system
- 🌙 Light/Dark theme toggle with system preference detection
- 📱 Fully responsive design optimized for mobile and desktop
- ✨ Lucide React icons throughout the interface
- 🎯 Typography: Source Sans Pro with Playfair Display accents
- 🏠 Professional landing page with marketing content
- 📊 Comprehensive results dashboard with tabbed interface
- 🧪 Complete Jest test coverage for all components

## Tech Stack

- **Frontend**: Next.js 15 with TypeScript and App Router
- **UI Components**: Material-UI (MUI) with custom theme system
- **Icons**: Lucide React icons
- **Themes**: Custom CSS variables with light/dark mode support
- **Typography**: Source Sans Pro & Playfair Display Google Fonts
- **AI Integration**: Vercel AI SDK with Google Gemini vision models
- **Styling**: Tailwind CSS with CSS custom properties
- **Image Processing**: Next.js Image component with base64 conversion
- **Testing**: Jest with React Testing Library
- **Code Quality**: ESLint with TypeScript rules

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
   - Main analyzer: [http://localhost:3000](http://localhost:3000)
   - Landing page: [http://localhost:3000/landing](http://localhost:3000/landing)
   - How-to guide: [http://localhost:3000/how-to](http://localhost:3000/how-to)

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

## Testing

Run the test suite:

```bash
npm test                 # Run all tests
npm run test:watch      # Run tests in watch mode
npm run test:coverage   # Run tests with coverage report
```

Test specific files:
```bash
npm test Landing        # Test landing page
npm test Navigation     # Test navigation component
```

## Building for Production

```bash
npm run build
npm start
```

## Development Commands

```bash
npm run dev              # Start dev server with Turbopack
npm run build           # Build for production
npm run start           # Start production server
npm run lint            # Run ESLint
npm run test            # Run Jest tests
npm run test:watch      # Run tests in watch mode
npm run test:coverage   # Run tests with coverage
```

## Project Structure

```
src/
├── app/                 # Next.js App Router pages
│   ├── api/analyze/    # AI analysis API endpoint
│   ├── how-to/         # How-to guide page
│   ├── landing/        # Marketing landing page
│   └── page.tsx        # Main analyzer dashboard
├── components/         # Reusable React components
│   ├── AllergyResults.tsx
│   ├── ImageUpload.tsx
│   ├── Navigation.tsx
│   ├── SetupAnalysis.tsx
│   └── ...
├── __tests__/          # Jest test files
│   ├── app/           # Page tests
│   ├── components/    # Component tests
│   ├── lib/           # Library tests
│   └── utils/         # Utility tests
└── lib/               # Shared utilities and data
    ├── prompts.ts     # AI prompts
    ├── siteData.ts    # App configuration
    └── utils/         # Helper functions
```

## License

MIT License
