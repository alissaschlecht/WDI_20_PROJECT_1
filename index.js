// make car div move across screen horizontally left/ right
// when car hits right side, make disappear
// put on loop so that cars continuously move across

$(function(){

  var frog = $('#frog');
  var scoreOne = $('#score1');
  var scoreTwo = $('#score2');
  var showTurn = $("#turn");
  var playerLives =  parseInt($("#lives"));
  var road = $('#road');
  var roadWidth = $('.road').outerWidth(true);
  var carInterval;
  
  play();

  function play(){

    clearInterval(carInterval);
    
    carInterval = setInterval(carLoop, 1200);
    moveFrog();
    recordPlayerChange();
  }

  var player = 1;
  var playerScore = [0,0];
  function recordPlayerChange(){
    if (player === 1 && playerLives === 0){
      frog.css({"left": roadWidth*.45, "top": "40px"});
      player = 2;
      showTurn.html("Player 2: Your Turn!")
    }
    else {
      frog.css({"left": roadWidth*.45, "top": "40px"}); 
      player = 1;
      showTurn.html("Player 1: Your Turn!")
    }
  }


  function carLoop() {

      var collisionInterval;
      clearInterval(collisionInterval);
      collisionInterval = setInterval(collisionCheck, 30);
      // collisionCheck(car, frog);

      var randomNum = Math.random();
      var carSpeed2;
      if (randomNum < .66){
        carSpeed2 = 2000;
      }else{
        carSpeed2 = 5000;
      }

      $('.road').prepend('<div class="carMoveRight allCars"><img src="car2.png"/></div>');
      $('.road').append('<div class="carMoveLeft  allCars"><img src="car1.png"/></div>');

      var car = $('.allCars');
      var leftItems = $('.carMoveRight');
      var rightItems = $('.carMoveLeft');


      setTimeout(function() {
        $.each(leftItems, function(i, e) {
          $(e).animate({
            left: + roadWidth*.95
            // - wrapper.length
          }, 4000, function() {
              $(this).remove();
          });
        })
      });

      setTimeout(function() {
        $.each(rightItems, function(i, e) {
          $(e).animate({
            right: + roadWidth*.95
          }, carSpeed2, function() {
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
            alert("crushed!");
            playerLives = playerLives - 1;
            recordPlayerChange();
            console.log(playerLives);
          }else{
            alert("game over!");
            playerLives = playerLives - 1;
            recordPlayerChange();
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
        scoreOne.html(playerScore[0]);
        recordPlayerChange();
        
      }else{
        playerScore[1]++;
        alert("Safe frog for player two!");
        scoreTwo.html(playerScore[1]);
        recordPlayerChange();
    
      }
    } 
  

  });