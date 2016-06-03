'use strict'

var tg     = require('telegram-node-bot')/*('194307003:AAH_s2M1p1cnCIpF_fZsvR55RGKcCoyN938')*/('126466962:AAHa0NgrPi3WDV4j6A0bFk9zCrWePhbP3Lk')
var Client = require("node-rest-client").Client;
var client = new Client();

tg.router.
    when(['/start'], 'StartController')

tg.router.
    when(['/precio :exchange'], 'ExchangeController')

tg.router.
    when(['/convert :type :amount'], 'ConvertController')

tg.router.
    when(['/ether'], 'PoloniexController')

tg.router.
    when(['/dao'], 'PoloniexController')

tg.router.
    when(['/lisk'], 'PoloniexController')


tg.controller('StartController', ($) => {
  tg.for('/start', ($) => {
    $.sendMessage("Bienvenido a Bitven Bot, Conoce el precio de bitcoin en tiempo real \n El bot posee los siguientes comandos: \n 1) /precio exchange_consultar, ejemplo: /precio bitfinex \n 2) /conversion de_a monto, ejemplo: /conversion btc_usd 2000 \n 3) /ether \n 4) /dao \n 5) /lisk \n Gracias por elegirnos :D");
  })
});

tg.controller('PoloniexController', ($) => {
    tg.for('/ether', ($) => {
      client.get('https://poloniex.com/public?command=returnTicker', (data, response) => {
        $.sendMessage("Hola, un ether cuesta lo siguiente: \n BTC: " + data.BTC_ETH.last + " btc \n Gracias por usar el bot");
      });
    });

    tg.for('/dao', ($) => {
      client.get('https://poloniex.com/public?command=returnTicker', (data, response) => {
        $.sendMessage("Hola, un DAO cuesta lo siguiente: \n BTC: " + data.BTC_DAO.last + " btc \n Gracias por usar el bot");
      });
    });

    tg.for('/lisk', ($) => {
      client.get('https://poloniex.com/public?command=returnTicker', (data, response) => {
        $.sendMessage("Hola, un lisk cuesta lo siguiente: \n BTC: " + data.BTC_LSK.last + " btc \n Gracias por usar el bot");
      });
    });
});

tg.controller('ExchangeController', ($) => {
    tg.for('/precio :exchange', ($) => {
      switch ($.query.exchange) {
        case "surbitcoin":
          client.get('https://api.blinktrade.com/api/v1/VEF/ticker', function(data, response){
              data = JSON.parse(data);
              var rate_vef = parseFloat(data.high) + parseFloat(data.low);
      				    rate_vef = rate_vef / 2;
              if($.message.from.first_name == "Doriam"){
                $.sendMessage("Hola, Mamaguevo! \n Las estadisticas son las siguientes:  \n Precio de compra " + data.buy + "Bs. \n Precio de venta " + data.sell + "Bs. \n Precio Promedio " + rate_vef + "Bs.");
              }else{
                $.sendMessage("Hola, " + $.message.from.first_name + "! \n Las estadisticas son las siguientes:  \n Precio de compra " + data.buy + "Bs. \n Precio de venta " + data.sell + "Bs. \n Precio Promedio " + rate_vef + "Bs.");
              }
          });
          break;
        case "foxbit":
          client.get('https://api.blinktrade.com/api/v1/BRL/ticker', function(data, response){
              data = JSON.parse(data);
              var rate_brl = parseFloat(data.high) + parseFloat(data.low);
      				    rate_brl = rate_brl / 2;
              if($.message.from.first_name == "Doriam"){
                $.sendMessage("Hola, Mamaguevo! \n Las estadisticas son las siguientes:  \n Precio de compra " + data.buy + "R$ \n Precio de venta " + data.sell + "R$ \n Precio Promedio " + rate_brl + "R$");
              }else{
                $.sendMessage("Hola, " + $.message.from.first_name + "! \n Las estadisticas son las siguientes:  \n Precio de compra " + data.buy + "R$ \n Precio de venta " + data.sell + "R$ \n Precio Promedio " + rate_brl + "R$");
              }
          });
          break;
        case "bitfinex":
          client.get('https://api.bitfinex.com/v1/pubticker/btcusd', function(data, response){
              var rate_usd = parseFloat(data.high) + parseFloat(data.low);
      				    rate_usd = rate_usd / 2;
              if($.message.from.first_name == "Doriam"){
                $.sendMessage("Hola, Mamaguevo! \n Las estadisticas son las siguientes:  \n Precio de compra " + data.bid + "$ \n Precio de venta " + data.ask + "$ \n Precio Promedio " + rate_usd + "$");
              }else{
                $.sendMessage("Hola, " + $.message.from.first_name + "! \n Las estadisticas son las siguientes:  \n Precio de compra " + data.bid + "$ \n Precio de venta " + data.ask + "$ \n Precio Promedio " + rate_usd + "$");
              }
        });
          break;
        default:

      }
    });
});

