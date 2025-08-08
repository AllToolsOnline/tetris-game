// Tetris game logic and utilities

// Mock 20x20 pixel image data (using colors for now)
export const mockPixelImages = [
  '#FF6B6B', // Red
  '#4ECDC4', // Teal
  '#45B7D1', // Blue
  '#96CEB4', // Mint
  '#FECA57', // Yellow
  '#FF9FF3', // Pink
  '#54A0FF', // Light Blue
  '#5F27CD', // Purple
  '#00D2D3', // Cyan
  '#FF9F43', // Orange
  '#10AC84', // Green
  '#EE5A6F', // Rose
  '#C44569', // Dark Pink
  '#F8B500', // Amber
  '#6C5CE7', // Indigo
];

// Tetromino shapes (standard Tetris pieces)
export const TETROMINOES = {
  I: [
    [0, 0, 0, 0],
    [1, 1, 1, 1],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ],
  O: [
    [1, 1],
    [1, 1],
  ],
  T: [
    [0, 1, 0],
    [1, 1, 1],
    [0, 0, 0],
  ],
  S: [
    [0, 1, 1],
    [1, 1, 0],
    [0, 0, 0],
  ],
  Z: [
    [1, 1, 0],
    [0, 1, 1],
    [0, 0, 0],
  ],
  J: [
    [1, 0, 0],
    [1, 1, 1],
    [0, 0, 0],
  ],
  L: [
    [0, 0, 1],
    [1, 1, 1],
    [0, 0, 0],
  ],
};

export type TetrominoType = keyof typeof TETROMINOES;

export interface GamePiece {
  shape: number[][];
  x: number;
  y: number;
  imageIndex: number;
}

export interface GameState {
  board: (number | null)[][];
  currentPiece: GamePiece | null;
  nextPiece: GamePiece | null;
  score: number;
  level: number;
  linesCleared: number;
  isGameOver: boolean;
  isPaused: boolean;
}

export const BOARD_WIDTH = 10;
export const BOARD_HEIGHT = 20;

export function createEmptyBoard(): (number | null)[][] {
  return Array.from({ length: BOARD_HEIGHT }, () =>
    Array.from({ length: BOARD_WIDTH }, () => null)
  );
}

export function getRandomTetromino(): GamePiece {
  const types = Object.keys(TETROMINOES) as TetrominoType[];
  const randomType = types[Math.floor(Math.random() * types.length)];
  const shape = TETROMINOES[randomType];
  const imageIndex = Math.floor(Math.random() * mockPixelImages.length);
  
  return {
    shape,
    x: Math.floor(BOARD_WIDTH / 2) - Math.floor(shape[0].length / 2),
    y: 0,
    imageIndex,
  };
}

export function canMovePiece(
  board: (number | null)[][],
  piece: GamePiece,
  dx: number,
  dy: number,
  newShape?: number[][]
): boolean {
  const shape = newShape || piece.shape;
  const newX = piece.x + dx;
  const newY = piece.y + dy;

  for (let y = 0; y < shape.length; y++) {
    for (let x = 0; x < shape[y].length; x++) {
      if (shape[y][x]) {
        const boardX = newX + x;
        const boardY = newY + y;

        if (
          boardX < 0 ||
          boardX >= BOARD_WIDTH ||
          boardY >= BOARD_HEIGHT ||
          (boardY >= 0 && board[boardY][boardX] !== null)
        ) {
          return false;
        }
      }
    }
  }
  return true;
}

export function rotatePiece(shape: number[][]): number[][] {
  const rows = shape.length;
  const cols = shape[0].length;
  const rotated = Array.from({ length: cols }, () => Array(rows).fill(0));

  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      rotated[x][rows - 1 - y] = shape[y][x];
    }
  }
  return rotated;
}

export function placePieceOnBoard(
  board: (number | null)[][],
  piece: GamePiece
): (number | null)[][] {
  const newBoard = board.map(row => [...row]);

  for (let y = 0; y < piece.shape.length; y++) {
    for (let x = 0; x < piece.shape[y].length; x++) {
      if (piece.shape[y][x]) {
        const boardY = piece.y + y;
        const boardX = piece.x + x;
        if (boardY >= 0) {
          newBoard[boardY][boardX] = piece.imageIndex;
        }
      }
    }
  }

  return newBoard;
}

export function clearLines(board: (number | null)[][]): {
  newBoard: (number | null)[][];
  linesCleared: number;
} {
  const newBoard = board.filter(row => row.some(cell => cell === null));
  const linesCleared = BOARD_HEIGHT - newBoard.length;

  while (newBoard.length < BOARD_HEIGHT) {
    newBoard.unshift(Array(BOARD_WIDTH).fill(null));
  }

  return { newBoard, linesCleared };
}

export function calculateScore(linesCleared: number, level: number): number {
  const lineScores = [0, 40, 100, 300, 1200];
  return lineScores[linesCleared] * (level + 1);
}

export function getDropSpeed(level: number): number {
  return Math.max(50, 800 - level * 50);
}