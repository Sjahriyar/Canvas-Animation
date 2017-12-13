var canvas = document.querySelector('canvas')

canvas.width = window.innerWidth
canvas.height = window.innerHeight
var c = canvas.getContext('2d')

// c.fillStyle = getRandomColor()
// c.fillRect(400,10, 200,50)
// c.fillStyle = getRandomColor()
// c.fillRect(400,70, 50,50)
// c.fillStyle = getRandomColor()
// c.fillRect(400,140, 300,50)
// c.fillStyle = getRandomColor()
// c.fillRect(400,210, 120,50)
// c.fillStyle = getRandomColor()
// c.fillRect(400,280, 380,50)
// c.fillStyle = getRandomColor()
// c.fillRect(400,350, 258,50)
// //Line
// c.beginPath()
// c.moveTo(400,10)
// c.lineTo(400,400)
// c.lineTo(800,400)
// c.strokeStyle = getRandomColor()
// c.stroke()
// console.log(canvas);


// function getRandomColor() {
//   var letters = '0123456789ABCDEF';
//   var color = '#';
//   for (var i = 0; i < 6; i++) {
//     color += letters[Math.floor(Math.random() * 14)];
// }
// return color;
// }

// Arc / Circle
var maxRadius = 50
var circleColors = [
  'rgb(8, 135, 118)',
  'rgb(119, 22, 230)',
  'rgb(185, 199, 118)',
  'rgb(0, 172, 158)'
]

var mouse = {
  x: undefined,
  y: undefined
}

window.addEventListener('mousemove', function(event){
  mouse.x = event.x
  mouse.y = event.y
})

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

var circleArray = []
for(i=0 ; i< 200 ; i++){

  let radius = Math.floor(Math.random() * 40)
  let x = Math.random() * (innerWidth - radius * 2)+radius
  let y = Math.random() * (innerHeight - radius * 2)+radius
  let mx = (Math.random() - 0.5)
  let my = (Math.random() - 0.5)
  if(i > 150)
    circleArray.push(new Circle(x,y,radius,mx,my, true))
  else
    circleArray.push(new Circle(x,y,radius,mx,my, false))
}


function animatedBall()
{
requestAnimationFrame(animatedBall)
c.clearRect(0,0, innerWidth,innerHeight)
  for (i = 0; i < circleArray.length; i++) {
    circleArray[i].update()
  }

}
animatedBall()
