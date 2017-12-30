//Stellar stores and communicates transaction data in a binary format called XDR

var StellarSdk = require('stellar-sdk');
StellarSdk.Network.useTestNetwork();

var Secret_key = "SDOWJROAZS6WXQ5E7CRERJQDRFCOEPOR22NOJABCEEBPQFMXFPUGWHSZ"
var Public_key = "GABFCAHZTO7KRAQK5KBZBAZUS3H4D6CHYF3F4O4QJTYF76OVCGA54OHJ"

var server = new StellarSdk.Server('https://horizon-testnet.stellar.org');
var sourceKeys = StellarSdk.Keypair
    .fromSecret(Secret_key);
var destinationId = 'GA2C5RFPE6GCKMY3US5PAB6UZLKIGSPIUKSLRB6Q723BM2OARMDUYEJ5';

// First, check to make sure that the destination account exists.
// You could skip this, but if the account does not exist, you will be charged
// the transaction fee when the transaction fails.

server.loadAccount(destinationId)
    .catch(StellarSdk.NotFoundError, function (error) {
        throw new Error('The destination account does not exist!');
    })
    .then(function () {
        return server.loadAccount(sourceKeys.publicKey());
    })
    .then(function (sourceAccount) {
        // Start building the transaction.
        var transaction = new StellarSdk.TransactionBuilder(sourceAccount)
            .addOperation(StellarSdk.Operation.payment({
                destination: destinationId,
                // Because Stellar allows transaction in many currencies, you must
                // specify the asset type. The special "native" asset represents Lumens.
                asset: StellarSdk.Asset.native(),
                amount: "10"
            }))
            // A memo allows you to add your own metadata to a transaction. It's
            // optional and does not affect how Stellar treats the transaction.
            .addMemo(StellarSdk.Memo.text('Test Transaction'))
            .build();
        transaction.sign(sourceKeys);
        // And finally, send it off to Stellar!
        return server.submitTransaction(transaction);
    })
    .then(function (result) {
        console.log('Success! Results:', result);
    })
    .catch(function (error) {
        console.error('Something went wrong!', error);
    });