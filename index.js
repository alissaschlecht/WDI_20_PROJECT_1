// make car div move across screen horizontally left/ right
// when car hits right side, make disappear
// put on loop so that cars continuously move across

$(function(){

  // var car =  $('.allCars');
  // var carLTR = $('.carMoveRight');
  // var carRTL = $('.carMoveLeft');
  var frog = $('#frog');
  var scoreOne = $('#score1');
  var scoreTwo = $('#score2');
  var showTurn = $("h2");
  // var gameArea = $('#wrapper');
  var road = $('#road');
  var carInterval;
  var collisionInterval;

  play();

  function play(){

    clearInterval(carInterval);
    // clearInterval(collisionInterval);
    carInterval = setInterval(carLoop, 900);
    // collisionInterval = setInterval(collisionCheck, 30);
    moveFrog();
    recordPlayerChange();
  }

  var player = 1;
  var playerScore = [0,0];
  function recordPlayerChange(){
    if (player === 1){
      frog.css({"left": "275px", "top": "40px"});
      // frog.remove();
      // $(".winarea").append("<div id='frog'></div>");
      player = 2;
      showTurn.html("Player 2: Your Turn!")
    }
    else {
      frog.css({"left": "275px", "top": "40px"}); 
      player = 1;
      showTurn.html("Player 1: Your Turn!")
    }
  }


  function carLoop() {

      $('.road').prepend('<div class="carMoveRight allCars"></div>');
      $('.road').append('<div class="carMoveLeft  allCars"></div>');

      var car = $('.allCars');
      var leftItems = $('.carMoveRight');
      var rightItems = $('.carMoveLeft');
      var roadWidth = ($('.road').outerWidth(true))*.95;

      setTimeout(function() {
        $.each(leftItems, function(i, e) {
          $(e).animate({
            left: + roadWidth
            // - wrapper.length
          }, 3000, function() {
              $(this).remove();
          });
        })
      }, 1000);

      setTimeout(function() {
        $.each(rightItems, function(i, e) {
          $(e).animate({
            right: + roadWidth
          }, 3000, function() {
              $(this).remove();
          });
        })
      }, 1000);

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
            recordPlayerChange();
          }else{
            alert("game over!");
            recordPlayerChange();
          }
        }
      }

      function collisionCheck(){
        car.each(function(){
          collision($(this), frog);
        });
      }
                   
  }


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
                left: '+=35px'
            }); //right arrow key
            break;
        case 40:
            frog.stop().animate({
                top: '+=35px'
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