// utils

function getDicesHistogram(dices) {
  const histogram = dices.reduce((hist, dice) => {
    hist[dice]++;
    return hist;
  }, Array(7).fill(0));
  histogram.shift();
  return histogram;
}

// constants
export const LOWER_SECTION_START_INDEX = 6;
export const NB_DICES = 5;
export const NB_ROLL_PER_ROUND = 3;
export const UPPER_SECTION_BONUS_GOAL = 63;
export const BONUS_EARNING = 35;

// scoring

function assertNbDices(dices) {
  // TODO transform to HoF
  if (dices.length != NB_DICES) {
    throw Error(`scoring: Expected ${NB_DICES} dices. Received: ${dices.length}`);
  }
}

function scoringSumOfDiceWithNumberFactory(num) {
  return dices => {
    assertNbDices(dices);
    return dices.reduce((score, dice) => score + (dice == num ? num : 0), 0);
  }
}

function scoringSumOfAllDice(dices) {
  assertNbDices(dices);
  return dices.reduce((score, dice) => score + dice, 0);
}

function scoringAtLeastNbDiceTheSameFactory(num) {
  return dices => {
    assertNbDices(dices);
    const hist = getDicesHistogram(dices);
    if (hist.some(freq => freq >= num)) {
      return scoringSumOfAllDice(dices);
    } else {
      return 0;
    }
  };
}

function scoringYahtzee(dices) {
  assertNbDices(dices);
  const hist = getDicesHistogram(dices);
  if (hist.some(freq => freq === 5)) {
    return 50;
  } else {
    return 0;
  }
}

function scoringFullHouse(dices) {
  assertNbDices(dices);
  const hist = getDicesHistogram(dices);
  if (hist.some(freq => freq === 3) && hist.some(freq => freq === 2)) {
    return 25;
  } else {
    return 0;
  }
}

function scoringStraightFactory(nb, score) {
  const pattern = Array(nb)
    .fill('1')
    .join('');
  return dices => {
    assertNbDices(dices);
    const unique = [...new Set(dices)];
    const hist = getDicesHistogram(unique);
    const candidate = hist.join('');
    return candidate.indexOf(pattern) > -1 ? score : 0;
  };
}

export const ALL_CATEGORIES = [
  ['Aces', scoringSumOfDiceWithNumberFactory(1)],
  ['Twos', scoringSumOfDiceWithNumberFactory(2)],
  ['Threes', scoringSumOfDiceWithNumberFactory(3)],
  ['Fours', scoringSumOfDiceWithNumberFactory(4)],
  ['Fives', scoringSumOfDiceWithNumberFactory(5)],
  ['Sixes', scoringSumOfDiceWithNumberFactory(6)],
  ['Three Of A Kind', scoringAtLeastNbDiceTheSameFactory(3)],
  ['Four Of A Kind', scoringAtLeastNbDiceTheSameFactory(4)],
  ['Full House', scoringFullHouse],
  ['Small Straight', scoringStraightFactory(4, 30)],
  ['Large Straight', scoringStraightFactory(5, 40)],
  ['Yahtzee', scoringYahtzee],
  ['Chance', scoringSumOfAllDice]
].map(category => ({ label: category[0], score: category[1] }));

export const NB_CATEGORIES = ALL_CATEGORIES.length;
