// File for fetching all the cats from smart contrat 
// into the catalogue

//Append each Cat card as a catalog
function appendCat(dna, id, gen) {
  //1 return DNA cat into readable string 
  var KittyDna = catDna(dna)
  //2 build the catBox into HTML
  catBox(id)
  //3 Render the cats CSS style depending on DNA string
  renderCat(KittyDna, id)
  $("#catview" + id).attr('onclick', 'go_to("catDetails.html?catId=' + id + '")')
  $("#catDNA" + id).html(`
  <span class="badge badge-light"><h4 class="tsp-2 m-0"><b>GEN:</b>`+ gen + `</h4></span>
  <br>
  <span class="badge badge-light"><h4 class="tsp-2 m-0"><b>DNA:</b>`+ dna + `</h4></span>`)
}


async function singleCat(dna, id, gen) {
    
    var KittyDna = catDna(dna)
    //2 build the singleCat into HTML
    var body = catBody(id)
    var Cattributes = cattrubutes(id)
    $("#cattributes").html(Cattributes)
    $("#singleCat").html(body)
    //3 Render the cats CSS style depending on DNA string
    renderCat(KittyDna, id)
    $("#catDNA").html(`
    <span class="badge badge-light"><h4 class="tsp-2 m-0"><b>GEN:</b>`+ gen + `</h4></span>
    <br>
    <span class="badge badge-light"><h4 class="tsp-2 m-0"><b>DNA:</b>`+ dna + `</h4></span>
    `)

    await catOffer(id)
}


//Apply cat CSS Styles from buildCat.js
function renderCat(dna, id) {

    bodyColor(dna.bodyColor, id)
    mouthColor(dna.mouthColor, id)
    eyesColor(dna.eyesColor, id)
    earsColor(dna.earsColor, id)
    eyeVariation(dna.eyeVariation, id)
    decorationVariation(dna.decorationVariation, id)
    decorationMidColorFunc(dna.decorationMidColorFunc, id)
    decorationSidesColorFunc(dna.decorationSidesColorFunc, id)
    animationVariation(dna.animation)
}

//Splitting the cat DNA to use it in render
//Substring: extracts characters from a string
//DNA: 26 37 86 14 1 1 14 20 1 1 
//key: 01234...
function catDna(dnaStr) {

    var dna = {
        //colors
        "bodyColor": dnaStr.substring(0, 2),  
        "mouthColor": dnaStr.substring(2, 4), 
        "eyesColor": dnaStr.substring(4, 6 ),
        "earsColor": dnaStr.substring(6, 8),
        //Cattributes
        "eyesShape": dnaStr.substring(8, 9),
        "decorationVariation": dnaStr.substring(9, 10),
        "decorationMidColorFunc": dnaStr.substring(10, 12),
        "decorationSidesColorFunc": dnaStr.substring(12, 14),
        "animation": dnaStr.substring(14, 15),
        "lastNum": dnaStr.substring(15, 16)
    }
    return dna;
}


//Cat HTML Div for catalogue
function catBox(id) {

    var catDiv = `
        <div class="col-lg-4 pointer fit-content" id="catview` + id + `">
            <div class="featureBox catDiv">
            `+ catBody(id) + `
            </div>
            <div class="dnaDiv" id="catDNA` + id + `"></div>
            `+ cattributes(id) + ` 
        </div>`
    var catView = $(`#catview` + id)
    if(!catView.length) {
        $(`#catsDiv`).append(catDiv)
    }
    
}

//Simple body of a cat
function catBody(id) {
    
    var single = `<div id="earsParent`+ id + `">
                  <div class="earL">
                    <div class="left_ear">
                      <div id="earShape1`+ id + `"></div>
                    </div>
                  </div>
                  <div class="earR">
                    <div class="right_ear">
                      <div id="earShape2`+ id + `"></div>
                    </div>
                  </div>
                </div>
                          <div id="cat__head`+ id + `"> <!--cat head start-->
      
                              <div class="eyesParent"> <!--cat eyes start-->
                                  <div class="cat__eye">
                                      <span id="pupils1`+ id + `">
                                          <div class="ref"></div>
                                      </span>
                                  </div>
              
                                  <div class="cat__eye">
                                      <span id="pupils2`+ id + `">
                                          <div class="ref"></div>
                                      </span>
                                  </div> 

      
                              </div> <!--cat eyes end-->
      
                              <div id="mouth`+ id + `" class="mouthParent">
                                  <div class="left_mouth">
                                    <div id="cat__mouth`+ id + `">
                                      <div class="whiskers1"></div>
                                      <div class="whiskers2"></div>
                                      <div class="whiskers3"></div>
                                    </div>
                                  </div>
                      
                                  <div class="nose"></div>
                                                    
                                  <div class="right_mouth">
                                    <div id="cat__mouth`+ id + `">
                                      <div class="whiskers1"></div>
                                      <div class="whiskers2"></div>
                                      <div class="whiskers3"></div>
                                    </div> 
                                  </div>   
                                  
                                </div>
              
                          </div> <!--cat head end-->

                      <div id="cat__body`+ id + `">
                          <div class="cat__chest"></div>
              
                          <div class="pattern_Parent"> <!--patterns loc start-->
                            <div class="patternLt">
                              <div id="patternShapeL1`+ id + `"></div>
                              <div id="patternShapeL2`+ id + `"></div>
                              <div id="patternShapeL3`+ id + `"></div>
                            </div>
              
                            <div class="patternRt">
                              <div id="patternShapeR1`+ id + `"></div>
                              <div id="patternShapeR2`+ id + `"></div>
                              <div id="patternShapeR3`+ id + `"></div>
                            </div>
                          
                          </div> <!--patterns loc end-->
                
                              <div class="hindLegsParent">
                                <div class="left_hindLegs">
                                  <div id="hindLegsShape`+ id + `"></div>
                                </div>
                                <div class="right_hindLegs">
                                  <div id="hindLegsShape`+ id + `"></div>
                                </div>
                              </div>
                    
                              <div class="front_legs_Parent"> <!--f-legP loc start-->
                                <div id="leg1`+ id + `"> <!--hey-->
                                  <div id="front_pawsL`+ id + `">
                                    <div class="pawL"></div>
                                  </div>
                                </div>
                    
                                <div id="leg2`+ id + `">
                                  <div id="front_pawsR`+ id + `">
                                    <div class="pawR"></div>
                                  </div>
                                </div>
    
                              </div> <!--f-legP loc end-->

                              <div class="cat_tail_loc">
                                  <div id="cat__tail`+ id + `"></div>
                              </div>         
                      
                      </div> <!--cat body loc end--> `

    return single

}

function cattributes(id) {

    var Cattributes = `
    <ul class="ml-5 cattributes">
        <li><span id="eyeName`+ id + `"></span></li>
        <li><span id="decorationName`+ id + `"></span></li>
        <li><span id="animationName`+ id + `"></span></li>
    </ul>`

    return Cattributes;
}
