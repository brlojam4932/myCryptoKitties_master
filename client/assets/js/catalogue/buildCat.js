// CSS properties to build each cat depending on the DNA

var colors = Object.values(allColors())

//This function code needs to modified so that it works with Your cat code.
function bodyColor(code, id) {
  var color = colors[code]
  $('#cat__head' + id + ', #cat__body' + id + ', #hindLegsShape' + id + ', #frontLegs_left' + id + ', #frontLegs_rt' + id).css('background', '#' + color)  //This changes the color of the cat
  
}

function mouthColor(code, id) {
  var color = colors[code]
  $('#cat__mouth' + id + ', #cat__tail' + id + ', #front_pawsL' + id + ', #front_pawsR' + id).css('background', '#' + color)  //This changes the color of the cat's mouth

}

function eyesColor(code, id) {
  var color = colors[code]
  $('#pupils' + id).css('background', '#' + color)  //This changes the color of the cat's eyes

}

function earsColor(code, id) {
  var color = colors[code]
  $('#earShape' + id).css('background', '#' + color)  //This changes the color of the cat's ears

}

function decorationMidColorFunc(code, id) {
  var color = colors[code]
  $('#patternShapeL2' + id + ', #patternShapeR2' + id).css('background', '#' + color)  //This changes the color of the cat's ears

}

function decorationSidesColorFunc(code, id) {
  var color = colors[code]
  $('#patternShapeL1' + id + ', #patternShapeR1' + id + ', #patternShapeL3' + id + ', #patternShapeR3' + id).css('background', '#' + color)  //This changes the color of the cat's ears

}


// Variation functions for range-bars

// 7 eye types
function eyeVariation(num, id) {

 
  switch (num) {
      case 1:
          normalEyes(id)
          $('#eyeName' + id).html('Basic') // Set the badge to basic, chill, etc.
          break
      case 2:
          normalEyes(id) // reset
          $('#eyeName' + id).html('Chill') // Set the badge to "Chill"
          eyesType1(id) // set border to change shape of the eye element
          break
      case 3:
          normalEyes(id) // reset
          $('#eyeName' + id).html('Chill 2') // Set the badge to "Chill 2"
          eyesType2(id) // set border to change shape of the eye element
          break

      case 4:
          normalEyes(id) // reset
          $('#eyeName' + id).html('Roboto') // Set the badge to "Box eyes"
          eyesType3(id) // set border to change shape of the eye element
          break
      case 5:
          normalEyes(id) // reset
          $('#eyeName' + id).html('Sad') // Set the badge to "Sad face"
          eyesType4(id) // set border to change shape of the eye element
          break
      case 6:
          normalEyes(id) // reset
          $('#eyeName' + id).html('Techy') // Set the badge to "Tech"
          eyesType5(id) // set border to change shape of the eye element
          break
      case 7:
          normalEyes(id) // reset
          $('#eyeName' + id).html('Cat Eyes') // Set the badge to "Tech"
          eyesType6(id) // set border to change shape of the eye element
          break
  }
}

function decorationVariation(num, id) {
  
  switch (num) {
      case 1:
          $('#decorationName' + id).html('Basic')
          normaldecoration(id)
          break
      case 2:
          $('#decorationName' + id).html('Alt Pattern 1')
          altDecoration1(id)
          break
      case 3:
          $('#decorationName' + id).html('Alt Pattern 2')
          altDecoration2(id)
          break
      case 4:
          $('#decorationName' + id).html('Alt Pattern 3')
          altDecoration3(id)
          break
      case 5:
          $('#decorationName' + id).html('Alt Pattern 4')
          altDecoration4(id)
          break
      case 6:
          $('#decorationName' + id).html('Alt Pattern 5')
          altDecoration5(id)
          break
      case 7:
          $('#decorationName' + id).html('Alt Pattern 6')
          altDecoration6(id)
          break

  }
}

//----------------animation--------------------------------------

function animationVariation(num, id) {

  switch (num) {
      case 1:
          $('#animationCode' + id).html('heads Up')
          animationType1(id)
          break
      case 2:
          $('#animationCode' + id).html("basic")
          animationType2(id)
          break
      case 3:
          $('#animationCode' + id).html("head rot")
          animationType3(id)
          break
      case 4:
          $('#animationCode' + id).html("ear rotations")
          animationType4(id)
          break
      case 5:
          $('#animationCode' + id).html("tail rot")
          animationType5(id)
          break
      case 6:
          $('#animationCode' + id).html("mouth move")
          animationType6(id)
          break
  }
}

