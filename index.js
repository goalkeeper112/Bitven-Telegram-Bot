'use strict'

const tg      = require('telegram-node-bot')/*(process.env.BITVEN_BOT)*/("126466962:AAHa0NgrPi3WDV4j6A0bFk9zCrWePhbP3Lk")
const Client  = require("node-rest-client").Client;
const client  = new Client();
const botan   = require('botanio')(":09oH2pUUirBAyAX_2tcc_8l7mevN8Ys");
const capture = require('phantomjs-capture');
const fs      = require('fs');

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

tg.router.
    when(['/start'], 'StartController')

tg.router.
    when(['/surbitcoin', '/bitfinex', '/foxbit'], 'ExchangeController')

tg.router.
    when(['/kraken', '/kraken_ether'], 'KrakenController')

tg.router.
    when(['/bitven'], 'BitvenController')

tg.router.
    when(['/convert :type :amount'], 'ConvertController')

tg.router.
    when(['/ether'], 'PoloniexController')

tg.router.
    when(['/dao'], 'PoloniexController')

tg.router.
    when(['/lisk'], 'PoloniexController')

tg.router.
    when(['/grafico_bitfinex', '/grafico_kraken'], 'GraficosController')

tg.controller('StartController', ($) => {
  tg.for('/start', ($) => {
    botan.track($.message, 'User answer');
    $.sendMessage("Bienvenido a Bitven Bot, Conoce el precio de bitcoin en tiempo real \n El bot posee los siguientes comandos: \n 1) /exchange_consultar, ejemplo: /bitfinex /surbitcoin /foxbit \n 2) /convert de_a monto, ejemplo: /convert btc_usd 2000 \n 3) /ether \n 4) /dao \n 5) /lisk \n 6) /bitven \n Gracias por elegirnos :D");

    $.runMenu({
      message: 'Select:',
      layout: 3,
      '/surbitcoin': () => {
        client.get('https://api.blinktrade.com/api/v1/VEF/ticker', function(data, response){
            data = JSON.parse(data);
            var rate_vef = parseFloat(data.high) + parseFloat(data.low);
                rate_vef = rate_vef / 2;
            botan.track($.message, 'User answer');
            $.sendMessage("Hola, " + $.message.from.first_name + "! \n Las estadisticas son las siguientes:  \n Precio de compra " + numberWithCommas(data.buy) + "Bs. \n Precio de venta " + numberWithCommas(data.sell) + "Bs. \n Precio Promedio " + numberWithCommas(rate_vef) + "Bs.");
        });
      },
      '/bitfinex': () => {
        client.get('https://api.bitfinex.com/v1/pubticker/btcusd', function(data, response){
          var rate_usd = parseFloat(data.high) + parseFloat(data.low);
              rate_usd = rate_usd / 2;
          botan.track($.message, 'User answer');
          $.sendMessage("Hola, " + $.message.from.first_name + "! \n Las estadisticas son las siguientes:  \n Precio de compra " + data.bid + "$ \n Precio de venta " + data.ask + "$ \n Precio Promedio " + rate_usd + "$");
        });
      },
      '/ether': () => {
        client.get('https://poloniex.com/public?command=returnTicker', (data, response) => {
          botan.track($.message, 'User answer');
          $.sendMessage("Hola, un ether cuesta lo siguiente: \n BTC: " + data.BTC_ETH.last + " btc \n Gracias por usar el bot");
        });
      },
      '/dao': () => {
        client.get('https://poloniex.com/public?command=returnTicker', (data, response) => {
          botan.track($.message, 'User answer');
          $.sendMessage("Hola, un DAO cuesta lo siguiente: \n BTC: " + data.BTC_DAO.last + " btc \n Gracias por usar el bot");
        });
      },
      '/lisk': () => {
        client.get('https://poloniex.com/public?command=returnTicker', (data, response) => {
          botan.track($.message, 'User answer');
          $.sendMessage("Hola, un lisk cuesta lo siguiente: \n BTC: " + data.BTC_LSK.last + " btc \n Gracias por usar el bot");
        });
      },
      '/bitven': () => {
        client.get('https://api.bitfinex.com/v1/pubticker/btcusd', function(data, response){
          var rate_usd = parseFloat(data.high) + parseFloat(data.low);
              rate_usd = rate_usd / 2;
          client.get('http://api.bitcoinvenezuela.com/DolarToday.php?json=yes', function(data, response){
            let rate_bitven = rate_usd * data.USD.dolartoday;
            botan.track($.message, 'User answer');
            $.sendMessage("Hola, " + $.message.from.first_name + ", El precio Bitven actual es " + rate_bitven.toFixed(2) + " Bs. por 1 BTC");
          });
        });
      },
      '/kraken': () => {
        client.get('https://api.kraken.com/0/public/Ticker?pair=BTCEUR', (data, response) => {
          botan.track($.message, 'User answer');
          $.sendMessage("Hola, " + $.message.from.first_name + "! \n Las estadisticas en EUR son las siguientes:  \n Precio de compra " + parseFloat(data.result.XXBTZEUR.b[0]).toFixed(2) + "€ \n Precio de venta " + parseFloat(data.result.XXBTZEUR.a[0]).toFixed(2) + "€ \n Precio Promedio " + parseFloat(data.result.XXBTZEUR.c[0]).toFixed(2) + "€");
        });

        client.get('https://api.kraken.com/0/public/Ticker?pair=XBTUSD', (data, response) => {
          botan.track($.message, 'User answer');
          $.sendMessage("USD: \n Precio de compra " + parseFloat(data.result.XXBTZUSD.b[0]).toFixed(2) + "$ \n Precio de venta " + parseFloat(data.result.XXBTZUSD.a[0]).toFixed(2) + "$ \n Precio Promedio " + parseFloat(data.result.XXBTZUSD.c[0]).toFixed(2) + "$");
        });
      },
      '/kraken_ether': () => {
        client.get('https://api.kraken.com/0/public/Ticker?pair=ETHEUR', (data, response) => {
          botan.track($.message, 'User answer');
          $.sendMessage("Hola, " + $.message.from.first_name + "! \n Las estadisticas en EUR son las siguientes:  \n Precio de compra " + parseFloat(data.result.XETHZEUR.b[0]).toFixed(2) + "€ \n Precio de venta " + parseFloat(data.result.XETHZEUR.a[0]).toFixed(2) + "€ \n Precio Promedio " + parseFloat(data.result.XETHZEUR.c[0]).toFixed(2) + "€");
        });

        client.get('https://api.kraken.com/0/public/Ticker?pair=ETHUSD', (data, response) => {
          botan.track($.message, 'User answer');
          $.sendMessage("USD: \n Precio de compra " + parseFloat(data.result.XETHZUSD.b[0]).toFixed(2) + "$ \n Precio de venta " + parseFloat(data.result.XETHZUSD.a[0]).toFixed(2) + "$ \n Precio Promedio " + parseFloat(data.result.XETHZUSD.c[0]).toFixed(2) + "$");
        });
      },
      '/grafico_bitfinex': () => {
        capture({
            dir: './captures',
            output: 'capture_bitfinex.png',
            url: 'http://bitcoinwisdom.com/markets/bitfinex/btcusd',
            size: '1280x720',
            screenTimer: 6000
        }, function(err, results){
            console.log(results);
            $.sendPhoto(fs.createReadStream(results.fullPNGPath));
        });
      },
      '/grafico_kraken': () => {
        capture({
            dir: './captures',
            output: 'capture_kraken.png',
            url: 'https://bitcoinwisdom.com/markets/kraken/btceur',
            size: '1280x720',
            screenTimer: 6000
        }, function(err, results){
            console.log(results);
            $.sendPhoto(fs.createReadStream(results.fullPNGPath));
        });
      }
    });
  });
});

