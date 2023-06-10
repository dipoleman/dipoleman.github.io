

// Get the canvas element and its parent container
let canvas = document.getElementById("myCanvas");
let container = canvas.parentNode;
let ctx = canvas.getContext("2d");

// Call the resizeCanvas function when the page loads
resizeCanvas();

// Call the resizeCanvas function whenever the window is resized
window.addEventListener("resize", resizeCanvas);

// Define variables for the circle and points
let radius = canvas.width / 2.2; // radius of the circle
let point_size = 1; // size of the points
let center_x = canvas.width / 2; // x-coordinate of the center of the circle
let center_y = canvas.width / 2; // y-coordinate of the center of the circle


let newVector = true;

// Get the canvas element and its context
// let c = document.getElementById("myCanvas");
// let ctx = c.getContext("2d");

// Function to clear the canvas
function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawCircle();
    drawEllipse(0);
    // drawEllipse(Math.PI/2);
    // drawAxes()
    if (newVector){
        document.getElementById("similarity").innerHTML = "";
    }
}

// Function to resize the canvas
function resizeCanvas() {
    // Set the width and height of the canvas to match the width of its parent container
    canvas.width = container.offsetWidth;
    canvas.height = container.offsetWidth;
}

// Function to draw the circle on the canvas
function drawCircle() {
    ctx.beginPath(); // begin a new path
    ctx.arc(center_x, center_y, radius, 0, 2 * Math.PI); // create an arc path for the circle
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 1;
    ctx.stroke(); // draw the circle on the canvas
}

// Function to draw an ellipse on the diameter of the circle
function drawEllipse(rotation) {
    ctx.beginPath(); // begin a new path
    ctx.ellipse(center_x, center_y, radius, radius / 2, rotation, 0, 2 * Math.PI); // create an ellipse path with half the height of the circle
    ctx.fillStyle = 'rgba(155,155,155,0.1)';
    ctx.fill();
    ctx.stroke(); // draw the ellipse on the canvas
}

// Function to draw the x, y and z axes on the canvas
function drawAxes() {
    // Set the line dash pattern
    ctx.setLineDash([5, 5]);

    // Draw the x-axis
    ctx.beginPath();
    ctx.moveTo(0, center_y);
    ctx.lineTo(canvas.width, center_y);
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 1;
    ctx.stroke();

    // Draw the y-axis
    ctx.beginPath();
    ctx.moveTo(center_x, 0);
    ctx.lineTo(center_x, canvas.height);
    ctx.stroke();

    // Draw the z-axis
    ctx.beginPath();
    ctx.moveTo(30, canvas.height-30);
    ctx.lineTo(center_x + radius * Math.cos(Math.PI / 4)*1.2, center_y - radius * Math.sin(Math.PI / 4)*1.2);
    ctx.stroke();

    // Reset the line dash pattern
    ctx.setLineDash([]);
}

// Function to generate normally distributed random numbers using the Box-Muller transform --RETURNS: number
function randn_bm(mean, standardDeviation) {
    let u = 0,
        v = 0;
    while (u === 0) u = Math.random(); //Converting [0,1) to (0,1)
    while (v === 0) v = Math.random();
    let num = Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
    num = num * standardDeviation + mean; // Translate to desired mean and standard deviation
    return num;
}

// Function to generate randon colors
function getRandomColor() {
    let r = Math.floor(Math.random() * 256);
    let g = Math.floor(Math.random() * 256);
    let b = Math.floor(Math.random() * 256);
    return `rgb(${r},${g},${b})`;
}

// Function to get SD from radio buttons set 1
function getStandardDeviation() {
    let radios = document.getElementsByName('options');
    for (let i = 0; i < radios.length; i++) {
        if (radios[i].checked) {
            if (radios[i].value === 'open') {
                return 28;
            } else if (radios[i].value === 'normal') {
                return 21;
            } else if (radios[i].value === 'closed') {
                return 7;
            }
        }
    }
}


// Execution: draw the circle and points on the canvas
drawCircle();
drawEllipse(0);
// drawEllipse(Math.PI/2);
//drawAxes()


