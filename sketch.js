let input;
let img;
var imageIsSelected = false;
var mouseClickedX;
var mouseClickedY;
var mouseReleasedX;
var mouseReleasedY;
var coppy = false;
var coppyArr = [];
var copyCounter;

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
    Coppybutton = createButton('Copy')
                        .mousePressed(() => {
                            coppy = true;
                            copyCounter = 0;
                            coppyArr = [];
                        });
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
    // copy(0, 0, 200, 200, 450, 400, 200, 200);
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
        strokeWeight(1);
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
    let colorStroke = selector("#pen-color").value;
    let colorFill = selector("#pen-color-fill").value;
    let size = parseInt(selector("#pen-size").value);
    if(selector("#pen-line").checked){
        type = "line";
    } else if(selector("#pen-circle").checked){
        type = "circle";
    }
    else if(coppy){
        coppyArr.push(mouseX)
        coppyArr.push(mouseY)
        copyCounter++;
        if(copyCounter == 4){
            console.log("enter");
            copy(coppyArr[2], coppyArr[3],
                Math.max(coppyArr[2], coppyArr[4]) - Math.min(coppyArr[2], coppyArr[4]),
                Math.max(coppyArr[3], coppyArr[5]) - Math.min(coppyArr[3], coppyArr[5]),
                coppyArr[6], coppyArr[7],
                Math.max(coppyArr[2], coppyArr[4]) - Math.min(coppyArr[2], coppyArr[4]),
                Math.max(coppyArr[3], coppyArr[5]) - Math.min(coppyArr[3], coppyArr[5]));
        }
        console.log(coppyArr);
        type = null;
    }
    else{
        type = null;
    }
    mouseReleasedX = mouseX;
    mouseReleasedY = mouseY;
    // console.log(mouseReleasedX, mouseReleasedY);
    if(type == "line"){
        stroke(colorStroke);
        strokeWeight(size);
        line(mouseClickedX, mouseClickedY, mouseReleasedX, mouseReleasedY);
    } else if(type == "circle"){
        fill(colorFill);
        stroke(colorStroke);
        strokeWeight(size);
        ellipse((mouseReleasedX + mouseClickedX)/2,
                (mouseReleasedY + mouseClickedY)/2,
                // Math.abs((mouseClickedX-mouseReleasedX),
                Math.max(mouseClickedX, mouseReleasedX) - Math.min(mouseClickedX, mouseReleasedX) ,
                Math.max(mouseClickedY, mouseReleasedY) - Math.min(mouseClickedY, mouseReleasedY));
    }
    else{}
}

function mousePressed(){
    mouseClickedX = mouseX;
    mouseClickedY = mouseY;
    // console.log(mouseClickedX, mouseClickedY);
}


