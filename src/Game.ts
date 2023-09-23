export class Game {
  slots = [0, 1, 2, 3, 4, 5, 6, 7, 8].map((it) => new Slot());

  constructor() {
    this.initialize();
  }

  initialize() {
    this.slots[0].adjacent = [this.slots[1], this.slots[3]];
    this.slots[1].adjacent = [this.slots[0], this.slots[2], this.slots[4]];
    this.slots[2].adjacent = [this.slots[1], this.slots[5]];
    this.slots[3].adjacent = [this.slots[0], this.slots[4], this.slots[6]];
    this.slots[4].adjacent = [
      this.slots[1],
      this.slots[3],
      this.slots[5],
      this.slots[7],
    ];
    this.slots[5].adjacent = [this.slots[2], this.slots[4], this.slots[8]];
    this.slots[6].adjacent = [this.slots[3], this.slots[7]];
    this.slots[7].adjacent = [this.slots[4], this.slots[6], this.slots[8]];
    this.slots[8].adjacent = [this.slots[5], this.slots[7]];

    const numbers = [1, 2, 3, 4, 5, 6, 7, 8, undefined];

    for (let i = numbers.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [numbers[i], numbers[j]] = [numbers[j], numbers[i]];
    }

    numbers.forEach((number, index) => (this.slots[index].content = number));
  }

  hasWon() {
    let hasWon = true;
    let currentState = this.slots.map((it) => it.content);
    if (currentState[0] == null) currentState = currentState.slice(1);

    for (let i = 0; i <= 7; i++) {
      const expectedNumber = i + 1;
      if (currentState[i] != expectedNumber) hasWon = false;
    }

    return hasWon;
  }
}

export class Slot {
  public adjacent?:
    | [Slot, Slot]
    | [Slot, Slot, Slot]
    | [Slot, Slot, Slot, Slot];
  public content?: number;

  empty() {
    const emptyAdjacentSlot = this.adjacent!.find((it) => it.content == null);

    if (emptyAdjacentSlot != null) {
      emptyAdjacentSlot.content = this.content;
      this.content = undefined;
    }
  }
}
