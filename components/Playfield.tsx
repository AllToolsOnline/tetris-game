import { GamePiece, mockPixelImages } from '../utils/tetris';

interface PlayfieldProps {
  board: (number | null)[][];
  currentPiece: GamePiece | null;
}

export function Playfield({ board, currentPiece }: PlayfieldProps) {
  // Create a copy of the board to overlay the current piece
  const displayBoard = board.map(row => [...row]);
  
  // Add current piece to display board
  if (currentPiece) {
    for (let y = 0; y < currentPiece.shape.length; y++) {
      for (let x = 0; x < currentPiece.shape[y].length; x++) {
        if (currentPiece.shape[y][x]) {
          const boardY = currentPiece.y + y;
          const boardX = currentPiece.x + x;
          if (boardY >= 0 && boardY < board.length && boardX >= 0 && boardX < board[0].length) {
            displayBoard[boardY][boardX] = currentPiece.imageIndex;
          }
        }
      }
    }
  }

  return (
    <div className="border-4 border-white bg-black p-2 shadow-2xl">
      <div 
        className="grid gap-px bg-gray-800"
        style={{
          gridTemplateColumns: `repeat(10, 20px)`,
          gridTemplateRows: `repeat(20, 20px)`,
        }}
      >
        {displayBoard.map((row, y) =>
          row.map((cell, x) => (
            <div
              key={`${y}-${x}`}
              className="w-5 h-5 border border-gray-700"
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
  );
}