require("dotenv").config();

const ethers = require("ethers");


const {API_KEY_ALCHEMY, PRIVATE_KEY, API_URL_ALCHEMY } =
  process.env;



async function main() {
  // Connect to the network
  const provider = new ethers.AlchemyProvider(80001, API_KEY_ALCHEMY);
 

 
  let wallet = new ethers.Wallet(PRIVATE_KEY);
   // Connect the wallet to the provider
  wallet = wallet.connect(provider);

  console.log(provider)
  // The transaction data

  let transaction = {
      to: "0x3a085Fa64b3d4DF98e3BF4a869Ea0d6E3082d8c3",
      value: 1, 
  };

  // Sign the transaction
  let signedTransaction = await wallet.signTransaction(transaction);

  // Send the transaction
  let tx = await wallet.sendTransaction(transaction);
  console.log(tx.hash);
}

main();