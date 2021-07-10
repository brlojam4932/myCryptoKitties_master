//Random color

/*
function getColor() {
    var randomColor = Math.floor(Math.random() * 16777215).toString(16);
    return randomColor
}


function genColors(){
    var colors = []
    for(var i = 10; i < 99; i ++){
      var color = getColor() // getColor
      colors[i] = color
    }
    return colors
}
*/

// Random cat attributes from 10 - 99 ----it's like makimg the slider generate random numbers
/*
function getRandCol() {
    var randomId = Math.floor(Math.random() * 89) + 10;
    return randomId;
}
*/


//This function code needs to modified so that it works with Your cat code.
function bodyColor(color, code) {
    $('.cat__head, .cat__body, .hindLegsShape, .frontLegs_left, .frontLegs_rt').css('background', '#' + color)  //This changes the color of the cat
    $('#headcode').html('code: ' + code) //This updates text of the badge next to the slider
    $('#dnabody').html(code) //This updates the body color part of the DNA that is displayed below the cat
    
}

function mouthColor(color,code) {
    $('.cat__mouth, .cat__tail, .front_pawsL, .front_pawsR').css('background', '#' + color)  //This changes the color of the cat's mouth
    $('#mouthcode').html('code: ' + code) //This updates text of the badge next to the slider
    $('#dnamouth').html(code) //This updates the body color part of the DNA that is displayed below the cat
}

function eyesColor(color,code) {
    $('.pupils').css('background', '#' + color)  //This changes the color of the cat's eyes
    $('#eyescode').html('code: ' + code) //This updates text of the badge next to the slider
    $('#dnaeyes').html(code) //This updates the body color part of the DNA that is displayed below the cat
}

function earsColor(color,code) {
    $('.earShape').css('background', '#' + color)  //This changes the color of the cat's ears
    $('#earscode').html('code: ' + code) //This updates text of the badge next to the slider
    $('#dnaears').html(code) //This updates the body color part of the DNA that is displayed below the cat
}

function decorationMidColorFunc(color,code) {
    $('.patternShapeL2, .patternShapeR2').css('background', '#' + color)  //This changes the color of the cat's ears
    $('#decoMidColcode').html('code: ' + code) //This updates text of the badge next to the slider
    $('#dnadecorationMid').html(code) //This updates the body color part of the DNA that is displayed below the cat
}

function decorationSidesColorFunc(color,code) {
    $('.patternShapeL1, .patternShapeR1, .patternShapeL3, .patternShapeR3').css('background', '#' + color)  //This changes the color of the cat's ears
    $('#decoSideColcode').html('code: ' + code) //This updates text of the badge next to the slider
    $('#dnadecorationSides').html(code) //This updates the body color part of the DNA that is displayed below the cat
}


//###################################################
//Functions below will be used later on in the project
//###################################################
function eyeVariation(num) {

    $('#dnashape').html(num)
    switch (num) {
        case 1:
            normalEyes()
            $('#eyeName').html('Basic') // Set the badge to basic, chill, etc.
            break
        case 2:
            normalEyes() // reset
            $('#eyeName').html('Chill') // Set the badge to "Chill"
            eyesType1() // set border to change shape of the eye element
            break
        case 3:
            normalEyes() // reset
            $('#eyeName').html('Chill 2') // Set the badge to "Chill 2"
            eyesType2() // set border to change shape of the eye element
            break

        case 4:
            normalEyes() // reset
            $('#eyeName').html('Roboto') // Set the badge to "Box eyes"
            eyesType3() // set border to change shape of the eye element
            break
        case 5:
            normalEyes() // reset
            $('#eyeName').html('Sad') // Set the badge to "Sad face"
            eyesType4() // set border to change shape of the eye element
            break
        case 6:
            normalEyes() // reset
            $('#eyeName').html('Techy') // Set the badge to "Tech"
            eyesType5() // set border to change shape of the eye element
            break
        case 7:
            normalEyes() // reset
            $('#eyeName').html('Cat Eyes') // Set the badge to "Tech"
            eyesType6() // set border to change shape of the eye element
            break

            default:
                console.log("Not 1, 2, 3, 4, 5, 6 or 7")
                break
    }
}

