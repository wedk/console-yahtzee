import {
  isRoundStarted,
  getPointScoring,
  getRound,
  isGameComplete
} from './reducers';
import {
  ALL_CATEGORIES,
  LOWER_SECTION_START_INDEX,
  NB_CATEGORIES,
  NB_ROLL_PER_ROUND,
  UPPER_SECTION_BONUS_GOAL
} from './model';

// common css rules

const fontWeightBold = 'font-weight: bold';
const fontWeightUnset = 'font-weight: unset';
const colorTeal = 'color: teal';
const colorGray = 'color: gray';
const colorUnset = 'color: unset';

// print utilities

function style(...rules) {
  return rules.join(';');
}

function grouper(method) {
  return (...args) => {
    const labelArgs = args.slice(0, -1);
    console[method](...labelArgs);
    const contentFunc = args[args.length - 1];
    contentFunc();
    console.groupEnd();
  };
}

const log = console.log;
const group = grouper('group');
const groupCollapsed = grouper('groupCollapsed');

// utils

function getDiceFace(face) {
  if (face === 0) {
    return String.fromCharCode(9633);
  }
  const faceIndex = face - 1;
  return String.fromCharCode(9856 + faceIndex);
}

function formatValue(value) {
  return ('' + (value == null ? '' : value)).padStart(3, ' ');
}

// print functions

function printDices(state) {
  const diceStyles = [];
  const indexes = [];
  const dices = state.dices.map((dice, index) => {
    const color = state.keepers[index] ? colorTeal : colorUnset;
    diceStyles.push(style('font-size: 35px', color));
    indexes.push(index + 1);
    return `%c${getDiceFace(dice)}`;
  });
  log(
    '%c' + indexes.join('    ') + '\n' + dices.join(' '),
    style('font-size: 14px', colorGray),
    ...diceStyles
  );
}

function printCategory(position, label, value, scored = false) {
  const formattedLabel = label.padEnd(16, ' ');
  const formattedValue = formatValue(value);
  log(
    `%c${formattedLabel}%c [%c${formattedValue}%c]\t\t\t%c#${position}`,
    scored ? style(fontWeightBold, colorTeal) : '',
    style(fontWeightUnset, colorUnset),
    style(fontWeightBold, scored ? colorTeal : colorGray),
    style(fontWeightUnset, colorUnset),
    'font-style: italic; color: silver; font-size: 95%'
  );
}

function printCategories(state, from, to) {
  for (let i = from; i < to; i++) {
    const model = ALL_CATEGORIES[i];
    if (isRoundStarted(state) && state.categories[i] == null) {
      // compute temporary value
      printCategory(i + 1, model.label, model.score(state.dices), false);
    } else {
      // assigned value
      printCategory(
        i + 1,
        model.label,
        state.categories[i],
        state.categories[i] != null
      );
    }
  }
}

function printBonus(upperSectionTotal, value) {
  const goal = `${upperSectionTotal}/${UPPER_SECTION_BONUS_GOAL}`;
  const label = `Bonus (${goal})`.padEnd(16, ' ');
  const scored = value > 0;
  const formattedValue = formatValue(value);
  log(
    `%c${label}%c [%c${formattedValue}%c]`,
    scored ? style(fontWeightBold, colorTeal) : '',
    style(fontWeightUnset, colorUnset),
    style(fontWeightBold, scored ? colorTeal : colorUnset),
    style(fontWeightUnset, colorUnset)
  );
}

function printSection(label, value, contentFunc) {
  const formattedLabel = label.padEnd(18, ' ');
  const formattedValue = formatValue(value);
  group(
    `${formattedLabel} [%c${formattedValue}%c]`,
    fontWeightBold,
    fontWeightUnset,
    contentFunc
  );
}

function printTotal(value) {
  const label = 'Total';
  const formattedLabel = label.padEnd(18, ' ');
  const formattedValue = formatValue(value);
  log(
    `%c${formattedLabel}%c [%c${formattedValue}%c]`,
    fontWeightBold,
    fontWeightUnset,
    fontWeightBold,
    fontWeightUnset
  );
}

function printScorecard(state, scoring) {
  group('Scorecard', () => {
    printSection('Upper section', scoring.upperTotal, () => {
      printCategories(state, 0, LOWER_SECTION_START_INDEX);
      printBonus(scoring.upperSubtotal, scoring.bonus);
    });
    printSection('Lower section', scoring.lowerTotal, () => {
      printCategories(state, LOWER_SECTION_START_INDEX, NB_CATEGORIES);
    });
    printTotal(scoring.total);
  });
}

function printWarningMessage(warningMessage) {
  if (warningMessage) {
    console.warn(warningMessage);
  }
}

export function printBoardgame(state) {
  if (!state.started) {
    return;
  }
  console.clear();
  const scoring = getPointScoring(state);
  group(
    'Round %d - Roll %d/%d',
    getRound(state),
    state.roll,
    NB_ROLL_PER_ROUND,
    () => {
      printScorecard(state, scoring);
      if (isGameComplete(state)) {
        log('Your final score is %c%s', fontWeightBold, scoring.total);
      } else {
        printDices(state);
      }
    }
  );
  printWarningMessage(state.warningMessage);
}

function printCommand(command, description) {
  log(`%c${command}%c ${description}`, fontWeightBold, fontWeightUnset);
}

function printCommands() {
  group('Commands', () => {
    printCommand('start', 'to start a new game');
    printCommand('refresh', 'to freshly print the boardgame');
    printCommand('roll', 'to roll the 5 dices');
    printCommand('keep#', 'to keep/save the nth dice');
    printCommand('release#', 'to allow to reroll the nth dice');
    printCommand('score#', 'assign the current result to the nth category');
  });
}

function printRules() {
  groupCollapsed('Rules', () => {
    log('https://en.wikipedia.org/wiki/Yahtzee');
    log('https://www.hasbro.com/common/instruct/Yahtzee.pdf');
  });
}

export function printHelp() {
  printRules();
  printCommands();
}

export function printWelcome() {
  log('%cWelcome to console\xB7yahtzee', 'font-size: 20px');
  printHelp();
}
