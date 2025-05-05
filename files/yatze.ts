
export const roll = (dices: Array<number>, type: string) => {
  if(type==="Yatze"){
   return dices.reduce((acc,cur)=>acc && cur===dices[0],true) ? 50 : 0; 
  }
  if(type==="Ones"){
    const filtered = dices.filter(d=>d===1)
   return filtered.length === 2 ? dices.reduce((acc,cur)=>acc+cur,0) : 0
  }
 return dices.reduce((acc,cur)=>acc+cur,0); 
}
