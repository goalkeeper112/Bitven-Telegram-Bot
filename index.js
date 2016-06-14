'use strict'

const controller = require('./lib/controllers');
const inlineMenu = require('./lib/inlineMenus');
const tg      = require('telegram-node-bot')/*("194307003:AAH_s2M1p1cnCIpF_fZsvR55RGKcCoyN938")*/("126466962:AAHa0NgrPi3WDV4j6A0bFk9zCrWePhbP3Lk")
const Client  = require("node-rest-client").Client;
const client  = new Client();
const botan   = require('botanio')(":09oH2pUUirBAyAX_2tcc_8l7mevN8Ys");
const capture = require('phantomjs-capture');
const fs      = require('fs');

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

tg.router.
    when(['/start', '/lol'], 'StartController')

tg.router.
    when(['/surbitcoin', '/bitfinex', '/foxbit', '/argenbtc'], 'ExchangeController')

tg.router.
    when(['/kraken', '/kraken_ether'], 'KrakenController')

tg.router.
    when(['/bitven'], 'BitvenController')

tg.router.
    when(['/convert :type :amount'], 'ConvertController')

tg.router.
    when(['/ether', '/dao', '/lisk', '/hallacas'], 'PoloniexController')

tg.router.
    when(['/grafico_bitfinex', '/grafico_kraken'], 'GraficosController')

tg.controller('StartController', ($) => {

  tg.for('/lol', ($) => {
    console.log($.user)
    $.sendMessage($.user)

  });

  tg.for('/start', ($) => {
    botan.track($.message, 'User answer');
    $.sendMessage("Bienvenido a Dafcoin Bot, Conoce el precio de bitcoin en tiempo real \n El bot posee los siguientes comandos: \n 1) /exchange_consultar, ejemplo: /bitfinex /surbitcoin /foxbit \n 2) /convert de_a monto, ejemplo: /convert btc_usd 2000 \n 3) /ether \n 4) /dao \n 5) /lisk \n 6) /bitven \n Gracias por usarme, puedes hacerme alguna donación para mantener al bot funcionando y a su vez apoyar nuevos aportes a la comunidad a través de mi dirección 12GWmx5n8Dbo76Mw4AAJQXZGQD9yUhbr5i \n luisfernando.us");

    $.runMenu({
      message: 'Opciones disponibles: ',
      layout: 3,
      '/surbitcoin ': () => {
        return controller.surbitcoin($);
      },
      '/bitfinex': () => {
        return controller.bitfinex($);
      },
      '/ether': () => {
        return controller.ether($);
      },
      '/dao': () => {
        return controller.dao($);
      },
      '/lisk': () => {
        return controller.lisk($);
      },
      '/bitven': () => {
        return controller.bitven($);
      },
      '/kraken': () => {
        return controller.kraken($);
      },
      '/kraken_ether': () => {
        return controller.krakenEther($);
      },
      '/argenbtc': () => {
        return controller.argenBTC($);
      },
      '/convert': () => {
        return inlineMenu.convertMenu($);
      }
    });
  });
});

tg.controller('BitvenController', ($) => {
  tg.for('/bitven', ($) => {
    return controller.bitven($);
  });
});

tg.controller('PoloniexController', ($) => {
    tg.for('/ether', ($) => {
      return controller.ether($);
    });

    tg.for('/dao', ($) => {
      return controller.dao($);
    });

    tg.for('/lisk', ($) => {
      return controller.lisk($);
    });

    tg.for('/hallacas', ($) => {
      return controller.lisk($);
    });
});

tg.controller('KrakenController', ($) => {
  tg.for('/kraken', ($) => {
    return controller.kraken($);
  });

  tg.for('/kraken_ether', ($) => {
    return controller.krakenEther($);
  });
});

tg.controller('ExchangeController', ($) => {
    tg.for('/argenbtc', ($) => {
      return controller.argenBTC($);
    });

    tg.for('/bitfinex', ($) => {
      return controller.bitfinex($);
    });

    tg.for('/surbitcoin', ($) => {
      return controller.surbitcoin($);
    });

    tg.for('/foxbit', ($) => {
      return controller.foxbit($);
    });
});

