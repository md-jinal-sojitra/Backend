require('dotenv').config()
let Web3 = require('web3');
Web3 = new Web3(new Web3.providers.HttpProvider('https://sepolia.infura.io/v3/b6c8fd9d4eb0433eb013c0cde17cf5b0'));
//const web3 = new Web3(process.env.INFURA_API_KEY);

const contractAddress = process.env.ERC20_CONTRACT_ADDRESS;
const contractABI = ["Your abi file here];

const contractInstance = new Web3.eth.Contract(contractABI, contractAddress);

const senderPrivateKey = process.env.MY_PRIVATE_KEY;

const sendTransaction = async () => {
    const gasPrice = await Web3.eth.getGasPrice();
    const nonce = await Web3.eth.getTransactionCount(process.env.MY_ACCOUNT_ADDRESS);
  
    const tx = {
      from: process.env.MY_ACCOUNT_ADDRESS,
      to: '0x242d3D0F02E96c0Ab0D706414e432B6045FFd979',
      gasPrice: gasPrice,
      gasLimit: 100000, // set the gas limit to a reasonable value
      nonce: nonce,
      data: contractInstance.methods.transfer('0x242d3D0F02E96c0Ab0D706414e432B6045FFd979', 1000000000000000000n).encodeABI()
    };
   
    const signedTx = await Web3.eth.accounts.signTransaction(tx, senderPrivateKey);
  
    const receipt = await Web3.eth.sendSignedTransaction(signedTx.rawTransaction);
    console.log(receipt);
	const test=await contractInstance.methods.balanceOf('0x242d3D0F02E96c0Ab0D706414e432B6045FFd979').call()
	console.log("BALANCE: "+test)

};
  
sendTransaction();
  
async function fetchEvents() {
      const events = await contractInstance.getPastEvents('Transfer', {
        fromBlock: 0,
        toBlock: 'latest'
      });
      console.log(events);
}
    
fetchEvents();
