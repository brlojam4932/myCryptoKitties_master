![cryptokitties_factory](https://user-images.githubusercontent.com/36285465/147890302-9fee468d-0671-4c73-9519-6360324bd5fd.PNG)

# myCryptoKitties_master
 academy-cryptoKitties-redo
Decentralized application for the Ethereum Network built with:

Solidity ^0.8.0
Truffle
Ganache
Infura
Web3.js and OpenZeppelin libraries

Local Host Installation:

Node.JS must be installed
npm must be installed
Truffle installed globally via npm install -g truffle.
A local blockchain via Ganache.
MetaMask
Clone the repo via git clone or DeskTop version

Deploy smart-contracts:

Run truffle migrate --network ganache (example).
Once deployed, replace the contract addresses on file client/index.js.
var contractAddress = "0x....".
var marketPlaceAddress = "0x...".
Update abi.js file by copying the myKittiesContract.json and KittyMarketPlace.json abi arrays and replacing them both in the abi.js file in the client folder.

Enable truffle-config networks for ganache. 

To start local server: open a terminal window. Make sure to be in the client folder of your app and launch the local server using the following command: python3 -m http.server 8000. You can then access the app in your browser at: http://localhost:8000/.

Link to live app: https://youthful-murdock-e07205.netlify.app
