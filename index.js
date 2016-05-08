var TelegramBot = require("node-telegram-bot-api");
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

          bot.sendMessage(fromID, "Hola, " + monto + " BTC equivalen a " + result + "Bs.");
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

          bot.sendMessage(fromID, "Hola, " + monto + " BTC equivalen a " + result + "R$");
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

          bot.sendMessage(fromID, "Hola, " + monto + " BTC equivalen a " + result + "$");
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
