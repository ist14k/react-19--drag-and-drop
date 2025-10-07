import { useDraggable } from "@dnd-kit/core";
import type { Card as CardType } from "./App";

function Card({ card }: { card: CardType }) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: card.id,
  });

  const style = transform
    ? {
        transform: `translate(${transform.x}px, ${transform.y}px)`,
      }
    : undefined;

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      style={style}
      className="p-2 bg-gray-400 rounded shadow cursor-move hover:bg-gray-500"
    >
      {card.content}
    </div>
  );
}

export default Card;