/** Animations **/

function animationType1(id) {
  resetAnimation(id)
  earsReset(id) 
  $("#head" + id).addClass("headTransY");
}

function animationType2(id) {
  resetAnimation(id)
  earsReset(id) 
  // add any animationclass that you create
}

function animationType3(id) {
  resetAnimation(id)
  earsReset(id) 
  $("#head" + id).addClass("headRot");
  
  // add any animationclass that you create
}

function animationType4(id) {
  resetAnimation(id)
  $("#earL" + id).removeClass("earStaticL");
  $("#earR" + id).removeClass("earStaticR");
  $("#earL" + id).addClass("earRotL");
  $("#earR" + id).addClass("earRotR");
  // add any animationclass that you create
}

function animationType5(id) {
  resetAnimation(id)
  earsReset(id) 
  $("#tail" + id).addClass("tailRot");
  // add any animationclass that you create
}

function animationType6(id) {
  resetAnimation(id)
  $("#mouth" + id).addClass("mouthMove");
}

function resetAnimation(id) {
  $("#head" + id).removeClass("headTransY");
  $("#head" + id).removeClass("headRot");
  $("#earL" + id).removeClass("earRotL");
  $("#earR" + id).removeClass("earRotR");
  $("#tail" + id).removeClass("tailRot");
  $("#mouth" + id).removeClass("mouthMove");
  // add any animationclass that you create   
}

function earsReset(id) {
  $("#earL" + id).addClass("earStaticL");
  $("#earR" + id).addClass("earStaticR");
}

//----------------eyes variations-----------------------------

function normalEyes(id) {
   $('#cat__eye' + id).find('span').css({"border": "none", "border-radius": "50px", "width": "28px", "height": "28px", "left": "7px"})
}

function eyesType1(id) {
   $('#cat__eye' + id).find('span').css('border-top', '15px solid', )

}

function eyesType2(id) {
   $('#cat__eye' + id).find('span').css('border-bottom', '15px solid')
}

function eyesType3(id) {
   $('#cat__eye' + id).find('span').css('border-radius', '10px')
}

function eyesType4(id) {
   $('#cat__eye' + id).find('span').css('height', '40px')
}

function eyesType5(id) {
   $('#cat__eye' + id).find('span').css('height', '20px')
}

function eyesType6(id) {
   $('#cat__eye' + id).find('span').css({'width': '10px', 'height': '35px', "left": "14px"})
}

// **   Decoration **  //

// ** Angles ** //

function normaldecoration(id) {
  //Remove all style from other decorations
  //In this way we can also use normalDecoration() to reset the decoration style
  //-------left--------------
  $('#patternShapeL1' + id).css({ "transform": "rotate(47deg)", "height": "16px", "width": "41px", "position": "absolute", "top": "24px", "left": "20px", "border-radius": "5% 70% 70% 5%", "background": "rgb(122, 190, 31)"})
  $('#patternShapeL2' + id).css({ "transform": "rotate(47deg)", "height": "16px", "width": "41px", "position": "absolute", "top": "55px", "left": "2px", "border-radius": "5% 70% 70% 5%"})
  $('$patternShapeL3' + id).css({ "transform": "rotate(15deg)", "height": "13px", "width": "34px", "position": "absolute", "top": "95px", "left": "2px", "border-radius": "5% 70% 70% 5%"})

  //-------right--------------
  $('#patternShapeR1' + id).css({ "transform": "rotate(47deg)", "height": "16px", "width": "41px", "position": "absolute", "top": "24px", "left": "20px", "border-radius": "5% 70% 70% 5%"})
  $('#patternShapeR2' + id).css({ "transform": "rotate(47deg)", "height": "16px", "width": "41px", "position": "absolute", "top": "55px", "left": "2px", "border-radius": "5% 70% 70% 5%"})
  $('#patternShapeR3' + id).css({ "transform": "rotate(15deg)", "height": "13px", "width": "34px", "position": "absolute", "top": "95px", "left": "2px", "border-radius": "5% 70% 70% 5%"})
}

