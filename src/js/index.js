import { configureStore } from './store';
import { configureCommands } from './commands';
import { printWelcome, printBoardgame } from './views';

const store = configureStore();

// connect the boardgame view to the store
// This will re-render the boardgame on each store change.
store.subscribe(() => {
  printBoardgame(store.getState());
});

// add entry point through a dedicated console function
console.yahtzee = function() {
  configureCommands(store);
  printWelcome();
  return 'yahtzee';
};