// Function to Create New Soul and Vector
function drawSoul() {
    let theta = randn_bm(90, 20);
    let sd = getStandardDeviation();
    let color = getRandomColor();

    // Create a new Soul Object
    let mySoul = new Soul(theta, sd, 'blue', canvas,1);

    // Get references to the checkbox elements
    let thoughtsCheckbox = document.querySelector('input[name="options"][value="thoughts"]');
    let soulVectorCheckbox = document.querySelector('input[name="options"][value="soulVector"]');
    let moralPlaneCheckbox = document.querySelector('input[name="options"][value="moralPlane"]');

    // Draw the parts of the Soul object based on which checkboxes are checked
    if (thoughtsCheckbox.checked) {
        mySoul.drawThoughts();
    }
    if (soulVectorCheckbox.checked) {
        mySoul.drawVector();
    }
    if (moralPlaneCheckbox.checked) {
        mySoul.drawMoralEllipse();
    }
}

// Function to Create Many Souls and Vectors
function drawManySoul() {
    let theta = randn_bm(90, 20);
    let sd = getStandardDeviation();
    let color = getRandomColor();

    // Create a new Soul Object
    let mySoul = new Soul(theta, sd, color, canvas,1);

    // Get references to the checkbox elements
    let thoughtsCheckbox = document.querySelector('input[name="options"][value="thoughts"]');
    let soulVectorCheckbox = document.querySelector('input[name="options"][value="soulVector"]');
    let moralPlaneCheckbox = document.querySelector('input[name="options"][value="moralPlane"]');

    // Draw the parts of the Soul object based on which checkboxes are checked
    if (thoughtsCheckbox.checked) {
        mySoul.drawThoughts();
    }
    if (soulVectorCheckbox.checked) {
        mySoul.drawVector();
    }
    if (moralPlaneCheckbox.checked) {
        mySoul.drawMoralEllipse();
    }
}

// Function to draw one soul with axis
function addAxis() {
    let theta = randn_bm(90, 20);
    let sd = getStandardDeviation();
    let color = getRandomColor();

    // Create a new Soul Object
    let mySoul = new Soul(theta, sd, 'green', canvas,1);

    // Get references to the checkbox elements
    let thoughtsCheckbox = document.querySelector('input[name="options"][value="thoughts"]');
    let soulVectorCheckbox = document.querySelector('input[name="options"][value="soulVector"]');
    let moralPlaneCheckbox = document.querySelector('input[name="options"][value="moralPlane"]');

    // Draw the parts of the Soul object based on which checkboxes are checked
    if (thoughtsCheckbox.checked) {
        mySoul.drawThoughts();
    }
    if (soulVectorCheckbox.checked) {
        mySoul.drawVector();
    }
    if (moralPlaneCheckbox.checked) {
        mySoul.drawMoralEllipse({showText:true});
    }
    drawAxes()
    
     let wordPairs = [
        ['Good', 'Evil'],
        ['Light', 'Dark'],
        ['Positive', 'Negative'],
        ['Heaven', 'Hell']
    ];
    let randomIndex = Math.floor(Math.random() * wordPairs.length);
    let [topWord, bottomWord] = wordPairs[randomIndex];
    
    let fontSize = canvas.width / 20;
    ctx.font = `${fontSize}px serif`;

    // ctx.font = '20px serif';
    ctx.fillStyle = 'black';
    ctx.textAlign = 'center';
    ctx.fillText(topWord, canvas.width / 2, 30);
    ctx.fillText(bottomWord, canvas.width / 2, canvas.height - 10);
    
}