function decorationVariation(num) {
    $('#dnadecoration').html(num)
    switch (num) {
        case 1:
            $('#decorationName').html('Basic')
            normaldecoration()
            break
        case 2:
            $('#decorationName').html('Alt Pattern 1')
            altDecoration1()
            break
        case 3:
            $('#decorationName').html('Alt Pattern 2')
            altDecoration2()
            break
        case 4:
            $('#decorationName').html('Alt Pattern 3')
            altDecoration3()
            break
        case 5:
            $('#decorationName').html('Alt Pattern 4')
            altDecoration4()
            break
        case 6:
            $('#decorationName').html('Alt Pattern 5')
            altDecoration5()
            break
        case 7:
            $('#decorationName').html('Alt Pattern 6')
            altDecoration6()
            break

            default:
                break
    }
}

//----------------animation--------------------------------------

function animationVariation(num) {
    $('#dnaanimation').html(num)
    switch (num) {
        case 1:
            $('#animationCode').html('heads Up')
            animationType1()
            break
        case 2:
            $('#animationCode').html("basic")
            animationType2()
            break
        case 3:
            $('#animationCode').html("head rot")
            animationType3()
            break
        case 4:
            $('#animationCode').html("ear rotations")
            animationType4()
            break
        case 5:
            $('#animationCode').html("tail rot")
            animationType5()
            break
        case 6:
            $('#animationCode').html("mouth move")
            animationType6()
            break

            default:
                break
    }
}


function animationType1() {
    resetAnimation()
    earsReset() 
    $("#head").addClass("headTransY");
}

function animationType2() {
    resetAnimation()
    earsReset() 
    // add any animationclass that you create
}

function animationType3() {
    resetAnimation()
    earsReset() 
    $("#head").addClass("headRot");
    
    // add any animationclass that you create
}

function animationType4() {
    resetAnimation()
    $("#earL").removeClass("earStaticL");
    $("#earR").removeClass("earStaticR");
    $("#earL").addClass("earRotL");
    $("#earR").addClass("earRotR");
    // add any animationclass that you create
}

function animationType5() {
    resetAnimation()
    earsReset() 
    $("#tail").addClass("tailRot");
    // add any animationclass that you create
}

function animationType6() {
    resetAnimation()
    $("#mouth").addClass("mouthMove");
}

function resetAnimation() {
    $("#head").removeClass("headTransY");
    $("#head").removeClass("headRot");
    $("#earL").removeClass("earRotL");
    $("#earR").removeClass("earRotR");
    $("#tail").removeClass("tailRot");
    $("#mouth").removeClass("mouthMove");
    // add any animationclass that you create   
}

function earsReset() {
    $("#earL").addClass("earStaticL");
    $("#earR").addClass("earStaticR");
}

//----------------eyes variations-----------------------------

async function normalEyes() {
    await $('.cat__eye').find('span').css({"border": "none", "border-radius": "50px", "width": "28px", "height": "28px", "left": "7px"})
}

async function eyesType1() {
    await $('.cat__eye').find('span').css('border-top', '15px solid', )
  
}

async function eyesType2() {
    await $('.cat__eye').find('span').css('border-bottom', '15px solid')
}

async function eyesType3() {
    await $('.cat__eye').find('span').css('border-radius', '10px')
}

async function eyesType4() {
    await $('.cat__eye').find('span').css('height', '40px')
}

async function eyesType5() {
    await $('.cat__eye').find('span').css('height', '20px')
}

async function eyesType6() {
    await $('.cat__eye').find('span').css({'width': '10px', 'height': '35px', "left": "14px"})
}


async function normaldecoration() {
    //Remove all style from other decorations
    //In this way we can also use normalDecoration() to reset the decoration style
    //-------left--------------
    $('.patternShapeL1').css({ "transform": "rotate(47deg)", "height": "16px", "width": "41px", "position": "absolute", "top": "24px", "left": "20px", "border-radius": "5% 70% 70% 5%", "background": "rgb(122, 190, 31)"})
    $('.patternShapeL2').css({ "transform": "rotate(47deg)", "height": "16px", "width": "41px", "position": "absolute", "top": "55px", "left": "2px", "border-radius": "5% 70% 70% 5%"})
    $('.patternShapeL3').css({ "transform": "rotate(15deg)", "height": "13px", "width": "34px", "position": "absolute", "top": "95px", "left": "2px", "border-radius": "5% 70% 70% 5%"})

    //-------right--------------
    $('.patternShapeR1').css({ "transform": "rotate(47deg)", "height": "16px", "width": "41px", "position": "absolute", "top": "24px", "left": "20px", "border-radius": "5% 70% 70% 5%"})
    $('.patternShapeR2').css({ "transform": "rotate(47deg)", "height": "16px", "width": "41px", "position": "absolute", "top": "55px", "left": "2px", "border-radius": "5% 70% 70% 5%"})
    $('.patternShapeR3').css({ "transform": "rotate(15deg)", "height": "13px", "width": "34px", "position": "absolute", "top": "95px", "left": "2px", "border-radius": "5% 70% 70% 5%"})
 
}

