
// initialize config variables here

// Pencil Points
let ppts = [];
let drawing=false;
let mymouseDown=false;
let strokeColor='black';
let lineWidth=5;
let coord = { x: 0, y: 0 };
let lastX,lastY=0;
let lastEvent;
let mouseDown = false;
let restore_array = [];
let index=-1;
let eraser=false;
let startPosition = {x: 0, y: 0};
let eraser_width=10;
let erasing="false"

// let tool="freedraw"


// setup config variables and start the program

const canvas = document.querySelector('#my-canvas')
let ctx = canvas.getContext('2d');

//determine the height and the wisth of the canvas
ctx.canvas.width = window.innerWidth-60
ctx.canvas.height = window.innerHeight-60



// fill the canvas with the specified color
// not sure why it is not working needs to be fixed
ctx.beginPath();
ctx.rect(0,0,ctx.canvas.width,ctx.canvas.height);
// ctx.fillStyle="#FBF5EF";
// ctx.fill();


// wait for the HTML to load
document.addEventListener('DOMContentLoaded', init);
document.addEventListener("touchstart", start, false);
document.addEventListener("mousedown", start, false);
document.addEventListener("touchmove", draw, false);
document.addEventListener("mousemove", draw, false);
document.addEventListener("mouseup", stop, false);
document.addEventListener("touchend", stop, false);
document.addEventListener("mouseout", stop, false);
window.addEventListener("resize", resize);


resize();


//tools eventListener
document.querySelector("#line").addEventListener('click',drawLine);
document.querySelector('#eraser').addEventListener('click', eraseImage);
// document.querySelector('#clear').addEventListener('click', clearImage);


function init () { 
    // initiating 2D context on it
       ctx.strokeStyle=strokeColor;
       ctx.lineWidth=lineWidth;
  }


function resize() {      
  ctx.canvas.width = window.innerWidth-80
  ctx.canvas.height = window.innerHeight-80
 
  }
 
  
function reposition(event) {
  coord.x = event.clientX - canvas.offsetLeft;
  coord.y = event.clientY - canvas.offsetTop;
}

function start(event) {
    drawing=true;
    mymouseDown=true;
    document.addEventListener("mousemove", draw, false);
    document.addEventListener("touchmove", draw, false);
    reposition(event);
 } 

function stop() {
    if(drawing){
      ctx.stroke();
      ctx.closePath();
      drawing=false;
   }
     document.removeEventListener("mousemove", draw, false);
  }


//This collects the RGB values in the CSS file so you can assign them to the strokeStyle()
const changeColors = (event) => {
  const newColor = event.target.id;
  console.log(newColor)
  let assignedNewColorRGB = window.getComputedStyle(document.querySelector(`#${newColor}`), null).getPropertyValue('background-color');
  console.log(assignedNewColorRGB)
  document.querySelector('h3').innerHTML = assignedNewColorRGB;
  return ctx.strokeStyle = assignedNewColorRGB;
}
document.querySelector('.color-panel').addEventListener('click', changeColors)



function draw(event) {
    if (!drawing) return;
    if(drawing && mymouseDown){
     //begins or resets a path
          console.log("draw(event) is being fired")
          ctx.beginPath();
    //  if (mode!="eraser"){
            //specifies the current line width
                        const lineWidth = document.querySelector('#myRange').value
            ctx.lineWidth = lineWidth;
            //style of endcaps for a lin
            ctx.lineCap = "round";
            ctx.lineJoin ="round";
            if(erasing=='true')
              { ctx.globalCompositeOperation="destination-out";}
            else{
                 ctx.globalCompositeOperation="source-over"; 
                 }
            //moves to specified point without creating a line
            ctx.moveTo(coord.x, coord.y);
            reposition(event);
            //adds anew point and creates a line from that point to the last specified point
            ctx.lineTo(coord.x, coord.y);
            //draws the path on to the canvas
            ctx.stroke();
       }
     lastX=coord.x;
     lastY=coord.y;
     console.log(lastX,lastY);
     event.preventDefault();
   }

function drawLine(event){
  // Tmp canvas is always cleared up before drawing.
  console.log("drawLine function fired")
    ctx.clearRect(0, 0, canvas.width,canvas.height);
    ctx.beginPath();
    ctx.moveTo(startPosition.x, startPosition.y);
    ctx.lineTo(event.offsetX,  event.offsetY);
    ctx.stroke();
    ctx.closePath();

}


//Function to erase image 
function eraseImage(event){

    erasing="true"
    

//mdn code to clear a portion of the canvas
//  ctx.beginPath();
// ctx.fillStyle = '#ff6';
// ctx.fillRect(0, 0, canvas.width, canvas.height);

// // Draw blue triangle
// ctx.beginPath();
// ctx.fillStyle = 'blue';
// ctx.moveTo(20, 20);
// ctx.lineTo(180, 20);
// ctx.lineTo(130, 130);
// ctx.closePath();
// ctx.fill();

// // Clear part of the canvas
// ctx.clearRect(10, 10, 120, 100);

}
//Function to clear image 




  // Color palette
