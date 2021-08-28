


var gameOverFlag = true;
var buttons = ["gameButton1", "gameButton2", "gameButton3", "gameButton4"];
var playerInputShould = [];
var playerInputIs = [];
var allowPlayerInput = false;
//start the game
$(document).keypress(function(evt){
  if(gameOverFlag === true){
    gameOverFlag = false;
    $("h1").text("LET THE GAME BEGIN");
    startGameLoop();
  }
});

//event listeners
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
//sound functions
//
function playSound(button){
  //console.log("playSound button is: " + button);
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
    //console.log("1 -> i: " + i + ", list[i]: " + playerInputShould[i]);
    setTimeout(function(){
       playSound(playerInputShould[i]);
       klickAnim(playerInputShould[i]);
       //console.log("2 -> i: " + i + ", list[i]: " + playerInputShould[i]);
       //console.log("play this sound: " + playerInputShould[i]);
    }, 1000 * i);
  }
  setTimeout(function(){
    allowPlayerInput = true;
  }, 1000 * soundListLength)
  //playerInputShould.forEach(element => {
  //  console.log("element = " + element);
  //  playSound(element);
  //});

}

function klickAnim(button){

  if(button == "0"){
    //$("#gameButton1").animate({width: '+=100px;', height: '+=100px;'});
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

function startGameLoop(){
  var nextButton = getRandomButton()
  playerInputShould.push(nextButton);
  playButtonsSounds();
  //set the user input flag after callback from length array timed empty jquery animation
  //console.log("player should: " + playerInputShould);
}

function prepareNextRound(){
  playerInputIs.length = 0;
}

function gameOver(){
  playerInputShould.length = 0;
  playerInputIs.length = 0;
  $("h1").text("QQ oh dear game over, push any key to restart QQ");
  gameOverFlag = true;
}

function storePlayerInput(buttonNr){
  console.log("allow player input = " + allowPlayerInput);
  if(allowPlayerInput){
    playerInputIs.push(buttonNr);
    console.log("pushed to playerInputIs: " + buttonNr );
    checkPlayerInputIsCorrect();
  }
}

function checkPlayerInputIsCorrect(){
  console.log("before playerInputIs.lenght = " + playerInputIs.length);
  var userShouldStepSlice = playerInputShould.slice(0,playerInputIs.length);
  console.log("after playerInputIs.lenght = " + playerInputIs.length);
  console.log("slice is = " + userShouldStepSlice);
  if(JSON.stringify(playerInputIs) == JSON.stringify(userShouldStepSlice)){
    console.log("user is correct: " + JSON.stringify(playerInputIs) + " = " + JSON.stringify(userShouldStepSlice));
    prepareNextRound();
    startGameLoop();
  }else{
    console.log("user error: " + JSON.stringify(playerInputIs) + " = " + JSON.stringify(userShouldStepSlice));
    allowPlayerInput = false;
    gameOver();
  }

}

function getRandomButton(){
  var randnum = Math.floor(Math.random()*4);
  //console.log(randnum);
  return randnum;
}

function sleep(milliseconds){
  const date = Date.now();
  let currentDate = null;
  do{
    currentDate = Date.now();
  }while(currentDate - date < milliseconds);
}
