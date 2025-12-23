// COMPONENTS/Cells.tsx

type CellsProps = {
  board: ("X" | "O" | "")[];
  cellClicked: (index: number) => void;
};

function Cell({ value, onClick }: { value: string; onClick: () => void }) {
  return (
    <div
      role="button"
      aria-label={`Cell ${value ? value : "empty"}`}
      tabIndex={0}
      onClick={onClick}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") onClick();
      }}
      className="cells w-[75px] h-[75px] shadow-2xl cursor-pointer border-3 text-[50px] flex items-center justify-center select-none"
    >
      {value}
    </div>
  );
}

export default function Cells({ board, cellClicked }: CellsProps) {
  return (
    <>
      <div className="grid grid-cols-3 mx-auto w-[225px] gap-0">
        {board.map((val, i) => (
          <Cell key={i} value={val} onClick={() => cellClicked(i)} />
        ))}
      </div>
    </>
  );
}
