// action types

export const START = 'START';
export const ROLL_DICES = 'ROLL_DICES';
export const SET_KEEPER_STATUS = 'SET_KEEPER_STATUS';
export const SCORE_CATEGORY = 'SCORE_CATEGORY';

// action creators

export function start() {
  return { type: START };
}

export function rollDices() {
  return { type: ROLL_DICES };
}

export function keepDice(index) {
  return { type: SET_KEEPER_STATUS, index, status: true };
}

export function releaseDice(index) {
  return { type: SET_KEEPER_STATUS, index, status: false };
}

export function scoreCategory(index) {
  return { type: SCORE_CATEGORY, index };
}