// Function to draw 2 souls with dot product
function twoSouls(){
    let theta = randn_bm(90, 20);
    let sd = getStandardDeviation();
    let color = getRandomColor();

    // Create a new Soul Object
    let mySoul = new Soul(theta, sd, 'blue', canvas,1);

    // Get references to the checkbox elements
    let thoughtsCheckbox = document.querySelector('input[name="options"][value="thoughts"]');
    let soulVectorCheckbox = document.querySelector('input[name="options"][value="soulVector"]');
    let moralPlaneCheckbox = document.querySelector('input[name="options"][value="moralPlane"]');

    // create empty vectors
    let vec1 = [0,0];
    let vec2 = [0,0];

    // Draw the parts of the Soul object based on which checkboxes are checked
    if (thoughtsCheckbox.checked) {
        mySoul.drawThoughts();
    }
    if (soulVectorCheckbox.checked) {
        vec1 = mySoul.drawVector();
    }
    if (moralPlaneCheckbox.checked) {
        mySoul.drawMoralEllipse();
    }

    let theta2 = randn_bm(90, 20);
    let sd2 = getStandardDeviation();
    let color2 = getRandomColor();

    // Create a new Soul Object
    let mySoul2 = new Soul(theta2, sd2, 'red', canvas,1);

    // Get references to the checkbox elements
    let thoughtsCheckbox2 = document.querySelector('input[name="options"][value="thoughts"]');
    let soulVectorCheckbox2 = document.querySelector('input[name="options"][value="soulVector"]');
    let moralPlaneCheckbox2 = document.querySelector('input[name="options"][value="moralPlane"]');

    // Draw the parts of the Soul object based on which checkboxes are checked
    if (thoughtsCheckbox.checked) {
        mySoul2.drawThoughts();
    }
    if (soulVectorCheckbox.checked) {
        vec2 = mySoul2.drawVector();
    }
    if (moralPlaneCheckbox.checked) {
        mySoul2.drawMoralEllipse();
    }

   
    let dotProduct = Math.cos((vec1[0]-vec2[0])* Math.PI / 180);

    // ctx.font = '20px serif';
    // ctx.fillStyle = 'black';
    // ctx.fillText(`Dot Product: ${dotProduct}`, 10, 30);

    // let dotProduct = (vec1[1] / mySoul.radius) * (vec2[1] / mySoul2.radius) * Math.cos((vec1[0] - vec2[0]) * Math.PI / 180);
    let dotProductDisplay = dotProduct.toFixed(5);

    let fontSize = canvas.width / 20;
    ctx.font = `${fontSize}px serif`;
    ctx.fillStyle = 'black';
    ctx.textAlign = 'center';
    ctx.fillText(`Dot Product: ${dotProductDisplay}`, canvas.width / 2, canvas.height - 5);

    return dotProduct;
}

class Soul {
    constructor(ang, sd, color, canvas, pointSize) {
        this.ang = ang;
        this.sd = sd;
        this.color = color;
        this.canvas = canvas;
        this.pointSize = pointSize;
        this.radius = canvas.width / 2.2;
        this.center_x = canvas.width / 2;
        this.center_y = canvas.width / 2;
        this.thoughts = [];
        this.length = (Math.random()*0.3 + 0.7)*this.radius
    }

    drawThoughts(thoughts) {
        if (thoughts) {
            // If thoughts argument is provided, use it to draw the thoughts
            for (let thought of thoughts) {
                let [angle, distance, color] = thought;
                this.drawPoint(angle, distance, color);
            }
            this.thoughts = thoughts;
        } else {
            // If thoughts argument is not provided, generate new thoughts
            let canvasWidth = this.canvas.width;
            let canvasHeight = this.canvas.height;
            let numThoughts = Math.floor((canvasWidth * canvasHeight) / 200*Math.random())+Math.floor((canvasWidth * canvasHeight) / 200);
            // Draw random points inside the circle using a for loop
            for (let i = 0; i < numThoughts; i++) {
                // Generate normally distributed random angle values with a mean of ang degrees and a standard deviation of sd degrees
                let angle = randn_bm(this.ang, this.sd);
                let distance = Math.random()*Math.random(); // favour distances closer to 0 than 1
                this.drawPoint(angle, distance, this.color);
                this.thoughts.push([angle, distance, this.color]);
            }
            for (let i = 0; i < numThoughts/10; i++) {
                // Generate normally distributed random angle values with a mean of ang+180 degrees and a standard deviation of sd degrees
                let angle = randn_bm(this.ang+180, this.sd);
                let distance = Math.random()*Math.random();
                this.drawPoint(angle, distance, this.color);
                this.thoughts.push([angle, distance, this.color]);
            }
        }

        return this.thoughts
    }

