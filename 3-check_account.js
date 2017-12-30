var StellarSdk = require('stellar-sdk');
var server = new StellarSdk.Server('https://horizon-testnet.stellar.org');
var Secret_key = "SDOWJROAZS6WXQ5E7CRERJQDRFCOEPOR22NOJABCEEBPQFMXFPUGWHSZ"
var Public_key = "GABFCAHZTO7KRAQK5KBZBAZUS3H4D6CHYF3F4O4QJTYF76OVCGA54OHJ"

server.loadAccount(Public_key).then(function (account) {
   if (account) {
        //console.log('Balances for account: ' + pair.publicKey());
        console.log("Found account");
        console.log(account);
        account.balances.forEach(function (balance) {
            console.log('Type:', balance.asset_type, ', Balance:', balance.balance);
        });
    } else {
        console.log("There was some unexpected error");
    }

});
