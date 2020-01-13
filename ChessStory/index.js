class Board {
    constructor(config) {
        this.options = {
            selector: document.querySelector("#board"),
            width: 640,
            size: 8
        };
        if (config) Object.assign(this.options, this.options, config);
        this.draw();
    }

    get(x, y) {
        let matches = this.options.display.filter((i) => i.x === x && i.y === y);
        if (matches) return matches[0];
    }

    getCode(char) {
        return {
            's': '\u25a1',
            't': '\u25B3',
            'd': '\u25C7',
            'c': '\u25EF',
            'dt': '\u25BD',
            'p':'\u2659'

        }[char];
    }

    draw() {
        let el = this.options.selector;
        let ctx = el.getContext("2d");
        let w = this.options.width / this.options.size;
        let totalSquares = Math.pow(this.options.size, 2);
        let i, x, y = -1;

        el.width = this.options.width;
        el.height = this.options.width;

        for (i = 0; i < totalSquares; i++) {
            x++;
            if (i % this.options.size == 0) {
                y++;
                x = 0;
            }

            ctx.beginPath();
            let posx = x * w;
            let posy = y * w;

            ctx.rect(posx, posy, w, w);

            let obj = this.get(x, y);
            if (obj) ctx.fillStyle = (x + y) % 2 ? "#555" : "#777";
            else ctx.fillStyle = (x + y) % 2 ? "#000" : "#111";

            ctx.fill();

            if (obj && obj.c) {
                // rendering chess piece:
                ctx.font = "48px Arial";
                //ctx.fillStyle = "#ddd";
                ctx.fillStyle = "#aaa";
                ctx.fillText(this.getCode(obj.c), posx + 21, posy + 50);
                //ctx.fillText(this.getCode('c'), posx + 21, posy + 46);
            }
        }
    }
}

// square -> exit or entrance
// circle -> person interaction
// pawn -> you
// triangle -> some other point of interest


// NORTH, SOUTH, EAST, WEST
// TAKE, INTERACT, EXAMINE, 


// you can save whenever you want to save
let chessBoard = new Board({
    selector: document.querySelector("#chess-board"),
    setup: {
        w: '5<{fame}', // win condition
        l: '1>{health}' // lose condition
    },
    scripts: {

    },
    display: [
        {
            x: 1,
            y: 1,
            c: 'dt',
            r: '2d>12+{sword}',  // random chance to execute the script
            d: 'You are standing in an open clearing.',
            e: '6>{sword}', // this determines a condition for you to enter this location
            v: '', // variables to set if this location script is executed
            s: '' // location script, might be interaction or combat when entered

        },
        { x: 2, y: 1, c: 'p' },
        { x: 2, y: 2 },
        { x: 2, y: 4 },
        { x: 2, y: 3 },
    ]
});