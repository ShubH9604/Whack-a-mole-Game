import React, { useState, useEffect } from "react";
import Mole from "./Mole";
import "./GameBoard.css";

const GameBoard = () => {
  const [molePositions, setMolePositions] = useState(Array(9).fill(false));
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [gameActive, setGameActive] = useState(false);

  useEffect(() => {
    if (gameActive && timeLeft > 0) {
      const interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    } else if (timeLeft === 0) {
      setGameActive(false);
    }
  }, [gameActive, timeLeft]);

  useEffect(() => {
    if (gameActive) {
      const moleInterval = setInterval(() => {
        let newMolePositions = Array(9).fill(false);
        newMolePositions[Math.floor(Math.random() * 9)] = true;
        setMolePositions(newMolePositions);
      }, 700);
      return () => clearInterval(moleInterval);
    }
  }, [gameActive]);

  const handleMoleClick = (index) => {
    if (molePositions[index] && gameActive) {
      setScore((prev) => prev + 1);
      let newMolePositions = [...molePositions];
      newMolePositions[index] = false;
      setMolePositions(newMolePositions);
    }
  };

  const startGame = () => {
    setScore(0);
    setTimeLeft(30);
    setGameActive(true);
  };

  return (
    <div className="game-container">
      <h1>Whack-a-Mole 🎯</h1>
      <p className="timer">⏳ Time Left: <span>{timeLeft}s</span></p>
      <p className="score">🏆 Score: <span>{score}</span></p>
      <div className="grid">
        {molePositions.map((isMole, index) => (
          <Mole key={index} isMole={isMole} onClick={() => handleMoleClick(index)} />
        ))}
      </div>
      {!gameActive && <button onClick={startGame}>🔄 Play Again</button>}
    </div>
  );
};

export default GameBoard;