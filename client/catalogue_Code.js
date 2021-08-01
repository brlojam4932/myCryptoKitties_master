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
    $("#account").html(CONTRACT_ADDRESS);
    $("#pet_id").html(id);
    $("#headcode").html(data.headcode);
    $("#mouthcode").html(data.mouthcode);
    $("#eyescode").html(data.eyescode);
    $("#earscode").html(data.earscode);
    $("#decoMidColcode").html(data.decoMidColcode);
    $("#decoSideColcode").html(data.decoSideColcode);
    // shapes
    $("#eyeName").html(data.eyeName);
    $("#decorationName").html(data.ddecorationName);
    $("#animationCode").html(data.animationCode);
    $("#feed_button").attr("data-pet-id", id);


    let deathTime = new Date(parseInt(data.lastMeal) + parseInt(data.endurance) * 16256800); //16255100
    //let deathTime = new Date(Date.now(parseInt(data.lastMeal) + parseInt(data.endurance) * 1000)); 
    //let deathTime = new Date(parseInt(data.lastMeal) + parseInt(data.endurance) * 1000); 
    let now = new Date();
    if(now > deathTime) {
        deathTime = "<b>DEAD</b>";
    }

    $("#pet_starvation_time").html(deathTime);

}

/*
function getAbi(){
    return new Promise((res) => {
        $.getJSON("myKittiesContract.json", ((json) => {
            res(json.abi);
        }))
    })
   
}
*/

async function feed(petId){
    let abi = await getAbi();
    let contract = new web3.eth.Contract(abi, CONTRACT_ADDRESS);
    contract.methods.feed(petId).send({from: ethereum.selectedAddress}).on("receipt", (() => {
        console.log("Feeding completed");
        renderGame();
    }))

}


$("#feed_button").click(() => {
    let petId = $("#feed_button").attr("data-pet-id");
    feed(petId);
});
  

init();