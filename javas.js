let canvas = document.querySelector('canvas')

canvas.width = window.innerWidth
canvas.height = window.innerHeight
let c = canvas.getContext('2d')

let amounts = document.getElementById('amount')
    digits = document.getElementById('digits')
amount.addEventListener("change", function() {
    createCircle();
    digits.innerHTML = amounts.value;
}, false);
// Arc / Circle

//Global Variables
let maxRadius = 80
let circleColors = [
  '#F79E6B',
  '#F7CD82',
  '#5B584F',
  '#92A78C',
  '#E0D5AD'
]
let gravity = 0.99

//Detect Mouse move
let mouse = {
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

//Utility Functions
function getDistance(x1,y1,x2,y2){
  let xDistance = x2 - x1
  let yDistance = y2 - y1
  return Math.sqrt(Math.pow(xDistance,2) + Math.pow(yDistance , 2))
}

/**
 * Rotates coordinate system for velocities
 * Takes velocities and alters them as if the coordinate system they're on was rotated
 */

function rotate(velocity, angle) {
  const rotatedVelocities = {
      x: velocity.x * Math.cos(angle) - velocity.y * Math.sin(angle),
      y: velocity.x * Math.sin(angle) + velocity.y * Math.cos(angle)
  };

  return rotatedVelocities;
}

/**
* Swaps out two colliding particles' x and y velocities after running through
* an elastic collision reaction equation
*/

function resolveCollision(particle, otherParticle) {
  const xVelocityDiff = particle.velocity.x - otherParticle.velocity.x;
  const yVelocityDiff = particle.velocity.y - otherParticle.velocity.y;

  const xDist = otherParticle.x - particle.x;
  const yDist = otherParticle.y - particle.y;

  // Prevent accidental overlap of particles
  if (xVelocityDiff * xDist + yVelocityDiff * yDist >= 0) {

      // Grab angle between the two colliding particles
      const angle = -Math.atan2(otherParticle.y - particle.y, otherParticle.x - particle.x);

      // Store mass in var for better readability in collision equation
      const m1 = particle.mass;
      const m2 = otherParticle.mass;

      // Velocity before equation
      const u1 = rotate(particle.velocity, angle);
      const u2 = rotate(otherParticle.velocity, angle);

      // Velocity after 1d collision equation
      const v1 = { x: u1.x * (m1 - m2) / (m1 + m2) + u2.x * 2 * m2 / (m1 + m2), y: u1.y };
      const v2 = { x: u2.x * (m1 - m2) / (m1 + m2) + u1.x * 2 * m2 / (m1 + m2), y: u2.y };

      // Final velocity after rotating axis back to original location
      const vFinal1 = rotate(v1, -angle);
      const vFinal2 = rotate(v2, -angle);

      // Swap particle velocities for realistic bounce effect
      particle.velocity.x = vFinal1.x;
      particle.velocity.y = vFinal1.y;

      otherParticle.velocity.x = vFinal2.x;
      otherParticle.velocity.y = vFinal2.y;
  }
}

//Object and Conditions
function particle(x,y,radius,isAlpha)
{
  this.alpha = isAlpha
  this.x = x
  this.y = y
  this.radius = radius
  this.velocity = {
    x: Math.random() - 0.5,
    y: Math.random() - 0.5
  }
  this.mass = 1
  this.minRadius = radius
  this.colorC = circleColors[Math.floor(Math.random() * circleColors.length)]
  this.draw = () =>
  {
    c.beginPath()
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
    c.strokeStyle = this.colorC
    c.stroke()
    if( this.alpha )
    c.globalAlpha = 0.2
    // c.fill()
    c.globalAlpha = 1
  }

  this.update = circleArray =>
  {
    if(this.x + this.radius > innerWidth || this.x - radius < 0)
    {
      this.velocity.x = -this.velocity.x
    }
    if(this.y + radius > innerHeight || this.y - radius < 0)
    {
      this.velocity.y = -this.velocity.y
    }
    // // else{
    //   this.dy += gravity
    // }
    // if(mouse.x - this.x < 50 && mouse.x - this.x > -50 && mouse.y - this.y < 50 && mouse.y - this.y > -50){
    //   if(this.radius < maxRadius)
    //   {
    //     this.radius +=1
    //   }
    // }

    // else if(this.radius > this.minRadius)
    // {
    //   this.radius -= 1
    // }

    
    this.draw()    
      for (let i = 0; i < circleArray.length; i++) {
        if(this === circleArray[i]) continue
        if(getDistance(x,y, circleArray[i].x, circleArray[i].y) - radius * 2 < 0){
          resolveCollision(this, circleArray[i])
        }
        
      }
      this.x+=this.velocity.x
      this.y+=this.velocity.y
      
  }
  
}


//implementation
var circleArray = []
function createCircle()
{

    for(i=0 ; i< 30 ; i++){
      let radius = 20
      let x = Math.random() * (innerWidth - radius * 2)+radius
      let y = Math.random() * (innerHeight - radius * 2)+radius
      //For making some balls transparent uncomment if statement below
      // if(i > 150)
      //   circleArray.push(new Circle(x,y,radius,mx,my, true))
      // else

          for (let j = 0; j < circleArray.length; j++) {
            if(getDistance(x,y, circleArray[j].x, circleArray[j].y) - radius * 2 < 0){
              x = Math.random() * (innerWidth - radius * 2)+radius
              y = Math.random() * (innerWidth - radius * 2)+radius
              j = -1
            }
          }
        
        circleArray.push(new particle(x,y,radius, false))
    }
}

createCircle()


function animatedBall()
{
    requestAnimationFrame(animatedBall)
    c.clearRect(0,0, innerWidth,innerHeight)
    for (i = 0; i < circleArray.length; i++) {
        circleArray[i].update(circleArray)
    }
}
animatedBall()