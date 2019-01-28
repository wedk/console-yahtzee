import {
  START,
  ROLL_DICES,
  SET_KEEPER_STATUS,
  SCORE_CATEGORY
} from '../js/actions';
import reducer, {
  isGameComplete,
  getRound,
  isRoundStarted,
  getPointScoring
} from '../js/reducers';

describe('game reducer', () => {
  it('should return the initial state', () => {
    const state = reducer(undefined, {});
    expect(state).toEqual({
      started: false,
      warningMessage: null,
      roll: 0,
      dices: Array(5).fill(0),
      keepers: Array(5).fill(false),
      categories: Array(13).fill(null)
    });
  });

  describe('START', () => {
    it('should start a new game', () => {
      const state = reducer({}, { type: START });
      expect(state).toEqual({
        started: true,
        warningMessage: null,
        roll: 0,
        dices: Array(5).fill(0),
        keepers: Array(5).fill(false),
        categories: Array(13).fill(null)
      });
    });

    it('should start a new game even if dirty', () => {
      const dirtyState = {
        started: true,
        warningMessage: 'Please choose an empty category.',
        roll: 2,
        dices: [1, 2, 3, 4, 5],
        keepers: [false, false, true, true, true],
        categories: [1, 2, 3, 4, 5, null, 7, 8, 9, 10, 11, 12, 13]
      };
      const state = reducer(dirtyState, { type: START });
      expect(state).toEqual({
        started: true,
        warningMessage: null,
        roll: 0,
        dices: Array(5).fill(0),
        keepers: Array(5).fill(false),
        categories: Array(13).fill(null)
      });
    });
  });

  describe('ROLL_DICES', () => {
    it('should roll dices', () => {
      // start a new game
      let state = reducer({}, { type: START });
      // roll the dices
      state = reducer(state, { type: ROLL_DICES });
      expect(state).toEqual({
        started: true,
        warningMessage: null,
        roll: 1,
        dices: expect.any(Array),
        keepers: Array(5).fill(false),
        categories: Array(13).fill(null)
      });
      // assert dice values
      expect(state.dices).toHaveLength(5);
      state.dices.forEach(dice => {
        expect(dice).toBeGreaterThanOrEqual(1);
        expect(dice).toBeLessThanOrEqual(6);
      });
    });

    it('should only roll dices once the game is started', () => {
      // roll the dices
      const initialState = reducer(undefined, {});
      const state = reducer(initialState, { type: ROLL_DICES });
      expect(state).toEqual(initialState);
    });

    it('should limit the number of roll to 3 per round', () => {
      // start a new game
      let state = reducer({}, { type: START });
      // 1st dices roll
      state = reducer(state, { type: ROLL_DICES });
      expect(state.roll).toBe(1);
      // 2nd dices roll
      state = reducer(state, { type: ROLL_DICES });
      expect(state.roll).toBe(2);
      // 3rd dices roll
      state = reducer(state, { type: ROLL_DICES });
      expect(state.roll).toBe(3);
      // try to roll once again
      state = reducer(state, { type: ROLL_DICES });
      expect(state.roll).toBe(3);
      expect(state.warningMessage).toMatch(
        /^You can only roll the dice up to 3 times.*/
      );
    });
  });

  describe('SET_KEEPER_STATUS', () => {
    it('should keep/release dices', () => {
      // start a new game
      let state = reducer({}, { type: START });
      // roll the dices
      state = reducer(state, { type: ROLL_DICES });
      // keep 4th dice
      state = reducer(state, {
        type: SET_KEEPER_STATUS,
        status: true,
        index: 3
      });
      expect(state.keepers).toEqual([false, false, false, true, false]);
      // keep 1st dice
      state = reducer(state, {
        type: SET_KEEPER_STATUS,
        status: true,
        index: 0
      });
      expect(state.keepers).toEqual([true, false, false, true, false]);
      // keep 5th dice (last)
      state = reducer(state, {
        type: SET_KEEPER_STATUS,
        status: true,
        index: 4
      });
      expect(state.keepers).toEqual([true, false, false, true, true]);
      // release 4th dice
      state = reducer(state, {
        type: SET_KEEPER_STATUS,
        status: false,
        index: 3
      });
      expect(state.keepers).toEqual([true, false, false, false, true]);
      // release 1st dice
      state = reducer(state, {
        type: SET_KEEPER_STATUS,
        status: false,
        index: 0
      });
      expect(state.keepers).toEqual([false, false, false, false, true]);
      // release 5th dice (last)
      state = reducer(state, {
        type: SET_KEEPER_STATUS,
        status: false,
        index: 4
      });
      expect(state.keepers).toEqual([false, false, false, false, false]);
    });

    it('should only keep/relase dices once rolled', () => {
      let state = reducer({}, { type: START });
      state = reducer(state, {
        type: SET_KEEPER_STATUS,
        status: true,
        index: 3
      });
      expect(state.keepers).toEqual(Array(5).fill(false));
      expect(state.warningMessage).toBe('Please start by rolling the dices.');
    });
  });

  describe('SCORE_CATEGORY', () => {
    it('should score points in the appropriate category', () => {
      // start a new game
      let state = reducer({}, { type: START });
      // roll the dices
      state = reducer(state, { type: ROLL_DICES });
      // add up the face value of any roll
      const expectedValue = state.dices.reduce(
        (score, dice) => score + dice,
        0
      );
      // score points in the "Chance" category
      state = reducer(state, { type: SCORE_CATEGORY, index: 12 });
      expect(state).toEqual({
        started: true,
        warningMessage: null,
        roll: 0,
        dices: expect.any(Array),
        keepers: Array(5).fill(false),
        categories: Array(12)
          .fill(null)
          .concat([expectedValue])
      });
    });

    it('should only score points if the dices were rolled', () => {
      // start a new game
      let state = reducer({}, { type: START });
      // score points in the "Chance" category
      state = reducer(state, { type: SCORE_CATEGORY, index: 12 });
      expect(state.categories).toEqual(Array(13).fill(null));
      expect(state.warningMessage).toBe('Please start by rolling the dices.');
    });

    it('should only score points in an empty category', () => {
      // start a new game
      let state = reducer({}, { type: START });
      // roll the dices for the 1st round
      state = reducer(state, { type: ROLL_DICES });
      // score points in the "Chance" category
      state = reducer(state, { type: SCORE_CATEGORY, index: 12 });
      const chanceCategoryScore = state.categories[12];
      // roll the dices for the 2nd round
      state = reducer(state, { type: ROLL_DICES });
      // score points in the "Chance" category
      state = reducer(state, { type: SCORE_CATEGORY, index: 12 });
      expect(state.categories[12]).toBe(chanceCategoryScore);
      expect(state.warningMessage).toBe('Please choose an empty category.');
    });
  });

  describe('selectors', () => {
    describe('isGameComplete', () => {
      it('starting', () => {
        let state = reducer({}, { type: START });
        expect(isGameComplete(state)).toBe(false);
      });

      it('in progress', () => {
        let state = reducer({}, { type: START });
        // manually mutate the state to feed all categories
        state.categories = Array(6)
          .fill(1)
          .concat(Array(7).fill(null));
        expect(isGameComplete(state)).toBe(false);
      });

      it('complete', () => {
        let state = reducer({}, { type: START });
        // manually mutate the state to feed all categories
        state.categories = Array(13).fill(1);
        expect(isGameComplete(state)).toBe(true);
      });
    });

    describe('isRoundStarted', () => {
      it('initial state', () => {
        const state = reducer(undefined, {});
        expect(isRoundStarted(state)).toBe(false);
      });

      it('game started', () => {
        const state = reducer({}, { type: START });
        expect(isRoundStarted(state)).toBe(false);
      });

      it('dices rolled', () => {
        let state = reducer({}, { type: START });
        state = reducer(state, { type: ROLL_DICES });
        expect(isRoundStarted(state)).toBe(true);
      });
    });

    describe('getRound', () => {
      it('starting / min', () => {
        const state = reducer({}, { type: START });
        expect(getRound(state)).toBe(1);
      });

      it('in progress', () => {
        const state = reducer({}, { type: START });
        // manually mutate the state to feed all categories
        state.categories = Array(6)
          .fill(1)
          .concat(Array(7).fill(null));
        expect(getRound(state)).toBe(7);
      });

      it('complete / max', () => {
        const state = reducer({}, { type: START });
        // manually mutate the state to feed all categories
        state.categories = Array(13).fill(1);
        expect(getRound(state)).toBe(13);
      });
    });

    describe('getPointScoring', () => {
      it('game started', () => {
        const state = reducer({}, { type: START });
        expect(getPointScoring(state)).toEqual({
          upperSubtotal: 0,
          bonus: 0,
          upperTotal: 0,
          lowerTotal: 0,
          total: 0
        });
      });

      it('without bonus', () => {
        const state = reducer({}, { type: START });
        // manually mutate the state to feed all categories
        state.categories = [
          //- upper section
          1, // Aces
          2, // Twos
          3, // Threes
          4, // Fours
          5, // Fives
          6, // Sixes
          //- lower section
          0, // Three Of A Kind
          0, // Four Of A Kind
          25, // Full House
          30, // Small Straight
          40, // Large Straight
          50, // Yahtzee
          5 // Chance
        ];
        expect(getPointScoring(state)).toEqual({
          upperSubtotal: 21,
          bonus: 0,
          upperTotal: 21,
          lowerTotal: 150,
          total: 171
        });
      });

      it('with bonus', () => {
        const state = reducer({}, { type: START });
        // manually mutate the state to feed all categories
        state.categories = [
          //- upper section
          1 * 3, // Aces
          2 * 3, // Twos
          3 * 3, // Threes
          4 * 3, // Fours
          5 * 3, // Fives
          6 * 3, // Sixes
          //- lower section
          0, // Three Of A Kind
          0, // Four Of A Kind
          25, // Full House
          30, // Small Straight
          40, // Large Straight
          50, // Yahtzee
          5 // Chance
        ];
        expect(getPointScoring(state)).toEqual({
          upperSubtotal: 63,
          bonus: 35,
          upperTotal: 98,
          lowerTotal: 150,
          total: 248
        });
      });

    });
  });
});
