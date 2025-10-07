import "./App.css";
import { useState } from "react";
import { DndContext, type DragEndEvent } from "@dnd-kit/core";
import CardColumn from "./CardColumn";

export type Column = {
  id: number;
  title: string;
  position: number;
};

export type Card = {
  id: number;
  content: string;
  position: number;
};

const columns: Column[] = [
  { id: 1, title: "To Do", position: 0 },
  { id: 2, title: "In Progress", position: 1 },
  { id: 3, title: "Done", position: 2 },
];

const initialCards: Card[] = [
  { id: 1, content: "Card 1", position: 0 },
  { id: 2, content: "Card 2", position: 0 },
  { id: 3, content: "Card 3", position: 0 },
  { id: 4, content: "Card 4", position: 1 },
  { id: 5, content: "Card 5", position: 2 },
  { id: 6, content: "Card 6", position: 1 },
  { id: 7, content: "Card 7", position: 2 },
  { id: 8, content: "Card 8", position: 1 },
  { id: 9, content: "Card 9", position: 2 },
  { id: 10, content: "Card 10", position: 2 },
];

function App() {
  const [cards, setCards] = useState<Card[]>(initialCards);

  // Your custom function
  const onCardMoved = (
    cardId: number,
    fromPosition: number,
    toPosition: number
  ) => {
    console.log(
      `Card ${cardId} moved from position ${fromPosition} to ${toPosition}`
    );
    // Add your custom logic here
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over) return;

    if (over && active.id !== over.id) {
      const cardId = Number(active.id);
      const newPosition = columns.find(
        (col) => col.id === Number(over.id)
      )!.position;
      const oldPosition = cards.find((card) => card.id === cardId)!.position;

      setCards((prevCards) =>
        prevCards.map((card) =>
          card.id === cardId
            ? {
                ...card,
                position: newPosition,
              }
            : card
        )
      );

      // Trigger your custom function
      onCardMoved(cardId, oldPosition, newPosition);
    }
  };

  return (
    <>
      <div className="max-w-4xl mx-auto p-8">
        <h1 className="text-3xl font-bold mb-6 text-center">D&D Board</h1>
        <div className="grid grid-cols-3 gap-4">
          <DndContext onDragEnd={handleDragEnd}>
            {columns.map((column) => (
              <CardColumn
                key={column.id}
                column={column}
                card={cards.filter((card) => card.position === column.position)}
              />
            ))}
          </DndContext>
        </div>
      </div>
    </>
  );
}

export default App;
