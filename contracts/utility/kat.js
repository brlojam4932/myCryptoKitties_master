const Web3 = require("web3")
const rpcURL = 'HTTP://127.0.0.1:7545'
const web3 = new Web3(rpcURL)

const address = '0x32350Db990F46B8CdD7F2404A6b0357bd9EEcbd0';

web3.eth.getBlock("latest", (err, result) => {
  console.log(result);
})

const contract = new wew3.eth.Contract(abi, address);

const owner = '0x01f53c07C4C32F6C2f16AAEbC52563882eEAB034';

//console.log(contract);