async function altDecoration1() {
    //Remove all style from other decorations
    //In this way we can also use normalDecoration() to reset the decoration style
    //-------left--------------
    $('.patternShapeL1').css({ "transform": "rotate(45deg)", "height": "20px", "width": "20px", "position": "absolute", "top": "31px", "left": "28px", "border-radius": "20%"})
    $('.patternShapeL2').css({ "transform": "rotate(0deg)", "height": "36px", "width": "36px", "position": "absolute", "top": "55px", "left": "2px", "border-radius": "20%" })
    $('.patternShapeL3').css({ "transform": "rotate(88deg)", "height": "20px", "width": "20px", "position": "absolute", "top": "96px", "left": "20px", "border-radius": "20%"})

     //-------right--------------
     $('.patternShapeR1').css({ "transform": "rotate(-23deg)", "height": "30px", "width": "30px", "position": "absolute", "top": "17px", "left": "43px", "border-radius": "20%"})
     $('.patternShapeR2').css({ "transform": "rotate(15deg)", "height": "25px", "width": "7px", "position": "absolute", "top": "95px", "left": "2px", "border-radius": "20%"})
     $('.patternShapeR3').css({ "transform": "rotate(47deg)", "height": "60px", "width": "60px", "position": "absolute", "top": "166px", "left": "-47px", "border-radius": "20%"})
    

}

async function altDecoration2() {
    //Remove all style from other decorations
    //In this way we can also use normalDecoration() to reset the decoration style
    //-------left--------------
    $('.patternShapeL1').css({ "transform": "rotate(45deg)", "height": "9px", "width": "30px", "position": "absolute", "top": "31px", "left": "28px", "border-radius": "5% 70% 70% 5%"})
    $('.patternShapeL2').css({ "transform": "rotate(0deg)", "height": "36px", "width": "23px", "position": "absolute", "top": "55px", "left": "2px", "border-radius": "5% 70% 70% 5%"})
    $('.patternShapeL3').css({ "transform": "rotate(15deg)", "height": "9px", "width": "51px", "position": "absolute", "top": "56px", "left": "2px", "border-radius": "5% 70% 70% 5%"})

     //-------right--------------
     $('.patternShapeR1').css({ "transform": "rotate(-23deg)", "height": "30px", "width": "30px", "position": "absolute", "top": "17px", "left": "43px", "border-radius": "5% 70% 70% 5%"})
     $('.patternShapeR2').css({ "transform": "rotate(15deg)", "height": "9px", "width": "23px", "position": "absolute", "top": "95px", "left": "2px", "border-radius": "5% 70% 70% 5%"})
     $('.patternShapeR3').css({ "transform": "rotate(15deg)", "height": "9px", "width": "51px", "position": "absolute", "top": "58px", "left": "0px", "border-radius": "5% 70% 70% 5%"})

}

async function altDecoration3() {
    //Remove all style from other decorations
    //In this way we can also use normalDecoration() to reset the decoration style
    //-------left--------------
    $('.patternShapeL1').css({ "transform": "rotate(70deg)", "height": "14px", "width": "42px", "position": "absolute", "top": "31px", "left": "28px", "border-radius": "5% 70% 70% 5%"})
    $('.patternShapeL2').css({ "transform": "rotate(0deg)", "height": "36px", "width": "28px", "position": "absolute", "top": "55px", "left": "3px", "border-radius": "5% 70% 70% 5%"})
    $('.patternShapeL3').css({ "transform": "rotate(15deg)", "height": "14px", "width": "31px", "position": "absolute", "top": "180px", "left": "2px", "border-radius": "5% 70% 70% 5%"})

     //-------right--------------
     $('.patternShapeR1').css({ "transform": "rotate(-23deg)", "height": "30px", "width": "42px", "position": "absolute", "top": "17px", "left": "43px", "border-radius": "5% 70% 70% 5%"})
     $('.patternShapeR2').css({ "transform": "rotate(15deg)", "height": "9px", "width": "28px", "position": "absolute", "top": "95px", "left": "2px", "border-radius": "5% 70% 70% 5%"})
     $('.patternShapeR3').css({ "transform": "rotate(15deg)", "height": "14px", "width": "31px", "position": "absolute", "top": "180px", "left": "0px", "border-radius": "5% 70% 70% 5%"})
}

