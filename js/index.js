
$(document).ready(function() {
const topLeft = $("#game-left-top"),
  topRight = $('#game-right-top'),
  bottomLeft = $('#game-left-bottom'),
  bottomRight = $('#game-right-bottom'),
  level = $('#level'),
  onOff = $('#onOff'),
  start = $('#start'),
  strict = $('#strict'),
  win = $('#win-screen'),
  sequenceArr = [],
  CLICK_EVENT = ("ontouchstart" in window ? "touchstart" : "click");  
// sounds  
const wrongSound = new Audio();
wrongSound.src = "sounds/NFF-wrong-02.wav";
const topLeftSound = new Audio();
topLeftSound.src = "sounds/simonSound1.mp3";
const topRightSound = new Audio();
topRightSound.src = "sounds/simonSound2.mp3";
const bottomLeftSound = new Audio();
bottomLeftSound.src = "sounds/simonSound3.mp3";
const bottomRightSound = new Audio();
bottomRightSound.src = "sounds/simonSound4.mp3";
//game asset objects
let sounds = {
  1: topLeftSound,
  2: topRightSound,
  3: bottomLeftSound,
  4: bottomRightSound,
  5: wrongSound
}

let gameSquares = {
  1: topLeft,
  2: topRight,
  3: bottomLeft,
  4: bottomRight
}

let status = {
  "running" : false,
  "level" : 0,
  "strict" : false,
  "on" : false,
  "gameArr" : []
}

//main Game functions
function genSequence() {
  let random = Math.round(Math.random() * (4 - 1)) + 1;
  status.gameArr.push(random);
  status.level = status.gameArr.length;
  if(status.level === 21) {
    win.show();
  } else {
  level.html(status.level).css('color', 'green');
  playSequence();
  }
}

function playSequence() {
  let sequenceArr = status.gameArr;
  for (let i = 0; i < sequenceArr.length; i++) {
    (function(i) {
      setTimeout(function() {
        if (sequenceArr[i] === 1) {
          topLeftSound.play();
          topLeft.animate({
            opacity: 0.5
          }, 100).animate({
            opacity: 1
          }, 200);
        }
        if (sequenceArr[i] === 2) {
          topRightSound.play();
          topRight.animate({
            opacity: 0.5
          }, 100).animate({
            opacity: 1
          }, 200);

        }
        if (sequenceArr[i] === 3) {
          bottomLeftSound.play();
          bottomLeft.animate({
            opacity: 0.5
          }, 100).animate({
            opacity: 1
          }, 200);

        }
        if (sequenceArr[i] === 4) {
          bottomRightSound.play();
          bottomRight.animate({
            opacity: 0.5
          }, 100).animate({
            opacity: 1
          }, 200);
        }
        if (i === sequenceArr.length - 1) {
          userSequence();
        }
      }, 1000 * i)
    }(i));
  }

}

function userSequence() {
  let userArr = status.gameArr.slice();
 // checkLength();
  function userClick(key) {
    gameSquares[key].animate({opacity: 0.5}, 100).animate({opacity: 1}, 200);
    if (key === userArr[0]) {
      sounds[key].play();
      userArr.shift();
      checkLength();
    } else if (key !== userArr[0]) {
      if(!status.strict) {
      return playSeqAgain();
      } else {
        sounds[5].play()
        return reset();
      }
    }  
  }
  topLeft.on(CLICK_EVENT, function()  {
    userClick(1);
  })
  topRight.on(CLICK_EVENT, function()  {
    userClick(2);
  })
  bottomLeft.on(CLICK_EVENT, function()  {
    userClick(3);
  })
  bottomRight.on(CLICK_EVENT, function()  {
    userClick(4);
  })
  
  
  function checkLength() {
    if(userArr.length === 0){
      topLeft.off();
      topRight.off();
      bottomLeft.off();
      bottomRight.off();
      return setTimeout(genSequence, 1000);
    }  
  }
  
  function playSeqAgain() {
    wrongSound.play();
    topLeft.off();
    topRight.off();
    bottomLeft.off();
    bottomRight.off();
    return setTimeout(playSequence, 1000);
  }

}

//Game control click listeners
onOff.on(CLICK_EVENT, function() {
  if(!status.on) {
    topLeftSound.muted = true;
    topRightSound.muted = true;
    bottomLeftSound.muted = true;
    bottomRightSound.muted = true;
    wrongSound.muted = true;
    topLeftSound.play();
    topRightSound.play();
    bottomLeftSound.play();
    bottomRightSound.play();
    wrongSound.play();
    setTimeout(function() {
    
    topLeftSound.muted = false;
    topRightSound.muted = false;
    bottomLeftSound.muted = false;
    bottomRightSound.muted = false;
    wrongSound.muted = false;
    },800);
    
   // onSequence();
    status.on = true;
    onOff.css("color", "green");
    level.html("0").css("color", 'red');
  } else {
    turnOff();
  } 
}) 

start.on(CLICK_EVENT, function()  {

  if(status.on && !status.running) {
  status.running = true;  
  start.html('<i class="fa fa-refresh"></i>').css('color', 'green');
  return setTimeout(genSequence, 300);
  }
  else if(status.on && status.running) {
    return setTimeout(reset, 300); 
  }
})

strict.on(CLICK_EVENT, function()  {
  if(!status.strict) {
  status.strict = true;
  strict.css('color', 'green');
  } else {
    status.strict = false;
  strict.css('color', 'red');
  } 
})

win.on(CLICK_EVENT, function() {
  win.hide();
  reset();
})
//game control click helper functions
function reset() {
    status.gameArr = [];
    status.level = 0;
    topLeft.off();
    topRight.off();
    bottomLeft.off();
    bottomRight.off();
    status.running = false;
    level.html("0").css("color", 'red');
    start.html('<i class="fa fa-play"></i>').css('color', 'red');
}

function turnOff() {
    status.on = false;
    status.start = false;
    status.level = 0;
    status.strict = false;
    status.gameArr = [];
    onOff.css("color", "red");
    start.html('<i class="fa fa-play"></i>').css('color', 'red');
    level.html("-").css('color', 'red');
    strict.css('color', 'red')
}

/*function onSequence() {
  let sequenceArr = [1,2,3,4,1,2,3,4];
  for (let i = 0; i < sequenceArr.length; i++) {
    (function(i) {
      setTimeout(function() {
        if (sequenceArr[i] === 1) {
          topLeftSound.play();
          topLeft.animate({
            opacity: 0.5
          }, 100).animate({
            opacity: 1
          }, 100);
        }
        if (sequenceArr[i] === 2) {
          topRightSound.play();
          topRight.animate({
            opacity: 0.5
          }, 100).animate({
            opacity: 1
          }, 100);

        }
        if (sequenceArr[i] === 3) {
          bottomLeftSound.play();
          bottomLeft.animate({
            opacity: 0.5
          }, 100).animate({
            opacity: 1
          }, 100);

        }
        if (sequenceArr[i] === 4) {
          bottomRightSound.play();
          bottomRight.animate({
            opacity: 0.5
          }, 100).animate({
            opacity: 1
          }, 100);
        }
      }, 150 * i)
    }(i));
  }

}  
*/
})
