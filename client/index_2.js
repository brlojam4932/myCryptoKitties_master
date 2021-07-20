const forwarderOrigin = 'http://localhost:8000';

//import MetaMaskOnboarding from '@metamask/onboarding'
//import MetaMaskOnboarding, { isMetaMaskInstalled as _isMetaMaskInstalled } from '@metamask///onboarding';
  

const initialize = () => {
  //Basic Actions Section
  const onboardButton = document.querySelector('#connectButton');
  const getAccountsButton = document.querySelector('#getAccountsButton');
  const getAccountsResult = document.querySelector('getAccountsResult');

  //Created check function to see if the MetaMask extension is installed
  const isMetaMaskInstalled = () => {
    //Have to check the ethereum binding on the window object to see if it's installed
    const { ethereum } = window;
    return Boolean(ethereum && ethereum.isMetaMask);
  };

//We create a new MetaMask onboarding object to use in our app
const onboarding = new MetaMaskOnboarding({ forwarderOrigin });

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
      console.log('Connect');
      $("#metamaskStatus").text('Connect');
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

  // -----------------get cat--------------////

var instance;
var user;
var contractAddress = "0x7e3F5A793F318D8e0665565c16ae3adEc7E1d5a5";

sendEthButton.addEventListener('click', () => {
  ethereum
    .request({
      method: 'eth_sendTransaction',
      params: [
        {
          from: accounts[0],
          to: '0x7e3F5A793F318D8e0665565c16ae3adEc7E1d5a5',
          value: '0x29a2241af62c0000',
          gasPrice: '0x09184e72a000',
          gas: '0x2710',
        },
      ],
    })
    .then((txHash) => console.log(txHash))
    .catch((error) => console.error);
});

    
    // -----------------get cat--------------////


  //})
};

window.addEventListener('DOMContentLoaded', initialize);