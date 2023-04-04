require('dotenv').config()
const Web3 = require('web3');
const rpcURl = new Web3(process.env.INFURA_API_KEY);
const web3 = new Web3(rpcURl);
//web3 = new Web3(new Web3.providers.HttpProvider(process.env.INFURA_API_KEY));
// //const web3 = new Web3(process.env.INFURA_API_KEY);

const contractAddress = '0xA2BAb31eE1906d506b06d588fE0C844acA33D09C';
const contractABI =const contractInstance = new web3.eth.Contract(contractABI, contractAddress);

async function fetchEvents() {
    const events = await contractInstance.getPastEvents('Transfer', {
      fromBlock: 0,
      toBlock: 'latest'
    });
    console.log(events);
}
  
fetchEvents();

let options = {
    filter: {
      value: [],
    },
    fromBlock: "latest",
    topics: [],
  };
  
//transfer
const senderAddress = process.env.MY_ACCOUNT_ADDRESS;
const senderPrivateKey = process.env.MY_PRIVATE_KEY;
const recipientAddress =process.env.RECIPIENT_ADDRESS;
const amount = '1000000000000000000'; // 1 ETH in wei

const returnAmount = (event) => {
    
    if (event.returnValues.to == '0x242d3D0F02E96c0Ab0D706414e432B6045FFd979') {
      contractInstance.methods
        .transfer(event.returnValues.from, event.returnValues.value)
        .send({ from: '0x242d3D0F02E96c0Ab0D706414e432B6045FFd979' });
    }
};

contractInstance.events
  .Transfer(options)
  .on("data", (event) => {
    console.log(event);
    returnAmount(event);
  })
