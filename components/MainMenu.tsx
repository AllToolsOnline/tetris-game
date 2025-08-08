import { mockPixelImages } from '../utils/tetris';

interface MainMenuProps {
  onPlay: () => void;
  onSettings: () => void;
  onQuit: () => void;
}

export function MainMenu({ onPlay, onSettings, onQuit }: MainMenuProps) {
  // Create mosaic background
  const mosaicTiles = Array.from({ length: 200 }, (_, i) => ({
    id: i,
    color: mockPixelImages[Math.floor(Math.random() * mockPixelImages.length)],
    x: Math.random() * 100,
    y: Math.random() * 100,
  }));

  return (
    <div className="relative min-h-screen bg-gray-900 flex flex-col items-center justify-center overflow-hidden">
      {/* Mosaic Background */}
      <div className="absolute inset-0 opacity-10">
        {mosaicTiles.map(tile => (
          <div
            key={tile.id}
            className="absolute w-5 h-5"
            style={{
              backgroundColor: tile.color,
              left: `${tile.x}%`,
              top: `${tile.y}%`,
            }}
          />
        ))}
      </div>

      {/* Main Content */}
      <div className="relative z-10 text-center">
        {/* Game Title */}
        <h1 className="mb-16 text-center">
          <div className="text-6xl md:text-8xl mb-4 tracking-wider text-white pixel-font drop-shadow-lg">
            TETRIS
          </div>
          <div className="text-3xl md:text-4xl text-cyan-300 pixel-font tracking-widest">
            IS DIFFERENT
          </div>
        </h1>

        {/* Menu Buttons */}
        <div className="space-y-6">
          <button
            onClick={onPlay}
            className="block mx-auto w-64 py-4 bg-lime-500 hover:bg-lime-400 text-black text-2xl font-black pixel-font border-4 border-white shadow-lg transition-all hover:scale-105 hover:shadow-xl"
          >
            PLAY
          </button>
          
          <button
            onClick={onSettings}
            className="block mx-auto w-64 py-4 bg-purple-500 hover:bg-purple-400 text-white text-2xl font-black pixel-font border-4 border-white shadow-lg transition-all hover:scale-105 hover:shadow-xl"
          >
            SETTINGS
          </button>
          
          <button
            onClick={onQuit}
            className="block mx-auto w-64 py-4 bg-red-500 hover:bg-red-400 text-white text-2xl font-black pixel-font border-4 border-white shadow-lg transition-all hover:scale-105 hover:shadow-xl"
          >
            QUIT
          </button>
        </div>

        {/* Subtitle */}
        <div className="mt-12 text-gray-400 pixel-font text-lg">
          Each tetromino is made from unique pixel art!
        </div>
      </div>

      {/* CSS for pixel font effect */}
      <style jsx>{`
        .pixel-font {
          font-family: 'Courier New', monospace;
          image-rendering: pixelated;
          image-rendering: -moz-crisp-edges;
          image-rendering: crisp-edges;
          text-shadow: 2px 2px 0px rgba(0, 0, 0, 0.5);
        }
      `}</style>
    </div>
  );
}