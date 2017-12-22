function randomColor(){
    let color = [
    '#1F9C8B',
    '#76BF72',
    '#FFDF4F',
    '#F18120',
    '#E85025'
    ]
    return color[Math.floor(Math.random() * 5)+0]
}

//Get Distance
function getDistance(x1,y1,x2,y2){
    let xDistance = x2 - x1
    let yDistance = y2 - y1
    return Math.sqrt(Math.pow(xDistance,2) + Math.pow(yDistance , 2))
  }