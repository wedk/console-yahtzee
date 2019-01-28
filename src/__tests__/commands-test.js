import { configureCommands } from '../js/commands';

describe('commands', () => {
  test('configureCommands', () => {
    const fakeStore = { getState: () => ({}), dispatch: () => {} };

    expect(window).not.toHaveProperty('start');
    expect(window).not.toHaveProperty('refresh');
    expect(window).not.toHaveProperty('roll');
    expect(window).not.toHaveProperty('keep1');
    expect(window).not.toHaveProperty('keep5');
    expect(window).not.toHaveProperty('release1');
    expect(window).not.toHaveProperty('release5');
    expect(window).not.toHaveProperty('score1');
    expect(window).not.toHaveProperty('score6');
    expect(window).not.toHaveProperty('score13');

    configureCommands(fakeStore);

    expect(window).toHaveProperty('start');
    expect(window).toHaveProperty('refresh');
    expect(window).toHaveProperty('roll');
    expect(window).toHaveProperty('keep1');
    expect(window).toHaveProperty('keep5');
    expect(window).toHaveProperty('release1');
    expect(window).toHaveProperty('release5');
    expect(window).toHaveProperty('score1');
    expect(window).toHaveProperty('score6');
    expect(window).toHaveProperty('score13');
  });
});
