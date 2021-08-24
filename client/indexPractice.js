var web3 = new Web3(Web3.givenProvider);
var instance;
var user;

var contract = "0xee7A6e0AA1d77A4661b8100d3cAefD73Be788077";
var contractOwner;

$(document).ready( () => {
  window.ethereum.enable().then(function (accounts) {
    instance = new web3.eth.Contract(abi, contract, { from: accounts[0]});
    instance.methods.owner().call().then(test => {
      contractOwner = test;
    });
    user = accounts[0];
    console.log(instance);
    /*     
    EVENTS
    *   Listen for the `Birth` event, and update the UI
    *   This event is generate in the KittyBase contract
    *   when the _createKitty internal method is called
    */

    instance.events.Birth()
      .on("data", (event) => {
        console.log(event);
        let owner = event.returnValues.owner;
        let kittenId = event.returnValues.newKittenId;
        let mumId = event.returnValues.mumId;
        let dadId = event.returnValues.mumId;
        let genes = event.returnValues.genes;
        alert_msg("ownder:" + owner 
          + " kittyId:" + kittenId
          + " mumId:" + mumId
          + " dadId:" + dadId
          + " genes:" + genes, "success")
      })
      .on("error", console.error);

      // market transaction here
  });
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

// check offer
async function checkOffer(id) {

  let res;
  try {

    res = await instance.methods.getOffer(id).call();
    var price = res['price'];
    var seller = res['seller'];
    var onsale = false
    //If price is greater than 0, cat is for sale
    if (price > 0) {
      onsale = true
    }
    //Also check cat has an owner
    price = Web3.utils.fromWei(price, 'ether');
    var offer = { seller: seller, price: price, onsale: onsale};
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

//Gen 0 cats for sale
async function contractCatalog() {
  var arrayId = await instance.methods.getAllTokenOnSale().call();
  for (i = 0; i < arrayId.length; i++) {
    if(arrayId[i] != "0") {
      appendKitty(arrayId[id]) // we created a default cat at index 0 in array in contract
      // so we skip this id 0 cat
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

//Get kitties for breeding that are not selected
async function breedKitties(gender) {
  var arrayId = await instance.methods.tokensOfOwner(user).call();
  for (i = 0; i < arrayId.length; i++) {
    appendBreed(arrayId[i], gender)
  } 
}

//Checks that the user address is same as the cat owner address
//This is use for checking if user can sell this cat

//Appending cats to breed selection
async function appendBreed(id, gender) {
  var kitty = await instance.methods.getKittyFilip(id).call();
  breedAppend(kitty[0], id, kitty['generation'], gender)
}


//Appending cats to breed selection
async function breed(dadId, mumId) {
  try {
    await instance.methods.breed(dadId, mumId).send();
  } catch (err) {
    log(err)
  }
}

//Appending cats for catalog
async function appendKitty(id) {
  var kitty = await instance.methods.getKittyFilip(id).call();
  appendCat(kitty[0], id, kitty["generation"])
}

async function singleKitty() {
  var id = get_variables().catId
  var kitty = await instance.methods.getKittyFilip(id).call();
  singleCat(kitty[0], id, kitty["generation"])
}
