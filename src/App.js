import { useState } from 'react';
import Cell from './components/Cell';
import './App.css';

const shipTypes = {
  carrier: {size: 5, count: 1},
  battleship:{size: 4, count: 1},
  cruiser:{size: 3, count: 1},
  destroyer:{size: 2, count: 1},
  submarine: { size: 3, count: 1}
};

function App() {
  const [grid, setGrid] = useState(createGrid());
  const [clickCount, setClickCount] = useState(0);
  const [hitsLeft, setHitsLeft] = useState(initialHitsLeft());

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
    setGrid(createGrid());
    setClickCount(0);
    setHitsLeft(initialHitsLeft());
  };

  

  return (
    <div className="container mx-auto flex flex-col">
      <h1 className="text-center text-blue-900 font-black text-3xl mt-8 mb-4">Battleship</h1>

      <div className="max-w-2xl mx-auto justify-center items-center">
        <div className="flex">
          <h2>Clicks: {clickCount}</h2>
          <h2 className="ml-auto">Hits left: {hitsLeft}</h2>
        </div>

        <div className="flex mb-8">
          {grid.map((row, i) => (
            <div key={i} className="flex flex-col w-8 mx-[2px] justify-center items-center">
              {row.map((cell, j) => (
                <div key={j} className="my-[1px]">
                  <Cell ship={cell.ship} hit={cell.hit} onClick={() => fire(cell)} />
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


const initialHitsLeft = () => {
  // loop through ships and count the number of ships
  let hitsLeft = 0;
  for (let shipType in shipTypes) {
    hitsLeft += shipTypes[shipType].count * shipTypes[shipType].size;
  }
  return hitsLeft;
}

const createGrid = () => {
  // create default grid
  const grid = [];
  for (let i = 0; i < 10; i++) {
    grid[i] = [];
    for (let j = 0; j < 10; j++) {
      grid[i][j] = {
        x: i,
        y: j,
        ship: false,
        hit: false,
      };
    }
  }

  // add ships
  for (let shipType in shipTypes) {
    const ship = shipTypes[shipType];
    for (let i = 0; i < ship.count; i++) {

      // try to position ship
      let placed = false;
      while (!placed) {
        const direction = Math.random() < 0.5 ? 'horizontal' : 'vertical';
        const x = Math.floor(Math.random() * 10);
        const y = Math.floor(Math.random() * 10);
        const positions = [];
        if (direction === 'horizontal') {
          for (let j = 0; j < ship.size; j++) {
            positions.push([x + j, y]);
          }
        } else {
          for (let j = 0; j < ship.size; j++) {
            positions.push([x, y + j]);
          }
        }

        // check if ship can be placed
        let canPlace = true;
        positions.forEach(position => {
          console.log(grid, position[0], position[1]);
          try {
            if (grid[position[0]][position[1]].ship) {
              canPlace = false;
            }
          } catch (e) {
            canPlace = false;
          }
        });
        
        if (canPlace) {
          positions.forEach(position => {
            grid[position[0]][position[1]].ship = {
              type: shipType,
              size: ship.size,
              direction: direction,
              x: position[0],
              y: position[1]
            };
          });
          placed = true;
        }
      }
    }
  }

  return grid;
}


