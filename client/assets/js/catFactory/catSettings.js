
var colors = Object.values(allColors())

var defaultDNA = { 
    "headColor" : 10,
    "mouthColor" : 13,
    "eyesColor" : 96,
    "earsColor" : 10,
    //Cattributes
    "eyesShape" : 1,
    "decorationPattern" : 1,
    "decorationMidcolor" : 13,
    "decorationSidescolor" : 13,
    "animation" :  1,
    "lastNum" :  1
    }

// when page load
$( document ).ready(function() {
    $('#dnabody').html(defaultDNA.headColor);
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

function defaultCat(){
    renderCat(defaultDNA)
}


function randomDNA(){
    var dnaStr = String(Math.floor(Math.random()*1E16))
    //Colors
    var dna = { 
    "headColor" : dnaStr.substring(0, 2),
    "mouthColor" : dnaStr.substring(2, 4),
    "eyesColor" : dnaStr.substring(4, 6),
    "earsColor" : dnaStr.substring(6, 8),
    //Cattributes
    "eyesShape" : dnaStr.substring(8,9) % 8 + 1,
    "decorationPattern" : dnaStr.substring(9, 10)  % 8 + 1,
    "decorationMidcolor" : dnaStr.substring(10, 12),
    "decorationSidescolor" : dnaStr.substring(12, 14),
    "animation" :  dnaStr.substring(14, 15) % 6 + 1,
    "lastNum" :  dnaStr.substring(15, 16)
    }
    return dna
}


//Random cat DNA
function randomCat(){
 var dna = randomDNA()   
    //Rendering Cat
   renderCat(dna)
}

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
    dna += $('#dnadanimation').html()
    dna += $('#dnaspecial').html()

    return parseInt(dna)
}

function renderCat(dna){
    headColor(colors[dna.headColor],dna.headColor)
    $('#bodycolor').val(dna.headColor)
    mouthAndBelly(colors[dna.mouthColor],dna.mouthColor)      
    $('#mouthcolor').val(dna.mouthColor)
    eyeColor(colors[dna.eyesColor],dna.eyesColor)   
    $('#eyecolor').val(dna.eyesColor)
    earsAndPaw(colors[dna.earsColor],dna.earsColor)
    $('#earcolor').val(dna.earsColor)
    eyeVariation(dna.eyesShape)
    $('#shape').val(dna.eyesShape)
    decorationVariation(dna.decorationPattern)
    $('#decoration').val(dna.decorationPattern)
    midColor(colors[dna.decorationMidcolor],dna.decorationMidcolor)   
    $('#decorationmiddle').val(dna.decorationMidcolor)
    SidesColor(colors[dna.decorationSidescolor],dna.decorationSidescolor)
    $('#decorationsides').val(dna.decorationSidescolor)
    animationVariation(dna.animation)
    $('#animation').val(dna.animation)
    $('#dnaspecial').html(dna.lastNum)
}



// Changing cat colors
$('#bodycolor').change(()=>{
    var colorVal = $('#bodycolor').val()
    headColor(colors[colorVal],colorVal)    
    console.log('bodyColor value ' + colorVal )
})

$('#mouthcolor').change(()=>{
    var colorVal = $('#mouthcolor').val()
    mouthAndBelly(colors[colorVal],colorVal)  
})

$('#eyecolor').change(()=>{
    var colorVal = $('#eyecolor').val()
    eyeColor(colors[colorVal],colorVal)   
})

$('#earcolor').change(()=>{
    var colorVal = $('#earcolor').val()
    earsAndPaw(colors[colorVal],colorVal) 
})

// Changing Cattributes

// Eyes shape

$('#shape').change(()=>{
    var shape = parseInt($('#shape').val())    
    eyeVariation(shape)   
})

// Decoration

$('#decoration').change(()=>{
    var decoration = parseInt($('#decoration').val())    
    decorationVariation(decoration)
    
})

// Decoration colors

// Middle color

$('#decorationmiddle').change(()=>{
    var colorVal = $('#decorationmiddle').val()
    midColor(colors[colorVal],colorVal)   
})


// Sides color

$('#decorationsides').change(()=>{
    var colorVal = $('#decorationsides').val()
    SidesColor(colors[colorVal],colorVal)
})

// Animations 

$('#animation').change(()=>{
    var animation = parseInt($('#animation').val())    
    animationVariation(animation)  
    console.log("animation value " + animation)  
})

// rand colors
/*
$("#button2").on("click", async function(){
  
    var colorVal = Math.floor(Math.random() * 89) + 10;
    headColor(colors[colorVal],colorVal);
  
    var colorVal = Math.floor(Math.random() * 89) + 10;
    mouthColor(colors[colorVal],colorVal)
  
    var colorVal = Math.floor(Math.random() * 89) + 10;
    eyesColor(colors[colorVal],colorVal)
  
    var colorVal = Math.floor(Math.random() * 89) + 10;
    earsColor(colors[colorVal],colorVal)
  
    var colorVal = Math.floor(Math.random() * 89) + 10;
    decorationMidColor(colors[colorVal],colorVal)
  
    var colorVal = Math.floor(Math.random() * 89) + 10;
    decorationSidesColor(colors[colorVal],colorVal)
  
    // rand shapes
  
    var shape = Math.floor(Math.random() * 8) + 1;
    eyeVariation(shape)
  
    var shape = Math.floor(Math.random() * 8) + 1;
    decorationVariation(shape)
  
    var animationVal = Math.floor(Math.random() * 7) + 1;
    animationVariation(animationVal)
  
  })
  */

//Showing Colors and Cattribute Boxes

function showColors(){
    $('#catColors').removeClass('hidden')
    $('#cattributes').addClass('hidden')
}

function showCattributes(){
    $('#cattributes').removeClass('hidden')
    $('#catColors').addClass('hidden')
}