tg.controller('BitvenController', ($) => {
  tg.for('/bitven', ($) => {
    client.get('https://api.bitfinex.com/v1/pubticker/btcusd', function(data, response){
      var rate_usd = parseFloat(data.high) + parseFloat(data.low);
          rate_usd = rate_usd / 2;
      client.get('http://api.bitcoinvenezuela.com/DolarToday.php?json=yes', function(data, response){
        let rate_bitven = rate_usd * data.USD.dolartoday;
        botan.track($.message, 'User answer');
        $.sendMessage("Hola, " + $.message.from.first_name + ", El precio Bitven actual es " + rate_bitven.toFixed(2) + " Bs. por 1 BTC");
      });
    });
  });
});

tg.controller('PoloniexController', ($) => {
    tg.for('/ether', ($) => {
      client.get('https://poloniex.com/public?command=returnTicker', (data, response) => {
        botan.track($.message, 'User answer');
        $.sendMessage("Hola, un ether cuesta lo siguiente: \n BTC: " + data.BTC_ETH.last + " btc \n Gracias por usar el bot");
      });
    });

    tg.for('/dao', ($) => {
      client.get('https://poloniex.com/public?command=returnTicker', (data, response) => {
        botan.track($.message, 'User answer');
        $.sendMessage("Hola, un DAO cuesta lo siguiente: \n BTC: " + data.BTC_DAO.last + " btc \n Gracias por usar el bot");
      });
    });

    tg.for('/lisk', ($) => {
      client.get('https://poloniex.com/public?command=returnTicker', (data, response) => {
        botan.track($.message, 'User answer');
        $.sendMessage("Hola, un lisk cuesta lo siguiente: \n BTC: " + data.BTC_LSK.last + " btc \n Gracias por usar el bot");
      });
    });
});

