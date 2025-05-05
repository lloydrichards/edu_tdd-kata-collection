
export const roll = (dices: Array<number>, type: string) => {
 return dices.reduce((acc,cur)=>acc+cur,0); 
}
