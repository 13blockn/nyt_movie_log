# NYTimes 100 Best Movies Tracker

A React TypeScript application for tracking which movies you've seen from the NYTimes 100 Best Movies of the 21st Century list.

## Features

- 📋 **Complete Movie List**: 100 carefully curated movies from the NYTimes list
- ✅ **Track Progress**: Mark movies as seen/unseen with persistent storage
- 🔍 **Search**: Filter movies by title
- 🏷️ **Filter**: View all movies, only seen, or only unseen
- 📊 **Progress Counter**: See how many movies you've watched (X / 100)
- 💾 **Persistent Storage**: Your progress is saved in localStorage
- 📱 **Responsive Design**: Works on desktop and mobile devices

## Tech Stack

- **React 18** with TypeScript
- **Vite** for fast development and building
- **CSS** (no frameworks) for clean, minimal styling
- **localStorage** for data persistence

## Getting Started

### Prerequisites

- Node.js (version 20.19.0 or higher recommended)
- npm

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd nyt_movie_log
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## Usage

1. **Browse Movies**: Scroll through the grid of 100 movies
2. **Mark as Seen**: Click the checkbox next to any movie you've watched
3. **Search**: Use the search bar to find specific movies by title
4. **Filter**: Use the filter buttons to show:
   - All movies
   - Only movies you've seen
   - Only movies you haven't seen yet
5. **Track Progress**: Watch your progress counter update as you mark movies

## Project Structure

```
src/
├── components/          # React components
│   ├── MovieCard.tsx   # Individual movie display
│   ├── SearchBar.tsx   # Search functionality
│   └── FilterButtons.tsx # Filter controls
├── data/               # Static data
│   └── movies.ts       # List of 100 movies
├── hooks/              # Custom React hooks
│   └── useLocalStorage.ts # localStorage management
├── types.ts            # TypeScript type definitions
├── App.tsx             # Main application component
├── App.css             # Application styles
└── index.css           # Base styles
```

## Features in Detail

### Movie Data
Each movie includes:
- Title
- Release year
- Director
- Unique ID for tracking

### Local Storage
Your viewing progress is automatically saved to your browser's localStorage under the key `nyt-movies-seen`. This means your progress persists between browser sessions.

### Responsive Design
The application is fully responsive and works well on:
- Desktop computers
- Tablets
- Mobile phones

## Building for Production

```bash
npm run build
```

This creates a `dist` folder with optimized files ready for deployment.

## Contributing

This is a personal movie tracking application. Feel free to fork and customize for your own use!

## License

MIT License - feel free to use this code for your own projects.
