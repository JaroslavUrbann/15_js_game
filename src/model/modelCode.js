import { image } from "./modelData.js";

export class Images {
    constructor() {
        this.YA = [];
    }

    Import(YA) {
        this.NOP = YA.length;
        var k = Math.sqrt(YA.length)
        var index =0;
        var XA = [];
        for (var i = 0; i < k; i++) {
            for (var a = 0; a < k; a++) {
                var c;
                if(YA[index].innerHTML === ""){c= YA.length -1;}else c= YA[index].innerHTML;
                var img = new image(c);
                XA.push(img);
                index++;
            }
            this.YA.push(XA);
            XA = [];
        }
    }

    CreateImages(NumberOfPieces) {
        this.YA = [];
        this.NOP = Number(NumberOfPieces);
        var RN = Math.sqrt(this.NOP);
        var ORN = RN;
        var XA = [];
        for (var i = 0; i < this.NOP; i++) {
            var img = new image(i);
            if (i < RN) {
                XA.push(img);
            }
            else {
                RN = RN + ORN;
                this.YA.push(XA);
                XA = [];
                XA.push(img);
            }
            if ((this.NOP - 1) === i) {
                this.YA.push(XA);
            }
        }
        this.CreateStartPositions();
    }

    CreateStartPositions() {
        var Directions = ["Left", "Down", "Up", "Right"]
        for (var i = 0; i < 600; i++) {
            this.Move(Directions[Math.floor(Math.random() * 4)]);
        }
    }

    GetEmptyImg() {
        for (var i = 0; i < this.YA.length; i++) {
            var ar = this.YA[i];
            for (var a = 0; a < ar.length; a++) {
                if (ar[a].Number === this.NOP - 1) {
                    this.Y = i;
                    this.X = a;
                }
            }
        }
    }

    Move(Direction) {
        this.GetEmptyImg();
        switch (Direction) {
            case "Left": this.MoveLeft();
                break;
            case "Up": this.MoveUp();
                break;
            case "Down": this.MoveDown();
                break;
            case "Right": this.MoveRight();
                break;
            default:break;
        }
    }

    MoveLeft() {
        var Xar = this.YA[this.Y];
        if (this.X + 1 < Xar.length) {
            var Empty = Xar[this.X];
            var Moved = Xar[this.X + 1];
            Xar[this.X + 1] = Empty;
            Xar[this.X] = Moved;
            this.YA[this.Y] = Xar;
        }
    }

    MoveUp() {
        if (this.Y + 1 < this.YA.length) {
            var Xar = this.YA[this.Y];
            var Xar2 = this.YA[this.Y + 1];
            var Empty = Xar2[this.X];
            var Moved = Xar[this.X];
            Xar[this.X] = Empty;
            Xar2[this.X] = Moved;
            this.YA[this.Y] = Xar;
            this.YA[this.Y + 1] = Xar2;
        }
    }

    MoveDown() {
        if (this.Y - 1 > -1) {
            var Xar = this.YA[this.Y];
            var Xar2 = this.YA[this.Y - 1];
            var Empty = Xar2[this.X];
            var Moved = Xar[this.X];
            Xar[this.X] = Empty;
            Xar2[this.X] = Moved;
            this.YA[this.Y] = Xar;
            this.YA[this.Y - 1] = Xar2;
        }
    }

    MoveRight() {
        var Xar = this.YA[this.Y];
        if (this.X - 1 > -1) {
            var Empty = Xar[this.X];
            var Moved = Xar[this.X - 1];
            Xar[this.X - 1] = Empty;
            Xar[this.X] = Moved;
            this.YA[this.Y] = Xar;
        }
    }
}

