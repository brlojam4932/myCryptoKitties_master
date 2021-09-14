var web3 = new Web3(Web3.givenProvider);
var instance;
var marketPlaceInstance;
var user;

var contractAddress = '0x4b92fD7dE5D2e489bb76b547C5006e19efAbA5D3';
var marketPlaceAddress = '0x9e91aDd4187fa71cf2b3E87eECb94edA2fE7619A';


//// Reformat Code: Alt Shift F

// Web3.js is similar to truffle
// abi - Application Binary Interface
$(document).ready(function () {
  window.ethereum.enable().then(function (accounts) {
    instance = new web3.eth.Contract(abi.myKittyContract, contractAddress, { from: accounts[0] });
    marketPlaceInstance = new web3.eth.Contract(abi.KittyMarketPlace, marketPlaceAddress, { from: accounts[0] });
    //instance.methods.owner().call().then(test => {
    //  contractOwner = test;
    //});
    user = accounts[0];
    console.log(instance);
    console.log(marketPlaceInstance);

    // from Web3 Start Coding lesson | send({}) is options object
    /*
    function createdKitty() {
      var dnaStr = getDna();
      instance.methods.createKittyGen0(dnaStr).send({}, function (error, txHash) {
        if (err)
          console.log(err);
        else
          console.log(txHash);
      });
    }
    */

    //Read about Event listeners in Web3.js: https://web3js.readthedocs.io/en/v1.2.9/web3-eth-contract.html#contract-events


    /*     
    EVENTS
    *   Listen for the `Birth` event, and update the UI
    *   This event is generate in the KittyBase contract
    *   when the _createKitty internal method is called
    */


    instance.events.Birth()
      .on('data', (event) => {
        console.log(event);
        let owner = event.returnValues.owner;
        let kittyId = event.returnValues.newKittenId;
        let mumId = event.returnValues.mumId;
        let dadId = event.returnValues.dadId;
        let genes = event.returnValues.genes
        alert_msg("owner:" + owner
          + " kittyId:" + kittyId
          + " mumId:" + mumId
          + " dadId:" + dadId
          + " genes:" + genes, 'success')
      })
      .on('error', console.error);


    instance.events.ApprovalForAll()
      .on('data', (event) => {  
        console.log(event);
        let owner = event.returnValues.owner;
        let operator = event.returnValues.operator;
        let approved = event.returnValues.approved;
        alert_msg("owner:" + owner
          + " operator " + operator
          + " approved: " + approved, 'success');
      })
      .on('error', console.error);
     

    marketPlaceInstance.events.MarketTransaction()
      .on('data', (event) => {
        console.log(event);
        let eventType = event.returnValues["TxType"].toString()
        let owner = event.returnValues["owner"]
        let tokenId = event.returnValues["tokenId"]
        if (eventType == "Buy") {
          alert_msg('Purchased by: ' + 'owner: ' + owner + " " + 'TokenId: ' + tokenId, 'success')
        }
        if (eventType == "Create offer") {
          alert_msg('Successfully Offer set for Kitty id: ' + tokenId, 'success')
          $('#cancelBox').removeClass('hidden')
          $('#cancelBtn').attr('onclick', 'deleteOffer(' + tokenId + ')')
          $('#sellBtn').attr('onclick', '')
          $('#sellBtn').addClass('btn-warning')
          $('#sellBtn').html('<b>For sale at:</b>')
          var price = $('#catPrice').val()
          $('#catPrice').val(price)
          $('#catPrice').prop('readonly', true)


        }
        if (eventType == "Remove offer") {
          alert_msg('Successfully Offer remove for Kitty id: ' + tokenId, 'success')
          $('#cancelBox').addClass('hidden')
          $('#cancelBtn').attr('onclick', '')
          $('#catPrice').val('')
          $('#catPrice').prop('readonly', false)
          $('#sellBtn').removeClass('btn-warning')
          $('#sellBtn').addClass('btn-success')
          $('#sellBtn').html('<b>Sell me</b>')
          $('#sellBtn').attr('onclick', 'sellCat(' + tokenId + ')')
        }
      })
      .on('error', console.error);
  });

});

// approve


async function initMarketPlace() {
  // owner / operator
  var isMarketPlaceOperator = await instance.methods.isApprovedForAll(user, marketPlaceAddress).call();

  if(isMarketPlaceOperator) {
    getInventory();
    $(".model-container").css('transform', 'scale(0)');
    
  } else {
    // operator / approved 
    await instance.methods.setApprovalForAll(marketPlaceAddress, true).send({}, (err, txHash) => {
      if (err) {
        console.log(err);
      } else {
        console.log(txHash);
      }
    });
  }
}


//Displays kittens
async function getInventory() {
  var arrayId = await marketPlaceInstance.methods.getAllTokenOnSale().call();
  console.log(arrayId);
  for (i = 0; i < arrayId.length; i++) {
    if (arrayId[i] != 0) { // the zero cat pos is ignored here; not for sale
      appendKitty(arrayId[i]);
    }

  }
}

