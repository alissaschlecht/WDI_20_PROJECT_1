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
  var player = 1;
  var playerScore = [0,0];
  var Level = $('#level');
  var roadWidth = $('.road').outerWidth(true);
  var animationInterval;
  var collisionInterval;
  var generateInterval;
  var rate = 4000;
  var frameRate = 50;
  var creationRate = 1800;
  var moveUp = false;
  var moveDown = false;
  var moveLeft = false;
  var moveRight = false;
  var car = $('.allCars');
  var leftItems = $('.carMoveRight');
  var rightItems = $('.carMoveLeft');
  var frogSpeed = "5px";
  var carSpeed = "3px";


// =====================  Start Screen ======================== //


  $('#start').click(function() {
      $('#splashscreen').animate({height: 0, opacity: 0}, function() {
          $(this).remove();
      });

  });

//===================== Play game ==================//
  
  play();

  function play(){

    clearInterval(animationInterval);
    animationInterval = setInterval(animate, frameRate);
    clearInterval(collisionInterval);
    collisionInterval = setInterval(collisionCheck, frameRate);
    clearInterval(generateInterval);
    generateInterval = setInterval(createCar, creationRate);
    moveFrog();
    playThreeLives();

  }

  function animate() {

      // animte frog
      if(moveLeft) {
          frog.css({
              left: '-=' + frogSpeed +''
          }); //left arrow key
      }
      if(moveUp) {
          //winnerArea();
          frog.css({
              top: '-=' + frogSpeed +''
          }); //up arrow key
      }
      if(moveRight) {
          frog.css({
              left: '+=' + frogSpeed +''
          }); //right arrow key
      }
      if(moveDown) {
          frog.css({
              top: '+=' + frogSpeed +''
          }); //bottom arrow key
      }

      // animate cars
      car = $('.allCars');
      leftItems = $('.carMoveRight');
      rightItems = $('.carMoveLeft');

      leftItems.each(function(index, car){

          $(car).css({left: "+=" + carSpeed + ""});

          if(parseInt($(car).css('left')) > parseInt($(".wrapper").css('width'))) {

              $(car.remove());

          }

      });

      rightItems.each(function(index, car){

          $(car).css({right: "+=" + carSpeed+ ""});

          if(parseInt($(car).css('right')) > parseInt($(".wrapper").css('width'))) {

              $(car.remove());

          }

      });

  }

// ======================== Switch players and update scores =============== //


  function updatePlayerScore() {
      if (player === 1){
        playerScore[0]++;
        $('#player1').append('<img id="scoreFrog" src="images/froggerHealthy.png"/>');
        scoreOne.html(playerScore[0]);
        playThreeLives();
        gameOver();
   
      }else{
        playerScore[1]++;
        $('#player2').append('<img id="scoreFrog" src="images/froggerHealthy.png"/>');
        scoreTwo.html(playerScore[1]);
        playThreeLives();
        gameOver();
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

    if ((playerScore[0]) == 3) {
      console.log("works");
      $("#gameover1").css("display" , "block");
      clearInterval(generateInterval);

    }
    else if (playerScore[1] == 3){
       console.log("works");
       $("#gameover2").css("display" , "block");
       clearInterval(generateInterval);

    }

  }


  //=============Car movement and collision detection===================//

  $('#easy').click(function(){

    
    carSpeed = "5px";
    creationRate = 2000;
    clearInterval(generateInterval);
    generateInterval = setInterval(createCar, creationRate)
  
  });

  $('#medium').click(function(){
    
    carSpeed = "5px";
    creationRate = 1500;
    clearInterval(generateInterval);
    generateInterval = setInterval(createCar, creationRate)
   

  });
  
  $('#hard').click(function(){
    
    carSpeed = "10px";
    creationRate = 1000;
    clearInterval(generateInterval);
    generateInterval = setInterval(createCar, creationRate);

  });



  function createCar() {
      
      $('.first').prepend('<div class="carMoveRight allCars"><img src="images/unicycle.gif"/></div>');
      $('.first').append('<div class="carMoveLeft  allCars"><img src="images/scooter.gif"/></div>');

      $('.second').prepend('<div class="carMoveRight allCars"><img src="images/cycleOne.gif"/></div>');
      $('.second').append('<div class="carMoveLeft  allCars"><img src="images/redcar.png"/></div>');

  }

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
    var winArea = $('#winarea');
    var winTop = winArea.offset().top;
    var winHeight = winArea.outerHeight(true) + 20;
    var winBottom = winTop + winHeight; 

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

    if (frogBottom <= winBottom){
      updatePlayerScore();
      crushFrog();
    }
  }

  function collisionCheck(){
    car.each(function(index, element){
      collision($(element), frog);
    });
  } 

  function crushFrog() {
    var alive = "images/froggerHealthy.png";
    var dead = "images/greencircle.png";        
    $this = $("#frog img");            

    $this.animate('src', dead);
    frog.css({
      "top": "10px",
      "left": "180px"
    })
    $this.attr('src', alive);

  };

//================================= Move Frog ==================================//

  function moveFrog () {

    $(document).keydown(function(e) {

      switch (e.which) {

        case 37:
            moveLeft = true;
            break;
        case 38:
            moveUp = true; //up arrow key
            break;
        case 39:
            moveRight = true; //right arrow key
            break;
        case 40:
            moveDown = true;//bottom arrow key
            break;
        
        }
    });

    $(document).keyup(function(e) {

      switch (e.which) {

        case 37:
            moveLeft = false;
            break;
        case 38:
            moveUp = false; //up arrow key
            break;
        case 39:
            moveRight = false; //right arrow key
            break;
        case 40:
            moveDown = false;//bottom arrow key
            break;
        
        }
    });

  }

  });