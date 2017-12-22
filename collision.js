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

// addEventListener('click',()=>{
//   makeOneBall()
// })

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

function getDistance(x1,y1,x2,y2){
    let xDistance = x2 - x1
    let yDistance = y2 - y1
    return Math.sqrt(Math.pow(xDistance,2) + Math.pow(yDistance , 2))
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
      this.draw()
    }
}

//Implementation
//Create One Ball b each click
let oneball
function makeOneBall(){
  oneball = new Ball(undefined , undefined , 50, '#1F9C8B')
  }

let secondBall
function secBall(){
  secondBall = new Ball(canvas.width /2, canvas.height /2 , 100, '#76BF72')

}
secBall()
makeOneBall()

console.log(secondBall);
//Animation Request
function animate(){
  requestAnimationFrame(animate)
  ctx.clearRect(0,0, innerWidth,innerHeight)
  secondBall.update()
  oneball.x = mouse.x
  oneball.y = mouse.y
  oneball.update()
  if(getDistance(oneball.x,oneball.y,secondBall.x,secondBall.y) < oneball.radius + secondBall.radius){
    secondBall.color = '#FFDF4F'
  }else{
    secondBall.color = '#76BF72'
  }
}
animate()