tg.controller('KrakenController', ($) => {
  tg.for('/kraken', ($) => {
    client.get('https://api.kraken.com/0/public/Ticker?pair=BTCEUR', (data, response) => {
      botan.track($.message, 'User answer');
      $.sendMessage("Hola, " + $.message.from.first_name + "! \n Las estadisticas en EUR son las siguientes:  \n Precio de compra " + parseFloat(data.result.XXBTZEUR.b[0]).toFixed(2) + "€ \n Precio de venta " + parseFloat(data.result.XXBTZEUR.a[0]).toFixed(2) + "€ \n Precio Promedio " + parseFloat(data.result.XXBTZEUR.c[0]).toFixed(2) + "€");
    });

    client.get('https://api.kraken.com/0/public/Ticker?pair=XBTUSD', (data, response) => {
      botan.track($.message, 'User answer');
      $.sendMessage("USD: \n Precio de compra " + parseFloat(data.result.XXBTZUSD.b[0]).toFixed(2) + "$ \n Precio de venta " + parseFloat(data.result.XXBTZUSD.a[0]).toFixed(2) + "$ \n Precio Promedio " + parseFloat(data.result.XXBTZUSD.c[0]).toFixed(2) + "$");
    });
  });

  tg.for('/kraken_ether', ($) => {
    client.get('https://api.kraken.com/0/public/Ticker?pair=ETHEUR', (data, response) => {
      botan.track($.message, 'User answer');
      $.sendMessage("Hola, " + $.message.from.first_name + "! \n Las estadisticas en EUR son las siguientes:  \n Precio de compra " + parseFloat(data.result.XETHZEUR.b[0]).toFixed(2) + "€ \n Precio de venta " + parseFloat(data.result.XETHZEUR.a[0]).toFixed(2) + "€ \n Precio Promedio " + parseFloat(data.result.XETHZEUR.c[0]).toFixed(2) + "€");
    });

    client.get('https://api.kraken.com/0/public/Ticker?pair=ETHUSD', (data, response) => {
      botan.track($.message, 'User answer');
      $.sendMessage("USD: \n Precio de compra " + parseFloat(data.result.XETHZUSD.b[0]).toFixed(2) + "$ \n Precio de venta " + parseFloat(data.result.XETHZUSD.a[0]).toFixed(2) + "$ \n Precio Promedio " + parseFloat(data.result.XETHZUSD.c[0]).toFixed(2) + "$");
    });
  });
});