    drawPoint(angle, distance, color) {
        // Calculate the x and y coordinates of the point using trigonometry
        let x = this.center_x + this.radius * Math.cos(-angle * Math.PI / 180) * distance;
        let y = this.center_y + this.radius * Math.sin(-angle * Math.PI / 180) * distance;

        ctx.beginPath(); // begin a new path
        ctx.arc(x, y, this.pointSize, 0, 2 * Math.PI); // create an arc path for the point
        ctx.fillStyle = color;
        ctx.fill(); // fill in the point on the canvas

    }

    drawVector({angle = this.ang, color = this.color, length = this.length} = {}) {
        
        // Calculate the x and y coordinates of the end point of the vector using trigonometry
        let x = this.center_x + length* Math.cos(-angle * Math.PI / 180);
        let y = this.center_y + length* Math.sin(-angle * Math.PI / 180);

        ctx.beginPath(); // begin a new path
        ctx.moveTo(this.center_x, this.center_y); // move to the starting point of the vector at the center of the circle
        ctx.lineTo(x, y); // draw a line to the end point of the vector

        // Draw an arrowhead at end of vector.
        let headlen = 10;   // length of head in pixels
        let dx = x - this.center_x;
        let dy = y - this.center_y;
        let vecAngle = Math.atan2(dy,dx);
        ctx.lineTo(x-headlen*Math.cos(vecAngle-Math.PI/6),y-headlen*Math.sin(vecAngle-Math.PI/6));
        ctx.moveTo(x,y);
        ctx.lineTo(x-headlen*Math.cos(vecAngle+Math.PI/6),y-headlen*Math.sin(vecAngle+Math.PI/6));

        ctx.lineWidth = 3;
        ctx.strokeStyle = color; // set stroke color for vector.
        ctx.stroke(); // stroke (draw) vector on canvas.

        return [this.ang, this.length]

    }

    drawMoralEllipse({angle = this.ang, length = this.length, color = this.color, showText = false} = {}) {
        // Calculate the x and y coordinates of the end point of the vector using trigonometry
        let x = this.center_x + length * Math.cos(-angle * Math.PI / 180);
        let y = this.center_y + length * Math.sin(-angle * Math.PI / 180);
        let dx = x - this.center_x;
        let dy = y - this.center_y;
        let vecAngle = Math.atan2(dy,dx) + Math.PI/2;

        let ellipseWidth = (this.radius-length)/ 2 + this.radius/2; // Change this calculation to adjust how the width of the ellipse changes with the length of the vector

        ctx.beginPath(); // begin a new path
        ctx.ellipse(this.center_x, this.center_y, this.radius, ellipseWidth, vecAngle, 0, 2 * Math.PI); // create an ellipse path with a width based on the length of the vector

        // Set fillStyle to color with transparency of 0.1
        ctx.fillStyle = color;
        ctx.globalAlpha = 0.1;

        ctx.fill();
        ctx.globalAlpha = 0.4;
        ctx.lineWidth = 1;
        ctx.stroke(); // draw the ellipse on the canvas

        // Reset globalAlpha to default value of 1
        ctx.globalAlpha = 1;

        if (showText) {
            // Add text to canvas
            ctx.save(); // save current state of canvas
            ctx.translate(this.center_x, this.center_y); // move origin to center of canvas
            ctx.rotate(-angle * Math.PI / 180 + Math.PI/2); // rotate canvas by angle degrees
            let fontSize = ellipseWidth / 6;
            ctx.font = `${fontSize}px serif`; // set font size to ellipseWidth/20
            ctx.fillStyle = 'black';
            ctx.textAlign = 'center';
            ctx.fillText('Individuels Moral Plane', 0,fontSize+20);
            ctx.restore(); // restore canvas to previous state
        }
}


}




