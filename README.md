## Install

You need to install node.js v8 or more.
After you get these commands

```bash
npm install
npm start
```


## Data
If you need to change data then you should follow instructions.

1. Open `src/data.js` file.
2. Change blocks. You need to write all blocks of your scheme.
3. Change scheme with your blocks. 
 - Function `and/&` - sequence your blocks in scheme `'K1', 'S1', ...`;
 - Function `or/|` - array your blocks in scheme `['K1', 'K2', ['S1', 'K3'], ...]`.
4. Set probability of failure type blocks. `Pr` => `Pr1, Pr2, ...`, `S` => `S1, S2, ...`.
5. Set values for processors. Processor block has `nominal`, `max` and `redistribution` values.
 