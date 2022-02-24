
/***********************************************************************************
  Speculative Technology Clickable demo
  by Matthew Kwong

  Clickable demo using Speculative technology idea

***********************************************************************************/

// the manager class
var clickablesManager;

// an array of clickable objects
var clickables;

// drone array & index
var drones = [];
var droneIndex = 0;
var hatchOpen = false;

// variables for positioning elements
var xPos = 700;
var xSpacing = 300;
var ySpacing = 150;
var yPos = 175;

// Preload images and Clickables
function preload(){
  drones[0] = loadImage('assets/drone_default.png');
  drones[1] = loadImage('assets/drone_open.png');
  drones[2] = loadImage('assets/drone_fire_extinguisher.png');
  drones[3] = loadImage('assets/drone_mask.png');
  drones[4] = loadImage('assets/drone_bandaid.png');
  clickablesManager = new ClickableManager('assets/clickableLayout.csv');
}

// Setup clickables
function setup() {
  createCanvas(1440,800);

  // setup the clickables
  clickables = clickablesManager.setup();

  setupClickables(); 

  // output to the message window
  console.log(clickables);
}

// Just draw the button
function draw() {
  background(250);
  // draw the p5.clickables
  clickablesManager.draw();
  drawText();
  drawImage(drones, droneIndex);
  
}

// Write the Description
function drawText() {
  fill("#FFC370");
  noStroke();
  rect(180, 0, 440, 800);
  fill(0);
  textAlign(CENTER);
  textSize(26);
  textStyle(BOLD);
  text("The Rescue Aid Drone:" , 200, 600, 400, 150);
  textSize(22);
  textStyle(NORMAL);
  text("A drone equipped with many tools to aid in a rescue operation." , 200, 635, 400, 150);
  textSize(18);
  text("Click the buttons to see how it works!" , 200, 700, 400, 50);
}

// Draw the png image in the arr specified by index
function drawImage(arr, index) {
  push();
  fill("#E9EAEF");
  noStroke();
  ellipseMode(CENTER);
  //circle(400, 325, 400, 400);
  imageMode(CENTER);
  image(arr[index], 400, 325);
  pop();
}


// Change individual fields of the clickables
function setupClickables() {

  // Setup text buttons
  for( let i = 0; i < 2; i++ ) {
    clickables[i].onPress = clickableButtonPressed;
    clickables[i].onHover = clickableButtonHover;
    clickables[i].onOutside = clickableButtonOnOutside;
    clickables[i].height = 70;
    clickables[i].width = 200;
    clickables[i].textSize = 24;
    clickables[i].textColor = "#FFFFFF";
    clickables[i].strokeWeight = 0;

    clickables[i].drawImageOnly = false;
  }

  // Setup png buttons
  for( let i = 2; i < clickables.length; i++ ) {
    clickables[i].onPress = clickableButtonPressed;
    clickables[i].onHover = clickableButtonHover;
    clickables[i].onOutside = clickableButtonOnOutside;
    clickables[i].cornerRadius = 50;
    clickables[i].strokeWeight = 0;

    clickables[i].drawImageOnly = false;
  }
}

//--- CLICKABLE CALLBACK FUNCTIONS ----

// Switch the droneIndex depending on what button is pressed
clickableButtonPressed = function () {
  if(this.id === 0) {
    // open hatch
    hatchOpen = true;
    droneIndex = 1;
  } else if (this.id === 1) {
    // close hatch
    hatchOpen = false;
    droneIndex = 0;
  } else if (this.id === 2) {
    // fire extinguisher
    if(hatchOpen) {
      alert("Close the hatch before using the fire extinguisher!");
    } else if (droneIndex === 2) {
      // toggle off
      droneIndex = 0;
    } else {
      // toggle on
      droneIndex = 2;
    }
  } else if (this.id === 3) {
    // mask
    if(!hatchOpen) {
      alert("Open the hatch before deploying the mask!");
    } else if (droneIndex === 3) {
      droneIndex = 1;
    } else {
      droneIndex = 3;
    }
  } else if (this.id === 4) {
    // bandaid
    if(!hatchOpen) {
      alert("Open the hatch first!");
    } else if (droneIndex === 4) {
      droneIndex = 1;
    } else {
      droneIndex = 4;
    }
  }

}

// Darken colors on hover
clickableButtonHover = function () {
  if( this.id === 0) {
    this.color = "#CB6E6E";
  } else if(this.id === 1) {
    this.color = "#7DBAA5";
  } else if(this.id == 2) {
    if(hatchOpen) {
      this.color = "#9D9EA0";
    } else {
      this.color = "#D5D6DB";
    }
  } else {
    if(hatchOpen) {
      this.color = "#D5D6DB";
    } else {
      this.color = "#9D9EA0";
    }
  }
}

// Default colors
clickableButtonOnOutside = function () {
  if( this.id === 0) {
    this.color = "#DD7575";
  } else if(this.id === 1) {
    this.color = "#8ED3BB";
  } else if(this.id == 2) {
    if(hatchOpen) {
      this.color = "#9D9EA0";
    } else {
      this.color = "#E9EAEF";
    }
  } else {
    if(hatchOpen) {
      this.color = "#E9EAEF";
    } else {
      this.color = "#9D9EA0";
    }
  }
}



