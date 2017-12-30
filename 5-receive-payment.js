var StellarSdk = require('stellar-sdk');
StellarSdk.Network.useTestNetwork();

var server = new StellarSdk.Server('https://horizon-testnet.stellar.org');
var accountId = 'GABFCAHZTO7KRAQK5KBZBAZUS3H4D6CHYF3F4O4QJTYF76OVCGA54OHJ';

// Create an API call to query payments involving the account.
var payments = server.payments().forAccount(accountId);

// If some payments have already been handled, start the results from the
// last seen payment. (See below in `handlePayment` where it gets saved.)
var lastToken = loadLastPagingToken();
if (lastToken) {
  payments.cursor(lastToken);
}
// `stream` will send each recorded payment, one by one, then keep the
// connection open and continue to send you new payments as they occur.

payments.stream({
    onmessage: function(payment) {
      // Record the paging token so we can start from here next time.
      savePagingToken(payment.paging_token);
  
      // The payments stream includes both sent and received payments. We only
      // want to process received payments here.
      if (payment.to !== accountId) {
        return;
      }
  
      // In Stellar’s API, Lumens are referred to as the “native” type. Other
      // asset types have more detailed information.
      var asset;
      if (payment.asset_type === 'native') {
        asset = 'lumens';
      }
      else {
        asset = payment.asset_code + ':' + payment.asset_issuer;
      }
  
      console.log(payment.amount + ' ' + asset + ' from ' + payment.from);
    },
  
    onerror: function(error) {
      console.error('Error in payment stream');
    }
  });
  
