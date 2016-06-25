const Client = require('node-rest-client').Client;
const client = new Client();

return client.get('https://s2.bitcoinwisdom.com/period?step=604800&symbol=bitfinexbtcusd', (data, result) => {
  var arrayLength = data.length - 1;
  var initPoint = arrayLength - 30;
  var maList = new Array();
  var maValue = 0;

  console.log(arrayLength)

  for(var i = 0; i <= 30; i++){
    console.log(initPoint + i)
    //console.log(data[initPoint + i][3])
    maList.push(data[initPoint + i][3]);
  }

  console.log(maList.length)

  maList.forEach((ma) => {
    maValue = maValue + parseFloat(ma);

  });
  console.log(maValue)

  console.log(maValue / 30)
});
/*
var arrayLol = [20, 22, 24, 25, 23, 26, 28, 26, 29, 27];
console.log(arrayLol.length)*/