// let colors;
// function changeColors(palette) {
// 	switch(palette.id) {
// 		case "red":
// 			colors = "red";
// 			break;
// 		case "red1":
// 			colors = "#F16161";
// 			break;
// 		case "red2":
// 			colors = "#F69FA0";
// 			break;
// 		case "orange":
// 			colors = "orange";
// 			break;
// 		case "orange1":
// 			colors = "#F99F62";
// 			break;
// 		case "orange2":
// 			colors = "#FBB57B";
// 			break;
// 		case "blue":
// 			colors = "#09C2DB";
// 			break;
// 		case "blue1":
// 			colors = "#8BD3DC";
// 			break;
// 		case "blue2":
// 			colors = "#B9E3E8";
// 			break;
// 		case "indigo":
// 			colors = "#0E38AD";
// 			break;
// 		case "indigo1":
// 			colors = "#546AB2";
// 			break;
// 		case "indigo2":
// 			colors = "#9C96C9";
// 			break;
// 		case "green":
// 			colors = "green";
// 			break;
// 		case "green1":
// 			colors = "#97CD7E";
// 			break;
// 		case "green2":
// 			colors = "#C6E2BB";
// 			break;
// 		case "black":
// 			colors = "black";
// 			break;
// 		case "black1":
// 			colors = "#545454";
// 			break;
// 		case "black2":
// 			colors = "#B2B2B2";
// 			break;
// 		case "yellow":
// 			colors = "yellow";
// 			break;
// 		case "yellow1":
// 			colors = "#F7F754";
// 			break;
// 		case "yellow2":
// 			colors ="#F7F4B1";
// 			break;
// 		case "purple":
// 			colors = "#B9509E";
// 			break;
// 		case "purple1":
// 			colors = "#D178B1";
// 			break;
// 		case "purple2":
// 			colors = "#E3ABCE";
// 			break;
// 		case "erase":
// 			colors = "white";
// 			break;
// 	}
// }

//####################### NEW CODE ########################

// const myCanvas = document.querySelector('#my-canvas');

// save sketchpad as png--allows user to continue drawing after downloading
document.querySelector('#save').addEventListener('click', saveAsPng = () => {
  console.log("saving")
  const canvas = document.getElementById("my-canvas");
  canvas.toBlob(function(blob) {
    try {
      console.log("trying to save")
      const downloadLink = document.createElement('a');
      const dataURL = canvas.toDataURL();
      downloadLink.href = dataURL;
      downloadLink.download = 'happy-sketch.png';

      document.body.appendChild(downloadLink);
      downloadLink.click();
      // use the removeChild(downloadLink) if we want to remove the sketch art after it's downloaded
      // document.body.removeChild(downloadLink);

  } catch (e) {console.log("Blob error: " + e)}
  }) 
})

//erase canvas entirely and reload so that user can start a new project
document.querySelector('#eraser').addEventListener('click', eraseImage = () => {
  console.log("erase All")
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  window.location.reload()
})

//little eraser on color palette (just uses background color)
// document.querySelector('#eraser').addEventListener('click', littleEraser = () => {
//   // bind event handler to clear button
//   console.log("changing stroke style")
//    ctx.strokeStyle = '#f5f5f5';
//    ctx.beginPath();
//    ctx.moveTo(startPosition.x, startPosition.y);
//    ctx.lineTo(offsetX, offsetY);
//    ctx.strokeStyle = '#f5f5f5';
//    ctx.stroke();
//    ctx.closePath();
// })

// create array of palette id's to target their colors
// const paletteItems = Array.from(document.querySelectorAll('.palette')).map(el => el.id)
// console.log(paletteItems)


// get the id from clicked element to change colors
// const onClick = (event) => {
//   const newColor = event.target.id
//   console.log(newColor)
// }



//This collects the RGB values in the CSS file so you can assign them to the strokeStyle()
// const changeColors = (event) => {
//   const newColor = event.target.id 
//   console.log(newColor)
//   let assignedNewColorRGB = window.getComputedStyle(document.querySelector(`#${newColor}`), null).getPropertyValue('background-color');
//   console.log(assignedNewColorRGB)
//   document.querySelector('h3').innerHTML = assignedNewColorRGB;
// }
// window.addEventListener('click', changeColors)


// document.addEventListener('click', changeColors)
//this selects the color by id onClick
// const onClick = (event) => {
//   const newColor = event.target.id
//   console.log("this is the id of the new color to plug into the style code: " + newColor)
// }
// window.addEventListener('click', onClick)





