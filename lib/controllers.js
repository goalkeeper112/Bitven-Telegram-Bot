const Client  = require("node-rest-client").Client;
const client  = new Client();
const botan   = require('botanio')(":09oH2pUUirBAyAX_2tcc_8l7mevN8Ys");

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

exports.surbitcoin = function($){
  client.get('https://api.blinktrade.com/api/v1/VEF/ticker', function(data, response){
      data = JSON.parse(data);
      var rate_vef = parseFloat(data.high) + parseFloat(data.low);
          rate_vef = rate_vef / 2;
      var buy  = parseFloat(data.buy);
      var sell = parseFloat(data.sell);
      botan.track($.message, 'Surbitcoin');
      $.sendMessage("Estadisticas:  \nCompra " + numberWithCommas(buy.toFixed(2)) + "Bs. \nVenta " + numberWithCommas(sell.toFixed(2)) + "Bs. \nPromedio " + numberWithCommas(rate_vef.toFixed(2)) + "Bs. \n@UnF3rn4nd1t0");
  });
}

exports.bitfinex = function($){
  client.get('https://api.bitfinex.com/v1/pubticker/btcusd', function(data, response){
    var rate_usd = parseFloat(data.high) + parseFloat(data.low);
        rate_usd = rate_usd / 2;
    var bid = parseFloat(data.bid);
    var ask = parseFloat(data.ask);
    botan.track($.message, 'Bitfinex');
    $.sendMessage("Estadisticas:  \nCompra " + bid.toFixed(2) + "$ \nVenta " + ask.toFixed(2) + "$ \nPromedio " + rate_usd.toFixed(2) + "$ \n@UnF3rn4nd1t0");
  });
}

exports.bitstamp = function($){
  client.get('https://www.bitstamp.net/api/ticker/', function(data, response){
    var rate_usd = (parseFloat(data.high) + parseFloat(data.low)) / 2;
    var bid = parseFloat(data.bid);
    var ask = parseFloat(data.ask);
    botan.track($.message, 'Bitstamp');
    $.sendMessage("Estadisticas:  \nCompra " + bid.toFixed(2) + "$ \nVenta " + ask.toFixed(2) + "$ \nPromedio " + rate_usd.toFixed(2) + "$ \n@UnF3rn4nd1t0");
  });
}

exports.foxbit = function($){
  client.get('https://api.blinktrade.com/api/v1/BRL/ticker', function(data, response){
      data = JSON.parse(data);
      var rate_brl = parseFloat(data.high) + parseFloat(data.low);
          rate_brl = rate_brl / 2;
      botan.track($.message, 'Foxbit');
      $.sendMessage("Estadisticas:  \nCompra " + numberWithCommas(data.buy) + "R$ \nVenta " + numberWithCommas(data.sell) + "R$ \nPromedio " + rate_brl + "R$ \n@UnF3rn4nd1t0");
  });
}

exports.ether = function($){
  client.get('https://poloniex.com/public?command=returnTicker', (data, response) => {
    var result_eth = parseFloat(data.BTC_ETH.last);

    client.get('https://api.bitfinex.com/v1/pubticker/btcusd', function(data, response){
      var rate_usd = parseFloat(data.high) + parseFloat(data.low);
          rate_usd = rate_usd / 2;
      var result_convert = result_eth * rate_usd;
      botan.track($.message, 'Ether');
      $.sendMessage("Un ether cuesta: \nBTC: " + result_eth + " Ƀ \nUSD: " + result_convert.toFixed(2) + " $ \nGracias por usar el bot \n@UnF3rn4nd1t0");
    });
  });
}

exports.dao = function($){
  client.get('https://poloniex.com/public?command=returnTicker', (data, response) => {
    var result_dao = parseFloat(data.BTC_DAO.last);

    client.get('https://api.bitfinex.com/v1/pubticker/btcusd', function(data, response){
      var rate_usd = parseFloat(data.high) + parseFloat(data.low);
          rate_usd = rate_usd / 2;
      var result_convert = result_dao * rate_usd;
      botan.track($.message, 'DAO');
      $.sendMessage("Un DAO cuesta: \nBTC: " + result_dao + " Ƀ \nUSD: " + result_convert.toFixed(2) + " $ \nGracias por usar el bot \n@UnF3rn4nd1t0");
    });
  });
}

