# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

```bash
# Development
npm run dev              # Start dev server with Turbopack
npm run build           # Build for production
npm run start           # Start production server

# Testing
npm run test            # Run all tests
npm run test:watch      # Run tests in watch mode
npm run test:coverage   # Run tests with coverage report
npm test -- --testNamePattern="ComponentName"  # Run specific test

# Code Quality
npm run lint            # Run ESLint

# Single test file
npm test src/__tests__/components/AllergyResults.test.tsx
```

## Architecture Overview

### Core Application Flow

1. **User Input**: Users enter allergies via localStorage-persisted form and upload food label images
2. **AI Analysis**: Images are processed through Google Gemini vision model with structured prompts
3. **Safety Classification**: Results categorize ingredients into safe/warning/unsafe with detailed explanations
4. **Responsive UI**: Minimal design system using CSS variables and MUI components

### Key Technologies & Patterns

**Frontend Architecture**:

- Next.js 15 App Router with TypeScript
- Client-side state management via React hooks + localStorage
- Server-side AI processing through API routes
- Responsive design with Tailwind CSS + custom CSS variables

**AI Integration**:

- Vercel AI SDK with Google Gemini (`gemini-1.5-pro-latest`)
- Structured output using Zod schemas for type safety
- Base64 image processing for vision analysis
- Comprehensive prompting system in `/src/lib/prompts.ts`

**Design System**:

- CSS variables for theming (`--background`, `--foreground`, `--accent`, etc.)
- Minimal card components using `.minimal-card` class
- Typography: Playfair Display (headings) + Source Sans 3 (body)
- Dark/light theme with system preference detection

### Critical Files & Their Purposes

**API & AI Processing**:

- `/src/app/api/analyze/route.ts` - Main AI analysis endpoint using Google Gemini
- `/src/lib/prompts.ts` - System prompts for allergen detection
- `/src/lib/utils/image.ts` - Base64 image extraction utilities

**Data Management**:

- `/src/lib/siteData.ts` - Centralized app configuration and metadata
- `/src/lib/utils/storage.ts` - SSR-safe localStorage utilities
- `/src/lib/utils/validation.ts` - Input validation for analysis requests

**Core Components**:

- `/src/components/AllergyResults.tsx` - Displays categorized allergen analysis
- `/src/components/ImageUpload.tsx` - Drag-and-drop image upload with preview
- `/src/components/Navigation.tsx` - Responsive nav with theme toggle
- `/src/app/page.tsx` - Main dashboard with 3-column layout

### Data Flow & State Management

**User Allergies**:

- Stored in localStorage with key `'userAllergies'`
- Auto-saved on input changes after component mount
- Retrieved on page load for persistence

**Image Processing**:

- Images converted to base64 via FileReader API
- Sent to `/api/analyze` with user allergies
- Processed by Google Gemini vision model with structured Zod schema

**Analysis Results Structure**:

```typescript
{
  safe: boolean,
  detected_allergens: string[],    // Allergens matching user's list
  potential_allergens: string[],   // Uncertain/may-contain ingredients
  safe_ingredients: string[],      // Verified safe ingredients
  warning_ingredients: string[],   // Cautionary ingredients
  unsafe_ingredients: string[],    // Definitely unsafe ingredients
  ingredients: string[],           // All detected ingredients
  analysis: string                 // Detailed explanation
}
```

### Testing Architecture

- Jest with React Testing Library for component tests
- Test files in `/src/__tests__/` mirroring `/src/` structure
- Coverage excludes stories, type definitions, and layout files
- Tests focus on component behavior, utilities, and prompts

### Environment Configuration

Required environment variables:

- `GOOGLE_GENERATIVE_AI_API_KEY` - For Google Gemini AI model
- Alternative: `ANTHROPIC_API_KEY` or `OPENAI_API_KEY` (requires model change in API route)

### Styling Conventions

**CSS Variable System**:

- `var(--background)`, `var(--foreground)` - Base colors
- `var(--surface)`, `var(--border)` - Component colors
- `var(--accent)`, `var(--muted)` - Interactive/secondary colors
- `var(--radius)` - Consistent border radius (12px)

**Component Classes**:

- `.minimal-card` - Standard card component with backdrop blur
- `.minimal-button` - Consistent button styling
- `.minimal-input` - Form input styling

### Performance Considerations

- Next.js Image component for optimized image loading
- Turbopack for faster development builds
- Client-side image processing to reduce server load
- LocalStorage for allergy persistence without database

### Development Best Practices

- Always add a data-testid to new components where necessary
- Run `npm run lint` after every major change to the codebase
- After running `npm run lint`, run `npm run prettier` to format files

### Design Guidelines

- Padding on cards should favor "24px" all around