tg.controller('ConvertController', ($) => {
    tg.for('/convert :type :amount', ($) => {
      console.log($.query.type);
        switch ($.query.type) {
          case "btc_vef":
            var monto = parseFloat($.query.amount);

            client.get('https://api.blinktrade.com/api/v1/VEF/ticker', function(data, response){
                data = JSON.parse(data);
                var rate_vef = parseFloat(data.high) + parseFloat(data.low);
        				    rate_vef = rate_vef / 2;

                var result = monto * rate_vef;

                $.sendMessage("Hola, " + monto + " BTC equivalen a " + result.toFixed(2) + "Bs.");
            });
            break;
          case "vef_btc":
            var monto = parseFloat($.query.amount);

            client.get('https://api.blinktrade.com/api/v1/VEF/ticker', function(data, response){
                data = JSON.parse(data);
                var rate_vef = parseFloat(data.high) + parseFloat(data.low);
        				    rate_vef = rate_vef / 2;

                var result = monto / rate_vef;

                $.sendMessage("Hola, " + monto + " Bs. equivalen a " + result.toFixed(8) + " BTC");
            });
            break;
          case "btc_brl":
            var monto = parseFloat($.query.amount);

            client.get('https://api.blinktrade.com/api/v1/BRL/ticker', function(data, response){
                data = JSON.parse(data);
                var rate_brl = parseFloat(data.high) + parseFloat(data.low);
        				    rate_brl = rate_brl / 2;

                var result = monto * rate_brl;

                $.sendMessage("Hola, " + monto + " BTC equivalen a " + result.toFixed(2) + "R$");
            });
            break;
          case "brl_btc":
            var monto = parseFloat($.query.amount);
            client.get('https://api.blinktrade.com/api/v1/BRL/ticker', function(data, response){
                data = JSON.parse(data);
                var rate_brl = parseFloat(data.high) + parseFloat(data.low);
                    rate_brl = rate_brl / 2;

                var result = monto / rate_brl;

                $.sendMessage("Hola, " + monto + " R$ equivalen a " + result.toFixed(8) + " BTC");
            });
            break
          case "btc_usd":
            var monto = parseFloat($.query.amount);

            client.get('https://api.bitfinex.com/v1/pubticker/btcusd', function(data, response){
                var rate_usd = parseFloat(data.high) + parseFloat(data.low);
        				    rate_usd = rate_usd / 2;

                var result = monto * rate_usd;

                $.sendMessage("Hola, " + monto + " BTC equivalen a " + result.toFixed(2) + "$");
            });
            break;
          case "usd_btc":
            var monto = parseFloat($.query.amount);

            client.get('https://api.bitfinex.com/v1/pubticker/btcusd', function(data, response){
                var rate_usd = parseFloat(data.high) + parseFloat(data.low);
        				    rate_usd = rate_usd / 2;

                var result = monto / rate_usd;

                $.sendMessage("Hola, " + monto + " $ equivalen a " + result.toFixed(8) + " BTC");
            });
            break;
          case "btc_ether":
            var monto = parseFloat($.query.amount);

            client.get('https://poloniex.com/public?command=returnTicker', (data, response) => {
              var result_ether = monto / parseFloat(data.BTC_ETH.last);
              $.sendMessage("Hola, " + monto + " btc equivalen a " + result_ether.toFixed(8) + " ETH");
            });

            break;
          case "btc_dao":
            var monto = parseFloat($.query.amount);

            client.get('https://poloniex.com/public?command=returnTicker', (data, response) => {
              var result_ether = monto / parseFloat(data.BTC_DAO.last);
              $.sendMessage("Hola, " + monto + " btc equivalen a " + result_ether.toFixed(8) + " DAO");
            });

            break;
          case "btc_lisk":
            var monto = parseFloat($.query.amount);

            client.get('https://poloniex.com/public?command=returnTicker', (data, response) => {
              var result_ether = monto / parseFloat(data.BTC_LSK.last);
              $.sendMessage("Hola, " + monto + " btc equivalen a " + result_ether.toFixed(8) + " LSK");
            });

            break;
          default:
              $.sendMessage("Hola, No reconozco ese comando, por favor envia /start para conocer las instrucciones");
        }
    })
})