exports.lisk = function($){
  client.get('https://poloniex.com/public?command=returnTicker', (data, response) => {
    var result_lsk = parseFloat(data.BTC_LSK.last);

    client.get('https://api.bitfinex.com/v1/pubticker/btcusd', function(data, response){
      var rate_usd = parseFloat(data.high) + parseFloat(data.low);
          rate_usd = rate_usd / 2;
      var result_convert = result_lsk * rate_usd;
      botan.track($.message, 'Lisk');
      $.sendMessage("Un lisk cuesta: \nBTC: " + result_lsk + " Ƀ \nUSD: " + result_convert.toFixed(2) + " $ \nGracias por usar el bot \n@UnF3rn4nd1t0");
    });
  });
}

exports.bitven = function($){
  client.get('https://api.bitfinex.com/v1/pubticker/btcusd', function(data, response){
    var rate_usd = parseFloat(data.high) + parseFloat(data.low);
        rate_usd = rate_usd / 2;
    client.get('http://api.bitcoinvenezuela.com/DolarToday.php?json=yes', function(data, response){
      let rate_bitven = rate_usd * data.USD.dolartoday;
      botan.track($.message, 'Bitven');
      $.sendMessage("El precio Bitven actual es " + numberWithCommas(rate_bitven.toFixed(2)) + " Bs. por 1 BTC");
    });
  });
}

exports.kraken = function($){
  client.get('https://api.kraken.com/0/public/Ticker?pair=BTCEUR', (data, response) => {
    botan.track($.message, 'Kraken EUR');
    $.sendMessage("Las estadisticas en EUR son:  \nCompra " + parseFloat(data.result.XXBTZEUR.b[0]).toFixed(2) + "€ \nVenta " + parseFloat(data.result.XXBTZEUR.a[0]).toFixed(2) + "€ \nPromedio " + parseFloat(data.result.XXBTZEUR.c[0]).toFixed(2) + "€ \n@UnF3rn4nd1t0");
  });

  client.get('https://api.kraken.com/0/public/Ticker?pair=XBTUSD', (data, response) => {
    botan.track($.message, 'Kraken USD');
    $.sendMessage("USD: \nCompra " + parseFloat(data.result.XXBTZUSD.b[0]).toFixed(2) + "$ \nVenta " + parseFloat(data.result.XXBTZUSD.a[0]).toFixed(2) + "$ \nPromedio " + parseFloat(data.result.XXBTZUSD.c[0]).toFixed(2) + "$ \n@UnF3rn4nd1t0");
  });
}

exports.krakenEther = function($){
  client.get('https://api.kraken.com/0/public/Ticker?pair=ETHEUR', (data, response) => {
    botan.track($.message, 'Kraken Ether EUR');
    $.sendMessage("Las estadisticas en EUR son:  \nCompra " + parseFloat(data.result.XETHZEUR.b[0]).toFixed(2) + "€ \nVenta " + parseFloat(data.result.XETHZEUR.a[0]).toFixed(2) + "€ \nPromedio " + parseFloat(data.result.XETHZEUR.c[0]).toFixed(2) + "€ \n@UnF3rn4nd1t0");
  });

  client.get('https://api.kraken.com/0/public/Ticker?pair=ETHUSD', (data, response) => {
    botan.track($.message, 'Kraken Ether USD');
    $.sendMessage("USD: \nCompra " + parseFloat(data.result.XETHZUSD.b[0]).toFixed(2) + "$ \nVenta " + parseFloat(data.result.XETHZUSD.a[0]).toFixed(2) + "$ \nPromedio " + parseFloat(data.result.XETHZUSD.c[0]).toFixed(2) + "$ \n@UnF3rn4nd1t0");
  });
}

exports.argenBTC = function($){
  client.get('https://www.argenbtc.com/public/cotizacion_json.php', function(data, response){
    botan.track($.message, 'argenBTC');
    var data = JSON.parse(data);
    $.sendMessage("Las estadisticas de ArgenBTC son: \ncompra: " + data.btc_compra  + " ARS \nVenta: " + data.btc_venta + " ARS \nPromedio: " + data.btc_promedio + " ARS \nGracias por usar el bot! \n@UnF3rn4nd1t0");
  });
}

exports.dolartoday = function($){
  botan.track($.message, 'DolarToday');
  $.sendPhotoFromUrl('https://vgo1c8f60d9dtkemx.wolrdssl.net/custom/rate2.jpg?nc=1');
  $.sendMessage("El autor del bot no se hace responsable del contenido enviado, esto es solo una referencia y se insta a no usarla, me reservo el uso de la misma para fines ilicitos.");
};

