
//==================Ivan on Tech Code===============================

var web3 = new Web3(Web3.givenProvider);

// event listeners and buttons---------
// https://youtu.be/NseL8v9EH_Q

const onboardButton = document.querySelector('#connectButton');

const getAccountsButton = document.querySelector('#getAccountsButton');
const viewCatResult = document.querySelector('#catResultId');

// event listeners and buttons---------

if (typeof window.ethereum !== 'undefined') {
  console.log('MetaMask is installed!');
  $("#metamaskStatus").text("MetaMask is installed!");
}

// ----------------------create cat-------------------------------------------

var instance;
var user;
var dnaStr = "457896541299";

var contractAddress = "0x75F3803AadcABe526DCEfA7523602d2FeB76D06E";
var contractOwner;

$(document).ready(function(){
  window.ethereum.enable().then(function(accounts){
    instance = new web3.eth.Contract(abi, contractAddress, {from: accounts[0]});
    instance.methods.owner().call().then(test => {
      contractOwner = test;
    });
    user = accounts[0];

    console.log(instance);

     /*     
    EVENTS
    *   Listen for the `Birth` event, and update the UI
    *   This event will generate in the KittyBase contract
    *   when the _createKitty internal method is called
    */

    instance.events.Birth().on('data', function(event) { //function with callback
      console.log(event);
      let owner = event.returnValues.owner;
      let kittenId = event.returnValues.kittenId;
      let mumId = event.returnValues.kittenId;
      let dadId = event.returnValues.dadId;
      let genes = event.returnValues.genes

      $("#catResultId").text("owner: " + owner
      +" KittyId: " + kittenId
      +" mumId: " + mumId
      +" dadId: " + dadId
      +" genes: " + genes)
      $("#createCat").val(viewCatResult);
      
    })
    .on('error', console.error);
    
    });

    function createKitty() {
      var dnaStr = getDna();
      let res;
      try {
        res = instance.methods.createKittyGen0(dnaStr).send();
      } catch (err) {
        console.log(err);
      }
    }


    $('#createCat').click(() =>{
      createKitty(getDna());
    })

    // Get all the kitties from address
    async function kittyByOwner(address) {

      let res;
      try {
        res = await instance.methods.tokensOfOwner(address).call();
      } catch (err) {
        console.log(err);
      }     
    }

   //Gen 0 cats for sale
   async function contractCatalog() {
     var arrayId = await instance.methods.getAllTokenOnSale().call();
     for (i = 0; i < arrayId.length; i++) {
       if(arrayId[i] != "0") {
         appendKitty(arrayId[i])
       }
     }
   }

   //Get kittues of a current address
   async function myKitties() {
     var arrayId = await instance.methods.tokensOfOwner(user).call();
     for (i = 0; i < arrayId.length; i++) {
       appendKitty(arrayId[i])
     }
   }

   // Checks that the user address is same as the cat owner address
   //This is use for checking if user can sell this cat
  
  async function catOwnership(id) {
    var address = await instance.methods.ownerOf(id).call();

    if (address.toLowerCase() == user.toLowerCase()) {
      return true
    }
    return false
  }


  //Appending cats for catalog
  async function appendKitty(id) {
    var kitty = await instance.methods.myGetKitty(id).call();
    appendCat(kitty[0], id, kitty["generation"])
  }

  async function singleKitty() {
    var id = get_variables().catId
    var kitty = await instance.methods.myGetKitty(id).call();
    singleCat(kitty[0], id, kitty["generation"])
  }

  async function totalCats() {
    var cats = await instance.methods.totalSupply().call();
  }
    
  // -----------------create cat end--------------////

  /*

    getAccountsButton.addEventListener('click', async () => {
      //we use eth_accounts because it returns a list of addresses owned by us.
      const accounts = await ethereum.request({ method: 'eth_accounts' });
      const account = accounts[0];
      //We take the first address in the array of addresses and display it
      console.log(account || 'Not able to get accounts');
      $("#getAccountsResult").html(account || 'Not able to get accounts');
      //getAccountsResult.innerHTML = accounts[0] || 'Not able to get accounts';
    
    });

    */

  }) 
 

//==================Ivan on Tech Code===============================

