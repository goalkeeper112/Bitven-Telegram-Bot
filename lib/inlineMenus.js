const tg      = require('telegram-node-bot')/*("194307003:AAH_s2M1p1cnCIpF_fZsvR55RGKcCoyN938")*/("126466962:AAHa0NgrPi3WDV4j6A0bFk9zCrWePhbP3Lk")
const Client  = require("node-rest-client").Client;
const client  = new Client();
const botan   = require('botanio')(":09oH2pUUirBAyAX_2tcc_8l7mevN8Ys");

exports.convertMenu = function($){

  tg.runInlineMenu('sendMessage', 'Conversiones Disponibles:', {}, [
      {
          text: 'BTC a USD',
          callback: ($) => {
              tg.sendMessage($.from.id, "Por Favor envia el monto a convertir: ");
              tg.waitForRequest($.from.id, ($) => {
                var monto = parseFloat($.message.text);

                client.get('https://api.bitfinex.com/v1/pubticker/btcusd', function(data, response){
                    var rate_usd = parseFloat(data.high) + parseFloat(data.low);
                        rate_usd = rate_usd / 2;

                    var result = monto * rate_usd;

                    botan.track($.message, 'User answer');
                    $.sendMessage("" + monto + " BTC equivalen a " + result.toFixed(2) + "$");
                });
              });
          }
      },
      {
          text: 'USD a BTC',
          callback: ($) => {
            tg.sendMessage($.from.id, "Por Favor envia el monto a convertir: ");
            tg.waitForRequest(($) => {
              var monto = parseFloat($.message.text);

              client.get('https://api.bitfinex.com/v1/pubticker/btcusd', function(data, response){
                  var rate_usd = parseFloat(data.high) + parseFloat(data.low);
                      rate_usd = rate_usd / 2;

                  var result = monto / rate_usd;

                  botan.track($.message, 'User answer');
                  $.sendMessage("" + monto + " $ equivalen a " + result.toFixed(2) + "BTC");
              });
            });
          }
      },
      {
          text: 'BTC a EUR',
          callback: ($) => {
              tg.sendMessage($.from.id, "Por Favor envia el monto a convertir: ");
              tg.waitForRequest($.from.id, ($) => {
                var monto = parseFloat($.message.text);
                client.get('https://api.kraken.com/0/public/Ticker?pair=BTCEUR', (data, response) => {
                  var result =  monto * parseFloat(data.result.XXBTZEUR.c[0])
                  botan.track($.message, 'User answer');
                  $.sendMessage("Hola," + monto + " BTC equivalen a " + result.toFixed(2) + " €");
                });
              });
          }
      },
      {
          text: 'EUR a BTC',
          callback: ($) => {
            tg.sendMessage($.from.id, "Por Favor envia el monto a convertir: ");
            tg.waitForRequest(($) => {
              var monto = parseFloat($.message.text);
              client.get('https://api.kraken.com/0/public/Ticker?pair=BTCEUR', (data, response) => {
                var result =  monto / parseFloat(data.result.XXBTZEUR.c[0])
                botan.track($.message, 'User answer');
                $.sendMessage("Hola," + monto + " € equivalen a " + result.toFixed(2) + " ");
              });
            });
          }
      },
      {
          text: 'BTC a VEF',
          callback: ($) => {
              tg.sendMessage($.from.id, "Por Favor envia el monto a convertir: ");
              tg.waitForRequest($.from.id, ($) => {
                console.log($.message.text);
                if($.message.text){
                  client.get('https://api.blinktrade.com/api/v1/VEF/ticker', function(data, response){
                    var monto = parseFloat($.message.text);
                      data = JSON.parse(data);
                      var rate_vef = parseFloat(data.high) + parseFloat(data.low);
                          rate_vef = rate_vef / 2;

                      var result = monto * rate_vef;

                      botan.track($.message, 'User answer');
                      $.sendMessage("" + monto + " BTC equivalen a " + result.toFixed(2) + "Bs.");
                  });
                }
              });
          }
      },
      {
          text: 'VEF a BTC',
          callback: ($) => {
            tg.sendMessage($.from.id, "Por Favor envia el monto a convertir: ");
            tg.waitForRequest($.from.id, ($) => {
              console.log($.message.text);
              if($.message.text){
                client.get('https://api.blinktrade.com/api/v1/VEF/ticker', function(data, response){
                  var monto = parseFloat($.message.text);
                    data = JSON.parse(data);
                    var rate_vef = parseFloat(data.high) + parseFloat(data.low);
                        rate_vef = rate_vef / 2;

                    var result = monto / rate_vef;

                    botan.track($.message, 'User answer');
                    $.sendMessage("" + monto + " Bs. equivalen a " + result.toFixed(2) + "BTC");
                });
              }
            });
          }
      },
      {
          text: 'BTC a BRL',
          callback: ($) => {
              tg.sendMessage($.from.id, "Por Favor envia el monto a convertir: ");
              tg.waitForRequest($.from.id, ($) => {
                var monto = parseFloat($.message.text);

                client.get('https://api.blinktrade.com/api/v1/BRL/ticker', function(data, response){
                    data = JSON.parse(data);
                    var rate_brl = parseFloat(data.high) + parseFloat(data.low);
                        rate_brl = rate_brl / 2;

                    var result = monto * rate_brl;

                    botan.track($.message, 'User answer');
                    $.sendMessage("" + monto + " BTC equivalen a " + result.toFixed(2) + "R$");
                });
              });
          }
      },
      {
          text: 'BRL a BTC',
          callback: ($) => {
              tg.sendMessage($.from.id, "Por Favor envia el monto a convertir: ");
              tg.waitForRequest($.from.id, ($) => {
                tg.sendMessage($.from.id, "Por Favor envia el monto a convertir: ");
                tg.waitForRequest($.from.id, ($) => {
                  var monto = parseFloat($.message.text);

                  client.get('https://api.blinktrade.com/api/v1/BRL/ticker', function(data, response){
                      data = JSON.parse(data);
                      var rate_brl = parseFloat(data.high) + parseFloat(data.low);
                          rate_brl = rate_brl / 2;

                      var result = monto / rate_brl;

                      botan.track($.message, 'User answer');
                      $.sendMessage("" + monto + " R$ equivalen a " + result.toFixed(2) + "BTC");
                  });
                });
              });
          }
      },
      {
          text: 'BTC a ETHER',
          callback: ($) => {
              tg.sendMessage($.from.id, "Por Favor envia el monto a convertir: ");
              tg.waitForRequest($.from.id, ($) => {
                var monto = parseFloat($.message.text);

                client.get('https://poloniex.com/public?command=returnTicker', (data, response) => {
                  var result_ether = monto / parseFloat(data.BTC_ETH.last);
                  botan.track($.message, 'User answer');
                  $.sendMessage("" + monto + " btc equivalen a " + result_ether.toFixed(8) + " ETH");
                });
              });
          }
      },
      {
          text: 'ETHER a BTC',
          callback: ($) => {
              tg.sendMessage($.from.id, "Por Favor envia el monto a convertir: ");
              tg.waitForRequest($.from.id, ($) => {
                var monto = parseFloat($.message.text);

                client.get('https://poloniex.com/public?command=returnTicker', (data, response) => {
                  var result_ether = monto * parseFloat(data.BTC_ETH.last);
                  botan.track($.message, 'User answer');
                  $.sendMessage("" + monto + " ETH equivalen a " + result_ether.toFixed(8) + " BTC");
                });
              });
          }
      },
      {
          text: 'ETHER a USD',
          callback: ($) => {
              tg.sendMessage($.from.id, "Por Favor envia el monto a convertir: ");
              tg.waitForRequest($.from.id, ($) => {
                var monto = parseFloat($.message.text);

                client.get('https://api.kraken.com/0/public/Ticker?pair=ETHUSD', (data, response) => {
                  botan.track($.message, 'User answer');
                  var result = monto * parseFloat(data.result.XETHZUSD.c[0]);
                  $.sendMessage("" + monto + " eth equivalen a " + result + "$");
                });
              });
          }
      },
      {
          text: 'USD a ETHER',
          callback: ($) => {
              tg.sendMessage($.from.id, "Por Favor envia el monto a convertir: ");
              tg.waitForRequest($.from.id, ($) => {
                var monto = parseFloat($.message.text);

                client.get('https://api.kraken.com/0/public/Ticker?pair=ETHUSD', (data, response) => {
                  botan.track($.message, 'User answer');
                  var result = monto / parseFloat(data.result.XETHZUSD.c[0]);
                  $.sendMessage("" + monto + " $ equivalen a " + result + "ETH");
                });
              });
          }
      },
      {
          text: 'ETHER a EUR',
          callback: ($) => {
              tg.sendMessage($.from.id, "Por Favor envia el monto a convertir: ");
              tg.waitForRequest($.from.id, ($) => {
                var monto = parseFloat($.message.text);

                client.get('https://api.kraken.com/0/public/Ticker?pair=ETHEUR', (data, response) => {
                  botan.track($.message, 'User answer');
                  var result = monto * parseFloat(data.result.XETHZEUR.c[0]);
                  $.sendMessage("" + monto + " ETH equivalen a " + result + "");
                });
              });
          }
      },
      {
          text: 'EUR a ETHER',
          callback: ($) => {
              tg.sendMessage($.from.id, "Por Favor envia el monto a convertir: ");
              tg.waitForRequest($.from.id, ($) => {
                var monto = parseFloat($.message.text);

                client.get('https://api.kraken.com/0/public/Ticker?pair=ETHEUR', (data, response) => {
                  botan.track($.message, 'User answer');
                  var result = monto / parseFloat(data.result.XETHZEUR.c[0]);
                  $.sendMessage("" + monto + "  equivalen a " + result + "ETH");
                });
              });
          }
      },
      {
          text: 'BTC a DAO',
          callback: ($) => {
              tg.sendMessage($.from.id, "Por Favor envia el monto a convertir: ");
              tg.waitForRequest($.from.id, ($) => {
                var monto = parseFloat($.message.text);

                client.get('https://poloniex.com/public?command=returnTicker', (data, response) => {
                  var result_ether = monto / parseFloat(data.BTC_DAO.last);
                  botan.track($.message, 'User answer');
                  $.sendMessage("" + monto + " btc equivalen a " + result_ether.toFixed(8) + " DAO");
                });
              });
          }
      },
      {
          text: 'DAO a BTC',
          callback: ($) => {
              tg.sendMessage($.from.id, "Por Favor envia el monto a convertir: ");
              tg.waitForRequest($.from.id, ($) => {
                var monto = parseFloat($.message.text);

                client.get('https://poloniex.com/public?command=returnTicker', (data, response) => {
                  var result_ether = monto * parseFloat(data.BTC_DAO.last);
                  botan.track($.message, 'User answer');
                  $.sendMessage("" + monto + " DAO equivalen a " + result_ether.toFixed(8) + " BTC");
                });
              });
          }
      },
      {
          text: 'DAO a USD',
          callback: ($) => {
              tg.sendMessage($.from.id, "Por Favor envia el monto a convertir: ");
              tg.waitForRequest($.from.id, ($) => {
                var monto = parseFloat($.message.text);

                client.get('https://poloniex.com/public?command=returnTicker', (data, response) => {
                  var result_dao = monto * parseFloat(data.BTC_DAO.last);
                  client.get('https://api.bitfinex.com/v1/pubticker/btcusd', function(data, response){
                    var rate_usd = parseFloat(data.high) + parseFloat(data.low);
                        rate_usd = rate_usd / 2;
                    var result_convert = result_dao * rate_usd;
                    botan.track($.message, 'User answer');
                    $.sendMessage("" + monto + " DAO equivalen a " + result_convert.toFixed(2) + " $");
                  });
                });
              });
          }
      },
      {
          text: 'USD a DAO',
          callback: ($) => {
              tg.sendMessage($.from.id, "Por Favor envia el monto a convertir: ");
              tg.waitForRequest($.from.id, ($) => {
                var monto = parseFloat($.message.text);

                client.get('https://poloniex.com/public?command=returnTicker', (data, response) => {
                  var result_dao = monto * parseFloat(data.BTC_DAO.last);
                  client.get('https://api.bitfinex.com/v1/pubticker/btcusd', function(data, response){
                    var rate_usd = parseFloat(data.high) + parseFloat(data.low);
                        rate_usd = rate_usd / 2;
                    var result_convert = result_dao / rate_usd;
                    botan.track($.message, 'User answer');
                    $.sendMessage("" + monto + " $ equivalen a " + result_convert.toFixed(2) + " DAO");
                  });
                });
              });
          }
      },
      {
          text: 'BTC a LISK',
          callback: ($) => {
              tg.sendMessage($.from.id, "Por Favor envia el monto a convertir: ");
              tg.waitForRequest($.from.id, ($) => {
                var monto = parseFloat($.message.text);

                client.get('https://poloniex.com/public?command=returnTicker', (data, response) => {
                  var result_ether = monto / parseFloat(data.BTC_LSK.last);
                  botan.track($.message, 'User answer');
                  $.sendMessage("" + monto + " btc equivalen a " + result_ether.toFixed(8) + " LSK");
                });
              });
          }
      },
      {
          text: 'LISK a BTC',
          callback: ($) => {
              tg.sendMessage($.from.id, "Por Favor envia el monto a convertir: ");
              tg.waitForRequest($.from.id, ($) => {
                var monto = parseFloat($.message.text);

                client.get('https://poloniex.com/public?command=returnTicker', (data, response) => {
                  var result_ether = monto * parseFloat(data.BTC_LSK.last);
                  botan.track($.message, 'User answer');
                  $.sendMessage("" + monto + " LSK equivalen a " + result_ether.toFixed(8) + " BTC");
                });
              });
          }
      },
      {
          text: 'LISK a USD',
          callback: ($) => {
              tg.sendMessage($.from.id, "Por Favor envia el monto a convertir: ");
              tg.waitForRequest($.from.id, ($) => {
                var monto = parseFloat($.message.text);

                client.get('https://poloniex.com/public?command=returnTicker', (data, response) => {
                  var result_lsk = monto * parseFloat(data.BTC_LSK.last);
                  client.get('https://api.bitfinex.com/v1/pubticker/btcusd', function(data, response){
                    var rate_usd = parseFloat(data.high) + parseFloat(data.low);
                        rate_usd = rate_usd / 2;
                    var result_convert = result_lsk * rate_usd;
                    botan.track($.message, 'User answer');
                    $.sendMessage("" + monto + " LSK equivalen a " + result_convert.toFixed(2) + " $");
                  });
                });
              });
          }
      },
      {
          text: 'USD a LISK',
          callback: ($) => {
              tg.sendMessage($.from.id, "Por Favor envia el monto a convertir: ");
              tg.waitForRequest($.from.id, ($) => {
                var monto = parseFloat($.message.text);

                client.get('https://poloniex.com/public?command=returnTicker', (data, response) => {
                  var result_lsk = monto * parseFloat(data.BTC_LSK.last);
                  client.get('https://api.bitfinex.com/v1/pubticker/btcusd', function(data, response){
                    var rate_usd = parseFloat(data.high) + parseFloat(data.low);
                        rate_usd = rate_usd / 2;
                    var result_convert = result_lsk / rate_usd;
                    botan.track($.message, 'User answer');
                    $.sendMessage("" + monto + " $ equivalen a " + result_convert.toFixed(2) + " DAO");
                  });
                });
              });
          }
      },
  ], [3, 3, 3, 3, 3, 3, 3])
}
