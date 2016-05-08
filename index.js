// make car div move across screen horizontally left/ right
// when car hits right side, make disappear
// put on loop so that cars continuously move across

$(function(){

  var car = $('.car');
  var carleft = $('.carleft');
  var frog = $('#frog');

  function play(){

    //carLoop();
    //moveFrog();
    //collision();
  }

  // function createCar(){

  //   $("#tester").append('<div id="testcar"></div>');

  // }

  // createCar();

  function carLoop() {
  $("#start").click(function() {

    car.animate({left: "+=580px"}, 1300, function() {
    car.removeAttr('style'); });

  });

  }

  function carLoop2() {
  $("#start").click(function() {

    carleft.animate({right: "+=580px"}, 1300, function() {
    carleft.removeAttr('style'); });

  });

  }

  setInterval(carLoop, 500);
  setInterval(carLoop2, 500);

// keypress to move frog div

  function moveFrog () {
    $(document).keydown(function(e) {
        switch (e.which) {
        case 37:
            $(frog).stop().animate({
                left: '-=15'
            }); //left arrow key
            break;
        case 38:
            $(frog).stop().animate({
                top: '-=15'
            }); //up arrow key
            break;
        case 39:
            $(frog).stop().animate({
                left: '+=15'
            }); //right arrow key
            break;
        case 40:
            $(frog).stop().animate({
                top: '+=15'
            }); //bottom arrow key
            break;
        }
    });

  }

  moveFrog();

  // look for collision

  // function collision(car, frog) {

  //     var carLeft = car.position().left;
  //     console.log(carLeft);
  //     var carTop = car.position().top;
  //     console.log(carTop);
  //     var carHeight = car.outerHeight();
  //     console.log(carHeight);
  //     var carWidth = car.outerWidth();
  //     console.log(carWidth);
  //     var carBottom = carTop + carWidth;
  //     console.log(carBottom);
  //     var carRight = carLeft + carWidth;
  //     console.log(carRight);
  //     var frogLeft = frog.position().left;
  //     console.log(frogLeft);
  //     var frogTop = frog.position().top;
  //     console.log(frogTop);
  //     var frogHeight = frog.outerHeight();
  //     console.log(frogHeight);
  //     var frogWidth = frog.outerWidth();
  //     console.log(frogWidth);
  //     var frogBottom = frogTop + frogHeight;
  //     console.log(frogBottom);
  //     var frogRight =  frogLeft+ frogWidth;
  //     console.log(frogRight);

  //     // if (x1 < y2 || y1 > z2 || r1 < x2 || x1 > r2){ 
  //     //   console.log(false);
  //     //   return false;
  //     // }else{
  //     //       console.log(true);
  //     //       return true;
  //     //     }

  //       if (((frogRight > carLeft) && (frogBottom < carTop)) ||
  //          ((frogBottom > carTop) && ( frogLeft < carRight)) || 
  //          ((carRight > x1) && (y2 < y1)) || 
  //          ((x2<r1) && (y2 < z1)) )
  //         {

        //   console.log(true);
        // } else {
        //   console.log(false);
        // }
      // if ((x2 < r1 || r2 < x1) && (z2 === z1)) { 
      //   console.log(true);
      // } else {
      // console.log(false);
      // }
    }

  collision(car, frog);

  // setInterval(function() {collision($("#target"), $("#frog"))}, 300);

    









  });