

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
    case "Pairs":
      const hasPairOfOnes = dices.filter(d=>d===1).length >= 2
      const hasPairOfTwos = dices.filter(d=>d===2).length >= 2
      const hasPairOfThrees = dices.filter(d=>d===3).length >= 2
      const hasPairOfFours = dices.filter(d=>d===4).length >= 2
      const hasPairOfFives = dices.filter(d=>d===5).length >= 2
      const hasPairOfSixes = dices.filter(d=>d===6).length >= 2
      
      const combo = [hasPairOfOnes,hasPairOfTwos,hasPairOfThrees,hasPairOfFours,hasPairOfFives,hasPairOfSixes].filter(Boolean)
      return combo.length ==2 ? 8 : 0;
    default:
      return sum(dices);
  }
}
