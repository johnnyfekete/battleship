const createGrid = (shipTypes) => {
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
          positions.forEach((position, index) => {
            grid[position[0]][position[1]].ship = {
              type: shipType,
              size: ship.size,
              direction: direction,
              first: index === 0,
              last: index === ship.size - 1,
              x: position[0],
              y: position[1],
            };
          });
          placed = true;
        }
      }
    }
  }

  return grid;
}
  
export default createGrid;
