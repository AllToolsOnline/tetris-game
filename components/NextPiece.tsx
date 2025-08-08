import { GamePiece, mockPixelImages } from '../utils/tetris';

interface NextPieceProps {
  nextPiece: GamePiece | null;
}

export function NextPiece({ nextPiece }: NextPieceProps) {
  const maxSize = 4; // Maximum tetromino size

  return (
    <div className="bg-gray-900 border-4 border-cyan-300 p-4 rounded-lg">
      <h3 className="text-cyan-300 pixel-font text-xl mb-3 text-center">NEXT</h3>
      <div className="bg-black border-2 border-gray-600 p-3">
        <div 
          className="grid gap-px mx-auto"
          style={{
            gridTemplateColumns: `repeat(${maxSize}, 20px)`,
            gridTemplateRows: `repeat(${maxSize}, 20px)`,
            width: `${maxSize * 20 + (maxSize - 1)}px`,
            height: `${maxSize * 20 + (maxSize - 1)}px`,
          }}
        >
          {Array.from({ length: maxSize * maxSize }, (_, index) => {
            const x = index % maxSize;
            const y = Math.floor(index / maxSize);
            
            let shouldFill = false;
            if (nextPiece) {
              const offsetX = Math.floor((maxSize - nextPiece.shape[0].length) / 2);
              const offsetY = Math.floor((maxSize - nextPiece.shape.length) / 2);
              const pieceX = x - offsetX;
              const pieceY = y - offsetY;
              
              if (
                pieceX >= 0 && 
                pieceX < nextPiece.shape[0].length &&
                pieceY >= 0 && 
                pieceY < nextPiece.shape.length &&
                nextPiece.shape[pieceY][pieceX]
              ) {
                shouldFill = true;
              }
            }
            
            return (
              <div
                key={index}
                className="w-5 h-5 border border-gray-700"
                style={{
                  backgroundColor: shouldFill && nextPiece
                    ? mockPixelImages[nextPiece.imageIndex]
                    : 'transparent',
                  imageRendering: 'pixelated',
                  imageRendering: '-moz-crisp-edges',
                  imageRendering: 'crisp-edges',
                }}
              />
            );
          })}
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