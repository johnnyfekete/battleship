import { useState } from 'react';
import Cell from './components/Cell';
import createGrid from './utils/createGrid';
import initialHitsLeft from './utils/initialHitsLeft';
import './App.css';

const shipTypes = {
  carrier: {size: 5, count: 1},
  battleship:{size: 4, count: 1},
  cruiser:{size: 3, count: 1},
  destroyer:{size: 2, count: 1},
  submarine: { size: 3, count: 1}
};

function App() {
  const [grid, setGrid] = useState(createGrid(shipTypes));
  const [clickCount, setClickCount] = useState(0);
  const [hitsLeft, setHitsLeft] = useState(initialHitsLeft(shipTypes));
  const [showHelp, setShowHelp] = useState(false);

  // fire a torpedo on a target cell
  const fire = (target) => {
    target.hit = true;
    // replace the cell in X and Y of grid with new cell
    const newGrid = grid.map((row) => {
      return row.map((cell) => {
        if (cell.x === target.x && cell.y === target.y) {
          return target;
        }
        return cell;
      });
    });
    setGrid(newGrid);
    setClickCount(clickCount + 1);

    if (target.ship) {
      setHitsLeft(hitsLeft - 1);
    }
  };

  // reset game
  const reset = () => {
    setGrid(createGrid(shipTypes));
    setClickCount(0);
    setHitsLeft(initialHitsLeft(shipTypes));
    setShowHelp(false);
  };

  return (
    <div className="container mx-auto flex flex-col">
      <h1 className="text-center text-blue-900 font-black text-3xl mt-8 mb-4">Battleship</h1>

      <div className="max-w-2xl mx-auto justify-center items-center">
        <div className="flex mb-4 items-center">
          <h2 className="mr-auto">Clicks: {clickCount}</h2>
          {!showHelp && (
            <button type="button" 
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-0 px-2 rounded-full mr-2 ml-auto"
              onClick={() => setShowHelp(true)}
            >
              Show help
            </button>
          )}
          <h2>Hits left: {hitsLeft}</h2>
        </div>

        <div className="flex mb-8">
          {grid.map((row, i) => (
            <div key={i} className="flex flex-col w-8 mx-[2px] justify-center items-center">
              {row.map((cell, j) => (
                <div key={j} className="my-[2px]">
                  <Cell ship={cell.ship} hit={cell.hit} onClick={() => fire(cell)} showHelp={showHelp} />
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      {(hitsLeft === 0) && (
        <div className="fixed inset-0 bg-white bg-opacity-90 flex flex-col items-center justify-center mx-auto">
          <h1 className="text-center text-blue-900 font-black text-3xl mt-8 mb-4">You win!</h1>
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full my-4" 
            onClick={reset}>
              Play again
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
