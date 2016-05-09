// make car div move across screen horizontally left/ right
// when car hits right side, make disappear
// put on loop so that cars continuously move across

$(function(){

  var car =  $('.allCars');
  var carLTR = $('.carMoveRight');
  var carRTL = $('.carMoveLeft');
  var frog = $('#frog');

  play();

  function play(){

    setInterval(carLoop, 2500);
    setInterval(collisionCheck, 30);
    moveFrog();
  }

  var player = 1;
  var recordPlayerChange = function (){
    if (player === 1){
      player = -1;
    }
    else {
      player = 1;
    }
  }


  function carLoop() {
    $("#start").click(function() {
      collisionCheck();
      carLTR.animate({left: "+=580px"}, 2000, function() {
        carLTR.removeAttr('style'); 
      });

      carRTL.animate({right: "+=580px"}, 2000, function() {
      carRTL.removeAttr('style'); });

    });
  }
// keypress to move frog div

  function moveFrog () {
    $(document).keydown(function(e) {
      switch (e.which) {
        case 37:
            frog.stop().animate({
                left: '-=15px'
            }); //left arrow key
            break;
        case 38:
            frog.stop().animate({
                top: '-=15px'
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
      alert("game over!");
      // reset pieces

    }
  }

  function collisionCheck(){
    car.each(function(){
      collision($(this), frog);
    });
  }



  });