function altDecoration1(id) {
  //Remove all style from other decorations
  //In this way we can also use normalDecoration() to reset the decoration style
  //-------left--------------
  $('#patternShapeL1' + id).css({ "transform": "rotate(45deg)", "height": "20px", "width": "20px", "position": "absolute", "top": "31px", "left": "28px", "border-radius": "20%"})
  $('#patternShapeL2' + id).css({ "transform": "rotate(0deg)", "height": "36px", "width": "36px", "position": "absolute", "top": "55px", "left": "2px", "border-radius": "20%" })
  $('#patternShapeL3' + id).css({ "transform": "rotate(88deg)", "height": "20px", "width": "20px", "position": "absolute", "top": "96px", "left": "20px", "border-radius": "20%"})

   //-------right--------------
   $('#patternShapeR1' + id).css({ "transform": "rotate(-23deg)", "height": "30px", "width": "30px", "position": "absolute", "top": "17px", "left": "43px", "border-radius": "20%"})
   $('#patternShapeR2' + id).css({ "transform": "rotate(15deg)", "height": "25px", "width": "7px", "position": "absolute", "top": "95px", "left": "2px", "border-radius": "20%"})
   $('#patternShapeR3' + id).css({ "transform": "rotate(47deg)", "height": "60px", "width": "60px", "position": "absolute", "top": "166px", "left": "-47px", "border-radius": "20%"})
  

}

function altDecoration2(id) {
  //Remove all style from other decorations
  //In this way we can also use normalDecoration() to reset the decoration style
  //-------left--------------
  $('#patternShapeL1' + id).css({ "transform": "rotate(45deg)", "height": "9px", "width": "30px", "position": "absolute", "top": "31px", "left": "28px", "border-radius": "5% 70% 70% 5%"})
  $('#patternShapeL2' + id).css({ "transform": "rotate(0deg)", "height": "36px", "width": "23px", "position": "absolute", "top": "55px", "left": "2px", "border-radius": "5% 70% 70% 5%"})
  $('#patternShapeL3' + id).css({ "transform": "rotate(15deg)", "height": "9px", "width": "51px", "position": "absolute", "top": "56px", "left": "2px", "border-radius": "5% 70% 70% 5%"})

   //-------right--------------
   $('#patternShapeR1' + id).css({ "transform": "rotate(-23deg)", "height": "30px", "width": "30px", "position": "absolute", "top": "17px", "left": "43px", "border-radius": "5% 70% 70% 5%"})
   $('#patternShapeR2' + id).css({ "transform": "rotate(15deg)", "height": "9px", "width": "23px", "position": "absolute", "top": "95px", "left": "2px", "border-radius": "5% 70% 70% 5%"})
   $('#patternShapeR3' + id).css({ "transform": "rotate(15deg)", "height": "9px", "width": "51px", "position": "absolute", "top": "58px", "left": "0px", "border-radius": "5% 70% 70% 5%"})

}

// ** Parterns **//
// Unifrom partern
function altDecoration3(id) {
  //Remove all style from other decorations
  //In this way we can also use normalDecoration() to reset the decoration style
  //-------left--------------
  $('#patternShapeL1' + id).css({ "transform": "rotate(70deg)", "height": "14px", "width": "42px", "position": "absolute", "top": "31px", "left": "28px", "border-radius": "5% 70% 70% 5%"})
  $('#patternShapeL2' + id).css({ "transform": "rotate(0deg)", "height": "36px", "width": "28px", "position": "absolute", "top": "55px", "left": "3px", "border-radius": "5% 70% 70% 5%"})
  $('#patternShapeL3' + id).css({ "transform": "rotate(15deg)", "height": "14px", "width": "31px", "position": "absolute", "top": "180px", "left": "2px", "border-radius": "5% 70% 70% 5%"})

   //-------right--------------
   $('#patternShapeR1' + id).css({ "transform": "rotate(-23deg)", "height": "30px", "width": "42px", "position": "absolute", "top": "17px", "left": "43px", "border-radius": "5% 70% 70% 5%"})
   $('#patternShapeR2' + id).css({ "transform": "rotate(15deg)", "height": "9px", "width": "28px", "position": "absolute", "top": "95px", "left": "2px", "border-radius": "5% 70% 70% 5%"})
   $('#patternShapeR3' + id).css({ "transform": "rotate(15deg)", "height": "14px", "width": "31px", "position": "absolute", "top": "180px", "left": "0px", "border-radius": "5% 70% 70% 5%"})
}

 function altDecoration4(id) {
  //Remove all style from other decorations
  //In this way we can also use normalDecoration() to reset the decoration style
  //-------left--------------
  $('#patternShapeL1' + id).css({ "transform": "rotate(125deg)", "height": "57px", "width": "42px", "position": "absolute", "top": "31px", "left": "28px",  "border-radius": "0% 0% 0% 0%"})
  $('#patternShapeL2' + id).css({ "transform": "rotate(0deg)", "height": "36px",  "width": "23px", "position": "absolute", "top": "55px", "left": "3px", "border-radius": "5% 70% 70% 5%"})
  $('#patternShapeL3' + id).css({ "transform": "rotate(15deg)", "height": "14px",  "width": "36px", "position": "absolute", "top": "180px", "left": "2px",  "border-radius": "5% 70% 70% 5%"})

   //-------right--------------
   $('#patternShapeR1' + id).css({ "transform": "rotate(-23deg)", "height": "30px", "width": "30px", "position": "absolute", "top": "17px", "left": "43px", "border-radius": "50% 50% 50% 50%"})
   $('#patternShapeR2' + id).css({ "transform": "rotate(15deg)", "height": "9px", "width": "23px", "position": "absolute", "top": "95px", "left": "2px",  "border-radius": "5% 70% 70% 5%"})
   $('#patternShapeR3' + id).css({ "transform": "rotate(15deg)", "height": "20px", "width": "20px", "position": "absolute",  "top": "180px", "left": "0px","border-radius": "50% 50% 50% 50%"})
}

