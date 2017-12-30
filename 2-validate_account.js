var StellarSdk = require('stellar-sdk');
var pair = StellarSdk.Keypair.random();
var request = require('request');

console.log("Stellar Secret Key :" + pair.secret());
console.log("Stellar Public Key :" + pair.publicKey());

request.get({
    url: 'https://horizon-testnet.stellar.org/friendbot',
    qs: {
        addr: pair.publicKey()
    },
    json: true
}, function(err, response, body) {
    if (err || response.statusCode !== 200) {
        console.error('ERROR!', err || body);
      }
      else {
        console.log('SUCCESS! You have a new account :)\n', body);
      }
});