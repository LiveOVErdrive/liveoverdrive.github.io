// room.js
// Simple Room class for a 16x16 roguelike grid

class Room {
  constructor(width = 16, height = 16) {
    this.width = width;
    this.height = height;

    // Static objects stored by coordinate key: "x,y"
    // Example: { type: 'wall', passable: false }
    this.staticObjects = new Map();

    // Items stored by coordinate key: "x,y"
    // Each value is an array to allow stacking multiple items on one tile
    this.items = new Map();

    // Creatures placeholder (unused for now)
    this.creatures = new Map();

    // Player position
    this.player = {
      x: 1,
      y: 1,
      char: '@'
    };

    // Initialize perimeter walls
    this._initializeBoundaryWalls();

    // Initialize sample items
    this._initializeSampleItems();
  }

  _initializeBoundaryWalls() {
    for (let x = 0; x < this.width; x++) {
      this.addStaticObject(x, 0, { type: 'wall', passable: false });
      this.addStaticObject(x, this.height - 1, { type: 'wall', passable: false });
    }

    for (let y = 0; y < this.height; y++) {
      this.addStaticObject(0, y, { type: 'wall', passable: false });
      this.addStaticObject(this.width - 1, y, { type: 'wall', passable: false });
    }
  }

  _initializeSampleItems() {
    this.addItem(3, 3, { type: 'sword', char: ')' });
    this.addItem(5, 5, { type: 'breastplate', char: ']' });
    this.addItem(3, 3, { type: 'sword', char: ')' }); // stacked example
  }

  _key(x, y) {
    return `${x},${y}`;
  }

  inBounds(x, y) {
    return x >= 0 && x < this.width && y >= 0 && y < this.height;
  }

  // ----- Static Objects -----

  addStaticObject(x, y, obj) {
    if (!this.inBounds(x, y)) return false;
    this.staticObjects.set(this._key(x, y), obj);
    return true;
  }

  getStaticObject(x, y) {
    return this.staticObjects.get(this._key(x, y)) || null;
  }

  isPassable(x, y) {
    const obj = this.getStaticObject(x, y);
    if (!obj) return true; // no static object = passable
    return obj.passable !== false;
  }

  // ----- Items (Stackable) -----

  addItem(x, y, item) {
    if (!this.inBounds(x, y)) return false;

    const key = this._key(x, y);
    if (!this.items.has(key)) {
      this.items.set(key, []);
    }

    this.items.get(key).push(item);
    return true;
  }

  getItems(x, y) {
    return this.items.get(this._key(x, y)) || [];
  }

  // ----- Player Movement -----

  attemptMove(dx, dy) {
    // Allow standing still
    if (dx === 0 && dy === 0) return true;

    const newX = this.player.x + dx;
    const newY = this.player.y + dy;

    // Check bounds
    if (!this.inBounds(newX, newY)) {
      return false;
    }

    // Check collision with impassable static objects
    if (!this.isPassable(newX, newY)) {
      return false;
    }

    // Movement allowed
    this.player.x = newX;
    this.player.y = newY;
    return true;
  }

  // ----- Rendering -----
  // Priority: Player > Wall > Top Item > Floor
  // Walls = '#', floor = '.'

  toHTMLString() {
    let lines = [];

    for (let y = 0; y < this.height; y++) {
      let row = [];
      for (let x = 0; x < this.width; x++) {
        // Player renders on top
        if (this.player.x === x && this.player.y === y) {
          row.push(this.player.char);
        }
        else if (this.getStaticObject(x, y) && !this.isPassable(x, y)) {
          row.push('#');
        }
        else {
          const stack = this.getItems(x, y);
          if (stack.length > 0) {
            const topItem = stack[stack.length - 1];
            row.push(topItem.char || '?');
          } else {
            row.push('.');
          }
        }
      }
      lines.push(row.join(' '));
    }

    return `<pre>${lines.join('\n')}</pre>`;
  }
}

// Example usage:
// const room = new Room();
// document.body.innerHTML = room.toHTMLString();
// room.attemptMove(1, 0);
