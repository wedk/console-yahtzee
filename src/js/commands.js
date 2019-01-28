import { bindActionCreators } from 'redux';

import * as actionCreators from './actions';
import { NB_DICES, NB_CATEGORIES } from './model';
import { printBoardgame, printHelp } from './views';

function defineCommand(name, func, extra) {
  Object.defineProperty(window, name, {
    configurable: true, // i.e. can be updated/redefined
    get() {
      func(extra);
      return name;
    }
  });
}

export function configureCommands(store) {
  const actions = bindActionCreators(actionCreators, store.dispatch);
  // general
  defineCommand('start', actions.start);
  defineCommand('refresh', () => {
    printBoardgame(store.getState());
  });
  defineCommand('help', printHelp);
  // rolling
  defineCommand('roll', actions.rollDices);
  // keepers
  for (let i = 0; i < NB_DICES; i++) {
    defineCommand(`keep${i + 1}`, actions.keepDice, i);
    defineCommand(`release${i + 1}`, actions.releaseDice, i);
  }
  // scoring
  for (let i = 0; i < NB_CATEGORIES; i++) {
    defineCommand(`score${i + 1}`, actions.scoreCategory, i);
  }
}
