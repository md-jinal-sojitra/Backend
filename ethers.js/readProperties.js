require('dotenv').config()
const {ethers} =require('ethers')
const provider= new ethers.providers.JsonRpcProvider(`https://sepolia.infura.io/v3/b6c8fd9d4eb0433eb013c0cde17cf5b0`);
const contractAddress=process.env.CONTRACT_ADDRESS;
const abi=["Your abi file here"];
const contract = new ethers.Contract(contractAddress, abi, provider);

async function getInfo(){
const name = await contract.name();
console.log(name);

const symbol = await contract.symbol();
console.log(symbol);

const weiAmount = await contract.totalSupply();
const totalSupply = ethers.utils.formatEther(weiAmount);
console.log(totalSupply);

const weiBalance = await contract.balanceOf(process.env.MY_ACCOUNT_ADDRESS);
const balanceOfOwner = ethers.utils.formatEther(weiBalance);
console.log(balanceOfOwner);
}

getInfo();