function altDecoration5(id) {
  //Remove all style from other decorations
  //In this way we can also use normalDecoration() to reset the decoration style
  //-------left--------------
  $('#patternShapeL1' + id).css({ "transform": "rotate(47deg)", "height": "16px", "width": "41px", "position": "absolute", "top": "24px", "left": "20px", "border-radius": "5% 70% 70% 5%", "background": "rgb(122, 190, 31)"})
  $('#patternShapeL2' + id).css({ "transform": "rotate(200deg)", "height": "43px", "width": "51px", "position": "absolute", "top": "40px", "left": "2px", "border-radius": "13% 62% 28% 94%"})
  $('#patternShapeL3' + id).css({ "transform": "rotate(15deg)", "height": "25px", "width": "51px", "position": "absolute", "top": "95px", "left": "2px", "border-radius": "13% 62% 7% 94%"})

   //-------right--------------
   $('#patternShapeR1' + id).css({ "transform": "rotate(-46deg)", "height": "24px", "width": "22px", "position": "absolute", "top": "80px", "left": "1px", "border-radius": "13% 62% 7% 94%"})
   $('#patternShapeR2' + id).css({ "transform": "rotate(47deg)", "height": "31px", "width": "53px", "position": "absolute", "top": "114px", "left": "-16px", "border-radius": "13% 62% 7% 94%"})
   $('#patternShapeR3' + id).css({ "transform": "rotate(47deg)", "height": "60px", "width": "60px", "position": "absolute", "top": "166px", "left": "-47px", "border-radius": "20%"})
}

function altDecoration6(id) {
  //Remove all style from other decorations
  //In this way we can also use normalDecoration() to reset the decoration style
  //-------left--------------
  $('#patternShapeL1' + id).css({ "transform": "rotate(75deg)", "height": "24px", "width": "22px", "position": "absolute", "top": "137px", "left": "15px", "border-radius": "50% 50% 7% 50%"})
  $('#patternShapeL2' + id).css({ "transform": "rotate(286deg)", "height": "28px", "width": "36px", "position": "absolute", "top": "27px", "left": "10px", "border-radius": "50% 50% 7% 50%"})
  $('#patternShapeL3' + id).css({ "transform": "rotate(15deg)", "height": "27px", "width": "51px", "position": "absolute", "top": "95px", "left": "2px", "border-radius": "50% 50% 50% 50%"})

   //-------right--------------
   $('#patternShapeR1' + id).css({ "transform": "rotate(-84deg)", "height": "20px", "width": "20px", "position": "absolute", "top": "64px", "left": "9px", "border-radius": "50% 50% 7% 50%"})
   $('#patternShapeR2' + id).css({ "transform": "rotate(47deg)", "height": "16px", "width": "41px", "position": "absolute", "top": "55px", "left": "2px", "border-radius": "5% 70% 70% 5%"})
   $('#patternShapeR3' + id).css({ "transform": "rotate(15deg)", "height": "23px", "width": "51px", "position": "absolute", "top": "175px", "left": "-3px", "border-radius": "50% 50% 7% 50%"})
}


