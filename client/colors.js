var web3 = new Web3(Web3.givenProvider);

var instance;
var user;

var contractAddress = "0xF37da0393B3866Ac1546bf65Fc59eDF4d368e302";
var contratOwner;

$(document).ready(function(){
  window.ethereum.enable().then(function(accounts){
    instance = new web3.eth.Contract(colorAbi, contractAddress, {from: accounts[0]});
    user = accounts[0];

    console.log(instance);
  })
})



//web3.eth.getAccounts(console.log);

