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
      $.sendMessage("Las estadisticas son:  \nCompra " + numberWithCommas(buy.toFixed(2)) + "Bs. \nVenta " + numberWithCommas(sell.toFixed(2)) + "Bs. \nPromedio " + numberWithCommas(rate_vef.toFixed(2)) + "Bs. \n@UnF3rn4nd1t0");
  });
}

exports.bitfinex = function($){
  client.get('https://api.bitfinex.com/v1/pubticker/btcusd', function(data, response){
    var rate_usd = parseFloat(data.high) + parseFloat(data.low);
        rate_usd = rate_usd / 2;
    botan.track($.message, 'User answer');
    $.sendMessage("Las estadisticas son:  \nCompra " + data.bid + "$ \nVenta " + data.ask + "$ \nPromedio " + rate_usd.toFixed(2) + "$ \n@UnF3rn4nd1t0");
  });
}

exports.foxbit = function($){
  client.get('https://api.blinktrade.com/api/v1/BRL/ticker', function(data, response){
      data = JSON.parse(data);
      var rate_brl = parseFloat(data.high) + parseFloat(data.low);
          rate_brl = rate_brl / 2;
      botan.track($.message, 'User answer');
      $.sendMessage("Las estadisticas son:  \nCompra " + numberWithCommas(data.buy) + "R$ \nVenta " + numberWithCommas(data.sell) + "R$ \nPromedio " + rate_brl + "R$ \n@UnF3rn4nd1t0");
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
      botan.track($.message, 'User answer');
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
      botan.track($.message, 'User answer');
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
      botan.track($.message, 'User answer');
      $.sendMessage("El precio Bitven actual es " + numberWithCommas(rate_bitven.toFixed(2)) + " Bs. por 1 BTC");
    });
  });
}

exports.kraken = function($){
  client.get('https://api.kraken.com/0/public/Ticker?pair=BTCEUR', (data, response) => {
    botan.track($.message, 'User answer');
    $.sendMessage("Las estadisticas en EUR son:  \nCompra " + parseFloat(data.result.XXBTZEUR.b[0]).toFixed(2) + "€ \nVenta " + parseFloat(data.result.XXBTZEUR.a[0]).toFixed(2) + "€ \nPromedio " + parseFloat(data.result.XXBTZEUR.c[0]).toFixed(2) + "€ \n@UnF3rn4nd1t0");
  });

  client.get('https://api.kraken.com/0/public/Ticker?pair=XBTUSD', (data, response) => {
    botan.track($.message, 'User answer');
    $.sendMessage("USD: \nCompra " + parseFloat(data.result.XXBTZUSD.b[0]).toFixed(2) + "$ \nVenta " + parseFloat(data.result.XXBTZUSD.a[0]).toFixed(2) + "$ \nPromedio " + parseFloat(data.result.XXBTZUSD.c[0]).toFixed(2) + "$ \n@UnF3rn4nd1t0");
  });
}

exports.krakenEther = function($){
  client.get('https://api.kraken.com/0/public/Ticker?pair=ETHEUR', (data, response) => {
    botan.track($.message, 'User answer');
    $.sendMessage("Las estadisticas en EUR son:  \nCompra " + parseFloat(data.result.XETHZEUR.b[0]).toFixed(2) + "€ \nVenta " + parseFloat(data.result.XETHZEUR.a[0]).toFixed(2) + "€ \nPromedio " + parseFloat(data.result.XETHZEUR.c[0]).toFixed(2) + "€ \n@UnF3rn4nd1t0");
  });

  client.get('https://api.kraken.com/0/public/Ticker?pair=ETHUSD', (data, response) => {
    botan.track($.message, 'User answer');
    $.sendMessage("USD: \nCompra " + parseFloat(data.result.XETHZUSD.b[0]).toFixed(2) + "$ \nVenta " + parseFloat(data.result.XETHZUSD.a[0]).toFixed(2) + "$ \nPromedio " + parseFloat(data.result.XETHZUSD.c[0]).toFixed(2) + "$ \n@UnF3rn4nd1t0");
  });
}

exports.argenBTC = function($){
  client.get('https://www.argenbtc.com/public/cotizacion_json.php', function(data, response){
    botan.track($.message, 'User answer');
    var data = JSON.parse(data);
    $.sendMessage("Las estadisticas de ArgenBTC son: \ncompra: " + data.btc_compra  + " ARS \nVenta: " + data.btc_venta + " ARS \nPromedio: " + data.btc_promedio + " ARS \nGracias por usar el bot! \@UnF3rn4nd1t0")
  });
}
