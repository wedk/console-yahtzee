import {
  start,
  rollDices,
  keepDice,
  releaseDice,
  scoreCategory,
  START,
  ROLL_DICES,
  SET_KEEPER_STATUS,
  SCORE_CATEGORY
} from '../js/actions';

describe('actions', () => {
  test('start', () => {
    const expectedAction = {
      type: START
    };
    expect(start()).toEqual(expectedAction);
  });

  test('rollDices', () => {
    const expectedAction = {
      type: ROLL_DICES
    };
    expect(rollDices()).toEqual(expectedAction);
  });

  test('keepDice', () => {
    const diceIndex = 3;
    const expectedAction = {
      type: SET_KEEPER_STATUS,
      index: 3,
      status: true
    };
    expect(keepDice(diceIndex)).toEqual(expectedAction);
  });

  test('releaseDice', () => {
    const diceIndex = 1;
    const expectedAction = {
      type: SET_KEEPER_STATUS,
      index: 1,
      status: false
    };
    expect(releaseDice(diceIndex)).toEqual(expectedAction);
  });

  test('scoreCategory', () => {
    const categoryIndex = 13;
    const expectedAction = {
      type: SCORE_CATEGORY,
      index: 13
    };
    expect(scoreCategory(categoryIndex)).toEqual(expectedAction);
  });
});
