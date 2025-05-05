

const sum = (numbers: Array<number>) =>numbers.reduce((acc,cur)=>acc+cur,0); 

const makeDoubles = (dices: Array<number>)=> (digit: number) => {
  const filtered = dices.filter(d=>d===digit)
  return filtered.length >= 2 ? sum(filtered.slice(0,2)) : 0
}

const makeCombo = (dices: Array<number>) => 
                  (predicate: (d:number)=>boolean) => [1,2,3,4,5,6]
                           .map((digit) => predicate(dices.filter(d=>d===digit).length) ? digit : -1)
                           .filter(d=>d>=0)

export const roll = (dices: Array<number>, type: string) => {
  const doubleScorer = makeDoubles(dices);
  const comboScorer = makeCombo(dices);
  switch (type) {
    case "Chance":
      return sum(dices);
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
      const pairCombos = comboScorer((d)=>d >=2)
      if (pairCombos.length !==2) return 0;
      return Math.max(...pairCombos) *2
    case "Two Pairs":
      const twoCombos = comboScorer((d)=>d ==2)
      if (twoCombos.length !==2) return 0;
      return twoCombos.reduce((acc,cur)=>cur*2+acc,0);
    case "Three of a Kind":
      const threeCombos = comboScorer((d)=>d ==3)
      if (threeCombos.length == 0) return 0;
      return threeCombos[0]*3;
    case "Four of a Kind":
      const fourCombos = comboScorer((d)=>d ==4)
      if (fourCombos.length == 0) return 0;
      return fourCombos[0]*4;
    case "Small Straight":
      return dices.map((d,idx)=>d==idx+1).every(Boolean) ? 15 : 0;
    case "Large Straight":
      return dices.map((d,idx)=>d==idx+2).every(Boolean) ? 20 : 0;
    case "Full House":
      const tripleCombos = comboScorer((d)=>d==3)
      const doubleCombos = comboScorer((d)=>d==2)
      if(!(tripleCombos.length == 1 && doubleCombos.length ==1)) return 0;
      return tripleCombos[0]*3 + doubleCombos[0]*2;
    default:
      throw new Error("unhandled type")
  }
}
