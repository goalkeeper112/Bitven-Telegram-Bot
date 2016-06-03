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
          default:

        }
    })
})

/*var TelegramBot = require("node-telegram-bot-api");
var Client     = require("node-rest-client").Client;

var token = "126466962:AAHa0NgrPi3WDV4j6A0bFk9zCrWePhbP3Lk";

var bot    = new TelegramBot(token, {polling: true});
var client = new Client();

bot.onText(/\/start/, function(msg){
  var fromID = msg.chat.id;

  bot.sendMessage(fromID, "Bienvenido a Bitven Bot, Conoce el precio de bitcoin en tiempo real \n El bot posee los siguientes comandos: \n 1) /precio exchange_consultar, ejemplo: /precio bitfinex \n 2) /conversion de_a monto, ejemplo: /conversion btc_usd 2000 \n Gracias por elegirnos :D");
});

bot.onText(/\/precio (.+)/, function(msg, match){
  var fromID = msg.from.id;
  var resp = match[1];

  switch (resp) {
    case "surbitcoin":
      client.get('https://api.blinktrade.com/api/v1/VEF/ticker', function(data, response){
          data = JSON.parse(data);
          var rate_vef = parseFloat(data.high) + parseFloat(data.low);
  				  rate_vef = rate_vef / 2;
          bot.sendMessage(fromID, "Hola, " + msg.from.first_name + "! \n Las estadisticas son las siguientes:  \n Precio de compra " + data.buy + "Bs. \n Precio de venta " + data.sell + "Bs. \n Precio Promedio " + rate_vef + "Bs.");
      });
      break;
    case "foxbit":
      client.get('https://api.blinktrade.com/api/v1/BRL/ticker', function(data, response){
          data = JSON.parse(data);
          var rate_brl = parseFloat(data.high) + parseFloat(data.low);
  				    rate_brl = rate_brl / 2;
          bot.sendMessage(fromID, "Hola, " + msg.from.first_name + "! \n Las estadisticas son las siguientes:  \n Precio de compra " + data.buy + "R$ \n Precio de venta " + data.sell + "R$ \n Precio Promedio " + rate_brl + "R$");
      });
      break;
    case "bitfinex":
      client.get('https://api.bitfinex.com/v1/pubticker/btcusd', function(data, response){
          var rate_usd = parseFloat(data.high) + parseFloat(data.low);
  				    rate_usd = rate_usd / 2;
          bot.sendMessage(fromID, "Hola, " + msg.from.first_name + "! \n Las estadisticas son las siguientes:  \n Precio de compra " + data.bid + "$ \n Precio de venta " + data.ask + "$ \n Precio Promedio " + rate_usd + "$");
    });
      break;
    default:

  }
});

bot.onText(/\/conversion (.+) (.+)/, function(msg, match){
  var fromID = msg.from.id;

  switch (match[1]) {
    case "btc_vef":
      var monto = parseFloat(match[2]);

      client.get('https://api.blinktrade.com/api/v1/VEF/ticker', function(data, response){
          data = JSON.parse(data);
          var rate_vef = parseFloat(data.high) + parseFloat(data.low);
  				    rate_vef = rate_vef / 2;

          var result = monto * rate_vef;

          bot.sendMessage(fromID, "Hola, " + monto + " BTC equivalen a " + result.toFixed(2) + "Bs.");
      });
      break;
    case "vef_btc":
      var monto = parseFloat(match[2]);

      client.get('https://api.blinktrade.com/api/v1/VEF/ticker', function(data, response){
          data = JSON.parse(data);
          var rate_vef = parseFloat(data.high) + parseFloat(data.low);
  				    rate_vef = rate_vef / 2;

          var result = monto / rate_vef;

          bot.sendMessage(fromID, "Hola, " + monto + " Bs. equivalen a " + result.toFixed(8) + " BTC");
      });
      break;
    case "btc_brl":
      var monto = parseFloat(match[2]);

      client.get('https://api.blinktrade.com/api/v1/BRL/ticker', function(data, response){
          data = JSON.parse(data);
          var rate_brl = parseFloat(data.high) + parseFloat(data.low);
  				    rate_brl = rate_brl / 2;

          var result = monto * rate_brl;

          bot.sendMessage(fromID, "Hola, " + monto + " BTC equivalen a " + result.toFixed(2) + "R$");
      });
      break;
    case "brl_btc":
      var monto = parseFloat(match[2]);
      client.get('https://api.blinktrade.com/api/v1/BRL/ticker', function(data, response){
          data = JSON.parse(data);
          var rate_brl = parseFloat(data.high) + parseFloat(data.low);
              rate_brl = rate_brl / 2;

          var result = monto / rate_brl;

          bot.sendMessage(fromID, "Hola, " + monto + " R$ equivalen a " + result.toFixed(8) + " BTC");
      });
      break
    case "btc_usd":
      var monto = parseFloat(match[2]);

      client.get('https://api.bitfinex.com/v1/pubticker/btcusd', function(data, response){
          var rate_usd = parseFloat(data.high) + parseFloat(data.low);
  				    rate_usd = rate_usd / 2;

          var result = monto * rate_usd;

          bot.sendMessage(fromID, "Hola, " + monto + " BTC equivalen a " + result.toFixed(2) + "$");
      });
      break;
    case "usd_btc":
      var monto = parseFloat(match[2]);

      client.get('https://api.bitfinex.com/v1/pubticker/btcusd', function(data, response){
          var rate_usd = parseFloat(data.high) + parseFloat(data.low);
  				    rate_usd = rate_usd / 2;

          var result = monto / rate_usd;

          bot.sendMessage(fromID, "Hola, " + monto + " $ equivalen a " + result + " BTC");
      });
      break;
    default:

  }
});
*/
