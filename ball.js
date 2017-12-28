var ballRadius = 10
function Ball(){
this.x = canvas.width /2
this.y = canvas.height -40

this.velocity = {
    x: 6,
    y: -6
}
    this.draw = function(){

        ctx.beginPath()
        ctx.arc(this.x,this.y, ballRadius, 0, Math.PI * 2, false)
        ctx.fillStyle = 'white'
        ctx.fill()
        ctx.closePath()
    }
    this.update = function(){
        //if ball goes out of window width right or left
        if(this.x + ballRadius > innerWidth || this.x - ballRadius < 0){
            this.velocity.x = -this.velocity.x
        }
        //if ball passes top of the window height
        if(this.y - ballRadius < 0){
                this.velocity.y = -this.velocity.y
        }
        //if ball goes below the paddle GAME OVER
        else if(this.y + this.velocity.y > paddle.y - ballRadius){
            if(ball.x > paddle.x && ball.x < paddle.x + paddleWidth){
                ball.velocity.y = -ball.velocity.y
                console.log('Bop')
                
            }else{
                console.log('Game Over')
            }
        }
            // window.location.reload()
        
        this.draw()
        this.x += this.velocity.x
        this.y += this.velocity.y
    }

    
}