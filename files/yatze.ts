

const sum = (numbers: Array<number>) =>numbers.reduce((acc,cur)=>acc+cur,0); 

export const roll = (dices: Array<number>, type: string) => {
  if(type==="Yatze"){
   return dices.reduce((acc,cur)=>acc && cur===dices[0],true) ? 50 : 0; 
  }
  if(type==="Ones"){
    const filtered = dices.filter(d=>d===1)
   return filtered.length >= 2 ? sum(filtered.slice(0,2)) : 0
  }
  if(type==="Twos"){
    const filtered = dices.filter(d=>d===2)
   return filtered.length >= 2 ? sum(filtered.slice(0,2)) : 0
  }
    if(type==="Threes"){
    const filtered = dices.filter(d=>d===3)
   return filtered.length >= 2 ? sum(filtered.slice(0,2)) : 0
  }
    if(type==="Fours"){
    const filtered = dices.filter(d=>d===4)
   return filtered.length >= 2 ? sum(filtered.slice(0,2)) : 0
  }
    if(type==="Fives"){
    const filtered = dices.filter(d=>d===5)
   return filtered.length >= 2 ? sum(filtered.slice(0,2)) : 0
  }
    if(type==="Sixes"){
    const filtered = dices.filter(d=>d===6)
   return filtered.length >= 2 ? sum(filtered.slice(0,2)) : 0
  }
 return sum(dices); 
}
