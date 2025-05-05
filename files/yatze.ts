

const sum = (numbers: Array<number>) =>numbers.reduce((acc,cur)=>acc+cur,0); 

export const roll = (dices: Array<number>, type: string) => {
  if(type==="Yatze"){
   return dices.reduce((acc,cur)=>acc && cur===dices[0],true) ? 50 : 0; 
  }
  if(type==="Ones"){
    const filtered = dices.filter(d=>d===1)
   return filtered.length === 2 ? sum(filtered) : 0
  }
 return sum(dices); 
}
