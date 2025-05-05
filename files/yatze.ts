
export const roll = (dices: Array<number>, type: string) => {
  if(type==="Yatze"){
   return 50; 
  }
 return dices.reduce((acc,cur)=>acc+cur,0); 
}
