import { useDroppable } from "@dnd-kit/core";
import type { Card as CardType, Column } from "./App";
import Card from "./Card";

function CardColumn({ column, card }: { column: Column; card: CardType[] }) {
  const { setNodeRef } = useDroppable({ id: String(column.id) });

  return (
    <div className="bg-white rounded-lg border-2 p-4">
      <h2 className="text-xl font-semibold mb-2 text-center">{column.title}</h2>
      <div ref={setNodeRef} className="flex flex-col gap-2 min-h-20">
        {card.map((c) => (
          <Card key={c.id} card={c} />
        ))}
      </div>
    </div>
  );
}

export default CardColumn;
