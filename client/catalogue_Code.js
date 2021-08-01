Moralis.initialize("op64UJOdzjvupuxVtdERq27MMLK5XtTDH7VnCkRh"); // Application id from moralis.io
Moralis.serverURL = "https://o9eqkrjjqu7i.usemoralis.com:2053/server"; //Server url from moralis.io
const CONTRACT_ADDRESS = "0x0605E99b78410562fC61cC06c12bCA7036A201e0";

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
    $("#pet_row").html("");
    //Get and render properties from smart contract
    let petId = 0;
    window.web3 = await Moralis.Web3.enable();
    //let abi = await getAbi();
    let contract = new web3.eth.Contract(abi, CONTRACT_ADDRESS);
    let array = await contract.methods.totalSupply().call({from: ethereum.selectedAddress});
    console.log(array);
 /*
    if(array.length == 0) return;
    array.forEach(async petId => {
        let details = await contract.methods.myGetKitty(petId).call({from: ethereum.selectedAddress});
        renderPet(petId, details);
    });
*/
    
    let data = await contract.methods.myGetKitty(petId).call({from: ethereum.selectedAddress});
    console.log(data);
    renderPet(0, data);
    $("#game").show();
}

function renderPet(id, data) {
    let catAttributes = (
        parseInt(data.pupils) +
        parseInt(data.mouthParent) +
        parseInt(data.whiskers1) +
        parseInt(data.whiskers2) +
        parseInt(data.whiskers3) +
        parseInt(data.patternShapeL1) +
        parseInt(data.patternShapeL2) +
        parseInt(data.patternShapeL3) +
        parseInt(data.hindLegsShape) +
        parseInt(data.pawL) +
        parseInt(data.pawR) +
        parseInt(data.cat__tail) +

        parseInt(data.catDNA) +
        parseInt(data.dnabody) +
        parseInt(data.dnamouth) +
        parseInt(data.dnaeyes) +
        parseInt(data.dnaears) +

        parseInt(data.dnashape) +
        parseInt(data.dnadecoration) +
        parseInt(data.dnadecorationMid) +
        parseInt(data.dnadecorationSides) +
        parseInt(data.dnaanimation) +
        parseInt(data.dnaspecial) +

        parseInt(data.eyeName) +
        parseInt(data.decorationName) +
        parseInt(data.animationCode)
        );
        console.log(catAttributes);


        let htmlString = `
    <div class="col-md-3 catBox mx-1 light-b-shadow my-col id="pet_${id}">
    <div id="cat__loc"> <!--cat loc start-->

        <div id="head" class="head_ears_loc"> <!--cat_ears loc start-->

            <div class="earsParent">
                <div id="earL" class="earShape left_ear"></div>
                <div id="earR" class="earShape right_ear"></div>
            </div>

            <div class="cat__head"> <!--cat head start-->

                <div class="eyesParent"> <!--cat eyes start-->

                    <div class="cat__eye">
                        <span class = "${data.pupils}">
                            <div class="ref"></div>
                        </span>
                    </div>

                    <div class="cat__eye">
                        <span class = "${data.pupils}">
                            <div class="ref"></div>
                        </span>
                    </div> 

                </div> <!--cat eyes end-->

                <div id="mouth" class="${data.mouthParent}">
                    <div class="left_mouth">
                    <div class="cat__mouth">
                        <div class="${data.whiskers1}"></div>
                        <div class="${data.whiskers2}"></div>
                        <div class="${data.whiskers3}"></div>
                    </div>
                    </div>
        
                    <div class="nose"></div>
                                    
                    <div class="right_mouth">
                    <div class="cat__mouth">
                        <div class="${data.whiskers1}"></div>
                        <div class="${data.whiskers2}"></div>
                        <div class="${data.whiskers3}"></div>
                    </div> 
                    </div>   
                    
                </div>

            </div> <!--cat head end-->

        </div> <!--cat_ears loc end-->

        <div class="cat__body">
            <div class="cat__chest"></div>

            <div class="pattern_Parent"> <!--patterns loc start-->
            <div class="patternLt">
                <div class="${data.patternShapeL1}"></div>
                <div class="${data.patternShapeL2}"></div>
                <div class="${data.patternShapeL3}"></div>
            </div>

            <div class="patternRt">
                <div class="${data.patternShapeR1}"></div>
                <div class="${data.patternShapeR2}"></div>
                <div class="${data.patternShapeR3}"></div>
            </div>
            
            </div> <!--patterns loc end-->

                <div class="hindLegsParent">
                <div class="left_hindLegs">
                    <div class="${data.hindLegsShape}"></div>
                </div>
                <div class="right_hindLegs">
                    <div class="${data.hindLegsShape}"></div>
                </div>
                </div>
    
                <div class="front_legs_Parent"> <!--f-legP loc start-->
                <div class="leg frontLegs_left">
                    <div class="data.front_pawsL">
                    <div class="${data.pawL}"></div>
                    </div>
                </div>
    
                <div class="leg frontLegs_rt">
                    <div class="data.front_pawsR">
                    <div class="${data.pawR}"></div>
                    </div>
                </div>

                </div> <!--f-legP loc end-->

                <div class="cat_tail_loc">
                    <div id="tail" class="${data.cat__tail}"></div>
                </div>

        
        </div> <!--cat body loc end--> 

    </div> <!--cat loc end-->

    <br>
    <div class="data.dnaDiv" id="${data.catDNA}">
        <b style="color: #ab706d;">
            DNA:
            <!-- Colors -->
            <span id="${data.dnabody}" ></span>
            <span id="${data.dnamouth}"></span>
            <span id="${data.dnaeyes}"></span>
            <span id="${data.dnaears}"></span>
            
            <!-- Cattributes -->
            <span id="${data.dnashape} dnashape"></span>
            <span id="${data.dnadecoration}"></span>
            <span id="${data.dnadecorationMid}"></span>
            <span id="${data.dnadecorationSides}"></span>
            <span id="${data.dnaanimation}"></span>
            <span id="${data.dnaspecial}"></span>
        </b>
    </div>
    </div>
    </div>  <!--row end--> 

    <!--second row start--> 
    <div class="row light-b-shadow my-row "> 
    <div class="col-md-3 light-b-shadow catInfoBox id="pet_${id}">
    <!--cat shapes start--> 
    <div id="pet_row">
    <div>Id: <span class="pet_id">${id}</span></div>
        <div class="form-group">
        <label for="formControlRange">
            <b style="color: #ab706d">Eyes Shape</b><span class="badge badge-dark ml-2" id="${data.eyeName}"></span></label>       
    </div>

    <div class="form-group">
        <label for="formControlRange">
            <b style="color: #ab706d">Patterns</b><span class="badge badge-dark ml-2" id="${data.decorationName}"></span></label>    
    </div>

    <div class="form-group">
        <label for="formControlRange">
            <b style="color: #ab706d">Animation</b><span class="badge badge-dark ml-2" id="${data.animationCode}"></span></label>      
    </div>
    </div><!--cat shapes end--> 
    </div><!--second col end--> `;

    let element = $.parseHTML(htmlString);
        $("#pet_row").append(element);
    
}

  

init();