// CSS properties to build each cat depending on the DNA

var colors = Object.values(allColors())

function headColor(code, id) {
  var color = colors[code]
  $("#head" + id).css("background", "#" + color)
  
}

function mouthColor(code, id) {
  var color = colors[code]
  $("#mouth" + id + ", .cat__mouth" + id + ", .left_mouth" + id + ".nose" + id).css("background", "#" + color)
  
}

function eyeColor(code, id) {
  var color = colors[code]
  $(".cat__eye" + id, ", .pupils" + id).find("span").css("background", "#" + color)
  
}

function earsColor(code, id) {
  var color = colors[code]
  $("#earL" + id).css("background", "#" + color)
  $("#earR" + id).css("background", "#" + color)
  
}

// Variation functions for range-bars

//8 eye types
function eyeVariation(num, id) {

  switch (num) {
    case "1":
      normalEyes(id)
      $("#eyeName" + id).html("Basic")
      break
    case "2":
      normalEyes(id)
      $("#eyeName" + Id).html("Chill")
      return eyesType1(id)
      break
    case "3":
      normalEyes(id)
      $("#eyeName" + id).html("Chill 2")
      return eyesType2(id)
      break
    case "4":
      normalEyes(id)
      $("#eyeName" + id).html("Roboto")
      return eyesType3(id)
      break
    case "5":
      normalEyes(id)
      $("#eyeName" + id).html("Sad")
      return eyesType4(id)
      break
    case "6":
      normalEyes(id)
      $("#eyeName" + id).html("Techy")
      return eyesType5(id)
      break
    case "7":
      normalEyes()
      $("#eyeName" + id).html("Cat Eyes")
      eyesType6(id)
      break
  }
  
}

function decorationVariation(num, id) {
  switch (num) {
    case "1":
      $("#decorationName" + id).html("Heads UP")
      normaldecoration1(id)
      break
    case "2":
      $("#decorationName" + id).html("Basic")
      decorationType2(id)
      break
    case "3":
      $("#decorationName" + id).html("Head rot")
      decorationType3(id)
      break
    case "4":
      $("#decorationName" + id).html("ear rotations")
      decorationType4(id)
      break
    case "5":
      $("#decorationName" + id).html("tail rot")
      decorationType5(id)
      break
    case "6":
      $("#decorationName" + id).html("mouth move")
      decorationType6(id)
      break
    
  }
  
}