//Canvas Setup
var canvas = document.querySelector('canvas')
if(canvas.getContext){
    var ctx = canvas.getContext('2d')
}else{
    document.getElementById('digits').innerHTML = 'Your Browser Does not support Canvas.'
}
canvas.width = window.innerWidth
canvas.height = window.innerHeight


//EventListeners
var right=false
var left=false
document.addEventListener('keydown',function(event){
    if(event.keyCode == 39){
        right = true
    }else if(event.keyCode == 37){
        left = true
    }
})
document.addEventListener('keyup',function(event){
    if(event.keyCode == 39){
        right = false
    }else if(event.keyCode == 37){
        left = false
    }
})
//Object Model and Rules
var paddleSpeed = 10
var paddleWidth = 100
function Paddle(x,y,color){

this.x = x
this.y = y
this.color = color
    this.draw = function(){
        ctx.beginPath()
        ctx.rect(this.x,this.y, paddleWidth, 15)
        ctx.fillStyle = this.color
        ctx.fill()
        ctx.closePath()
    }
    this.update = function(){
        if(this.x + right > canvas.width - paddleWidth -10){
            right = false
        }
        if(this.x - left < 10){
            left = false
        }
        if(right){
            this.x += paddleSpeed
        }else if(left){
            this.x -= paddleSpeed
        }

        this.draw()

    }
    
}

var ball = new Ball()
var paddle = new Paddle((canvas.width /2) - (paddleWidth/2), canvas.height - 30, randomColor())
var bricks = new Bricks((canvas.width /2) - bricksWidth/2, canvas.height - 300)
function animate(){
    requestAnimationFrame(animate)
    ctx.clearRect(0,0, innerWidth,innerHeight)
    paddle.update()
    ball.update()
    bricks.update()
        
}
    
animate()