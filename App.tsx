import React, { useState, useEffect, useCallback } from 'react';
import { MainMenu } from './components/MainMenu';
import { GameScreen } from './components/GameScreen';
import { PauseMenu } from './components/PauseMenu';
import { GameOverScreen } from './components/GameOverScreen';
import {
  GameState,
  createEmptyBoard,
  getRandomTetromino,
  canMovePiece,
  rotatePiece,
  placePieceOnBoard,
  clearLines,
  calculateScore,
  getDropSpeed,
} from './utils/tetris';

type GameMode = 'menu' | 'playing' | 'paused' | 'gameOver' | 'settings';

export default function App() {
  const [gameMode, setGameMode] = useState<GameMode>('menu');
  const [gameState, setGameState] = useState<GameState>({
    board: createEmptyBoard(),
    currentPiece: null,
    nextPiece: null,
    score: 0,
    level: 0,
    linesCleared: 0,
    isGameOver: false,
    isPaused: false,
  });

  const initializeGame = useCallback(() => {
    const firstPiece = getRandomTetromino();
    const secondPiece = getRandomTetromino();
    
    setGameState({
      board: createEmptyBoard(),
      currentPiece: firstPiece,
      nextPiece: secondPiece,
      score: 0,
      level: 0,
      linesCleared: 0,
      isGameOver: false,
      isPaused: false,
    });
    setGameMode('playing');
  }, []);

  const movePiece = useCallback((dx: number, dy: number) => {
    setGameState(prev => {
      if (!prev.currentPiece || prev.isGameOver || prev.isPaused) return prev;
      
      if (canMovePiece(prev.board, prev.currentPiece, dx, dy)) {
        return {
          ...prev,
          currentPiece: {
            ...prev.currentPiece,
            x: prev.currentPiece.x + dx,
            y: prev.currentPiece.y + dy,
          },
        };
      }
      return prev;
    });
  }, []);

  const rotatePieceHandler = useCallback(() => {
    setGameState(prev => {
      if (!prev.currentPiece || prev.isGameOver || prev.isPaused) return prev;
      
      const rotatedShape = rotatePiece(prev.currentPiece.shape);
      if (canMovePiece(prev.board, prev.currentPiece, 0, 0, rotatedShape)) {
        return {
          ...prev,
          currentPiece: {
            ...prev.currentPiece,
            shape: rotatedShape,
          },
        };
      }
      return prev;
    });
  }, []);

  const hardDrop = useCallback(() => {
    setGameState(prev => {
      if (!prev.currentPiece || prev.isGameOver || prev.isPaused) return prev;
      
      let dropDistance = 0;
      while (canMovePiece(prev.board, prev.currentPiece, 0, dropDistance + 1)) {
        dropDistance++;
      }
      
      return {
        ...prev,
        currentPiece: {
          ...prev.currentPiece,
          y: prev.currentPiece.y + dropDistance,
        },
      };
    });
  }, []);

  const dropPiece = useCallback(() => {
    setGameState(prev => {
      if (!prev.currentPiece || prev.isGameOver || prev.isPaused) return prev;
      
      if (canMovePiece(prev.board, prev.currentPiece, 0, 1)) {
        return {
          ...prev,
          currentPiece: {
            ...prev.currentPiece,
            y: prev.currentPiece.y + 1,
          },
        };
      } else {
        // Piece can't move down, place it on the board
        const newBoard = placePieceOnBoard(prev.board, prev.currentPiece);
        const { newBoard: clearedBoard, linesCleared } = clearLines(newBoard);
        const scoreGain = calculateScore(linesCleared, prev.level);
        const newTotalLines = prev.linesCleared + linesCleared;
        const newLevel = Math.floor(newTotalLines / 10);
        
        const newPiece = prev.nextPiece;
        const nextPiece = getRandomTetromino();
        
        // Check if new piece can be placed (game over check)
        if (newPiece && !canMovePiece(clearedBoard, newPiece, 0, 0)) {
          return {
            ...prev,
            board: clearedBoard,
            currentPiece: newPiece,
            isGameOver: true,
            score: prev.score + scoreGain,
            level: newLevel,
            linesCleared: newTotalLines,
          };
        }
        
        return {
          ...prev,
          board: clearedBoard,
          currentPiece: newPiece,
          nextPiece: nextPiece,
          score: prev.score + scoreGain,
          level: newLevel,
          linesCleared: newTotalLines,
        };
      }
    });
  }, []);

  // Game loop
  useEffect(() => {
    if (gameMode !== 'playing' || gameState.isGameOver || gameState.isPaused) return;
    
    const dropInterval = setInterval(dropPiece, getDropSpeed(gameState.level));
    return () => clearInterval(dropInterval);
  }, [gameMode, gameState.isGameOver, gameState.isPaused, gameState.level, dropPiece]);

  // Check for game over
  useEffect(() => {
    if (gameState.isGameOver && gameMode === 'playing') {
      setGameMode('gameOver');
    }
  }, [gameState.isGameOver, gameMode]);

  // Keyboard controls
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (gameMode === 'playing' && !gameState.isPaused && !gameState.isGameOver) {
        switch (event.key) {
          case 'ArrowLeft':
            event.preventDefault();
            movePiece(-1, 0);
            break;
          case 'ArrowRight':
            event.preventDefault();
            movePiece(1, 0);
            break;
          case 'ArrowDown':
            event.preventDefault();
            movePiece(0, 1);
            break;
          case 'ArrowUp':
            event.preventDefault();
            rotatePieceHandler();
            break;
          case ' ':
            event.preventDefault();
            hardDrop();
            break;
          case 'Escape':
            event.preventDefault();
            setGameMode('paused');
            break;
        }
      } else if (gameMode === 'paused' && event.key === 'Escape') {
        setGameMode('playing');
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [gameMode, gameState.isPaused, gameState.isGameOver, movePiece, rotatePieceHandler, hardDrop]);

  const handlePause = () => setGameMode('paused');
  const handleResume = () => setGameMode('playing');
  const handleRestart = () => initializeGame();
  const handleExit = () => setGameMode('menu');

  switch (gameMode) {
    case 'menu':
      return (
        <MainMenu
          onPlay={initializeGame}
          onSettings={() => setGameMode('settings')}
          onQuit={() => window.close()}
        />
      );

    case 'playing':
      return (
        <>
          <GameScreen
            gameState={gameState}
            onPause={handlePause}
            onQuit={handleExit}
          />
          {gameMode === 'paused' && (
            <PauseMenu
              onResume={handleResume}
              onRestart={handleRestart}
              onExit={handleExit}
            />
          )}
        </>
      );

    case 'paused':
      return (
        <>
          <GameScreen
            gameState={gameState}
            onPause={handlePause}
            onQuit={handleExit}
          />
          <PauseMenu
            onResume={handleResume}
            onRestart={handleRestart}
            onExit={handleExit}
          />
        </>
      );

    case 'gameOver':
      return (
        <GameOverScreen
          finalScore={gameState.score}
          linesCleared={gameState.linesCleared}
          level={gameState.level}
          finalBoard={gameState.board}
          onPlayAgain={initializeGame}
          onMainMenu={handleExit}
        />
      );

    case 'settings':
      return (
        <div className="min-h-screen bg-gray-900 flex items-center justify-center">
          <div className="bg-gray-800 border-4 border-white p-8 rounded-lg text-center">
            <h2 className="text-4xl text-white pixel-font mb-8">SETTINGS</h2>
            <p className="text-gray-300 pixel-font text-xl mb-8">
              Settings panel coming soon!
            </p>
            <button
              onClick={handleExit}
              className="px-8 py-4 bg-blue-500 hover:bg-blue-400 text-white text-2xl pixel-font border-4 border-white transition-all hover:scale-105"
            >
              BACK TO MENU
            </button>
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

    default:
      return null;
  }
}
