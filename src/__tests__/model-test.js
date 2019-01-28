import { ALL_CATEGORIES } from '../js/model';

describe('model', () => {

  test.each(Array(13).fill(0).map((v, i) => [i]))(
    'category %i should assert the number of received dices',
    index => {
      const category = ALL_CATEGORIES[index];
      // too many dices
      expect(() => {
        category.score(Array(6).fill(6));
      }).toThrow();
      // too few dices
      expect(() => {
        category.score(Array(4).fill(6));
      }).toThrow();
    }
  );

  describe('Aces', () => {
    const category = ALL_CATEGORIES[0];

    it('should have a proper label', () => {
      const expectedLabel = 'Aces';
      expect(category.label).toBe(expectedLabel);
    });

    it('should score points', () => {
      const dices = [1, 1, 1, 2, 5];
      const expectedScore = 3;
      expect(category.score(dices)).toBe(expectedScore);
    });

    it('should score no points', () => {
      const dices = [2, 3, 4, 5, 6];
      const expectedScore = 0;
      expect(category.score(dices)).toBe(expectedScore);
    });
  });

  describe('Twos', () => {
    const category = ALL_CATEGORIES[1];

    it('should have a proper label', () => {
      const expectedLabel = 'Twos';
      expect(category.label).toBe(expectedLabel);
    });

    it('should score points', () => {
      const dices = [1, 2, 2, 2, 2];
      const expectedScore = 8;
      expect(category.score(dices)).toBe(expectedScore);
    });

    it('should score no points', () => {
      const dices = [1, 3, 4, 5, 6];
      const expectedScore = 0;
      expect(category.score(dices)).toBe(expectedScore);
    });
  });

  describe('Threes', () => {
    const category = ALL_CATEGORIES[2];

    it('should have a proper label', () => {
      const expectedLabel = 'Threes';
      expect(category.label).toBe(expectedLabel);
    });

    it('should score points', () => {
      const dices = [1,  3, 3, 3, 3];
      const expectedScore = 12;
      expect(category.score(dices)).toBe(expectedScore);
    });

    it('should score no points', () => {
      const dices = [1, 2, 4, 5, 6];
      const expectedScore = 0;
      expect(category.score(dices)).toBe(expectedScore);
    });
  });

  describe('Fours', () => {
    const category = ALL_CATEGORIES[3];

    it('should have a proper label', () => {
      const expectedLabel = 'Fours';
      expect(category.label).toBe(expectedLabel);
    });

    it('should score points', () => {
      const dices = [4, 1, 2, 3, 5];
      const expectedScore = 4;
      expect(category.score(dices)).toBe(expectedScore);
    });

    it('should score no points', () => {
      const dices = [1, 2, 3, 5, 6];
      const expectedScore = 0;
      expect(category.score(dices)).toBe(expectedScore);
    });
  });

  describe('Fives', () => {
    const category = ALL_CATEGORIES[4];

    it('should have a proper label', () => {
      const expectedLabel = 'Fives';
      expect(category.label).toBe(expectedLabel);
    });

    it('should score points', () => {
      const dices = [6, 5, 5, 5, 3];
      const expectedScore = 15;
      expect(category.score(dices)).toBe(expectedScore);
    });

    it('should score no points', () => {
      const dices = [1, 2, 3, 4, 6];
      const expectedScore = 0;
      expect(category.score(dices)).toBe(expectedScore);
    });
  });

  describe('Sixes', () => {
    const category = ALL_CATEGORIES[5];

    it('should have a proper label', () => {
      const expectedLabel = 'Sixes';
      expect(category.label).toBe(expectedLabel);
    });

    it('should score points', () => {
      const dices = [6, 6, 6, 6, 6];
      const expectedScore = 30;
      expect(category.score(dices)).toBe(expectedScore);
    });

    it('should score no points', () => {
      const dices = [1, 1, 1, 1, 1];
      const expectedScore = 0;
      expect(category.score(dices)).toBe(expectedScore);
    });
  });

  describe('Three Of A Kind - 3 of the same dice', () => {
    const category = ALL_CATEGORIES[6];

    it('should have a proper label', () => {
      const expectedLabel = 'Three Of A Kind';
      expect(category.label).toBe(expectedLabel);
    });

    it('should score points', () => {
      const dices = [5, 1, 1, 5, 1];
      const expectedScore = 13;
      expect(category.score(dices)).toBe(expectedScore);
    });

    it('should score points (Four of A Kind)', () => {
      const dices = [5, 5, 5, 6, 5];
      const expectedScore = 26;
      expect(category.score(dices)).toBe(expectedScore);
    });

    it('should score points (Yahtzee)', () => {
      const dices = [5, 5, 5, 5, 5];
      const expectedScore = 25;
      expect(category.score(dices)).toBe(expectedScore);
    });

    it('should score no points', () => {
      const dices = [1, 1, 2, 2, 3];
      const expectedScore = 0;
      expect(category.score(dices)).toBe(expectedScore);
    });
  });

  describe('Four of A Kind - 4 of the same dice', () => {
    const category = ALL_CATEGORIES[7];

    it('should have a proper label', () => {
      const expectedLabel = 'Four Of A Kind';
      expect(category.label).toBe(expectedLabel);
    });

    it('should score points', () => {
      const dices = [1, 1, 1, 5, 1];
      const expectedScore = 9;
      expect(category.score(dices)).toBe(expectedScore);
    });

    it('should score points (Yahtzee)', () => {
      const dices = [5, 5, 5, 5, 5];
      const expectedScore = 25;
      expect(category.score(dices)).toBe(expectedScore);
    });

    it('should score no points', () => {
      const dices = [1, 1, 1, 2, 2];
      const expectedScore = 0;
      expect(category.score(dices)).toBe(expectedScore);
    });
  });

  describe('Full House - Any 3 of a Kind and any Pair', () => {
    const category = ALL_CATEGORIES[8];

    it('should have a proper label', () => {
      const expectedLabel = 'Full House';
      expect(category.label).toBe(expectedLabel);
    });

    it('should score points', () => {
      const dices = [1, 2, 1, 2, 1];
      const expectedScore = 25;
      expect(category.score(dices)).toBe(expectedScore);
    });

    it('should score no points with a Yahtzee combination', () => {
      const dices = [5, 5, 5, 5, 5];
      const expectedScore = 0;
      expect(category.score(dices)).toBe(expectedScore);
    });

    it('should score no points', () => {
      const dices = [1, 1, 1, 1, 2];
      const expectedScore = 0;
      expect(category.score(dices)).toBe(expectedScore);
    });
  });

  describe('Small Straight - Any 4 consecutive dice', () => {
    const category = ALL_CATEGORIES[9];

    it('should have a proper label', () => {
      const expectedLabel = 'Small Straight';
      expect(category.label).toBe(expectedLabel);
    });

    it('should score points (1-2-3-4)', () => {
      const dices = [1, 2, 3, 4, 1];
      const expectedScore = 30;
      expect(category.score(dices)).toBe(expectedScore);
    });

    it('should score points (2-3-4-5)', () => {
      const dices = [2, 3, 4, 5, 1];
      const expectedScore = 30;
      expect(category.score(dices)).toBe(expectedScore);
    });

    it('should score points (3-4-5-6)', () => {
      const dices = [3, 4, 5, 6, 1];
      const expectedScore = 30;
      expect(category.score(dices)).toBe(expectedScore);
    });

    it('should score points (Large Straight 1-5)', () => {
      const dices = [1, 2, 3, 4, 5];
      const expectedScore = 30;
      expect(category.score(dices)).toBe(expectedScore);
    });

    it('should score points (Large Straight 2-6)', () => {
      const dices = [2, 3, 4, 5, 6];
      const expectedScore = 30;
      expect(category.score(dices)).toBe(expectedScore);
    });

    it('should score no points', () => {
      const dices = [1, 2, 3, 5, 6];
      const expectedScore = 0;
      expect(category.score(dices)).toBe(expectedScore);
    });
  });

  describe('Large Straight - Any 5 consecutive dice', () => {
    const category = ALL_CATEGORIES[10];

    it('should have a proper label', () => {
      const expectedLabel = 'Large Straight';
      expect(category.label).toBe(expectedLabel);
    });

    it('should score points (1-2-3-4-5)', () => {
      const dices = [1, 2, 3, 4, 5];
      const expectedScore = 40;
      expect(category.score(dices)).toBe(expectedScore);
    });

    it('should score points (2-3-4-5-6)', () => {
      const dices = [2, 3, 4, 5, 6];
      const expectedScore = 40;
      expect(category.score(dices)).toBe(expectedScore);
    });

    it('should score no points', () => {
      const dices = [1, 2, 3, 5, 6];
      const expectedScore = 0;
      expect(category.score(dices)).toBe(expectedScore);
    });
  });

  describe('Yahtzee - 5 of a Kind', () => {
    const category = ALL_CATEGORIES[11];

    it('should have a proper label', () => {
      const expectedLabel = 'Yahtzee';
      expect(category.label).toBe(expectedLabel);
    });

    it('should score points with aces', () => {
      const dices = [1, 1, 1, 1, 1];
      const expectedScore = 50;
      expect(category.score(dices)).toBe(expectedScore);
    });

    it('should score points with threes', () => {
      const dices = [3, 3, 3, 3, 3];
      const expectedScore = 50;
      expect(category.score(dices)).toBe(expectedScore);
    });

    it('should score points with sices', () => {
      const dices = [6, 6, 6, 6, 6];
      const expectedScore = 50;
      expect(category.score(dices)).toBe(expectedScore);
    });

    it('should score no points', () => {
      const dices = [1, 1, 5, 1, 1];
      const expectedScore = 0;
      expect(category.score(dices)).toBe(expectedScore);
    });
  });

  describe('Chance - Add up the face value of any roll', () => {
    const category = ALL_CATEGORIES[12];

    it('should have a proper label', () => {
      const expectedLabel = 'Chance';
      expect(category.label).toBe(expectedLabel);
    });

    it('should score points', () => {
      const dices = [1, 2, 3, 4, 5];
      const expectedScore = 15;
      expect(category.score(dices)).toBe(expectedScore);
    });

    it('should score points (bis)', () => {
      const dices = [1, 1, 1, 1, 1];
      const expectedScore = 5;
      expect(category.score(dices)).toBe(expectedScore);
    });
  });
});
