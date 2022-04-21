import { useState } from 'react';
import Cell from './components/Cell';
import './App.css';

const ships = {
  shipTypes: {
    carrier: {size: 5, count: 1},
    battleship:{size: 4, count: 1},
    cruiser:{size: 3, count: 1},
    destroyer:{size: 2, count: 1},
    submarine: { size: 3, count: 1}
  },
  layout: [
    {ship: 'carrier', positions: [[2,9],[3,9],[4,9],[5,9],[6,9]]},
    {ship: 'battleship', positions: [[5,2],[5,3],[5,4],[5,5]]},
    {ship: 'cruiser', positions: [[8,1],[8,2],[8,3]]},
    {ship: 'submarine', positions: [[3,0],[3,1],[3,2]]},
    {ship: 'destroyer', positions: [[0,0],[1,0]]}
  ]
};

function App() {
  const [grid, setGrid] = useState(createGrid());
  const [clickCount, setClickCount] = useState(0);
  const [hitsLeft, setHitsLeft] = useState(initialHitsLeft());

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

  return (
    <div className="container flex flex-col">
      <h1 className="text-center font-black text-3xl my-4">Battleship</h1>

      <div className="max-w-2xl mx-auto justify-center items-center">
        <div className="flex">
          <h2>Clicks: {clickCount}</h2>
          <h2>Hits left: {hitsLeft}</h2>
        </div>

        <div className="flex">
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
    </div>
  );
}

export default App;

const createGrid = () => {
  const grid = [];
  for (let i = 0; i < 10; i++) {
    grid[i] = [];
    for (let j = 0; j < 10; j++) {

      // check if any ships have been placed on this cell
      const ship = ships.layout.find(ship => ship.positions.find(pos => pos[0] === i && pos[1] === j));

      grid[i][j] = {
        x: i,
        y: j,
        ship,
        hit: false,
      };
    }
  }

  return grid;
}

const initialHitsLeft = () => {
  // loop through ships and count the number of ships
  let hitsLeft = 0;
  for (let shipType in ships.shipTypes) {
    hitsLeft += ships.shipTypes[shipType].count * ships.shipTypes[shipType].size;
  }
  return hitsLeft;
}
