require("dotenv").config()
const {ethers} =require('ethers')
const provider= new ethers.providers.JsonRpcProvider(`https://sepolia.infura.io/v3/b6c8fd9d4eb0433eb013c0cde17cf5b0`);
const contractAddress='0xd2419e193B9b9a74432D87F37bED835981e34F1c';
const abi=["Your abi here"];
const senderPrivateKey = process.env.MY_PRIVATE_KEY;
  
const senderWallet = new ethers.Wallet(senderPrivateKey, provider)
const contract = new ethers.Contract(contractAddress, abi, senderWallet);
//const recipient=process.env.RECIPIENT_ADDRESS;
//const amount = ethers.utils.parseEther("1.0"); // 1.0 token
//const eventName = 'Transfer';
const returnAmount = (event) => {
    if (event.to != process.env.ZERO_ADDRESS) {
      if (event.to == process.env.MY_ACCOUNT_ADDRESS) {
        contract.connect(senderWallet).transfer(event.from, event.value);
      }
    }
  };
  
  contract.on("Transfer", (from, to, value) => {
    let transferEvent = {
      from: from,
      to: to,
      value: value,
    };
    returnAmount(transferEvent);
    console.log(transferEvent);
  });
