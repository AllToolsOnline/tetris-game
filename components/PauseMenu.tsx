interface PauseMenuProps {
  onResume: () => void;
  onRestart: () => void;
  onExit: () => void;
}

export function PauseMenu({ onResume, onRestart, onExit }: PauseMenuProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-gray-900 border-8 border-yellow-400 rounded-lg p-12 text-center shadow-2xl">
        <h2 className="text-6xl text-yellow-400 pixel-font mb-8">PAUSED</h2>
        
        <div className="space-y-6">
          <button
            onClick={onResume}
            className="block mx-auto w-64 py-4 bg-lime-500 hover:bg-lime-400 text-black text-2xl pixel-font border-4 border-white shadow-lg transition-all hover:scale-105 hover:shadow-xl"
          >
            RESUME
          </button>
          
          <button
            onClick={onRestart}
            className="block mx-auto w-64 py-4 bg-blue-500 hover:bg-blue-400 text-white text-2xl pixel-font border-4 border-white shadow-lg transition-all hover:scale-105 hover:shadow-xl"
          >
            RESTART
          </button>
          
          <button
            onClick={onExit}
            className="block mx-auto w-64 py-4 bg-red-500 hover:bg-red-400 text-white text-2xl pixel-font border-4 border-white shadow-lg transition-all hover:scale-105 hover:shadow-xl"
          >
            EXIT
          </button>
        </div>

        <div className="mt-8 text-gray-400 pixel-font text-lg">
          Press ESC to resume
        </div>
      </div>

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