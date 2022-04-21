const initialHitsLeft = (shipTypes) => {
  // loop through ships and count the number of ships
  let hitsLeft = 0;
  for (let shipType in shipTypes) {
    hitsLeft += shipTypes[shipType].count * shipTypes[shipType].size;
  }
  return hitsLeft;
}

export default initialHitsLeft;