tg.controller('ConvertController', ($) => {
    tg.for('/convert :type :amount', ($) => {
      var type = $.query.type;
          type = type.toLowerCase();
      console.log(type);
        switch (type) {
          case "btc_vef":
            var monto = parseFloat($.query.amount);

            client.get('https://api.blinktrade.com/api/v1/VEF/ticker', function(data, response){
                data = JSON.parse(data);
                var rate_vef = parseFloat(data.high) + parseFloat(data.low);
        				    rate_vef = rate_vef / 2;

                var result = monto * rate_vef;

                botan.track($.message, 'User answer');
                $.sendMessage("" + monto + " BTC equivalen a " + result.toFixed(2) + "Bs.");
            });
            break;
          case "vef_btc":
            var monto = parseFloat($.query.amount);

            client.get('https://api.blinktrade.com/api/v1/VEF/ticker', function(data, response){
                data = JSON.parse(data);
                var rate_vef = parseFloat(data.high) + parseFloat(data.low);
        				    rate_vef = rate_vef / 2;

                var result = monto / rate_vef;

                botan.track($.message, 'User answer');
                $.sendMessage("" + monto + " Bs. equivalen a " + result.toFixed(8) + " BTC");
            });
            break;
          case "btc_brl":
            var monto = parseFloat($.query.amount);

            client.get('https://api.blinktrade.com/api/v1/BRL/ticker', function(data, response){
                data = JSON.parse(data);
                var rate_brl = parseFloat(data.high) + parseFloat(data.low);
        				    rate_brl = rate_brl / 2;

                var result = monto * rate_brl;

                botan.track($.message, 'User answer');
                $.sendMessage("" + monto + " BTC equivalen a " + result.toFixed(2) + "R$");
            });
            break;
          case "brl_btc":
            var monto = parseFloat($.query.amount);
            client.get('https://api.blinktrade.com/api/v1/BRL/ticker', function(data, response){
                data = JSON.parse(data);
                var rate_brl = parseFloat(data.high) + parseFloat(data.low);
                    rate_brl = rate_brl / 2;

                var result = monto / rate_brl;

                botan.track($.message, 'User answer');
                $.sendMessage("" + monto + " R$ equivalen a " + result.toFixed(8) + " BTC");
            });
            break
          case "btc_usd":
            var monto = parseFloat($.query.amount);

            client.get('https://api.bitfinex.com/v1/pubticker/btcusd', function(data, response){
                var rate_usd = parseFloat(data.high) + parseFloat(data.low);
        				    rate_usd = rate_usd / 2;

                var result = monto * rate_usd;

                botan.track($.message, 'User answer');
                $.sendMessage("" + monto + " BTC equivalen a " + result.toFixed(2) + "$");
            });
            break;
          case "usd_btc":
            var monto = parseFloat($.query.amount);

            client.get('https://api.bitfinex.com/v1/pubticker/btcusd', function(data, response){
                var rate_usd = parseFloat(data.high) + parseFloat(data.low);
        				    rate_usd = rate_usd / 2;

                var result = monto / rate_usd;

                botan.track($.message, 'User answer');
                $.sendMessage("" + monto + " $ equivalen a " + result.toFixed(8) + " BTC");
            });
            break;
          case "btc_eur":
            var monto = parseFloat($.query.amount);
            client.get('https://api.kraken.com/0/public/Ticker?pair=BTCEUR', (data, response) => {
              var result =  monto * parseFloat(data.result.XXBTZEUR.c[0])
              botan.track($.message, 'User answer');
              $.sendMessage("Hola," + monto + " Ƀ equivalen a " + result.toFixed(2) + " €");
            });
            break;
          case "eur_btc":
            var monto = parseFloat($.query.amount);
            client.get('https://api.kraken.com/0/public/Ticker?pair=BTCEUR', (data, response) => {
              var result =  monto / parseFloat(data.result.XXBTZEUR.c[0])
              botan.track($.message, 'User answer');
              $.sendMessage("Hola," + monto + " € equivalen a " + result.toFixed(2) + " Ƀ");
            });
            break;
          case "btc_ether":
            var monto = parseFloat($.query.amount);

            client.get('https://poloniex.com/public?command=returnTicker', (data, response) => {
              var result_ether = monto / parseFloat(data.BTC_ETH.last);
              botan.track($.message, 'User answer');
              $.sendMessage("" + monto + " Ƀ equivalen a " + result_ether.toFixed(8) + " ETH");
            });

            break;
          case "ether_btc":
            var monto = parseFloat($.query.amount);

            client.get('https://poloniex.com/public?command=returnTicker', (data, response) => {
              var result_ether = monto * parseFloat(data.BTC_ETH.last);
              botan.track($.message, 'User answer');
              $.sendMessage("" + monto + " eth equivalen a " + result_ether.toFixed(8) + " Ƀ");
            });

            break;
          case "ether_usd":
            var monto = parseFloat($.query.amount);

            client.get('https://api.kraken.com/0/public/Ticker?pair=ETHUSD', (data, response) => {
              botan.track($.message, 'User answer');
              var result = monto * parseFloat(data.result.XETHZUSD.c[0]);
              $.sendMessage("" + monto + " eth equivalen a " + result + "$");
            });
            break;
          case "usd_ether":
            var monto = parseFloat($.query.amount);

            client.get('https://api.kraken.com/0/public/Ticker?pair=ETHUSD', (data, response) => {
              botan.track($.message, 'User answer');
              var result = monto / parseFloat(data.result.XETHZUSD.c[0]);
              $.sendMessage("" + monto + " $ equivalen a " + result.toFixed(4) + " eth");
            });
            break;
          case "ether_eur":
            var monto = parseFloat($.query.amount);
            client.get('https://api.kraken.com/0/public/Ticker?pair=ETHEUR', (data, response) => {
              botan.track($.message, 'User answer');
              var result = monto * parseFloat(data.result.XETHZEUR.c[0]);
              $.sendMessage("" + monto + " eth equivalen a " + result + " €");
            });
            break;
          case "eur_ether":
            var monto = parseFloat($.query.amount);
            client.get('https://api.kraken.com/0/public/Ticker?pair=ETHEUR', (data, response) => {
              botan.track($.message, 'User answer');
              var result = monto / parseFloat(data.result.XETHZEUR.c[0]);
              $.sendMessage("" + monto + " € equivalen a " + result.toFixed(4) + " eth");
            });
            break;
          case "btc_dao":
            var monto = parseFloat($.query.amount);

            client.get('https://poloniex.com/public?command=returnTicker', (data, response) => {
              var result_ether = monto / parseFloat(data.BTC_DAO.last);
              botan.track($.message, 'User answer');
              $.sendMessage("" + monto + " Ƀ equivalen a " + result_ether.toFixed(8) + " DAO");
            });

            break;
          case "dao_btc":
            var monto = parseFloat($.query.amount);

            client.get('https://poloniex.com/public?command=returnTicker', (data, response) => {
              var result_dao = monto * parseFloat(data.BTC_DAO.last);
              botan.track($.message, 'User answer');
              $.sendMessage("" + monto + " dao equivalen a " + result_dao.toFixed(8) + " Ƀ");
            });

            break;
          case "dao_usd":
            var monto = parseFloat($.query.amount);

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
            break;
          case "usd_dao":
            var monto = parseFloat($.query.amount);

            client.get('https://api.bitfinex.com/v1/pubticker/btcusd', function(data, response){
              var rate_usd = parseFloat(data.high) + parseFloat(data.low);
                  rate_usd = rate_usd / 2;
                  rate_usd = monto / rate_usd;
                  console.log(rate_usd);
              client.get('https://poloniex.com/public?command=returnTicker', (data, response) => {
                var result_dao = parseFloat(data.BTC_DAO.last);
                var result_convert = rate_usd / result_dao;
                console.log(result_convert)
                botan.track($.message, 'User answer');
                $.sendMessage("" + monto + " $ equivalen a " + result_convert.toFixed(2) + " DAO");
              });
            });
            break;
          case "btc_lisk":
            var monto = parseFloat($.query.amount);

            client.get('https://poloniex.com/public?command=returnTicker', (data, response) => {
              var result_ether = monto / parseFloat(data.BTC_LSK.last);
              botan.track($.message, 'User answer');
              $.sendMessage("" + monto + " btc equivalen a " + result_ether.toFixed(8) + " LSK");
            });

            break;
          case "lisk_btc":
            var monto = parseFloat($.query.amount);

            client.get('https://poloniex.com/public?command=returnTicker', (data, response) => {
              var result_ether = monto * parseFloat(data.BTC_LSK.last);
              botan.track($.message, 'User answer');
              $.sendMessage("" + monto + " btc equivalen a " + result_ether.toFixed(8) + " LSK");
            });

            break;
          case "lisk_usd":
            var monto = parseFloat($.query.amount);

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
            break;
          case "usd_lisk":
            var monto = parseFloat($.query.amount);

            client.get('https://api.bitfinex.com/v1/pubticker/btcusd', function(data, response){
              var rate_usd = parseFloat(data.high) + parseFloat(data.low);
                  rate_usd = rate_usd / 2;
                  rate_usd = monto / rate_usd;
                  console.log(rate_usd);
              client.get('https://poloniex.com/public?command=returnTicker', (data, response) => {
                var result_lsk = parseFloat(data.BTC_LSK.last);
                var result_convert = rate_usd / result_lsk;
                console.log(result_convert)
                botan.track($.message, 'User answer');
                $.sendMessage("" + monto + " $ equivalen a " + result_convert.toFixed(2) + " LSK");
              });
            });
            break;
          default:
            botan.track($.message, 'User answer');
            $.sendMessage("No reconozco ese comando, por favor envia /start para conocer las instrucciones");
            return inlineMenu.convertMenu();
        }
    })
})

tg.controller('GraficosController', ($) => {
    var random = Math.random();
    tg.for('/grafico_bitfinex', ($) => {
      $.sendMessage("Por favor, espere, el gráfico se esta procesando");

      capture({
          dir: './captures',
          output: random.toString() + '.png',
          url: 'http://bitcoinwisdom.com/markets/bitfinex/btcusd',
          size: '1280x720',
          screenTimer: 8000
      }, function(err, results){
          console.log(results);
          $.sendPhoto(fs.createReadStream(results.fullPNGPath));
      });
    });

    tg.for('/grafico_kraken', ($) => {
      $.sendMessage("Por favor, espere, el gráfico se esta procesando");

      capture({
          dir: './captures',
          output: random.toString() + '.png',
          url: 'https://bitcoinwisdom.com/markets/kraken/btceur',
          size: '1280x720',
          screenTimer: 8000
      }, function(err, results){
          console.log(results);
          $.sendPhoto(fs.createReadStream(results.fullPNGPath));
      });
    });
});
