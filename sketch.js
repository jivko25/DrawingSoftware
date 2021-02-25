function selector(select){
    return document.querySelector(select);
}

function setup(){
    createCanvas(650, 600);
    // canvas.parent("#canvas-wrapper");
    background(255);
}
function draw(){
    // fill(0);
    // line(20, 30, 40, 50);
}

function mouseDragged(){
    let type = null;
    let size = parseInt(selector("#pen-size").value);
    let color = selector("#pen-color").value;
    if(selector("#pen-pencil").checked){
        type = "pencil";
    } else if(selector("#pen-brush").checked){
        type = "brush";
    } else if(selector("#pen-eraser").checked){
        color = "#ffffff";
    }
    fill(color);
    stroke(color);
    if(type == "pencil"){
        line(pmouseX, pmouseY, mouseX, mouseY);
    } else{
        ellipse(mouseX, mouseY, size, size);
    }
    console.log(color);
}

