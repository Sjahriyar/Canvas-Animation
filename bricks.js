var bricksWidth = 70
var bricksHeight = 10
var bricksRow = 6
var bricksCol = 8
var brickPadding = 10
var brickOffsetTop = 30;
var brickOffsetLeft = canvas.width / 2;
var bricksMe = [];
for(c=0; c<bricksCol; c++) {
    bricksMe[c] = [];
    for(r=0; r<bricksRow; r++) {
        bricksMe[c][r] = { x: 0, y: 0 , status: 1}
    }
}
console.log(bricksMe);

function Bricks(x,y){

    this.draw = function(){
        for(c=0; c<bricksCol; c++) {
            for(r=0; r<bricksRow; r++) {
                if(bricksMe[c][r].status == 1){
                var brickX = canvas.width / 2- (c*(bricksWidth+brickPadding))+brickOffsetLeft;
                var brickY = (r*(bricksHeight+brickPadding))+brickOffsetTop;
                bricksMe[c][r].x = brickX;
                bricksMe[c][r].y = brickY;
                ctx.beginPath()
                ctx.rect(brickX, brickY, bricksWidth, 10);
                ctx.fillStyle = "#0095DD"
                ctx.fill()
                ctx.closePath()
                }
            }
        }
    }
    this.update = function(){
        
            for(c=0; c<bricksCol; c++) {
                for(r=0; r<bricksRow; r++) {
                    var b = bricksMe[c][r];
                    if(ball.x > b.x && ball.x < b.x+bricksWidth && ball.y > b.y && ball.y < b.y+bricksHeight){
                        ball.velocity.y = -ball.velocity.y;
                        var t = ctx.globalAlpha = 0
                        b = t 
                        
                    }
                }
            }
            this.draw()
        }
        
    
}
