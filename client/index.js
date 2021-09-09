var web3 = new Web3(Web3.givenProvider);
var instance;
var marketPlaceInstance;
var owner = '0x01f53c07C4C32F6C2f16AAEbC52563882eEAB034'; // account #1

var contractAddress = "0x472c3EfB6505538c92EF61fa669d3C65471AF650";
var marketPlaceAddress = '0x84c181B85564C62Db46aC3753D53B62E87258b6d';

var buyer = '0x53b55f11648F4a5eF0ebe32fdA145a44852d80b7';

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

    marketPlaceInstance.events.MarketTransaction()
      .on('data', (event) => {
        console.log(event);
        var eventType = event.returnValues["TxType"].toString()
        var tokenId = event.returnValues["tokenId"]
        if (eventType == "Buy") {
          alert_msg('Succesfully Kitty purchase! Now you own this Kitty with TokenId: ' + tokenId, 'success')
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


async function initMarketPlace() {
  //let owner = web3.currentProvider.selectedAddress;
  // owner, operator
  var isMarketPlaceOperator = await instance.methods.isApprovedForAll(owner, marketPlaceAddress).call();

  if (isMarketPlaceOperator) {
    getInventory();
  }
  else {
    // operator, approved
    //await instance.methods.setApprovalForAll(marketPlaceAddress, true).on('receipt', function(receipt){
    // tx done
    //console.log("tx done");
    //getInventory();
    await instance.methods.setApprovalForAll(marketPlaceAddress, true).send({}, (err, txHash) => {
      if (err) {
        console.log(err);
      } else {
        console.log(txHash)
      }
    });

  }
  console.log(isMarketPlaceOperator);

}


//Get kitties for breeding that are not selected
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
    price = Web3.utils.fromWei(price, 'ether');
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
async function contractCatalog() {
  var arrayId = await marketPlaceInstance.methods.getAllTokenOnSale().call();
  for (i = 0; i < arrayId.length; i++) {
    if (arrayId[i] != "0") {
      appendKitty(arrayId[i])
    }
  }
}

//Get kittues of a current address
async function myKitties() {
  var arrayId = await instance.methods.tokensOfOwner(owner).call();
  for (i = 0; i < arrayId.length; i++) {
    appendKitty(arrayId[i])
  }
}

//Get kitties for breeding that are not selected
async function breedKitties(gender) {
  var arrayId = await instance.methods.tokensOfOwner(owner).call();
  for (i = 0; i < arrayId.length; i++) {
    appendBreed(arrayId[i], gender)
  }
}

// Checks that the user address is same as the cat owner address
//This is use for checking if user can sell this cat
async function catOwnership(id) {

  var address = await instance.methods.ownerOf(id).call()

  if (address.toLowerCase() == owner.toLowerCase()) {
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



