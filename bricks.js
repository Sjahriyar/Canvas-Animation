var bricksWidth = 60
var bricksRow = 6
var bricksCol = 4
var brickPadding = 4
var brickOffsetTop = 30;
var brickOffsetLeft = 30;
var bricks = []

for (let col = 0; col < bricksCol; col++) {
    bricks[col]
    for(row = 0; row < bricksRow; row++) {
        bricks[col][row] = {x: 0, y: 0}
    }
}

function Bricks(x,y){
    this.x = x
    this.y = y

    this.draw = function(){
        for(c=0; c<bricksCol; c++) {
            for(r=0; r<bricksRow; r++) {
                var brickX = (c*(bricksWidth+brickPadding))+brickOffsetLeft;
                var brickY = (r*(10+brickPadding))+brickOffsetTop;
                bricks[c][r].x = brickX;
                bricks[c][r].y = brickY;
                ctx.beginPath()
                ctx.rect(0, 0, bricksWidth, 10);
                ctx.fillStyle = "#0095DD"
                ctx.fill()
                ctx.closePath()
            }
        }
    }
    this.update = function(){
        this.draw()
    }
}
