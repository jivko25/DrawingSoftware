let input;
let img;
var imageIsSelected = false;
var mouseClickedX;
var mouseClickedY;
var mouseReleasedX;
var mouseReleasedY;

function selector(select){
    return document.querySelector(select);
}

function setup(){
    let canvas = createCanvas(650, 600);
    // canvas.parent("#canvas-wrapper");
    background(255);
    Resetbutton = createButton('Reset');
    Resetbutton.mousePressed(resetBG);
    Savebutton = createButton('Save');
    Savebutton.mousePressed(savaImage);
    input = createFileInput(handleFile);
    if (img) {
        // background(img);
        image(img, 0, 0, width, height);
        
      }
}
function draw(){
    if (img && imageIsSelected == false) {
        // background(img);
        image(img, 0, 0, width, height);
        imageIsSelected = true;
      }
    //   line(mouseClickedX, mouseClickedY, mouseReleasedX, mouseReleasedY);
}

function mouseDragged(){
    let type;
    let size = parseInt(selector("#pen-size").value);
    let color = selector("#pen-color").value;
    if(selector("#pen-pencil").checked){
        type = "pencil";
    } else if(selector("#pen-brush").checked){
        type = "brush";
    } else if(selector("#pen-eraser").checked){
        type = "brush";
        color = "#ffffff";
    } 
    fill(color);
    stroke(color);
    if(type == "pencil"){
        line(pmouseX, pmouseY, mouseX, mouseY);
    } else if(type == "brush"){
        ellipse(mouseX, mouseY, size, size);
    }
}

function resetBG() {
    background(255);
    img = null;
    imageIsSelected = false;
}

function savaImage(){
    saveCanvas(canvas, "sketch", "png");
}

function handleFile(file) {
    print(file);
    if (file.type === 'image') {
      img = createImg(file.data, '');
      img.hide();
      imageIsSelected = false;
    } else {
      img = null;
    }
  }

function mouseReleased(){
    if(selector("#pen-line").checked){
        type = "line";
    } else if(selector("#pen-circle").checked){
        type = "circle";
    }
    mouseReleasedX = mouseX;
    mouseReleasedY = mouseY;
    console.log(mouseReleasedX, mouseReleasedY);
    if(type == "line"){
        line(mouseClickedX, mouseClickedY, mouseReleasedX, mouseReleasedY);
    } else if(type == "circle"){
        ellipse((mouseReleasedX + mouseClickedX)/2,
                (mouseReleasedY + mouseClickedY)/2,
                // Math.abs((mouseClickedX-mouseReleasedX),
                Math.max(mouseClickedX, mouseReleasedX) - Math.min(mouseClickedX, mouseReleasedX) ,
                Math.max(mouseClickedY, mouseReleasedY) - Math.min(mouseClickedY, mouseReleasedY));
    }
}

function mousePressed(){
    mouseClickedX = mouseX;
    mouseClickedY = mouseY;
    console.log(mouseClickedX, mouseClickedY);
}


