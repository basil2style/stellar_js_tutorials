var StellarSdk = require('stellar-sdk');
var pair = StellarSdk.Keypair.random();

// SAV76USXIJOBMEQXPANUOQM6F5LIOTLPDIDVRJBFFE2MDJXG24TAPUU7
console.log("Stellar Secret Key :" + pair.secret());
console.log("Stellar Public Key :" + pair.publicKey());

// GCFXHS4GXL6BVUCXBWXGTITROWLVYXQKQLF4YH5O5JT3YZXCYPAFBJZB