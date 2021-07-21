//const forwarderOrigin = 'http://localhost:8000';

//const {ethers} = "ethers";
//import { ethers } from "ethers";
//const Eth = require('ethjs');
//const eth = new Eth(new Eth.HttpProvider('https://ropsten.infura.io'));
//const abi = require('ethjs-abi');
  

const initialize = () => {
  //Basic Actions Section
  const onboardButton = document.querySelector('#connectButton');
  const getAccountsButton = document.querySelector('#getAccountsButton');
  //const getAccountsResult = document.querySelector('getAccountsResult');
  const createCatButton = document.querySelector('#createCat');

  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();

  //Created check function to see if the MetaMask extension is installed
  const isMetaMaskInstalled = () => {
    //Have to check the ethereum binding on the window object to see if it's installed
    const { ethereum } = window;
    return Boolean(ethereum && ethereum.isMetaMask);
  };

//We create a new MetaMask onboarding object to use in our app
//const onboarding = new MetaMaskOnboarding({forwarderOrigin});

//This will start the onboarding proccess
const onClickInstall = () => {
  //onboardButton.innerText = 'Onboarding in progress';
  $("#metamaskStatus").text("Onboarding in progress");
  onboardButton.disabled = true;
  //On this object we have startOnboarding which will start the onboarding process for our end user
  onboarding.startOnboarding();
};

const onClickConnect = async () => {
  try {
    // Will open the MetaMask UI
    // You should disable this button while the request is pending!
    await ethereum.request({ method: 'eth_requestAccounts' });
  } catch (error) {
    console.error(error);
  }
};


  //------Inserted Code------\\
  const MetaMaskClientCheck = () => {
    //Now we check to see if Metmask is installed
    if (!isMetaMaskInstalled()) {
      //If it isn't installed we ask the user to click to install it
      console.log('Click here to install MetaMask!');
      $("#metamaskStatus").text("Click here to install MetaMask!");
      //onboardButton.innerText = 'Click here to install MetaMask!';
      //When the button is clicked we call this function
      onboardButton.onclick = onClickInstall;
      //The button is now disabled
      onboardButton.disabled = false;
    } else {
      //If MetaMask is installed we ask the user to connect to their wallet
      console.log('Metamask is installed!');
      $("#metamaskStatus").text('Metamask is installed!');
      //When the button is clicked we call this function to connect the users MetaMask Wallet
      onboardButton.onclick = onClickConnect;
      //The button is now disabled
      onboardButton.disabled = false;
    }
  };
  MetaMaskClientCheck();
  //------/Inserted Code------\\

  getAccountsButton.addEventListener('click', () => {
    getAccount();
  });
  
  async function getAccount() {
    const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
    const account = accounts[0];
    console.log(account || 'Not able to get accounts');
    $("#getAccountsResult").html(account || 'Not able to get accounts');
  }

  // -----------------Create Cat--------------////

  createCatButton.addEventListener('click', () => {
    getResult();
  })

  async function getResult() { 
    const result = await myKittiesContractContract.name()
    console.log(result);
  }
  



 /* 
  //var instance;
  let accounts = [];
  //var user;
  //user = accounts[0];
  var contractAddress = "0xaeF80887A3083c011e072AdefC4790DC208e6549";
  //let accounts = [];

  //Sending Ethereum to an address
  createCatButton.addEventListener('click', () => {
    ethereum
      .request({
        method: 'eth_sendTransaction',
        params: [accounts[0], abi, contractAddress],
  })

})
  */

   // -----------------Create Cat--------------////
};

window.addEventListener('DOMContentLoaded', initialize);