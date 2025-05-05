

const sum = (numbers: Array<number>) =>numbers.reduce((acc,cur)=>acc+cur,0); 

const makeDoubles = (dices: Array<number>)=> (digit: number) => {
  const filtered = dices.filter(d=>d===digit)
  return filtered.length >= 2 ? sum(filtered.slice(0,2)) : 0
}

export const roll = (dices: Array<number>, type: string) => {
  if(type==="Yatze"){
   return dices.reduce((acc,cur)=>acc && cur===dices[0],true) ? 50 : 0; 
  }
  
  const doubleScorer = makeDoubles(dices);
  if(type==="Ones"){
   return doubleScorer(1)
  }
  if(type==="Twos"){
   return doubleScorer(2)
  }
    if(type==="Threes"){
    return doubleScorer(3)
  }
    if(type==="Fours"){
    return doubleScorer(4)
  }
    if(type==="Fives"){
    return doubleScorer(5)
  }
    if(type==="Sixes"){
    return doubleScorer(6)
  }
 return sum(dices); 
}
