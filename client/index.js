
//==================Ivan on Tech Code===============================

var web3 = new Web3(Web3.givenProvider);

// event listeners and buttons---------
// https://youtu.be/NseL8v9EH_Q

const onboardButton = document.querySelector('#connectButton');

const getAccountsButton = document.querySelector('#getAccounts');
const viewCatResult = document.querySelector('#catResultId');

// event listeners and buttons---------

if (typeof window.ethereum !== 'undefined') {
  console.log('MetaMask is installed!');
  $("#metamaskStatus").text("MetaMask is installed!");
}

// ----------------------get cat-------------------------------------------

var instance;
var user;
var contractAddress = "0x7e3F5A793F318D8e0665565c16ae3adEc7E1d5a5";

$(document).ready(function(){
  window.ethereum.enable().then(function(accounts){
    instance = new web3.eth.Contract(abi, contractAddress, {from: accounts[0]});
    user = accounts[0];

    console.log(instance);

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


    getAccountsButton.addEventListener('click', async () => {
      //we use eth_accounts because it returns a list of addresses owned by us.
      const accounts = await ethereum.request({ method: 'eth_accounts' });
      //We take the first address in the array of addresses and display it
      getAccountsResult.innerHTML = accounts[0] || 'Not able to get accounts';
    
    });
    
/*
    catResultBtn.addEventListener('click', async() => {
      const transHash = await ethereum.request({ method: 'eth_getTransactionByHash'});
      viewCatResult.innerHTML = transHash[0] || 'Not able to get txHash'; 

    })
    */

  }) 

//==================Ivan on Tech Code===============================

