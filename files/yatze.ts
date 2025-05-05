

const sum = (numbers: Array<number>) =>numbers.reduce((acc,cur)=>acc+cur,0); 

const makeDoubles = (dices: Array<number>)=> (digit: number) => {
  const filtered = dices.filter(d=>d===digit)
  return filtered.length >= 2 ? sum(filtered.slice(0,2)) : 0
}

export const roll = (dices: Array<number>, type: string) => {
  const doubleScorer = makeDoubles(dices);
  
  switch (type) {
  
    case "Yatze":
      return dices.reduce((acc,cur)=>acc && cur===dices[0],true) ? 50 : 0;
    case "Ones":
      return doubleScorer(1);
    case "Twos":
      return doubleScorer(2);
    case "Threes":
      return doubleScorer(3);
    case "Fours":
      return doubleScorer(4);
    case "Fives":
      return doubleScorer(5);
    case "Sixes":
      return doubleScorer(6);
    default:
      return sum(dices);
  }
}
