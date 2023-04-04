
require('dotenv').config()
const Web3 = require('web3');
const {abi} = './artifacts/erc20abi.js'
const web3 = new Web3(process.env.INFURA_API_KEY);
const contractABI=abi;
       

const contractAddress =process.env.ERC20_CONTRACT_ADDRESS;

const contract = new web3.eth.Contract(contractABI, contractAddress);

async function getTokenInfo() {
  const name = await contract.methods.name().call();
  const symbol = await contract.methods.symbol().call();
  const decimals = await contract.methods.decimals().call();
  const totalSupply = await contract.methods.totalSupply().call();


  console.log('Token Name:',name); 
  console.log('Token Symbol:', symbol);
  console.log('Token Decimals:', decimals);
  console.log('Token Total Supply: ',totalSupply);
}

getTokenInfo(); 
