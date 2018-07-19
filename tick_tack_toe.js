const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: 'Your move:',
})

let input;

class TicTacToe {
  constructor() {
    this.o = 0;
    this.x = 0;
    this.turn = 'o';
    this.turns = {
      o: ['x'],
      x: ['o'],
    }
  }

  next() {
    this.turn = this.turns[this.turn][0];
    return this.turn;
  }
  
  toggle(input) {
    this[this.turn] ^= (1 << (input - 1));
  }
  
  display(i) {
    return (game.o & (1 << i)) ? 'o' : (game.x & (1 << i)) ? 'x' : ' ';
  }

  detectNoOverlap(input) {
    return this[this.turns[this.turn][0]] & (1 << (input - 1));
  }

  detectWin(turn = this.turn) {
    const winningCases = [7, 56, 448, 73, 146, 292, 273, 84];
    return !winningCases.every(winningCase => (this[turn] & winningCase) ^ winningCase);
  }

  detectDraw() {
    return !(((this.o | this.x) + 1) ^ (1 << 9));
  }

  restart() {
    this.o = 0;
    this.x = 0;
  }
}

const game = new TicTacToe;

rl.prompt();

rl.on('line', (line) => {
  input = line.trim();
  if (isNaN(input)) {
    console.log('cannot identify the grid position, please input 1~9');
  } else {
    input = parseInt(input, 10);
    if (input > 9 || input < 1) {
      console.log('cannot identify the grid position, please input 1~9');
    } else if (game.detectNoOverlap(input)) {
      console.log('cannot put there');
    } else {
      console.log(`\n\n${game.turn}'s move is ${input}`)
      game.toggle(input);
      console.log(` ${game.display(0)} | ${game.display(1)} | ${game.display(2)} `);
      console.log(`--- --- ---`);
      console.log(` ${game.display(3)} | ${game.display(4)} | ${game.display(5)} `);
      console.log(`--- --- ---`);
      console.log(` ${game.display(6)} | ${game.display(7)} | ${game.display(8)} `);
      if (game.detectWin()) {
        console.log(`${game.turn} wins!\n`);
        console.log('Restarted!\n');
        game.restart();
      } else if (game.detectDraw()) {
        console.log('Draw!\n');
        console.log('Restarted!\n');
      } else {
        game.next();
      }
      console.log(`\nNow ${game.turn}'s turn`)
    }
  }
  rl.prompt();
}).on('close', () => {
  console.log('Have a great day!');
  process.exit(0);
});