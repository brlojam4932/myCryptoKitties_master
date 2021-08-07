
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
//var dnaStr = "457896541299";
//var dnaStr = "";

var contractAddress = "0x75F3803AadcABe526DCEfA7523602d2FeB76D06E";
var contractOwner;

$(document).ready(function(){
  window.ethereum.enable().then(function(accounts){
    instance = new web3.eth.Contract(abi, contractAddress, {from: accounts[0]});
    user = accounts[0];

    console.log(instance);

     /*     
    EVENTS
    *   Listen for the `Birth` event, and update the UI
    *   This event will generate in the KittyBase contract
    *   when the _createKitty internal method is called
    */

    instance.events.Birth().on('data', (event) => { //function with callback
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

/*
    instance.events.MarketTransactions()
      .on("data", (event) => {
        console.log(event);
        var eventType = event.returnValues["TxType"].toString()
        var tokenId = event.returnValues["tokenId"]
        if (eventType == "Buy") {
          alert_msg('Succesfully Kitty purchase! Now you own this Kitty with TokenId: ' + tokenId, 'success')
        }
        if (eventType == "Create offer") {
          alert_msg('Successfully Offer set for Kitty id: ' + tokenId, 'success')
          $("#cancelBox").removeClass("hidden")
          $("#cancelBtn").attr("onclick", "deleteOffer(" + tokenId + ") ")
          $("#sellBtn").attr("onclick", "")
          $("#sellBtn").addClass("btn-warning")
          $("#sellBtn").html("<b>For sale at:</b>")
          var price = $("#catPrice").val()
          $("#catPrice").val(price)
          $("#catPrice").prop("readonly", true)

        }
        if (eventType == "Remove offer") {
          alert_msg('Successfully Offer removed for Kitty id: ' + tokenId, 'success')
          $("#cancelBox").addClass("hidden")
          $("#cancelBtn").attr("onclick", "")
          $("#catPrice").val("")
          $("#catPrice").prop("readonly", false)
          $("#sellBtn").removeClass("btn-warning")
          $("#sellBtn").addClass("btn-success")
          $("#sellBtn").html("<b>Sell me</b>")
          $("#sellBtn").attr("onclick", "sellCat(" + tokenId + ") ")
        }
      })
      .on("error", console.error);
       */
    });
   

  });


  function createKitty() {
    var dnaStr = getDna();
    instance.methods.createKittyGen0(dnaStr).send({}, function(error, txHash) {
      if(error)
        console.log(error);
      else{
        console.log(txHash);
      } 
    })

  }


    $('#createCat').click(() =>{
      createKitty(getDna());
    })


    async function checkOffer(id) {

      let res;
      try {

        res = await instance.methods.getOffer(id).call();
        var price = res["price"];
        var seller = res["seller"];
        var onsale = false
        //If price is more than 0, then cat is for sale
        if (price > 0) {
          onsale = true
        }
        //check that it belongs to someone
        price = Web3.utils.fromWei(price, "ether");
        var offer = {seller: seller, price: price, onsale: onsale}
        return offer

      } catch (err) {
        console.log(err);
        return
      }

    }


    // Get all the kitties from address
    async function kittyByOwner(address) {

      let res;
      try {
        res = await instance.methods.tokensOfOwner(address).call();
      } catch (err) {
        console.log(err);
      }     
    }

/*
   //Gen 0 cats for sale
   async function contractCatalog() {
     var arrayId = await instance.methods.getAllTokenOnSale().call();
     for (i = 0; i < arrayId.length; i++) {
       if(arrayId[i] != "0") {
         appendKitty(arrayId[i])
       }
     }
   }
   */

   //Get kitties of a current address
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
    console.log("total cats: " + cats)
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


//==================Ivan on Tech Code===============================

