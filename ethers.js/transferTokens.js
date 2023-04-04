require("dotenv").config()
const {ethers} =require('ethers')
const provider= new ethers.providers.JsonRpcProvider(`https://sepolia.infura.io/v3/b6c8fd9d4eb0433eb013c0cde17cf5b0`);
const contractAddress=process.env.CONTRACT_ADDRESS;
const abi=["Your abi File here"];
const senderPrivateKey = process.env.MY_PRIVATE_KEY;
const senderWallet = new ethers.Wallet(senderPrivateKey, provider)
const contract = new ethers.Contract(contractAddress, abi, senderWallet);
const recipient=process.env.RECIPIENT_ADDRESS;
const amount = ethers.utils.parseEther("1.0"); // 1.0 token
const eventName = 'Transfer';
const abi1 = ["function transfer(address recipient, uint256 amount)"];
const iface = new ethers.utils.Interface(abi1);

const transferTokens = async () => {
    const transaction = await contract.transfer(recipient, amount);
    console.log(`Transaction hash: ${transaction.hash}`);

    contract.on(eventName, (from, to, value) => {
    console.log(`${from} sent ${value} tokens to ${to}`);});
	const Data = iface.encodeFunctionData("transfer", [recipient, amount]);

	console.log("Encoded data:", Data);

	const decodedData = iface.decodeFunctionData("transfer", Data);
	console.log("Decoded data:", decodedData);
}
   
transferTokens();
