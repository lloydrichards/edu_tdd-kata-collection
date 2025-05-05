import {  roll } from './yatze';

describe('Chance', () => {
  it('roll 5 dice', () => {
    expect(roll([1,1,3,3,6],"Chance")).toEqual(14);
    expect(roll([4,5,5,6,1],"Chance")).toEqual(21);
  });
});

describe('Yatze', () => {
  it('roll 5 dice successfully', () => {
    expect(roll([1,1,1,1,1],"Yatze")).toEqual(50);
  });
    it('roll 5 dice unsuccessfully', () => {
    expect(roll([1,1,1,2,1],"Yatze")).toEqual(0);
  });
});