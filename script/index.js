//todo add wigle on playerInputIs
//graphic upgrade: scenario, fonts, gentle background pattern, design trends 2021
//funktionen in einem graph mit copy paste einfügen um struktur schnell und visuell zu erstellen




var gameOverFlag = true;
var playerInputShould = [];
var playerInputIs = [];
var allowPlayerInput = false;

//
//GAME LOGIC FUNCTIONS BEGIN
//
$(document).keypress(function(evt){
  if(gameOverFlag === true){
    gameOverFlag = false;
    $("h1").text("LET THE GAME BEGIN");
    startGameLoop();
  }
});

function startGameLoop(){
  var nextButton = getRandomButton()
  playerInputShould.push(nextButton);
  playButtonsSounds();
}

function prepareNextRound(){
  playerInputIs.length = 0;
}

function getRandomButton(){
  var randnum = Math.floor(Math.random()*4);
  //console.log(randnum);
  return randnum;
}

function gameOver(){
  playerInputShould.length = 0;
  playerInputIs.length = 0;
  $("h1").text("QQ oh dear game over, push any key to restart QQ");
  gameOverFlag = true;
}
//
//GAME LOGIC FUNCTIONS END
//

//
//PLAYER INPUT BEGIN
//
function storePlayerInput(buttonNr){
  console.log("allow player input = " + allowPlayerInput);
  if(allowPlayerInput){
    playerInputIs.push(buttonNr);
    console.log("pushed to playerInputIs: " + buttonNr );
    checkPlayerInputIsCorrect();
  }
}

function checkPlayerInputIsCorrect(){
  var userShouldStepSlice = playerInputShould.slice(0,playerInputIs.length);
  if(JSON.stringify(playerInputIs) == JSON.stringify(userShouldStepSlice)){
    console.log("user is correct: " + JSON.stringify(playerInputIs) + " = " + JSON.stringify(userShouldStepSlice));
    if(playerInputIs.length == playerInputShould.length){
      allowPlayerInput = false;
      setTimeout(function(){
        prepareNextRound();
        startGameLoop();
      }, 1000);
    }
  }else{
    console.log("user error: " + JSON.stringify(playerInputIs) + " = " + JSON.stringify(userShouldStepSlice));
    allowPlayerInput = false;
    gameOver();
  }
}
//
//PLAYER INPUT END
//

//
//ANIMATIONS AND SOUND BEGIN
//
function playSound(button){
  if(button == "0"){
    var sound1 = new Audio("sound/tom-1.mp3");
    sound1.play();
  }
  else if (button == "1"){
    var sound2 = new Audio("sound/crash.mp3");
    sound2.play();
  }
  else if (button == "2"){
    var sound3 = new Audio("sound/snare.mp3");
    sound3.play();
  }
  else if (button == "3"){
    var sound4 = new Audio("sound/kick-bass.mp3");
    sound4.play();
  }
}

function playButtonsSounds(){
  var soundListLength = playerInputShould.length;
  for(let i = 0; i < soundListLength; i++){
    setTimeout(function(){
       playSound(playerInputShould[i]);
       klickAnim(playerInputShould[i]);
    }, 1000 * i);
  }
  setTimeout(function(){
    allowPlayerInput = true;
  }, 1000 * soundListLength)
}

function klickAnim(button){
  if(button == "0"){
    $("#gameButton1").animate({opacity: "0.1"});
    $("#gameButton1").animate({opacity: "1.0"});
  }
  else if (button == "1"){
    $("#gameButton2").animate({opacity: "0.1"});
    $("#gameButton2").animate({opacity: "1.0"});
  }
  else if (button == "2"){
    $("#gameButton3").animate({opacity: "0.1"});
    $("#gameButton3").animate({opacity: "1.0"});
  }
  else if (button == "3"){
    $("#gameButton4").animate({opacity: "0.1"});
    $("#gameButton4").animate({opacity: "1.0"});
  }
}
//
//ANIMATIONS AND SOUND END
//

//
//EVENT LISTENERS BEGIN
//
$("#gameButton1").click(function(){
  playSound(0);
  storePlayerInput(0);
});

$("#gameButton2").click(function(){
  playSound(1);
  storePlayerInput(1);
});

$("#gameButton3").click(function(){
  playSound(2);
  storePlayerInput(2);
});

$("#gameButton4").click(function(){
  playSound(3);
  storePlayerInput(3);
});
//
//EVENT LISTENERS END
//


function sleep(milliseconds){
  const date = Date.now();
  let currentDate = null;
  do{
    currentDate = Date.now();
  }while(currentDate - date < milliseconds);
}