async function altDecoration4() {
    //Remove all style from other decorations
    //In this way we can also use normalDecoration() to reset the decoration style
    //-------left--------------
    $('.patternShapeL1').css({ "transform": "rotate(125deg)", "height": "57px", "width": "42px", "position": "absolute", "top": "31px", "left": "28px",  "border-radius": "0% 0% 0% 0%"})
    $('.patternShapeL2').css({ "transform": "rotate(0deg)", "height": "36px",  "width": "23px", "position": "absolute", "top": "55px", "left": "3px", "border-radius": "5% 70% 70% 5%"})
    $('.patternShapeL3').css({ "transform": "rotate(15deg)", "height": "14px",  "width": "36px", "position": "absolute", "top": "180px", "left": "2px",  "border-radius": "5% 70% 70% 5%"})

     //-------right--------------
     $('.patternShapeR1').css({ "transform": "rotate(-23deg)", "height": "30px", "width": "30px", "position": "absolute", "top": "17px", "left": "43px", "border-radius": "50% 50% 50% 50%"})
     $('.patternShapeR2').css({ "transform": "rotate(15deg)", "height": "9px", "width": "23px", "position": "absolute", "top": "95px", "left": "2px",  "border-radius": "5% 70% 70% 5%"})
     $('.patternShapeR3').css({ "transform": "rotate(15deg)", "height": "20px", "width": "20px", "position": "absolute",  "top": "180px", "left": "0px","border-radius": "50% 50% 50% 50%"})
}

async function altDecoration5() {
    //Remove all style from other decorations
    //In this way we can also use normalDecoration() to reset the decoration style
    //-------left--------------
    $('.patternShapeL1').css({ "transform": "rotate(47deg)", "height": "16px", "width": "41px", "position": "absolute", "top": "24px", "left": "20px", "border-radius": "5% 70% 70% 5%", "background": "rgb(122, 190, 31)"})
    $('.patternShapeL2').css({ "transform": "rotate(200deg)", "height": "43px", "width": "51px", "position": "absolute", "top": "40px", "left": "2px", "border-radius": "13% 62% 28% 94%"})
    $('.patternShapeL3').css({ "transform": "rotate(15deg)", "height": "25px", "width": "51px", "position": "absolute", "top": "95px", "left": "2px", "border-radius": "13% 62% 7% 94%"})

     //-------right--------------
     $('.patternShapeR1').css({ "transform": "rotate(-46deg)", "height": "24px", "width": "22px", "position": "absolute", "top": "80px", "left": "1px", "border-radius": "13% 62% 7% 94%"})
     $('.patternShapeR2').css({ "transform": "rotate(47deg)", "height": "31px", "width": "53px", "position": "absolute", "top": "114px", "left": "-16px", "border-radius": "13% 62% 7% 94%"})
     $('.patternShapeR3').css({ "transform": "rotate(47deg)", "height": "60px", "width": "60px", "position": "absolute", "top": "166px", "left": "-47px", "border-radius": "20%"})
}

async function altDecoration6() {
    //Remove all style from other decorations
    //In this way we can also use normalDecoration() to reset the decoration style
    //-------left--------------
    $('.patternShapeL1').css({ "transform": "rotate(75deg)", "height": "24px", "width": "22px", "position": "absolute", "top": "137px", "left": "15px", "border-radius": "50% 50% 7% 50%"})
    $('.patternShapeL2').css({ "transform": "rotate(286deg)", "height": "28px", "width": "36px", "position": "absolute", "top": "27px", "left": "10px", "border-radius": "50% 50% 7% 50%"})
    $('.patternShapeL3').css({ "transform": "rotate(15deg)", "height": "27px", "width": "51px", "position": "absolute", "top": "95px", "left": "2px", "border-radius": "50% 50% 50% 50%"})

     //-------right--------------
     $('.patternShapeR1').css({ "transform": "rotate(-84deg)", "height": "20px", "width": "20px", "position": "absolute", "top": "64px", "left": "9px", "border-radius": "50% 50% 7% 50%"})
     $('.patternShapeR2').css({ "transform": "rotate(47deg)", "height": "16px", "width": "41px", "position": "absolute", "top": "55px", "left": "2px", "border-radius": "5% 70% 70% 5%"})
     $('.patternShapeR3').css({ "transform": "rotate(15deg)", "height": "23px", "width": "51px", "position": "absolute", "top": "175px", "left": "-3px", "border-radius": "50% 50% 7% 50%"})
}


