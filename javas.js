var canvas = document.querySelector('canvas')

canvas.width = window.innerWidth
canvas.height = window.innerHeight
var c = canvas.getContext('2d')

var amounts = document.getElementById('amount')
    digits = document.getElementById('digits')
amount.addEventListener("change", function() {
    createCircle();
    digits.innerHTML = amounts.value;
}, false);
// Arc / Circle

//Global Variables
var maxRadius = 80
var circleColors = [
  '#F79E6B',
  '#F7CD82',
  '#5B584F',
  '#92A78C',
  '#E0D5AD'
]
var gravity = 0.99

//Detect Mouse move
var mouse = {
  x: undefined,
  y: undefined
}
window.addEventListener('mousemove', function(event){
  mouse.x = event.x
  mouse.y = event.y
})

//While window resizes
window.addEventListener('resize', ()=>{
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight
  //generate
  createCircle()
})

//Object and Conditions
function Circle(x,y,radius,mx,my,isAlpha)
{
  this.alpha = isAlpha
  this.x = x
  this.y = y
  this.radius = radius
  this.mx = mx
  this.my = my
  this.minRadius = radius
  this.colorC = circleColors[Math.floor(Math.random() * circleColors.length)]
  this.draw = function()
  {
    c.beginPath()
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
    c.fillStyle = this.colorC
    if( this.alpha )
    c.globalAlpha = 0.2
    c.fill()
    c.globalAlpha = 1

  }

  this.update = function()
  {
    if(this.x + this.radius > innerWidth || this.x - radius < 0)
    {
      this.mx = -this.mx
    }
    if(this.y + radius > innerHeight || this.y - radius < 0)
    {
      this.my = -this.my
    }else{
      this.dy += gravity
    }
    if(mouse.x - this.x < 50 && mouse.x - this.x > -50 && mouse.y - this.y < 50 && mouse.y - this.y > -50){
      if(this.radius < maxRadius)
      {
        this.radius +=1
      }
    }

    else if(this.radius > this.minRadius)
    {
      this.radius -= 1
    }

    this.x+=this.mx
    this.y+=this.my
    this.draw()


  }

}

//
var circleArray = []
function createCircle()
{

    for(i=0 ; i< amounts.value ; i++){
      let radius = Math.floor(Math.random() * 15) + 1
      let x = Math.random() * (innerWidth - radius * 2)+radius
      let y = Math.random() * (innerHeight - radius * 2)+radius
      let mx = (Math.random() - 0.5)
      let my = (Math.random() - 0.5)
      //For making some balls transparent uncomment if statement below
      // if(i > 150)
      //   circleArray.push(new Circle(x,y,radius,mx,my, true))
      // else
        circleArray.push(new Circle(x,y,radius,mx,my, false))
    }
}
createCircle();


function animatedBall()
{
    requestAnimationFrame(animatedBall)
    c.clearRect(0,0, innerWidth,innerHeight)
    for (i = 0; i < circleArray.length; i++) {
        circleArray[i].update()
    }
}
animatedBall()
createCircle()