tg.controller('ExchangeController', ($) => {
    tg.for('/bitfinex', ($) => {
      client.get('https://api.bitfinex.com/v1/pubticker/btcusd', function(data, response){
        var rate_usd = parseFloat(data.high) + parseFloat(data.low);
            rate_usd = rate_usd / 2;
        botan.track($.message, 'User answer');
        $.sendMessage("Hola, " + $.message.from.first_name + "! \n Las estadisticas son las siguientes:  \n Precio de compra " + data.bid + "$ \n Precio de venta " + data.ask + "$ \n Precio Promedio " + rate_usd + "$");
      });
    });

    tg.for('/surbitcoin', ($) => {
      client.get('https://api.blinktrade.com/api/v1/VEF/ticker', function(data, response){
          data = JSON.parse(data);
          var rate_vef = parseFloat(data.high) + parseFloat(data.low);
              rate_vef = rate_vef / 2;
          botan.track($.message, 'User answer');
          $.sendMessage("Hola, " + $.message.from.first_name + "! \n Las estadisticas son las siguientes:  \n Precio de compra " + numberWithCommas(data.buy) + "Bs. \n Precio de venta " + numberWithCommas(data.sell) + "Bs. \n Precio Promedio " + numberWithCommas(rate_vef) + "Bs.");
      });
    });

    tg.for('/foxbit', ($) => {
      client.get('https://api.blinktrade.com/api/v1/BRL/ticker', function(data, response){
          data = JSON.parse(data);
          var rate_brl = parseFloat(data.high) + parseFloat(data.low);
              rate_brl = rate_brl / 2;
          botan.track($.message, 'User answer');
          $.sendMessage("Hola, " + $.message.from.first_name + "! \n Las estadisticas son las siguientes:  \n Precio de compra " + numberWithCommas(data.buy) + "R$ \n Precio de venta " + numberWithCommas(data.sell) + "R$ \n Precio Promedio " + rate_brl + "R$");
      });
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

                botan.track($.message, 'User answer');
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

                botan.track($.message, 'User answer');
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

                botan.track($.message, 'User answer');
                $.sendMessage("Hola, " + monto + " R$ equivalen a " + result.toFixed(8) + " BTC");
            });
            break
          case "btc_usd":
            var monto = parseFloat($.query.amount);

            client.get('https://api.bitfinex.com/v1/pubticker/btcusd', function(data, response){
                var rate_usd = parseFloat(data.high) + parseFloat(data.low);
        				    rate_usd = rate_usd / 2;

                var result = monto * rate_usd;

                botan.track($.message, 'User answer');
                $.sendMessage("Hola, " + monto + " BTC equivalen a " + result.toFixed(2) + "$");
            });
            break;
          case "usd_btc":
            var monto = parseFloat($.query.amount);

            client.get('https://api.bitfinex.com/v1/pubticker/btcusd', function(data, response){
                var rate_usd = parseFloat(data.high) + parseFloat(data.low);
        				    rate_usd = rate_usd / 2;

                var result = monto / rate_usd;

                botan.track($.message, 'User answer');
                $.sendMessage("Hola, " + monto + " $ equivalen a " + result.toFixed(8) + " BTC");
            });
            break;
          case "btc_eur":
            var monto = parseFloat($.query.amount);
            client.get('https://api.kraken.com/0/public/Ticker?pair=BTCEUR', (data, response) => {
              var result =  monto * parseFloat(data.result.XXBTZEUR.c[0])
              botan.track($.message, 'User answer');
              $.sendMessage("Hola," + monto + " BTC equivalen a " + result.toFixed(2) + " €");
            });
            break;
          case "eur_btc":
            var monto = parseFloat($.query.amount);
            client.get('https://api.kraken.com/0/public/Ticker?pair=BTCEUR', (data, response) => {
              var result =  monto / parseFloat(data.result.XXBTZEUR.c[0])
              botan.track($.message, 'User answer');
              $.sendMessage("Hola," + monto + " € equivalen a " + result.toFixed(2) + " BTC");
            });
            break;
          case "btc_ether":
            var monto = parseFloat($.query.amount);

            client.get('https://poloniex.com/public?command=returnTicker', (data, response) => {
              var result_ether = monto / parseFloat(data.BTC_ETH.last);
              botan.track($.message, 'User answer');
              $.sendMessage("Hola, " + monto + " btc equivalen a " + result_ether.toFixed(8) + " ETH");
            });

            break;
          case "ether_btc":
            var monto = parseFloat($.query.amount);

            client.get('https://poloniex.com/public?command=returnTicker', (data, response) => {
              var result_ether = monto * parseFloat(data.BTC_ETH.last);
              botan.track($.message, 'User answer');
              $.sendMessage("Hola, " + monto + " eth equivalen a " + result_ether.toFixed(8) + " btc");
            });

            break;
          case "ether_usd":
            var monto = parseFloat($.query.amount);
            client.get('https://api.kraken.com/0/public/Ticker?pair=ETHUSD', (data, response) => {
              botan.track($.message, 'User answer');
              var result = monto * parseFloat(data.result.XETHZUSD.c[0]);
              $.sendMessage("Hola, " + monto + " eth equivalen a " + result + "$");
            });
            break;
          case "usd_ether":
            var monto = parseFloat($.query.amount);
            client.get('https://api.kraken.com/0/public/Ticker?pair=ETHUSD', (data, response) => {
              botan.track($.message, 'User answer');
              var result = monto / parseFloat(data.result.XETHZUSD.c[0]);
              $.sendMessage("Hola, " + monto + " $ equivalen a " + result.toFixed(4) + " eth");
            });
            break;
          case "ether_eur":
            var monto = parseFloat($.query.amount);
            client.get('https://api.kraken.com/0/public/Ticker?pair=ETHEUR', (data, response) => {
              botan.track($.message, 'User answer');
              var result = monto * parseFloat(data.result.XETHZEUR.c[0]);
              $.sendMessage("Hola, " + monto + " eth equivalen a " + result + " €");
            });
            break;
          case "eur_ether":
            var monto = parseFloat($.query.amount);
            client.get('https://api.kraken.com/0/public/Ticker?pair=ETHEUR', (data, response) => {
              botan.track($.message, 'User answer');
              var result = monto / parseFloat(data.result.XETHZEUR.c[0]);
              $.sendMessage("Hola, " + monto + " € equivalen a " + result.toFixed(4) + " eth");
            });
            break;
          case "btc_dao":
            var monto = parseFloat($.query.amount);

            client.get('https://poloniex.com/public?command=returnTicker', (data, response) => {
              var result_ether = monto / parseFloat(data.BTC_DAO.last);
              botan.track($.message, 'User answer');
              $.sendMessage("Hola, " + monto + " btc equivalen a " + result_ether.toFixed(8) + " DAO");
            });

            break;
          case "dao_btc":
            var monto = parseFloat($.query.amount);

            client.get('https://poloniex.com/public?command=returnTicker', (data, response) => {
              var result_dao = monto * parseFloat(data.BTC_DAO.last);
              botan.track($.message, 'User answer');
              $.sendMessage("Hola, " + monto + " dao equivalen a " + result_dao.toFixed(8) + " btc");
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
                $.sendMessage("Hola, " + monto + " DAO equivalen a " + result_convert.toFixed(2) + " $");
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
                $.sendMessage("Hola, " + monto + " $ equivalen a " + result_convert.toFixed(2) + " DAO");
              });
            });
            break;
          case "btc_lisk":
            var monto = parseFloat($.query.amount);

            client.get('https://poloniex.com/public?command=returnTicker', (data, response) => {
              var result_ether = monto / parseFloat(data.BTC_LSK.last);
              botan.track($.message, 'User answer');
              $.sendMessage("Hola, " + monto + " btc equivalen a " + result_ether.toFixed(8) + " LSK");
            });

            break;
          case "lisk_btc":
            var monto = parseFloat($.query.amount);

            client.get('https://poloniex.com/public?command=returnTicker', (data, response) => {
              var result_ether = monto * parseFloat(data.BTC_LSK.last);
              botan.track($.message, 'User answer');
              $.sendMessage("Hola, " + monto + " btc equivalen a " + result_ether.toFixed(8) + " LSK");
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
                $.sendMessage("Hola, " + monto + " LSK equivalen a " + result_convert.toFixed(2) + " $");
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
                $.sendMessage("Hola, " + monto + " $ equivalen a " + result_convert.toFixed(2) + " LSK");
              });
            });
            break;
          default:
          botan.track($.message, 'User answer');
              $.sendMessage("Hola, No reconozco ese comando, por favor envia /start para conocer las instrucciones");
        }
    })
})

tg.controller('GraficosController', ($) => {
    tg.for('/grafico_bitfinex', ($) => {
      capture({
          dir: './captures',
          output: 'capture_bitfinex.png',
          url: 'http://bitcoinwisdom.com/markets/bitfinex/btcusd',
          size: '1280x720',
          screenTimer: 6000
      }, function(err, results){
          console.log(results);
          $.sendPhoto(fs.createReadStream(results.fullPNGPath));
      });
    });

    tg.for('/grafico_kraken', ($) => {
      capture({
          dir: './captures',
          output: 'capture_kraken.png',
          url: 'https://bitcoinwisdom.com/markets/kraken/btceur',
          size: '1280x720',
          screenTimer: 6000
      }, function(err, results){
          console.log(results);
          $.sendPhoto(fs.createReadStream(results.fullPNGPath));
      });
    });
});
