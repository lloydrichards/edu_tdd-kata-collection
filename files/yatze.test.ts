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
    expect(roll([5,5,5,5,5],"Yatze")).toEqual(50);
  });
  it('roll 5 dice unsuccessfully', () => {
    expect(roll([1,1,1,2,1],"Yatze")).toEqual(0);
  });
});

describe('Ones', () => {
  it('roll 5 dice successfully', () => {
    expect(roll([1,1,2,4,4],"Ones")).toEqual(2);
    expect(roll([1,1,1,4,4],"Ones")).toEqual(2);
  })
  it('roll 5 dice unsuccessfully', () => {
    expect(roll([1,2,2,4,4],"Ones")).toEqual(0);
  })
});

describe('Twos', () => {
  it('roll 5 dice successfully', () => {
    expect(roll([1,2,2,4,4],"Twos")).toEqual(4);
    expect(roll([1,2,2,2,4],"Twos")).toEqual(4);
  })
  it('roll 5 dice unsuccessfully', () => {
    expect(roll([1,1,2,4,4],"Twos")).toEqual(0);
  })
});

describe('Threes, Fours, Fives, Sixes', () => {
  it('roll 5 dice successfully', () => {
    expect(roll([1,3,3,4,4],"Threes")).toEqual(6);
    expect(roll([1,2,2,4,4],"Fours")).toEqual(8);
    expect(roll([5,2,5,2,4],"Fives")).toEqual(10);
    expect(roll([1,2,6,6,4],"Sixes")).toEqual(12);
  })
  it('roll 5 dice unsuccessfully', () => {
    expect(roll([1,2,2,4,4],"Threes")).toEqual(0);
    expect(roll([1,2,2,2,4],"Fours")).toEqual(0);
    expect(roll([1,2,2,2,4],"Fives")).toEqual(0);
    expect(roll([1,2,2,2,4],"Sixes")).toEqual(0);
  })
});

describe('Pairs', () => {
  it('roll 5 dice successfully', () => {
    expect(roll([3,3,3,4,4],"Pairs")).toEqual(8);
    expect(roll([1,1,6,2,6],"Pairs")).toEqual(12);
  })
  it('roll 5 dice unsuccessfully', () => {
    expect(roll([3,3,3,4,1],"Pairs")).toEqual(0);
  })
});

describe('Two Pairs', () => {
  it('roll 5 dice successfully', () => {
    expect(roll([1,1,2,3,3],"Two Pairs")).toEqual(8);
    expect(roll([1,2,2,3,3],"Two Pairs")).toEqual(10);
  })
  it('roll 5 dice unsuccessfully', () => {
    expect(roll([1,1,2,2,2],"Two Pairs")).toEqual(0);
    expect(roll([1,1,2,3,4],"Two Pairs")).toEqual(0);
  })
});

describe('Three of a Kind', () => {
  it('roll 5 dice successfully', () => {
    expect(roll([3,3,3,4,5],"Three of a Kind")).toEqual(9);
    expect(roll([3,5,5,4,5],"Three of a Kind")).toEqual(15);
  })
  it('roll 5 dice unsuccessfully', () => {
    expect(roll([3,3,4,5,6],"Three of a Kind")).toEqual(0);
    expect(roll([3,3,3,3,1],"Three of a Kind")).toEqual(0);
  })
});

describe('Four of a Kind', () => {
  it('roll 5 dice successfully', () => {
    expect(roll([2,2,2,2,5],"Four of a Kind")).toEqual(8);
    expect(roll([3,5,5,5,5],"Four of a Kind")).toEqual(20);
  })
  it('roll 5 dice unsuccessfully', () => {
    expect(roll([2,2,2,5,5],"Four of a Kind")).toEqual(0);
    expect(roll([2,2,2,2,2],"Four of a Kind")).toEqual(0);
  })
});

describe('Small Straight', () => {
  it('roll 5 dice successfully', () => {
    expect(roll([1,2,3,4,5],"Small Straight")).toEqual(15);
  })
  it('roll 5 dice unsuccessfully', () => {
    expect(roll([2,2,2,5,5],"Small Straight")).toEqual(0);
    expect(roll([2,2,2,2,2],"Small Straight")).toEqual(0);
  })
});

describe('Large Straight', () => {
  it('roll 5 dice successfully', () => {
    expect(roll([2,3,4,5.6],"Large Straight")).toEqual(20);
  })
  it('roll 5 dice unsuccessfully', () => {
    expect(roll([2,2,2,5,5],"Large Straight")).toEqual(0);
    expect(roll([2,2,2,2,2],"Large Straight")).toEqual(0);
  })
});