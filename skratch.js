var canvas = document.querySelector('canvas')
canvas.width = window.innerWidth
canvas.height = window.innerHeight
if(canvas.getContext){
  var ctx = canvas.getContext('2d')
}else{
  document.getElementById('digits').innerHTML = "Your Browser Does\'nt support Canvas"
}


//Avoid Resize Problem
window.addEventListener('resize', ()=>{

  canvas.width = window.innerWidth
  canvas.height = window.innerHeight
  //generate

  ballGenerator()

})

//Mouse Detect Listeners
var mouse = {
  x: undefined,
  y: undefined
}
addEventListener('mousemove',(event)=>{
  mouse.x = event.clientX
  mouse.y = event.clientY
})

addEventListener('click',()=>{
  makeOneBall()
})

//Global Variables
var gravity = 1
var friction = 0.88
var ballsAmount = 20

//Utility Functions
function randomInitFromRange(min,max){
  return Math.floor(Math.random() * (max-min+1) +min)
}
function randomColors(){
  randColor = [
    '#1F9C8B',
    '#76BF72',
    '#FFDF4F',
    '#F18120',
    '#E85025'
  ]
  return randColor[Math.floor(Math.random()* 5)+ 0 ]
}

//Object and Confitions
function Ball(x,y,radius,color,dx,dy){
  this.x = x
  this.y = y
  this.radius = radius
  this.color = color
  this.dx = dx
  this.dy = dy

  this.draw = function(){

    ctx.beginPath()
    ctx.arc(this.x,this.y, this.radius, 0, Math.PI * 2, false)
    ctx.fillStyle = this.color
    ctx.stroke()
    ctx.fill()
    ctx.closePath()

    }
    this.update = function(){
      if(this.y + this.radius + this.dy> canvas.height){
        this.dy = -this.dy * friction

      }else{
        this.dy += gravity

      }
      if(this.x + this.radius > canvas.width || this.x - this.radius < 0){
        this.dx = -this.dx
      }
      this.y += this.dy
      this.x += this.dx
      this.draw()
    }
}

//Implementation
//Generate Multiple Balls
var multipleBalls
function ballGenerator(){
multipleBalls = []
  for (var i = 0; i < ballsAmount; i++) {

    let radius = randomInitFromRange(4,50)
    let x = randomInitFromRange(radius,canvas.width - radius)
    let y = randomInitFromRange(0,canvas.height - radius)
    let dx = randomInitFromRange(-2,3)
    let dy = randomInitFromRange(-2,3)
    let color = randomColors()
    multipleBalls.push(new Ball(x , y , radius, color, dx,dy))

  }
}

ballGenerator()

//Create One Ball b each click
var oneball = []
function makeOneBall(){
  let radius = randomInitFromRange(4,50)
  let x = mouse.x
  let y = mouse.y
  let dx = randomInitFromRange(-2,3)
  let dy = randomInitFromRange(-2,3)
  let color = randomColors()
  oneball.push(new Ball(x , y , radius, color, dx,dy))
  }


//Animation Reques
function animate(){
  requestAnimationFrame(animate)
  ctx.clearRect(0,0, innerWidth,innerHeight)
  for (var i = 0; i < multipleBalls.length; i++) {
    multipleBalls[i].update()
  }
  for (var i = 0; i < oneball.length; i++) {
    oneball[i].update()
  }

}
animate()
