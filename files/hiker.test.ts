import { answer, roll } from './hiker';

describe('answer', () => {
  it('to life the universe and everything', () => {
    expect(answer()).toEqual(42);
  });
});

describe('Chance', () => {
  it('roll 5 dice', () => {
    expect(roll([1,1,3,3,6],"Chance")).toEqual(14);
  });
});