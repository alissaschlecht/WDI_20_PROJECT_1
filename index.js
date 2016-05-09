// make car div move across screen horizontally left/ right
// when car hits right side, make disappear
// put on loop so that cars continuously move across

$(function(){

  var car =  $('.allCars');
  var carLTR = $('.carMoveRight');
  var carRTL = $('.carMoveLeft');
  var frog = $('#frog');
  var scoreOne = $('#score1');
  var scoreTwo = $('#score2');
  var showTurn = $("h2");

  play();

  function play(){

    setInterval(carLoop, 2500);
    setInterval(collisionCheck, 30);
    moveFrog();
    recordPlayerChange();
  }

  var player = 1;
  var playerScore = [0,0];
  function recordPlayerChange (){
    if (player === 1){
      player = 2;
    }
    else {
      player = 1;
    }
  }

  // function addPlayerPoint() {

  //   if () {

  //   }

  // }


  function carLoop() {
    $(document).keyup(function(e) {
      if (e.keyCode == 32) {
        collisionCheck();
        carLTR.animate({left: "+=580px"}, 2000, function() {
          carLTR.removeAttr('style'); 
        });

        carRTL.animate({right: "+=580px"}, 2000, function() {
        carRTL.removeAttr('style'); });

      };
  });
}


  // function carLoop() {
  //   $("#start").click(function() {
  //     collisionCheck();
  //     carLTR.animate({left: "+=580px"}, 2000, function() {
  //       carLTR.removeAttr('style'); 
  //     });

  //     carRTL.animate({right: "+=580px"}, 2000, function() {
  //     carRTL.removeAttr('style'); });

  //   });
  // }
// keypress to move frog div

  function moveFrog () {
    $(document).keydown(function(e) {
      switch (e.which) {
        case 37:
            frog.stop().animate({
                left: '-=35px'
            }); //left arrow key
            break;
        case 38:
            winnerArea();
            frog.stop().animate({
                top: '-=35px'
            }); //up arrow key
            break;
        case 39:
            frog.stop().animate({
                left: '+=15px'
            }); //right arrow key
            break;
        case 40:
            frog.stop().animate({
                top: '+=15px'
            }); //bottom arrow key
            break;
        }
    });

  }
  // look for collision

  function collision(car, frog) {

    var carLeft = car.offset().left;
    var carTop = car.offset().top;
    var carHeight = car.outerHeight(true);
    var carWidth = car.outerWidth(true);
    var carBottom = carTop + carHeight;
    var carRight = carLeft + carWidth;
    var frogLeft = frog.offset().left;
    var frogTop = frog.offset().top;
    var frogHeight = frog.outerHeight(true);
    var frogWidth = frog.outerWidth(true);
    var frogBottom = frogTop + frogHeight;
    var frogRight = frogLeft + frogWidth; 

    if (carBottom < frogTop || carTop > frogBottom || carRight < frogLeft || carLeft > frogRight) {
    }else {
      if (player === 1){
        alert("game over!");
        frog.css({"left": "275px", "top": "40px"});
        player = 2;
        showTurn.html("Player 2: Your Turn!");
      }else{
        alert("game over!");
        frog.css({"left": "275px", "top": "40px"});
        player =1;
        showTurn.html("Player 1: Your Turn!");
      }
    }
  }

  function collisionCheck(){
    car.each(function(){
      collision($(this), frog);
    });
  }

  function winnerArea() {

    var winArea = $('#winarea');
    var winTop = winArea.offset().top;
    var winHeight = winArea.outerHeight(true);
    var winBottom = winTop + winHeight;


    var frogTop = frog.offset().top;
    var frogHeight = frog.outerHeight(true);
    var frogBottom = frogTop + frogHeight;

    if (frogBottom <= winBottom){
      updatePlayerScore();
    }

    console.log(playerScore);

  }

  function updatePlayerScore() {
      if (player === 1){
        playerScore[0]++;
        alert("Safe frog for player one!");
        frog.css({"left": "275px", "top": "40px"});
        player = 2;
        scoreOne.html(playerScore[0]);
        showTurn.html("Player 2: Your Turn!");

      }else{
        playerScore[1]++;
        alert("Safe frog for player two!");
        frog.css({"left": "275px", "top": "40px"});
        player = 1;
        scoreTwo.html(playerScore[1]);
        showTurn.html("Player 1: Your Turn!")
      }
    } 
  
  

  });