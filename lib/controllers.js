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
      var buy  = data.buy;
      var sell = data.sell;
      botan.track($.message, 'User answer');
      $.sendMessage("Las estadisticas son:  \n Compra " + numberWithCommas(buy.toFixed(2)) + "Bs. \n Venta " + numberWithCommas(sell.toFixed(2)) + "Bs. \n Promedio " + numberWithCommas(rate_vef.toFixed(2)) + "Bs.");
  });
}

exports.bitfinex = function($){
  client.get('https://api.bitfinex.com/v1/pubticker/btcusd', function(data, response){
    var rate_usd = parseFloat(data.high) + parseFloat(data.low);
        rate_usd = rate_usd / 2;
    botan.track($.message, 'User answer');
    $.sendMessage("Las estadisticas son:  \n Compra " + data.bid + "$ \n Venta " + data.ask + "$ \n Promedio " + rate_usd.toFixed(2) + "$");
  });
}

exports.foxbit = function($){
  client.get('https://api.blinktrade.com/api/v1/BRL/ticker', function(data, response){
      data = JSON.parse(data);
      var rate_brl = parseFloat(data.high) + parseFloat(data.low);
          rate_brl = rate_brl / 2;
      botan.track($.message, 'User answer');
      $.sendMessage("Las estadisticas son:  \n Compra " + numberWithCommas(data.buy) + "R$ \n Venta " + numberWithCommas(data.sell) + "R$ \n Promedio " + rate_brl + "R$");
  });
}

exports.ether = function($){
  client.get('https://poloniex.com/public?command=returnTicker', (data, response) => {
    var result_eth = parseFloat(data.BTC_ETH.last);

    client.get('https://api.bitfinex.com/v1/pubticker/btcusd', function(data, response){
      var rate_usd = parseFloat(data.high) + parseFloat(data.low);
          rate_usd = rate_usd / 2;
      var result_convert = result_eth * rate_usd;
      botan.track($.message, 'User answer');
      $.sendMessage("Un ether cuesta: \n BTC: " + result_eth + " Ƀ \n USD: " + result_convert.toFixed(2) + " $ \n Gracias por usar el bot");
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
      botan.track($.message, 'User answer');
      $.sendMessage("Un DAO cuesta: \n BTC: " + result_dao + " Ƀ \n USD: " + result_convert.toFixed(2) + " $ \n Gracias por usar el bot");
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
      botan.track($.message, 'User answer');
      $.sendMessage("Un lisk cuesta: \n BTC: " + result_lsk + " Ƀ \n USD: " + result_convert.toFixed(2) + " $ \n Gracias por usar el bot");
    });
  });
}

exports.bitven = function($){
  client.get('https://api.bitfinex.com/v1/pubticker/btcusd', function(data, response){
    var rate_usd = parseFloat(data.high) + parseFloat(data.low);
        rate_usd = rate_usd / 2;
    client.get('http://api.bitcoinvenezuela.com/DolarToday.php?json=yes', function(data, response){
      let rate_bitven = rate_usd * data.USD.dolartoday;
      botan.track($.message, 'User answer');
      $.sendMessage("El precio Bitven actual es " + numberWithCommas(rate_bitven.toFixed(2)) + " Bs. por 1 BTC");
    });
  });
}

exports.kraken = function($){
  client.get('https://api.kraken.com/0/public/Ticker?pair=BTCEUR', (data, response) => {
    botan.track($.message, 'User answer');
    $.sendMessage("Las estadisticas en EUR son:  \n Compra " + parseFloat(data.result.XXBTZEUR.b[0]).toFixed(2) + "€ \n Venta " + parseFloat(data.result.XXBTZEUR.a[0]).toFixed(2) + "€ \n Promedio " + parseFloat(data.result.XXBTZEUR.c[0]).toFixed(2) + "€");
  });

  client.get('https://api.kraken.com/0/public/Ticker?pair=XBTUSD', (data, response) => {
    botan.track($.message, 'User answer');
    $.sendMessage("USD: \n Compra " + parseFloat(data.result.XXBTZUSD.b[0]).toFixed(2) + "$ \n Venta " + parseFloat(data.result.XXBTZUSD.a[0]).toFixed(2) + "$ \n Promedio " + parseFloat(data.result.XXBTZUSD.c[0]).toFixed(2) + "$");
  });
}

exports.krakenEther = function($){
  client.get('https://api.kraken.com/0/public/Ticker?pair=ETHEUR', (data, response) => {
    botan.track($.message, 'User answer');
    $.sendMessage("Las estadisticas en EUR son:  \n Compra " + parseFloat(data.result.XETHZEUR.b[0]).toFixed(2) + "€ \n Venta " + parseFloat(data.result.XETHZEUR.a[0]).toFixed(2) + "€ \n Promedio " + parseFloat(data.result.XETHZEUR.c[0]).toFixed(2) + "€");
  });

  client.get('https://api.kraken.com/0/public/Ticker?pair=ETHUSD', (data, response) => {
    botan.track($.message, 'User answer');
    $.sendMessage("USD: \n Compra " + parseFloat(data.result.XETHZUSD.b[0]).toFixed(2) + "$ \n Venta " + parseFloat(data.result.XETHZUSD.a[0]).toFixed(2) + "$ \n Promedio " + parseFloat(data.result.XETHZUSD.c[0]).toFixed(2) + "$");
  });
}

exports.argenBTC = function($){
  client.get('https://www.argenbtc.com/public/cotizacion_json.php', function(data, response){
    botan.track($.message, 'User answer');
    var data = JSON.parse(data);
    $.sendMessage("Las estadisticas de ArgenBTC son: \n compra: " + data.btc_compra  + " ARS \n Venta: " + data.btc_venta + " ARS \n Promedio: " + data.btc_promedio + " ARS \n Gracias por usar el bot!")
  });
}
