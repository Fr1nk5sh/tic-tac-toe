// COMPONENTS/Btn.tsx

type BtnProps = {
  restartGame: () => void;
};

export default function Btn({ restartGame }: BtnProps) {
  return (
    <button
      className="border p-2 rounded-2xl cursor-pointer mt-4"
      onClick={restartGame}
      type="button"
    >
      Restart Game
    </button>
  );
}
