var colors = Object.values(allColors())

var defaultDNA = {
    "bodyColor" : 26,
    "mouthColor" : 37,
    "eyesColor" : 86,
    "earsColor" : 14,
    //Cattributes
    "eyesShape" : 1,
    "decorationPattern" : 1,
    "decorationMidcolor" : 14,
    "decorationSidescolor" : 20,
    "animation" :  1,
    "lastNum" :  1
    }

   

// when page loads
$( document ).ready(function() {
  $('#dnabody').html(defaultDNA.bodyColor);
  $('#dnamouth').html(defaultDNA.mouthColor);
  $('#dnaeyes').html(defaultDNA.eyesColor);
  $('#dnaears').html(defaultDNA.earsColor);
    
   $('#dnashape').html(defaultDNA.eyesShape)
   $('#dnadecoration').html(defaultDNA.decorationPattern)
   $('#dnadecorationMid').html(defaultDNA.decorationMidcolor)
   $('#dnadecorationSides').html(defaultDNA.decorationSidescolor)
   $('#dnaanimation').html(defaultDNA.animation)
   $('#dnaspecial').html(defaultDNA.lastNum)

  renderCat(defaultDNA)
});


function getDna(){
    var dna = ''
    dna += $('#dnabody').html()
    dna += $('#dnamouth').html()
    dna += $('#dnaeyes').html()
    dna += $('#dnaears').html()
    dna += $('#dnashape').html()
    dna += $('#dnadecoration').html()
    dna += $('#dnadecorationMid').html()
    dna += $('#dnadecorationSides').html()
    dna += $('#dnaanimation').html()
    dna += $('#dnaspecial').html()

    return parseInt(dna)
}

$(document).ready(function(){
  $('#catShapes').hide();
  $("#btn1").on('click', function() {
    //alert("button 1 clicked");
    $('#catColors').show();
    $('#catShapes').hide();
    
    //$('#catShapes').toggle();
  
  });
  
  
  $("#btn2").on("click", function() {
     //alert("button 1 clicked");
    $('#catShapes').show();
    $('#catColors').hide();
    
    
    });
    

})


function renderCat(dna){ // colors, code
    bodyColor(colors[dna.bodyColor], dna.bodyColor)
    $('#bodyColor').val(dna.bodyColor)

    mouthColor(colors[dna.mouthColor], dna.mouthColor)
    $('#mouthColor').val(dna.mouthColor)

    eyesColor(colors[dna.eyesColor], dna.eyesColor)
    $('#eyesColor').val(dna.eyesColor)

    earsColor(colors[dna.earsColor], dna.earsColor)
    $('#earsColor').val(dna.earsColor)

    eyeVariation(dna.eyesShape)
    $('#eyesShape').val(dna.eyesShape)
    //console.log(eyeVariation);

    decorationVariation(dna.decorationPattern) 
    $("#decorationPattern").val(dna.decorationPattern)

    decorationMidColorFunc(colors[dna.decorationMidcolor], dna.decorationMidcolor)
    $('#decorationMidcolor').val(dna.decorationMidcolor)
    console.log(decorationMidColorFunc);

    decorationSidesColorFunc(colors[dna.decorationSidescolor], dna.decorationSidescolor)
    $('#decorationMidcolor').val(dna.decorationSidescolor)
    console.log(decorationSidesColorFunc);

    animationVariation(dna.animation)
    $("#animation").val(dna.animation)
    console.log(animationVariation);  
}


// Changing cat colors with listerners

$('#bodyColor').change(()=>{
    var colorVal = $('#bodyColor').val()
    bodyColor(colors[colorVal],colorVal)
    console.log("bodyColor .val() " + colorVal)
})

$('#mouthColor').change(()=>{
  var colorVal = $('#mouthColor').val()
  mouthColor(colors[colorVal],colorVal)
})

$('#eyesColor').change(()=>{
  var colorVal = $('#eyesColor').val()
  eyesColor(colors[colorVal],colorVal)
})

$('#earsColor').change(()=>{
  var colorVal = $('#earsColor').val()
  earsColor(colors[colorVal],colorVal)
})

$('#decorationMidcolor').change(()=>{
  var colorVal = $('#decorationMidcolor').val() // between 10 and 98
  decorationMidColorFunc(colors[colorVal],colorVal)
  console.log("pattern mid col " + colorVal);
})

$('#decorationSidescolor').change(()=>{
  var colorVal = $('#decorationSidescolor').val() // between 10 and 98
  decorationSidesColorFunc(colors[colorVal],colorVal)
  console.log("pattern sides " + colorVal);
})


// change shapes -- local variables created
$('#eyesShape').change(()=>{
  var shape = parseInt($('#eyesShape').val()) // between 1 and 7
  eyeVariation(shape)
})

$('#decorationPattern').change(()=>{
  var shape = parseInt($('#decorationPattern').val()) // between 1 and 7
  decorationVariation(shape)
})

// animation
$('#animation').change(() =>{
  var animationVal = parseInt($('#animation').val()) //parseInt -- On Switch Statmement: animationVal = string "2", instead of an integer number 2.
  animationVariation(animationVal)
  console.log("anim val " + animationVal);
})


// Randomize and Buttons

$("#button1").on("click", async function(){
  renderCat(defaultDNA);
});

// rand colors

$("#button2").on("click", async function(){
  
  var colorVal = Math.floor(Math.random() * 89) + 10;
  bodyColor(colors[colorVal],colorVal);

  var colorVal = Math.floor(Math.random() * 89) + 10;
  mouthColor(colors[colorVal],colorVal)

  var colorVal = Math.floor(Math.random() * 89) + 10;
  eyesColor(colors[colorVal],colorVal)

  var colorVal = Math.floor(Math.random() * 89) + 10;
  earsColor(colors[colorVal],colorVal)

  var colorVal = Math.floor(Math.random() * 89) + 10;
  decorationMidColorFunc(colors[colorVal],colorVal)

  var colorVal = Math.floor(Math.random() * 89) + 10;
  decorationSidesColorFunc(colors[colorVal],colorVal)

  // rand shapes

  var shape = Math.floor(Math.random() * 8) + 1;
  eyeVariation(shape)

  var shape = Math.floor(Math.random() * 8) + 1;
  decorationVariation(shape)

  var animationVal = Math.floor(Math.random() * 7) + 1;
  animationVariation(animationVal)

})