// code from lesson with txHash
function createKitty() {
  var dnaStr = getDna();
  instance.methods.createKittyGen0(dnaStr).send({}, function (err, txHash) {
    if (err) {
      console.log(err);
    } else {
      console.log(txHash);
    }

  });

}

/*
//function from final code; which is different than the one above, from lesson.
async function createKitty() {
  var dnaStr = getDna();
  let res;
  try {
    res = instance.methods.createKittyGen0(dnaStr).send();
  } catch (err) {
    console.log(err);
  }
}
*/


async function checkOffer(id) {

  let res;
  try {

    res = await marketPlaceInstance.methods.getOffer(id).call();
    var price = res['price'];
    var seller = res['seller'];
    var onsale = false
    //If price more than 0 means that cat is for sale
    if (price > 0) {
      onsale = true
    }
    //Also might check that belong to someone
    price = web3.utils.fromWei(price, 'ether');
    var offer = { seller: seller, price: price, onsale: onsale }
    return offer

  } catch (err) {
    console.log(err);
    return
  }

}

// Get all the kitties from address
async function kittyByOwner(contractAddress) {
  let res;
  try {
    res = await instance.methods.tokensOfOwner(contractAddress).call();
  } catch (err) {
    console.log(err);
  }
}

//Gen 0 cats for sale
async function contractMarketPlace() {
  var arrayId = await marketPlaceInstance.methods.getAllTokenOnSale().call();
  for (i = 0; i < arrayId.length; i++) {
    if (arrayId[i] != 0) {
      appendKitty(arrayId[i])
    }
  }
}

//Get kittues of a current address
async function myKitties() {
  var arrayId = await instance.methods.tokensOfOwner(user).call();
  for (i = 0; i < arrayId.length; i++) {
    if (arrayId[i] != 0) { // if arrayId index Not the default cat, append kitties
      appendKitty(arrayId[i]);
    }
    
  }
}

//Get kittues of a current address test
async function myKittiesTest() {
  //let user = web3.currentProvider.selectedAddress;
  var arrayId = await instance.methods.getAllCatsFor(user).call();
  for (i = 0; i < arrayId.length; i++) {
    if (arrayId[i] != 0) { // if arrayId index Not the default cat, append kitties
      appendKitty(arrayId[i]);
    }
    console.log(user);
    console.log(arrayId);
    
  }
}


//Get kitties for breeding that are not selected
async function breedKitties(gender) {
  var arrayId = await instance.methods.tokensOfOwner(user).call();
  for (i = 0; i < arrayId.length; i++) {
    appendBreed(arrayId[i], gender)
  }
}

// Checks that the user address is same as the cat owner address
//This is use for checking if user can sell this cat
async function catOwnership(id) {

  var address = await instance.methods.ownerOf(id).call()

  if (address.toLowerCase() == user.toLowerCase()) {
    return true
  }
  return false

}


//Appending cats to breed selection
async function appendBreed(id, gender) {
  var kitty = await instance.methods.getKitty(id).call()
  breedAppend(kitty[0], id, kitty['generation'], gender)
}

//Appending cats to breed selection
async function breed(dadId, mumId) {
  try {
    await instance.methods.Breeding(dadId, mumId).send()
  } catch (err) {
    log(err)
  }
}

//Appending cats for catalog
async function appendKitty(id) {
  var kitty = await instance.methods.getKitty(id).call()
  appendCat(kitty[0], id, kitty['generation'])
}


async function singleKitty() {
  var id = get_variables().catId
  var kitty = await instance.methods.getKitty(id).call()
  singleCat(kitty[0], id, kitty['generation'])
  console.log('This is your Robo Cat Id: ' + id)
  //$("#roboCatId").html(id);
}

async function deleteOffer(id) {
  try {
    await marketPlaceInstance.methods.removeOffer(id).send();
  } catch (err) {
    console.log(err);
  }

}

async function sellCat(id) {
  var price = $('#catPrice').val()
  var amount = web3.utils.toWei(price, "ether")
  try {
    await marketPlaceInstance.methods.setOffer(amount, id).send();
  } catch (err) {
    console.log(err);
  }
}

/*
// alt function for approving operator
async function approve() {
  let user = web3.currentProvider.selectedAddress;
  let isApproved = await instance.methods
    .isApprovedForAll(user, marketPlaceAddress)
    .call();

    if (isApproved == true) {
      alert("Contract not approved");
    } else {
      await token.methods.setApprovalForAll(marketPlaceAddress, true).send();
      alert("Approval Set!");
      isApproved = await instance.methods.isApprovedForAll(user, marketPlaceAddress)
      .call();
      console.log("is now approved:" + isApproved);
    }
   
} 
*/

//const obj = {name: "John", age: 30, city: "New York"};
//const myJSON = JSON.stringify(obj);

async function buyKitten(id, price) {
  var amount = web3.utils.toWei(price, "ether")
  try {
    await marketPlaceInstance.methods.buyKitty(id).send({ value: amount });
  } catch (err) {
    console.log(err);
  }
}


async function totalCats() {
  var cats = await instance.methods.totalSupply().call();
  //console.log(`Total Supply: ${cats}`);
}