exports.velaBitfinex = function($, period, time){
  var periodUse = 60 * parseInt(period);
  client.get('https://s2.bitcoinwisdom.com/period?step='+periodUse.toString()+'&symbol=bitfinexbtcusd', (data, response) => {
    var arrayLength = data.length - 1;
    botan.track($.message, "Bitfinex Period Time " + time)
    $.sendMessage("El valor de la ultima vela de "+ time +" es: \nClose: " + data[arrayLength][3] + "\nOpen: " + data[arrayLength][4] + "\nHigh: " + data[arrayLength][5] + "\nlow: " + data[arrayLength][6]);
  })
};

exports.velaKraken = function($, period, time){
  var periodUse = 60 * parseInt(period);
  client.get('https://s2.bitcoinwisdom.com/period?step='+periodUse.toString()+'&symbol=krakenbtceur', (data, response) => {
    var arrayLength = data.length - 1;
    botan.track($.message, "Kraken Period Time " + time)
    $.sendMessage("El valor de la ultima vela en EUR de "+ time +" es: \nClose: " + data[arrayLength][3] + "\nOpen: " + data[arrayLength][4] + "\nHigh: " + data[arrayLength][5] + "\nlow: " + data[arrayLength][6]);
  });
};

exports.velaBitfinexLTC = function($, period, time){
  var periodUse = 60 * parseInt(period);
  client.get('https://s2.bitcoinwisdom.com/period?step='+periodUse.toString()+'&symbol=bitfinexltcusd', (data, response) => {
    var arrayLength = data.length - 1;
    botan.track($.message, "Bitfinex LTC Period Time " + time)
    $.sendMessage("El valor de la ultima vela de "+ time +" es: \nClose: " + data[arrayLength][3] + "\nOpen: " + data[arrayLength][4] + "\nHigh: " + data[arrayLength][5] + "\nlow: " + data[arrayLength][6]);
  })
};

exports.maBitfinex = function($, period, time){
  var periodUse = 60 * parseInt(period);
  client.get('https://s2.bitcoinwisdom.com/period?step='+periodUse.toString()+'&symbol=bitfinexbtcusd', (data, response) => {
    var arrayLength = data.length;
    var initPoint = arrayLength - 30;
    var maList = new Array();
    var maValue = 0;

    for(var i = 0; i < 30; i++){
      //console.log(initPoint + i)
      console.log(data[initPoint + i][3])
      maList.push(data[initPoint + i][3]);
    }

    console.log(maList.length)

    maList.forEach((ma) => {
      maValue = maValue + parseFloat(ma);
    });

    botan.track($.message, "Bitfinex 30ma " + time)
    maValue = maValue / 29.87;
    $.sendMessage("El 30ma de "+ time +" es: " + maValue.toFixed(2));
  })
};

exports.maKraken = function($, period, time){
  var periodUse = 60 * parseInt(period);
  client.get('https://s2.bitcoinwisdom.com/period?step='+periodUse.toString()+'&symbol=krakenbtceur', (data, response) => {
    var arrayLength = data.length;
    var initPoint = arrayLength - 30;
    var maList = new Array();
    var maValue = 0;

    for(var i = 0; i < 30; i++){
      //console.log(initPoint + i)
      console.log(data[initPoint + i][3])
      maList.push(data[initPoint + i][3]);
    }

    console.log(maList.length)

    maList.forEach((ma) => {
      maValue = maValue + parseFloat(ma);
    });

    botan.track($.message, "Kraken 30ma " + time)
    maValue = maValue / 29.87;
    $.sendMessage("El 30ma de "+ time +" es: " + maValue.toFixed(2));
  })
};

exports.maLTC = function($, period, time){
  var periodUse = 60 * parseInt(period);
  client.get('https://s2.bitcoinwisdom.com/period?step='+periodUse.toString()+'&symbol=bitfinexltcusd', (data, response) => {
    var arrayLength = data.length;
    var initPoint = arrayLength - 30;
    var maList = new Array();
    var maValue = 0;

    for(var i = 0; i < 30; i++){
      //console.log(initPoint + i)
      console.log(data[initPoint + i][3])
      maList.push(data[initPoint + i][3]);
    }

    console.log(maList.length)

    maList.forEach((ma) => {
      maValue = maValue + parseFloat(ma);
    });

    botan.track($.message, "Bitfinex LTC 30ma " + time)
    maValue = maValue / 29.87;
    $.sendMessage("El 30ma de "+ time +" es: " + maValue.toFixed(2));
  })
};
