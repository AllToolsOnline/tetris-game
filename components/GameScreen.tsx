import { GameState } from '../utils/tetris';
import { Playfield } from './Playfield';
import { NextPiece } from './NextPiece';

interface GameScreenProps {
  gameState: GameState;
  onPause: () => void;
  onQuit: () => void;
}

export function GameScreen({ gameState, onPause, onQuit }: GameScreenProps) {
  const folderName = "Pixel Art Collection v1.0"; // Mock folder name

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-4xl text-white pixel-font">TETRIS IS DIFFERENT</h1>
          <div className="flex gap-4">
            <button
              onClick={onPause}
              className="px-6 py-2 bg-yellow-500 hover:bg-yellow-400 text-black pixel-font border-2 border-white transition-all hover:scale-105"
            >
              PAUSE
            </button>
            <button
              onClick={onQuit}
              className="px-6 py-2 bg-red-500 hover:bg-red-400 text-white pixel-font border-2 border-white transition-all hover:scale-105"
            >
              QUIT
            </button>
          </div>
        </div>

        <div className="flex gap-8 items-start justify-center">
          {/* Game Board */}
          <div className="flex-shrink-0">
            <Playfield 
              board={gameState.board} 
              currentPiece={gameState.currentPiece}
            />
          </div>

          {/* Side Panel */}
          <div className="flex flex-col gap-6 min-w-64">
            {/* Next Piece */}
            <NextPiece nextPiece={gameState.nextPiece} />

            {/* Score Display */}
            <div className="bg-gray-900 border-4 border-lime-400 p-4 rounded-lg">
              <div className="space-y-4">
                <div>
                  <div className="text-lime-400 pixel-font text-lg">SCORE</div>
                  <div className="text-white pixel-font text-3xl">{gameState.score.toLocaleString()}</div>
                </div>
                
                <div>
                  <div className="text-lime-400 pixel-font text-lg">LEVEL</div>
                  <div className="text-white pixel-font text-3xl">{gameState.level}</div>
                </div>
                
                <div>
                  <div className="text-lime-400 pixel-font text-lg">LINES</div>
                  <div className="text-white pixel-font text-3xl">{gameState.linesCleared}</div>
                </div>
              </div>
            </div>

            {/* Folder Info */}
            <div className="bg-gray-900 border-4 border-purple-400 p-4 rounded-lg">
              <div className="text-purple-400 pixel-font text-lg mb-2">IMAGE FOLDER</div>
              <div className="text-white pixel-font text-sm break-words">{folderName}</div>
              <div className="text-gray-400 pixel-font text-xs mt-2">15 images loaded</div>
            </div>

            {/* Controls */}
            <div className="bg-gray-900 border-4 border-cyan-400 p-4 rounded-lg">
              <div className="text-cyan-400 pixel-font text-lg mb-3">CONTROLS</div>
              <div className="space-y-2 text-sm pixel-font text-gray-300">
                <div>← → Move</div>
                <div>↓ Soft Drop</div>
                <div>↑ Rotate</div>
                <div>SPACE Hard Drop</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .pixel-font {
          font-family: 'Courier New', monospace;
          image-rendering: pixelated;
          image-rendering: -moz-crisp-edges;
          image-rendering: crisp-edges;
          text-shadow: 1px 1px 0px rgba(0, 0, 0, 0.5);
        }
      `}</style>
    </div>
  );
}