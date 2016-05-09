// make car div move across screen horizontally left/ right
// when car hits right side, make disappear
// put on loop so that cars continuously move across

$(function(){

  var frog = $('#frog');
  var scoreOne = $('#score1');
  var scoreTwo = $('#score2');
  var showTurn = $("#turn");
  var playerLives = parseInt($("#lives"));
  // var playerLives1 = 3;
  // var playerLives2 = 3;
  var Level = $('#level');
  var road = $('#road');
  var roadWidth = $('.road').outerWidth(true);
  var carInterval;
  var rate = 2000;
  var speed = 2000;

  $('#easy').click(function(){
    rate = 2000;
    speed = 2000;
  });

  $('#medium').click(function(){
    rate = 1000;
    speed = 4000;
  });
  
  $('#hard').click(function(){
    
    rate = 100;

    var randomNum = Math.random();
    if (randomNum < .66){
      speed = 2000;
    }else{
      speed = 5000;
    }
  });

  play();

  function play(){

    clearInterval(carInterval);
    carInterval = setInterval(carLoop, rate);
    moveFrog();
    playThreeLives();
  }

  var player = 1;
  var playerScore = [0,0];

  function updatePlayerScore() {
      if (player === 1){
        playerScore[0]++;
        alert("Safe frog for player one!");
        scoreOne.html(playerScore[0]);
        playThreeLives();
   
      }else{
        playerScore[1]++;
        alert("Safe frog for player two!");
        scoreTwo.html(playerScore[1]);
        playThreeLives();
      }
    } 

  function playThreeLives() {
    if (player ===1 && playerLives1 === 0){
      player = 2;
      playerLives.html(3);
      showTurn.html("Player 2: Your Turn!");
      frog.stop().css({"left": roadWidth*.45, "top": "40px"});
      
    }else if (player === 2 && playerLives2 === 0){
      player = 1;
      playerLives.html(3);
      showTurn.html("Player 1: Your Turn!")
      frog.css({"left": roadWidth*.45, "top": "40px"});      
    }
  }

function crushFrog() {
  var alive = "froggerHealthy.png";
  var dead = "froggerCrushed.svg";        
  $this = $("#frog img");            

  $this.animate('src', dead);
  frog.stop().css({"left": roadWidth*.45, "top": "40px"});     
  $this.attr('src', alive);

};
  // function levelUp() {

  //   if (scoreOne === 2){
  //     level = 2;
  //   }
  //   else if (scoreOne === 4){
  //     level = 3;
  //   }
  //   else{
  //     level = level;
  //   }

  //   if (scorene === 2){
  //     level = 2;
  //   }
  //   else if (scoreOne === 4){
  //     level = 3;
  //   }
  //   else{
  //     level = level;
  //   }


  // }


  function carLoop() {

      var collisionInterval;
      clearInterval(collisionInterval);
      collisionInterval = setInterval(collisionCheck, 30);
      // collisionCheck(car, frog);

      $('.road').prepend('<div class="carMoveRight allCars"><img src="car2.png"/></div>');
      $('.road').append('<div class="carMoveLeft  allCars"><img src="car1.png"/></div>');

      var car = $('.allCars');
      var leftItems = $('.carMoveRight');
      var rightItems = $('.carMoveLeft');

      setTimeout(function() {
        $.each(leftItems, function(i, e) {
          $(e).animate({
            left: + roadWidth*.95
          }, speed, function() {
              $(this).remove();
          });
        })
      });

      setTimeout(function() {
        $.each(rightItems, function(i, e) {
          $(e).animate({
            right: + roadWidth*.95
          }, speed, function() {
              $(this).remove();
          });
        })
      });

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
            crushFrog();
            playerLives1 = playerLives1 - 1;
            playThreeLives();
            playerLives.html(playerLives1);

          }else{
            crushFrog();
            playerLives2 = playerLives2 - 1;
            playThreeLives();
            playerLives.html(playerLives2);
          }
        }
      }

      function collisionCheck(){
        car.each(function(index, element){
          collision($(element), frog);
        });
      }
                   
  }

  function moveFrog () {
    $(document).keydown(function(e) {
      switch (e.which) {
        case 37:
            frog.stop().animate({
                left: '-=30px'
            }); //left arrow key
            break;
        case 38:
            winnerArea();
            frog.stop().animate({
                top: '-=30px'
            }); //up arrow key
            break;
        case 39:
            frog.stop().animate({
                left: '+=30px'
            }); //right arrow key
            break;
        case 40:
            frog.stop().animate({
                top: '+=30px'
            }); //bottom arrow key
            break;
        }
    });

  }

  function winnerArea() {

    var winArea = $('#winarea');
    var winTop = winArea.offset().top;
    var winHeight = winArea.outerHeight(true) + 15;
    var winBottom = winTop + winHeight;


    var frogTop = frog.offset().top;
    var frogHeight = frog.outerHeight(true);
    var frogBottom = frogTop + frogHeight;

    if (frogBottom <= winBottom){
      updatePlayerScore();
      frog.stop().css({"left": roadWidth*.45, "top": "40px"});
    }

  }
  

  });