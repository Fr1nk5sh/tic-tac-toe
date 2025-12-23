// TickTackToe.tsx
import { useCallback, useState } from "react";
import Cells from "./COMPONENTS/cells";
import Btn from "./COMPONENTS/button";

type Player = "X" | "O" | "";

const WIN_CONDITIONS: number[][] = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6], // fixed diagonal
];

export default function TickTackToe() {
  const [board, setBoard] = useState<Player[]>(
    () => Array(9).fill("") as Player[]
  );
  const [currentPlayer, setCurrentPlayer] = useState<Player>("X");
  const [running, setRunning] = useState<boolean>(true);
  const [status, setStatus] = useState<string>(`${currentPlayer}'s Turn`);

  const resetGame = useCallback(() => {
    setBoard(Array(9).fill("") as Player[]);
    setCurrentPlayer("X");
    setRunning(true);
    setStatus(`X's Turn`);
  }, []);

  const checkWinner = useCallback((nextBoard: Player[]) => {
    // return "X" or "O" if winner, "draw" if draw, null otherwise
    for (const [a, b, c] of WIN_CONDITIONS) {
      if (
        nextBoard[a] &&
        nextBoard[a] === nextBoard[b] &&
        nextBoard[b] === nextBoard[c]
      ) {
        return nextBoard[a];
      }
    }
    if (!nextBoard.includes("")) return "draw";
    return null;
  }, []);

  const handleCellClick = useCallback(
    (index: number) => {
      if (!running) return;
      if (board[index] !== "") return;

      const nextBoard = board.slice();
      nextBoard[index] = currentPlayer;
      setBoard(nextBoard);

      // Evaluate result
      const result = checkWinner(nextBoard);
      if (result === "draw") {
        setStatus("Draw!");
        setRunning(false);
        return;
      }
      if (result === "X" || result === "O") {
        setStatus(`${result} Wins!`);
        setRunning(false);
        return;
      }

      // No winner -> toggle player
      const nextPlayer: Player = currentPlayer === "X" ? "O" : "X";
      setCurrentPlayer(nextPlayer);
      setStatus(`${nextPlayer}'s Turn`);
    },
    [board, checkWinner, currentPlayer, running]
  );

  return (
    <div className="mx-auto font-[cursive] text-center">
      <h1 className="text-2xl font-bold m-4">Tick Tack Toe</h1>
      <div className="w-lg mx-auto p-5">
        <Cells board={board} cellClicked={handleCellClick} />
      </div>
      <div className="text-center mx-auto m-3 font-bold text-xl">{status}</div>
      <Btn restartGame={resetGame} />
    </div>
  );
}
