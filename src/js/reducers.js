import {
  ROLL_DICES,
  SCORE_CATEGORY,
  SET_KEEPER_STATUS,
  START
} from './actions';
import {
  ALL_CATEGORIES,
  BONUS_EARNING,
  LOWER_SECTION_START_INDEX,
  NB_CATEGORIES,
  NB_DICES,
  NB_ROLL_PER_ROUND,
  UPPER_SECTION_BONUS_GOAL
} from './model';

// utils

function getRandomDiceValue() {
  return Math.floor(Math.random() * 6 + 1);
}

function sumCategories(categories, from, to) {
  let total = 0;
  for (let i = from; i < to; i++) {
    total += categories[i] || 0;
  }
  return total;
}

function getBonus(upperSubtotal) {
  return upperSubtotal >= UPPER_SECTION_BONUS_GOAL ? BONUS_EARNING : 0;
}

// initial state

const dicesInitialState = Array(NB_DICES).fill(0);

const keepersInitialState = Array(NB_DICES).fill(false);

const initialState = {
  started: false,
  warningMessage: null,
  roll: 0,
  dices: dicesInitialState,
  keepers: keepersInitialState,
  categories: Array(NB_CATEGORIES).fill(null)
};

// case reducers

function resetRoll(state) {
  return {
    ...state,
    warningMessage: null,
    roll: 0,
    dices: dicesInitialState,
    keepers: keepersInitialState
  };
}

function setKeeperStatus(keepers, targetedIndex, newStatus) {
  return keepers.map((status, index) => {
    if (index == targetedIndex) {
      return newStatus;
    } else {
      return status;
    }
  });
}

function assignScoreToCategory(categories, targetedIndex, dices) {
  return categories.map((value, index) => {
    if (index == targetedIndex) {
      return ALL_CATEGORIES[index].score(dices);
    } else {
      return value;
    }
  });
}

// root reducer

export default function gameReducer(state = initialState, action) {
  switch (action.type) {
    case START:
      return { ...initialState, started: true };

    case ROLL_DICES:
      if (!state.started || isGameComplete(state)) {
        return state;
      }
      if (state.roll < NB_ROLL_PER_ROUND) {
        const nextValues = [];
        for (let i = 0; i < NB_DICES; i++) {
          if (state.keepers[i]) {
            nextValues.push(state.dices[i]);
          } else {
            nextValues.push(getRandomDiceValue());
          }
        }
        return {
          ...state,
          dices: nextValues,
          roll: state.roll + 1,
          warningMessage: null
        };
      } else {
        return {
          ...state,
          warningMessage:
            `You can only roll the dice up to ${NB_ROLL_PER_ROUND} times.\n` +
            'Please choose a given category to score in.'
        };
      }

    case SET_KEEPER_STATUS:
      // if the targeted dice has a proper assigned value
      if (state.dices[action.index]) {
        const nextKeepers = setKeeperStatus(
          state.keepers,
          action.index,
          action.status
        );
        return { ...state, keepers: nextKeepers };
      } else {
        return {
          ...state,
          warningMessage: 'Please start by rolling the dices.'
        };
      }

    case SCORE_CATEGORY:
      if (isRoundStarted(state)) {
        if (state.categories[action.index] == null) {
          const nextCategories = assignScoreToCategory(
            state.categories,
            action.index,
            state.dices
          );
          return resetRoll({ ...state, categories: nextCategories });
        } else {
          return {
            ...state,
            warningMessage: 'Please choose an empty category.'
          };
        }
      } else {
        return {
          ...state,
          warningMessage: 'Please start by rolling the dices.'
        };
      }

    default:
      return state;
  }
}


// selectors / getters

export function getRound(state) {
  return Math.min(
    state.categories.reduce((count, c) => count + (c != null ? 1 : 0), 1),
    13
  );
}

export function getPointScoring(state) {
  const upperSubtotal = sumCategories(
    state.categories,
    0,
    LOWER_SECTION_START_INDEX
  );
  const bonus = getBonus(upperSubtotal);
  const upperTotal = upperSubtotal + bonus;
  const lowerTotal = sumCategories(
    state.categories,
    LOWER_SECTION_START_INDEX,
    state.categories.length
  );
  return {
    upperSubtotal,
    bonus,
    upperTotal,
    lowerTotal,
    total: upperTotal + lowerTotal
  };
}

export function isRoundStarted(state) {
  return state.started && state.roll > 0;
}

export function isGameComplete(state) {
  return !state.categories.some(c => c == null);
}
