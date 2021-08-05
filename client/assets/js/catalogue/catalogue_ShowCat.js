Moralis.initialize("op64UJOdzjvupuxVtdERq27MMLK5XtTDH7VnCkRh"); // Application id from moralis.io
Moralis.serverURL = "https://o9eqkrjjqu7i.usemoralis.com:2053/server"; //Server url from moralis.io
const CONTRACT_ADDRESS = "0xa4A76fdF4850E575FcC6858Ce1cd09EAe99A07d8";

async function init() {
    try {
        let user = Moralis.User.current();
        //console.log(user);
        //alert("User logged in")
        if(!user){
            $("#login_button").click( async () => {
                user = await Moralis.Web3.authenticate();
            })
        }
        renderGame();
    } catch (error) {
        console.log(error);
    }
}

async function renderGame() {
    $("#login_button").hide();
    $("#row").html("");
    //Get and render properties from smart contract
    let catId = 0;
    window.web3 = await Moralis.Web3.enable();
    //let abi = await getAbi();
    let contract = new web3.eth.Contract(abi, CONTRACT_ADDRESS);
    let array = await contract.methods.getAllTokensForUser(ethereum.selectedAddress).call({from: ethereum.selectedAddress});
    console.log(array);

    if(array.length == 0) return;
    array.forEach(async catId => {
        let details = await contract.methods.myGetKitty(catId).call({from: ethereum.selectedAddress});
        renderCat(catId, details);
    });
    

    let data = await contract.methods.myGetKitty(catId).call({from: ethereum.selectedAddress});
    console.log(data);
    renderCat(0, data);
    $("#row").show();
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


//Apply cat CSS Styles from buidCat.js
function renderCat(dna, id) {

    bodyColor(dna.bodyColor, id)
    mouthColor(dna.mouthColor, id)
    eyesColor(dna.eyesColor, id)
    earsColor(dna.earsColor, id)
    eyeVariation(dna.eyeVariation, id)
    decorationVariation(dna.decorationVariation, id)
    decorationMidColorFunc(dna.decorationMidColorFunc, id)
    decorationSidescolor(dna.decorationSidescolor, id)
    animationVariation(dna.animation)
}

//Splitting the cat DNA to use it in render
//Substring: extracts characters from a string
//DNA: 26 37 86 14 1 1 14 20 1 1 
//key: 01234...
function dna(dnaStr) {
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
        "decorationSidescolor": dnaStr.substring(12, 14),
        "animation": dnaStr.substring(14, 15),
        "lastNum": dnaStr.substring(15, 16)
    }
    return dna;
}


//Cat HTML Div for catalogue
function catBox(id) {

    var catDiv = `
        <div class="col-lg-4 pointer fit-content" id="catview` + id +`">
            <div class="featureBox catDiv">
            `+ catBody(id) +`
            </div>
            <div class="dnaDiv" id="catDNA` + id +`"></div>
            `+ cattributes(id) +`
        </div>`
    var catView = $(`#catview` + id)
    if(!catView.length) {
        $(`#catsDiv`).append(catDiv)
    }
    
}

//Simple body of a cat
function catBody(id) {
    
    var single = `
    <div class="col-lg-4 catBox m-2 light-b-shadow">

                <div id="cat__loc"> <!--cat loc start-->

                    <div id="head`+ id + `" class="head_ears_loc"> <!--cat_ears loc start-->

                        <div class="earsParent">
                            <div id="earL`+ id + `" id="earShape left_ear"></div>
                            <div id="earR`+ id + `" id="earShape right_ear"></div>
                          </div>
    
                        <div id="cat__head"> <!--cat head start-->
    
                            <div class="eyesParent"> <!--cat eyes start-->
    
                                <div class="cat__eye">
                                    <span id = "pupils`+ id + `">
                                        <div class="ref"></div>
                                    </span>
                                </div>
            
                                <div class="cat__eye">
                                    <span id = "pupils`+ id + `">
                                        <div class="ref"></div>
                                    </span>
                                </div> 
    
                            </div> <!--cat eyes end-->
    
                            <div id="mouth" class="mouthParent">
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

                    </div> <!--cat_ears loc end-->

                   

                    <div id="cat__body">
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
                              <div id="leg frontLegs_left">
                                <div id="front_pawsL`+ id + `">
                                  <div class="pawL"></div>
                                </div>
                              </div>
                  
                              <div id="leg frontLegs_rt">
                                <div id="front_pawsR`+ id + `">
                                  <div class="pawR"></div>
                                </div>
                              </div>
  
                            </div> <!--f-legP loc end-->

                            <div class="cat_tail_loc">
                                <div id="tail`+ id + `" id="cat__tail`+ id + `"></div>
                            </div>
            
                     
                     </div> <!--cat body loc end--> 

                </div> <!--cat loc end-->
    `

    return single

}

function cattrubutes(id) {

    var Cattributes = `
    <ul class="ml-5 cattributes">
        <li><span id="eyeName`+ id + `"></span></li>
        <li><span id="decorationName`+ id + `"></span></li>
        <li><span id="animationName`+ id + `"></span></li>
    </ul>`

    return Cattributes;
}


  
init();