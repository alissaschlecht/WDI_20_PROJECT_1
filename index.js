// make car div move across screen horizontally left/ right
// when car hits right side, make disappear
// put on loop so that cars continuously move across

$(function() {

  var frog = $('#frog');
  var scoreOne = $('#score1');
  var scoreTwo = $('#score2');
  var showTurn = $("#turn");
  var playerLives = $("#lives");
  var playerLives1 = 3;
  var playerLives2 = 3;
  var Level = $('#level');
  var road = $('#road');
  var roadWidth = $('.road').outerWidth(true);
  var carInterval;
  // var logInterval;
  var rate = 0;//1400;
  var speed = 0;//3000;


// =====================  Start Screen ================================ //


$('#start').click(function() {
    $('#splashscreen').animate({height: 0, opacity: 0}, function() {
        $(this).remove();
    });
});
 

//===================== Nest all functions in one ===============================//
  
  play();

  function play(){

    clearInterval(carInterval);
    carInterval = setInterval(carLoop, rate);
    gameOver();
    moveFrog();
    playThreeLives();
  }


// ======================== Switch players and update scores =============== //

  var player = 1;
  var playerScore = [0,0];

  function updatePlayerScore() {
      if (player === 1){
        playerScore[0]++;
        $('#player1').append('<img id="scoreFrog" src="froggerHealthy.png"/>');
        scoreOne.html(playerScore[0]);
        playThreeLives();
   
      }else{
        playerScore[1]++;
        $('#player2').append('<img id="scoreFrog" src="froggerHealthy.png"/>');
        scoreTwo.html(playerScore[1]);
        playThreeLives();
      }
    } 

  function playThreeLives() {
    if (player ===1 && playerLives1 === 0){
      player = 2;
      playerLives2 = 3;
      showTurn.html("Player 2: Your Turn! <br> Lives: </br>");
      frog.stop().css({"left": roadWidth*.45, "top": "40px"});
      
    }else if (player === 2 && playerLives2 === 0){
      player = 1;
      playerLives1 = 3;
      showTurn.html("Player 1: Your Turn! <br> Lives: </br>")
      frog.css({"left": roadWidth*.45, "top": "40px"});      
    }
  }

  function gameOver() {

    if (playerScore[0] === 1){
      console.log(works);
      $("#gameover1").fancybox().click();
    }
    else if (playerScore[1] === 1){
      $("#gameover2").fancybox().click();
    }
    else{}
  }

  //========================== Winner ==============================================//
    
    function winnerArea() {

      var winArea = $('#winarea');
      var winTop = winArea.offset().top;
      var winHeight = winArea.outerHeight(true) + 20;
      var winBottom = winTop + winHeight;


      var frogTop = frog.offset().top;
      var frogHeight = frog.outerHeight(true);
      var frogBottom = frogTop + frogHeight;

      if (frogBottom <= winBottom){
        updatePlayerScore();
        frog.stop().css({"left": roadWidth*.45, "top": "40px"});
      }

    }


  //=============Car movement and collision detection===================//

  $('#easy').click(function(){
    rate = 10000;
    speed = 1000;
  });

  $('#medium').click(function(){
    rate = 1000;
    speed = 4000;
  });
  
  $('#hard').click(function(){
    
    rate = 100;

    var randomNum = Math.random();
    if (randomNum < .66){
      speed = 900;
    }else{
      speed = 1000;
    }
  });



  function carLoop() {

      var collisionInterval;
      clearInterval(collisionInterval);
      collisionInterval = setInterval(collisionCheck, 30);

      $('.first').prepend('<div class="carMoveRight allCars"><img src="unicycle.gif"/></div>');
      $('.first').append('<div class="carMoveLeft  allCars"><img src="scooter.gif"/></div>');

      $('.second').prepend('<div class="carMoveRight allCars"><img src="cycleOne.gif"/></div>');
      $('.second').append('<div class="carMoveLeft  allCars"><img src="redcar.png"/></div>');

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
        var carBottom = carTop + carHeight ;
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
            playerLives1 = parseInt(playerLives1) - 1;
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

  function crushFrog() {
    var alive = "froggerHealthy.png";
    var dead = "froggerCrushed.svg";        
    $this = $("#frog img");            

    $this.animate('src', dead);
    frog.stop().css({"left": roadWidth*.45, "top": "40px"});     
    $this.attr('src', alive);

  };

//================================= Move Frog ==================================//

  function moveFrog () {
    $(document).keydown(function(e) {
      switch (e.which) {
        case 37:
            frog.stop().animate({
                left: '-=25px'
            }); //left arrow key
            break;
        case 38:
            winnerArea();
            frog.stop().animate({
                top: '-=25px'
            }); //up arrow key
            break;
        case 39:
            frog.stop().animate({
                left: '+=25px'
            }); //right arrow key
            break;
        case 40:
            frog.stop().animate({
                top: '+=25px'
            }); //bottom arrow key
            break;
        }
    });

  }







  //============= Logs ========================= //

  // function logLoop() {

  //     var collisionInterval;
  //     clearInterval(collisionInterval);
  //     collisionInterval = setInterval(collisionCheck, 30);

  //     $('.stream').prepend('<div class="logMoveRight allLogs"><img src="car2.png"/></div>');
  //     $('.stream').append('<div class="logMoveLeft  allLogs"><img src="car1.png"/></div>');

  //     var log = $('.allLogs');
  //     var leftItems = $('.logMoveRight');
  //     var rightItems = $('.logMoveLeft');
  //     var stream = $('#stream1');

  //     setTimeout(function() {
  //       $.each(leftItems, function(i, e) {
  //         $(e).animate({
  //           left: + roadWidth*.95
  //         }, speed, function() {
  //             $(this).remove();
  //         });
  //       })
  //     });

  //     setTimeout(function() {
  //       $.each(rightItems, function(i, e) {
  //         $(e).animate({
  //           right: + roadWidth*.95
  //         }, speed, function() {
  //             $(this).remove();
  //         });
  //       })
  //     });

  //     function collision(log, frog) {

  //       var logLeft = log.offset().left + 40;
  //       var logTop = log.offset().top + 40;
  //       var logHeight = log.outerHeight(true);
  //       var logWidth = log.outerWidth(true);
  //       var logBottom = logTop + logHeight;
  //       var logRight = logLeft + logWidth;
  //       var frogLeft = frog.offset().left;
  //       var frogTop = frog.offset().top;
  //       var frogHeight = frog.outerHeight(true);
  //       var frogWidth = frog.outerWidth(true);
  //       var frogBottom = frogTop + frogHeight;
  //       var frogRight = frogLeft + frogWidth; 
  //       var streamTop = stream.offset().top;
  //       var streamHeight = stream.outerHeight(true);
  //       var streamBottom = streamTop + streamHeight;


  //       if (frogTop < logBottom){

  //         console.log(frogTop);
  //         frogTop = logTop;
  //         console.log(frogTop);
  //       }





        // if ((frogBottom < streamBottom) && (logBottom < frogTop || logTop > frogBottom || logRight < frogLeft || logLeft > frogRight)) {
        //   if (player === 1){
        //     crushFrog();
        //     playerLives1 = parseInt(playerLives1) - 1;
        //     playThreeLives();
        //     playerLives.html(playerLives1);

        //   }else{
        //     crushFrog();
        //     playerLives2 = playerLives2 - 1;
        //     playThreeLives();
        //     playerLives.html(playerLives2);
        //   }
        // }
  //     }

  //     function collisionCheck(){
  //       log.each(function(index, element){
  //         collision($(element), frog);
  //       });
  //     }             
  // }


  // function crushFrog() {
  //   var alive = "froggerHealthy.png";
  //   var dead = "froggerCrushed.svg";        
  //   $this = $("#frog img");            

  //   $this.animate('src', dead);
  //   frog.stop().css({"left": roadWidth*.45, "top": "40px"});     
  //   $this.attr('src', alive);

  // };


  

  });