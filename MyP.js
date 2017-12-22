var canvas = document.querySelector('canvas')
canvas.width = window.innerWidth
canvas.height = window.innerHeight
if (canvas.getContext) {
  var c = canvas.getContext('2d');
  // drawing code here
} else {
  $('#digits').innerHTML = "Your browser doesn't support canvas"
}


let gravity = 0.99
let friction = 0.99

function randomInitFromRange(min,max)
  {
    return Math.floor(Math.random() * (max-min+1) +min)
  }
function Balls(x,y,dy,dx,color,radius)
  {

    this.x = x
    this.y = y
    this.dx = dx
    this.dy = dy
    this.radius = radius
    this.color = color

    this.update = function()
      {

        if(this.y + this.radius > canvas.height)
        {
            this.dy = -this.dy * 0.91
        }
        else{
          this.dy += gravity
        }
        
        this.y += this.dy
        this.x += this.speedX
        this.y += this.speedY
        this.draw()
      }
    this.draw = function()
      {
        c.beginPath()
        c.arc(this.x, this.y , this.radius, 0, Math.PI * 2)
        c.fillStyle = this.color
        c.fill()
        c.closePath()
      }

  }
  var moreBalls = []
  var ball =
  function moreAndMore()
  {
    let x = randomInitFromRange(0,canvas.width)
    let y = randomInitFromRange(0,canvas.height)
    for (i=0 ; i < 10 ; i++){
      moreBalls.push(new Balls(x, y, 2, 0, '#786658',30 ))
    }
  }


function animate()
  {
    requestAnimationFrame(animate)
    c.clearRect(0,0, innerWidth,innerHeight)
      for(i=0 ; i < 10 ; i++)
      {
        moreBalls[i].update()
      }
  }

animate()
