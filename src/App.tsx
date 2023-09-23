import { FC, useState } from 'react';
import { Game, Slot } from './Game';

import './style.css';

export const App: FC = () => {
  const [game, setGame] = useState(new Game());
  const [hasWon, setHasWon] = useState(false);

  const onStart = () => {
    setGame(new Game());
    setHasWon(false);
  };

  const moveNumber = (slot: Slot) => {
    slot.empty();
    const gameCopy = new Game();
    gameCopy.slots = game.slots;
    const hasWon = game.hasWon();
    setGame(gameCopy);
    if (hasWon) setHasWon(true);
  };

  return (
    <div>
      <button onClick={onStart}>Start</button>

      {hasWon && <p>You have won!</p>}

      <div className="grid">
        {game.slots.map((slot) =>
          slot.content != null ? (
            <button
              onClick={() => {
                moveNumber(slot);
              }}
            >
              {slot.content}
            </button>
          ) : (
            <div></div>
          )
        )}
      </div>
    </div>
  );
};
