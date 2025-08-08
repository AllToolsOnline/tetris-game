import { mockPixelImages } from '../utils/tetris';

interface GameOverScreenProps {
  finalScore: number;
  linesCleared: number;
  level: number;
  finalBoard: (number | null)[][];
  onPlayAgain: () => void;
  onMainMenu: () => void;
}

export function GameOverScreen({ 
  finalScore, 
  linesCleared, 
  level, 
  finalBoard, 
  onPlayAgain, 
  onMainMenu 
}: GameOverScreenProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-red-900 to-black p-4 flex items-center justify-center">
      <div className="max-w-4xl mx-auto text-center">
        {/* Game Over Title */}
        <h1 className="text-8xl text-red-400 pixel-font mb-8 animate-pulse">
          GAME OVER
        </h1>

        <div className="flex gap-12 items-start justify-center">
          {/* Final Stats */}
          <div className="bg-gray-900 border-8 border-red-400 p-8 rounded-lg">
            <h2 className="text-3xl text-red-400 pixel-font mb-6">FINAL STATS</h2>
            
            <div className="space-y-4">
              <div>
                <div className="text-red-300 pixel-font text-xl">SCORE</div>
                <div className="text-white pixel-font text-4xl">{finalScore.toLocaleString()}</div>
              </div>
              
              <div>
                <div className="text-red-300 pixel-font text-xl">LEVEL</div>
                <div className="text-white pixel-font text-4xl">{level}</div>
              </div>
              
              <div>
                <div className="text-red-300 pixel-font text-xl">LINES CLEARED</div>
                <div className="text-white pixel-font text-4xl">{linesCleared}</div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-4 mt-8">
              <button
                onClick={onPlayAgain}
                className="block mx-auto w-64 py-4 bg-lime-500 hover:bg-lime-400 text-black text-2xl pixel-font border-4 border-white shadow-lg transition-all hover:scale-105 hover:shadow-xl"
              >
                PLAY AGAIN
              </button>
              
              <button
                onClick={onMainMenu}
                className="block mx-auto w-64 py-4 bg-gray-500 hover:bg-gray-400 text-white text-2xl pixel-font border-4 border-white shadow-lg transition-all hover:scale-105 hover:shadow-xl"
              >
                MAIN MENU
              </button>
            </div>
          </div>

          {/* Final Board State */}
          <div className="bg-gray-900 border-8 border-orange-400 p-6 rounded-lg">
            <h3 className="text-2xl text-orange-400 pixel-font mb-4">FINAL BOARD</h3>
            <div className="border-4 border-white bg-black p-2">
              <div 
                className="grid gap-px bg-gray-800"
                style={{
                  gridTemplateColumns: `repeat(10, 16px)`,
                  gridTemplateRows: `repeat(20, 16px)`,
                }}
              >
                {finalBoard.map((row, y) =>
                  row.map((cell, x) => (
                    <div
                      key={`${y}-${x}`}
                      className="w-4 h-4 border border-gray-700"
                      style={{
                        backgroundColor: cell !== null ? mockPixelImages[cell] : 'transparent',
                        imageRendering: 'pixelated',
                        imageRendering: '-moz-crisp-edges',
                        imageRendering: 'crisp-edges',
                      }}
                    />
                  ))
                )}
              </div>
            </div>
            <div className="text-orange-300 pixel-font text-sm mt-2">
              Your pixel art creation
            </div>
          </div>
        </div>

        {/* Additional Info */}
        <div className="mt-8 text-gray-400 pixel-font text-lg">
          Thanks for playing Tetris is Different!
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