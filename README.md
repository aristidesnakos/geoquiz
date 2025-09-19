# GeoQuiz

A simple, elegant geography quiz game built with Next.js App Router. Click on countries and test your knowledge!

## Features

- 🗺️ Interactive world map
- 🎯 Click-to-select countries
- 📝 Name guessing with instant feedback
- 🏆 Score tracking
- 🎨 Clean, responsive design

## Tech Stack

- **Next.js 15** with App Router
- **React 19**
- **TypeScript**
- **react-simple-maps** for interactive SVG maps

## Getting Started

### Prerequisites

- Node.js 18+
- pnpm

### Installation

```bash
# Install dependencies
pnpm install

# Run development server
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to play!

### Build for Production

```bash
pnpm build
pnpm start
```

## Project Structure

```
/app
  ├── page.tsx           # Main game page
  ├── layout.tsx         # Root layout
  ├── globals.css        # Global styles
  └── /components
      ├── WorldMap.tsx   # Interactive map component
      └── GuessInput.tsx # Country name input component
/public
  └── world-simple.json  # GeoJSON data for countries
```

## How to Play

1. Click on any country on the map
2. Type the country's name in the input field
3. Submit your guess
4. Get instant feedback and track your score
5. Click "Try Another Country" to continue

## Architecture Decisions

- **Client-side only**: No database, all state managed locally
- **Simplicity first**: Minimal dependencies, clean component structure
- **App Router**: Leveraging Next.js modern features
- **Component separation**: Clear separation between map, input, and game logic

## Future Enhancements

- Timer mode for speed challenges
- Difficulty levels (continents, regions)
- Leaderboard with localStorage
- Country hints and facts
- Mobile touch optimizations

## License

MIT