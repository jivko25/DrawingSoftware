let input;
let img;
var imageIsSelected = false;
var mouseClickedX;
var mouseClickedY;
var mouseReleasedX;
var mouseReleasedY;
var coppy = false;
var move = false;
var coppyArr = [];
var copyCounter;
// var input;

function selector(select){
    return document.querySelector(select);
}

function setup(){
    let canvas = createCanvas(650, 600);
    // canvas.parent("#canvas-wrapper");
    background(255);
    commandInput = createInput();
    EnterButton = createButton('Enter');
    EnterButton.mousePressed(prompt);
    Resetbutton = createButton('Reset');
    Resetbutton.mousePressed(resetBG);
    Savebutton = createButton('Save');
    Coppybutton = createButton('Copy')
                        .mousePressed(() => {
                            coppy = true;
                            copyCounter = 0;
                            coppyArr = [];
                        });
    Movebutton = createButton('Move')
                        .mousePressed(() => {
                            move = true;
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
    if(coppy || move){}
    else if(selector("#pen-pencil").checked){
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
    if(coppy || move){
        coppyArr.push(mouseX)
        coppyArr.push(mouseY)
        copyCounter++;
        if(copyCounter == 4){
            copy(Math.min(coppyArr[2], coppyArr[4]), Math.min(coppyArr[3], coppyArr[5]),
                Math.max(coppyArr[2], coppyArr[4]) - Math.min(coppyArr[2], coppyArr[4]),
                Math.max(coppyArr[3], coppyArr[5]) - Math.min(coppyArr[3], coppyArr[5]),
                coppyArr[6], coppyArr[7],
                Math.max(coppyArr[2], coppyArr[4]) - Math.min(coppyArr[2], coppyArr[4]),
                Math.max(coppyArr[3], coppyArr[5]) - Math.min(coppyArr[3], coppyArr[5]));
                if(move){
                    console.log("enter");
                    fill(255);
                    stroke(255);
                    rect(Math.min(coppyArr[2], coppyArr[4]), Math.min(coppyArr[3], coppyArr[5]),
                        Math.max(coppyArr[2], coppyArr[4]) - Math.min(coppyArr[2], coppyArr[4]),
                        Math.max(coppyArr[3], coppyArr[5]) - Math.min(coppyArr[3], coppyArr[5]))
                        move = false;
                }
                coppy = false;
        }
        console.log(coppyArr);
        type = "null";
    }
    else if(selector("#pen-line").checked){
        type = "line";
    } else if(selector("#pen-circle").checked){
        type = "circle";
    } else if(selector("#pen-circle-fill").checked){
        type = "circle-fill";
    } 
    // else if(selector("#pen-star").checked){
    //     type = "star";
    // }
    else{
        type = "null";
    }
    mouseReleasedX = mouseX;
    mouseReleasedY = mouseY;
    // console.log(mouseReleasedX, mouseReleasedY);
    if(type == "line"){
        stroke(colorStroke);
        strokeWeight(size);
        line(mouseClickedX, mouseClickedY, mouseReleasedX, mouseReleasedY);
    } else if(type == "circle-fill"){
        fill(colorFill);
        stroke(colorStroke);
        strokeWeight(size);
        ellipse((mouseReleasedX + mouseClickedX)/2,
                (mouseReleasedY + mouseClickedY)/2,
                // Math.abs((mouseClickedX-mouseReleasedX),
                Math.max(mouseClickedX, mouseReleasedX) - Math.min(mouseClickedX, mouseReleasedX) ,
                Math.max(mouseClickedY, mouseReleasedY) - Math.min(mouseClickedY, mouseReleasedY));
    } else if(type == "circle"){
        noFill();
        stroke(colorStroke);
        strokeWeight(size);
        ellipse((mouseReleasedX + mouseClickedX)/2,
                (mouseReleasedY + mouseClickedY)/2,
                // Math.abs((mouseClickedX-mouseReleasedX),
                Math.max(mouseClickedX, mouseReleasedX) - Math.min(mouseClickedX, mouseReleasedX) ,
                Math.max(mouseClickedY, mouseReleasedY) - Math.min(mouseClickedY, mouseReleasedY));
    }
    // } else if(type === "star"){
    //     stroke(colorStroke);
    //     strokeWeight(size);
    //     line((mouseReleasedX + mouseClickedX)/2,
    //          mouseClickedY,
    //          (mouseReleasedX + mouseClickedX)*0.4,
    //          (mouseReleasedY + mouseClickedY)*0.4
    //     )
    //     line((mouseReleasedX + mouseClickedX)*0.4,
    //          (mouseReleasedY + mouseClickedY)*0.4,
    //          mouseClickedX,
    //          (mouseReleasedY + mouseClickedY)*0.4
    //     )
    //     line(mouseClickedX,
    //          (mouseReleasedY + mouseClickedY)*0.4,
    //          (mouseReleasedX + mouseClickedX)*0.3,
    //          (mouseReleasedY + mouseClickedY)*0.6
    //     )
    // }
    else{}
}

function mousePressed(){
    mouseClickedX = mouseX;
    mouseClickedY = mouseY;
    // console.log(mouseClickedX, mouseClickedY);
}

function keyPressed() {
  if (keyCode === 46) {
    fill(255);
    stroke(255);
    rect(Math.min(mouseClickedX, mouseReleasedX), Math.min(mouseClickedY, mouseReleasedY),
            Math.max(mouseClickedX, mouseReleasedX) - Math.min(mouseClickedX, mouseReleasedX) ,
            Math.max(mouseClickedY, mouseReleasedY) - Math.min(mouseClickedY, mouseReleasedY));
  } else if(keyCode == 13){
      prompt();
  }
//   return false; // prevent default
}

function prompt() {
    let inputv = commandInput.value();
    let inputArr = inputv.split(' ');
    let colorStroke = selector("#pen-color").value;
    let colorFill = selector("#pen-color-fill").value;
    let size = parseInt(selector("#pen-size").value);
    stroke(colorStroke);
    strokeWeight(size);
    fill(colorFill);
    switch (inputArr[0]) {
        case "line":
            line(inputArr[1], inputArr[2], inputArr[3], inputArr[4]);
            commandInput.value('');
            break;
        case "ellipse":
            noFill();
            ellipse(inputArr[1], inputArr[2], inputArr[3], inputArr[4]);
            commandInput.value('');
            break;
        case "ellipseFilled":
            ellipse(inputArr[1], inputArr[2], inputArr[3], inputArr[4]);
            commandInput.value('');
            break;
        case "square":
            square(inputArr[1], inputArr[2], inputArr[3]);
            commandInput.value('');
            break;
        case "rectangular":
            rect(inputArr[1], inputArr[2], inputArr[3], inputArr[4]);
            commandInput.value('');
            break;
        case "triangle":
            triangle(inputArr[1], inputArr[2], inputArr[3], inputArr[4], inputArr[5], inputArr[6]);
            commandInput.value('');
            break;
        default:
            console.log("Wrong input!");
            break;
    }
}


