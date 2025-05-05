
export const roll = (dices: Array<number>, type: string) => {
  if(type==="Yatze"){
   return dices.reduce((acc,cur)=>acc && cur===dices[0],false) ? 50 : 0; 
  }
 return dices.reduce((acc,cur)=>acc+cur,0); 
}
