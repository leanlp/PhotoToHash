const { ec } = require('elliptic');
const EthereumTx = require('ethereumjs-tx').Transaction;
const utils = require('ethereumjs-util');
require("dotenv").config();




const {API_KEY_ALCHEMY, PRIVATE_KEY, API_URL_ALCHEMY } =
  process.env;

const ellipticCurve = new ec('secp256k1');

// Your private key
const P = PRIVATE_KEY; 
const privateKeyBuffer = Buffer.from(PRIVATE_KEY, 'hex');

// Transaction details
const rawTx = {
  nonce: '0x00', // Replace with the actual nonce
  gasPrice: '0x09184e72a000', 
  gasLimit: '0x2710',
  to: '0x6f6eb030334642D3D1527B3D1b05fb08C16852d5', 
  value: '0x00', 
  data: '0x',  // No data for simple ether transfer
  chainId: 80001 // Mainnet
};

// Create a transaction object
const tx = new EthereumTx(rawTx, { chain: 'mainnet', hardfork: 'petersburg' });

// Sign the transaction
const keyPair = ellipticCurve.keyFromPrivate(PRIVATE_KEY);
const signature = keyPair.sign(tx.hash);
console.log(signature.toDER)

// Set the signature values in the transaction object
tx.r = Buffer.from(signature.r.toString(16, 64), 'hex');
tx.s = Buffer.from(signature.s.toString(16, 64), 'hex');
tx.v = signature.recoveryParam + 27; // Ethereum's v value

// Serialize the signed transaction
const serializedTx = tx.serialize();

console.log("Signed Transaction:", utils.bufferToHex(serializedTx));



const r = signature.r.toString(16).padStart(64, '0');
const s = signature.s.toString(16).padStart(64, '0');
let v = (signature.recoveryParam + 27).toString(16).padStart(2, '0'); 

// Concatenate r, s, and v components to get the full signature in hex format
const signatureHex = '0x' + r + s + v;

console.log("Signature in Hex:", signatureHex);

// Get the hash of the transaction
const txHash = tx.hash(false);
console.log("Transaction Hash:", utils.bufferToHex(txHash));