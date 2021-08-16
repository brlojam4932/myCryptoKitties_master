
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
var contractAddress = "0x0605E99b78410562fC61cC06c12bCA7036A201e0";

$(document).ready(function(){
  window.ethereum.enable().then(function(accounts){
    instance = new web3.eth.Contract(abi, contractAddress, {from: accounts[0]});
    user = accounts[0];

    console.log(instance);

    instance.events.Birth().on('data', function(event) { //function with callback
      console.log(event);
      let owner = event.returnValues.owner;
      let kittenId = event.returnValues.newKittenId;
      let mumId = event.returnValues.mumId;
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
    
  // -----------------create cat--------------////

    getAccountsButton.addEventListener('click', async () => {
      //we use eth_accounts because it returns a list of addresses owned by us.
      const accounts = await ethereum.request({ method: 'eth_accounts' });
      const account = accounts[0];
      //We take the first address in the array of addresses and display it
      console.log(account || 'Not able to get accounts');
      $("#getAccountsResult").html(account || 'Not able to get accounts');
      //getAccountsResult.innerHTML = accounts[0] || 'Not able to get accounts';
    
    });

  }) 

//==================Ivan on Tech Code===============================

