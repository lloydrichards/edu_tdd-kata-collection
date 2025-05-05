import {  roll } from './hiker';

describe('Chance', () => {
  it('roll 5 dice', () => {
    expect(roll([1,1,3,3,6],"Chance")).toEqual(14);
    expect(roll([4,5,5,6,1],"Chance")).toEqual(21);
  });
});