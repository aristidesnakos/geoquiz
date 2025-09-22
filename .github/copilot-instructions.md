# GeoQuiz - GitHub Copilot Instructions

GeoQuiz is an interactive geography quiz game built with Next.js 15, React 19, and TypeScript. Players click on countries on an interactive world map and try to guess their names.

**ALWAYS reference these instructions first and fallback to search or bash commands only when you encounter unexpected information that does not match the info here.**

## Working Effectively

### Bootstrap and Setup
- Install pnpm globally: `npm install -g pnpm`
- Install dependencies: `pnpm install` -- takes ~1.4 seconds when cached, ~6 seconds fresh install
- Node.js 18+ required (tested with Node.js 20.19.5)

### Building and Testing
- **Development server**: `pnpm dev` -- starts in ~1.4 seconds. NEVER CANCEL.
  - Runs on http://localhost:3000
  - Hot reload enabled for all changes
- **Production build**: `pnpm build` -- takes ~22 seconds. NEVER CANCEL. Set timeout to 60+ seconds.
  - Compiles TypeScript, optimizes for production
  - No build cache by default (warning expected)
- **Production server**: `pnpm start` -- MUST run `pnpm build` first
  - Serves optimized production build
  - Faster than dev server, no hot reload
- **Linting**: `pnpm lint` -- ESLint not configured yet, will prompt for setup

## Validation Scenarios

**CRITICAL: Always test complete user workflows after making changes:**

### Complete User Flow Test
1. Start development server: `pnpm dev`
2. Navigate to http://localhost:3000
3. Verify map loads with world countries in gray
4. Click on any country - it should highlight in yellow/gold
5. Verify input field appears with "Enter country name..." placeholder
6. Type a country name and click Submit
7. Verify feedback appears (✅ Correct! or ❌ Wrong, it was [Country])
8. Verify score tracking updates (e.g., "Score: 0/1")
9. Click "Try Another Country" button
10. Verify map resets and you can select another country

### Key Validation Points
- Map interaction works (countries clickable)
- Country highlighting works (selected country turns yellow)
- Input field appears when country selected  
- Feedback system works (correct/incorrect responses)
- Score tracking functions properly
- Game reset works ("Try Another Country")

## Architecture and Key Components

### Project Structure
```
/app
  ├── page.tsx              # Main game page with state management
  ├── layout.tsx            # Root layout with metadata
  ├── globals.css           # All styling (no Tailwind, pure CSS)
  └── /components
      ├── WorldMap.tsx      # Interactive map using react-simple-maps
      ├── GuessInput.tsx    # Input field and submit button
      └── /ui
          └── dialog.tsx    # UI components (currently unused)
/public
  ├── countries.geojson     # 14MB GeoJSON data for world map
  ├── world-simple.json     # Alternative smaller map data (unused)
  └── favicon.ico
```

### Key Files to Know
- **app/page.tsx**: Main game logic, state management (selectedCountry, guess, feedback, score)
- **app/components/WorldMap.tsx**: Map component using react-simple-maps, loads `/countries.geojson`
- **app/components/GuessInput.tsx**: Form component for country name input
- **app/globals.css**: ALL styling (294 lines), responsive design included
- **package.json**: Dependencies and scripts
- **tsconfig.json**: TypeScript configuration with path aliases (`@/*`)

### Tech Stack Details  
- **Next.js 15** with App Router (not Pages Router)
- **React 19** with client-side state management
- **TypeScript 4.9.5** with strict mode
- **react-simple-maps 3.0.0** for interactive SVG world map
- **Pure CSS** for styling (no Tailwind despite imports)
- **No database** - all state local, no persistence

### Dependencies
```json
{
  "@radix-ui/react-dialog": "^1.1.15",    // UI primitives (dialog component exists but unused)
  "react-simple-maps": "^3.0.0",          // Interactive map component
  "clsx": "^2.1.1",                       // Conditional classes utility  
  "tailwind-merge": "^3.3.1",             // Class merging (used in cn.ts utility)
  "lucide-react": "^0.544.0"              // Icons (X icon in dialog)
}
```

## Common Development Tasks

### Making Changes to Game Logic
- **State management**: All in `app/page.tsx` - selectedCountry, guess, feedback, score
- **Map interaction**: Modify `app/components/WorldMap.tsx` 
- **Input handling**: Modify `app/components/GuessInput.tsx`
- **Styling**: All styles in `app/globals.css` including responsive breakpoints

### Adding New Features
- Game state is entirely local (useState hooks)
- No routing needed - single page application
- Map data in `/public/countries.geojson` (14MB, complete world data)
- Country name extraction: `geo.properties.ADMIN` fallback to other name fields

### Debugging Common Issues
- **Map not loading**: Check `/countries.geojson` exists and WorldMap.tsx references correct path
- **Countries not clickable**: Verify `onCountryClick` prop passed correctly 
- **Styling issues**: All styles in `globals.css`, check responsive breakpoints
- **Build errors**: Usually TypeScript - check tsconfig.json paths and strict mode

## Development Workflow

### Before Making Changes
1. Always run `pnpm dev` and validate current functionality works
2. Test the complete user flow (click country → enter guess → see feedback)
3. Check browser console for any existing errors

### After Making Changes  
1. Verify development server still runs without errors
2. Test complete user workflow again
3. Run `pnpm build` to ensure production build works -- NEVER CANCEL, takes ~22 seconds
4. Consider testing production mode: `pnpm build && pnpm start`

### Performance Notes
- **Build time**: ~22 seconds (consistent, no cache)
- **Dev server startup**: ~1.4 seconds
- **Hot reload**: Near instant for most changes
- **Large asset**: countries.geojson is 14MB (expected)

## Frequently Used Commands Summary
```bash
# Development
pnpm install        # ~1.4 seconds (cached), ~6 seconds (fresh)
pnpm dev           # ~1.4 seconds startup, runs on :3000

# Building  
pnpm build         # ~22 seconds, NEVER CANCEL, set 60+ second timeout
pnpm start         # Production server (requires build first)

# File locations
/app/page.tsx                    # Main game logic
/app/components/WorldMap.tsx     # Map component
/app/globals.css                 # All styling
/public/countries.geojson        # Map data (14MB)
```

**CRITICAL REMINDERS:**
- NEVER CANCEL builds or long-running commands
- Always test complete user scenarios after changes
- All styling is in globals.css (pure CSS, no Tailwind despite utility imports)
- Map data is large (14MB) but loads fine
- No linting configured yet - will prompt to setup ESLint on first `pnpm lint`