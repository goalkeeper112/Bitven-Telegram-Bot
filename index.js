'use strict'

const tg      = require('telegram-node-bot')/*("194307003:AAH_s2M1p1cnCIpF_fZsvR55RGKcCoyN938")*/("126466962:AAHa0NgrPi3WDV4j6A0bFk9zCrWePhbP3Lk")
const controller = require('./lib/controllers');
//const inlineMenu = require('./lib/inlineMenus');
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
    when(['/surbitcoin', '/bitfinex', '/foxbit', '/argenbtc', '/bitstamp', '/okcoin', '/futuros'], 'ExchangeController')

tg.router.
    when(['/kraken', '/kraken_ether'], 'KrakenController')

tg.router.
    when(['/bitven', 'cero maricoteo'], 'BitvenController')

tg.router.
    when(['/convert :type :amount'], 'ConvertController')

tg.router.
    when(['/ether', '/dao', '/lisk', '/hallacas'], 'PoloniexController')

tg.router.
    when(['/grafico_bitfinex', '/grafico_kraken', '/dolartoday'], 'GraficosController')

tg.router.
    when(['/ultima_bitfinex','/bfx1m', '/bfx3m', '/bfx5m', '/bfx15m', '/bfx30m', '/bfx1h', '/bfx2h', '/bfx4h', '/bfx6h', '/bfx12h', '/bfx1d', '/bfx3d', '/bfx1w'], 'VelasBitfinexController')

tg.router.
    when(['/ultima_kraken','/krk1m', '/krk3m', '/krk5m', '/krk15m', '/krk30m', '/krk1h', '/krk2h', '/krk4h', '/krk6h', '/krk12h', '/krk1d', '/krk3d', '/krk1w'], 'VelasKrakenController')

tg.router.
    when(['/ultima_ltc','/ltc1m', '/ltc3m', '/ltc5m', '/ltc15m', '/ltc30m', '/ltc1h', '/ltc2h', '/ltc4h', '/ltc6h', '/ltc12h', '/ltc1d', '/ltc3d', '/ltc1w'], 'VelasLTCController')

tg.router.
    when(['/30mabfx1m', '/30mabfx3m', '/30mabfx5m', '/30mabfx15m', '/30mabfx30m', '/30mabfx1h', '/30mabfx2h', '/30mabfx4h', '/30mabfx6h', '/30mabfx12h', '/30mabfx1d', '/30mabfx3d', '/30mabfx1w'], 'MAController')

tg.router.
    when(['/30makrk1m', '/30makrk3m', '/30makrk5m', '/30makrk15m', '/30makrk30m', '/30makrk1h', '/30makrk2h', '/30makrk4h', '/30makrk6h', '/30makrk12h', '/30makrk1d', '/30makrk3d', '/30makrk1w'], 'MAController')

tg.router.
    when(['/30maltc1m', '/30maltc3m', '/30maltc5m', '/30maltc15m', '/30maltc30m', '/30maltc1h', '/30maltc2h', '/30maltc4h', '/30maltc6h', '/30maltc12h', '/30maltc1d', '/30maltc3d', '/30maltc1w'], 'MAController')

tg.controller('MAController', ($) => {
  tg.for('/30mabfx1m', ($) => {
    return controller.maBitfinex($, 1, "1m");
  });

  tg.for('/30mabfx3m', ($) => {
    return controller.maBitfinex($, 3, "3m");
  });

  tg.for('/30mabfx5m', ($) => {
    return controller.maBitfinex($, 5, "5m");
  });

  tg.for('/30mabfx15m', ($) => {
    return controller.maBitfinex($, 15, "15m");
  });

  tg.for('/30mabfx30m', ($) => {
    return controller.maBitfinex($, 30, "30m");
  });

  tg.for('/30mabfx1h', ($) => {
    return controller.maBitfinex($, 60, "1h");
  });

  tg.for('/30mabfx2h', ($) => {
    return controller.maBitfinex($, 120, "2h");
  });

  tg.for('/30mabfx4h', ($) => {
    return controller.maBitfinex($, 240, "4h");
  });

  tg.for('/30mabfx6h', ($) => {
    return controller.maBitfinex($, 320, "6h");
  });

  tg.for('/30mabfx12h', ($) => {
    return controller.maBitfinex($, 740, "12h");
  });

  tg.for('/30mabfx1d', ($) => {
    return controller.maBitfinex($, 1440, "1d");
  });

  tg.for('/30mabfx3d', ($) => {
    return controller.maBitfinex($, 4320, "3d");
  });

  tg.for('/30mabfx1w', ($) => {
    return controller.maBitfinex($, 10080, "1w");
  });

  tg.for('/30makrk1m', ($) => {
    return controller.maKraken($, 1, "1m");
  });

  tg.for('/30makrk3m', ($) => {
    return controller.maKraken($, 3, "3m");
  });

  tg.for('/30makrk5m', ($) => {
    return controller.maKraken($, 5, "5m");
  });

  tg.for('/30makrk15m', ($) => {
    return controller.maKraken($, 15, "15m");
  });

  tg.for('/30makrk30m', ($) => {
    return controller.maKraken($, 30, "30m");
  });

  tg.for('/30makrk1h', ($) => {
    return controller.maKraken($, 60, "1h");
  });

  tg.for('/30makrk2h', ($) => {
    return controller.maKraken($, 120, "2h");
  });

  tg.for('/30makrk4h', ($) => {
    return controller.maKraken($, 240, "4h");
  });

  tg.for('/30makrk6h', ($) => {
    return controller.maKraken($, 320, "6h");
  });

  tg.for('/30makrk12h', ($) => {
    return controller.maKraken($, 740, "12h");
  });

  tg.for('/30makrk1d', ($) => {
    return controller.maKraken($, 1440, "1d");
  });

  tg.for('/30makrk3d', ($) => {
    return controller.maKraken($, 4320, "3d");
  });

  tg.for('/30makrk1w', ($) => {
    return controller.maKraken($, 10080, "1w");
  });

  tg.for('/30maltc1m', ($) => {
    return controller.maLTC($, 1, "1m");
  });

  tg.for('/30maltc3m', ($) => {
    return controller.maLTC($, 3, "3m");
  });

  tg.for('/30maltc5m', ($) => {
    return controller.maLTC($, 5, "5m");
  });

  tg.for('/30maltc15m', ($) => {
    return controller.maLTC($, 15, "15m");
  });

  tg.for('/30maltc30m', ($) => {
    return controller.maLTC($, 30, "30m");
  });

  tg.for('/30maltc1h', ($) => {
    return controller.maLTC($, 60, "1h");
  });

  tg.for('/30maltc2h', ($) => {
    return controller.maLTC($, 120, "2h");
  });

  tg.for('/30maltc4h', ($) => {
    return controller.maLTC($, 240, "4h");
  });

  tg.for('/30maltc6h', ($) => {
    return controller.maLTC($, 320, "6h");
  });

  tg.for('/30maltc12h', ($) => {
    return controller.maLTC($, 740, "12h");
  });

  tg.for('/30maltc1d', ($) => {
    return controller.maLTC($, 1440, "1d");
  });

  tg.for('/30maltc3d', ($) => {
    return controller.maLTC($, 4320, "3d");
  });

  tg.for('/30maltc1w', ($) => {
    return controller.maLTC($, 10080, "1w");
  });
});

tg.controller('VelasBitfinexController', ($) => {
  tg.for('/ultima_vela_bitfinex', ($) => {
    client.get('https://s5.bitcoinwisdom.com/trades?since=1466822692000&sid=a0bb8680&symbol=bitfinexbtcusd&nonce=1466822711170', (data, response) => {
      $.sendMessage("El valor de la vela actual es " + data[0].price + " con un volumen de " + data[0].amount);
    })
  });

  tg.for('/bfx1m', ($) => {
    return controller.velaBitfinex($, 1, "1m");
  });

  tg.for('/bfx3m', ($) => {
    return controller.velaBitfinex($, 3, "3m");
  });

  tg.for('/bfx5m', ($) => {
    return controller.velaBitfinex($, 5, "5m");
  });

  tg.for('/bfx15m', ($) => {
    return controller.velaBitfinex($, 15, "15m");
  });

  tg.for('/bfx30m', ($) => {
    return controller.velaBitfinex($, 30, "30m");
  });

  tg.for('/bfx1h', ($) => {
    return controller.velaBitfinex($, 60, "1h");
  });

  tg.for('/bfx2h', ($) => {
    return controller.velaBitfinex($, 120, "2h");
  });

  tg.for('/bfx4h', ($) => {
    return controller.velaBitfinex($, 240, "4h");
  });

  tg.for('/bfx6h', ($) => {
    return controller.velaBitfinex($, 320, "6h");
  });

  tg.for('/bfx12h', ($) => {
    return controller.velaBitfinex($, 740, "12h");
  });

  tg.for('/bfx1d', ($) => {
    return controller.velaBitfinex($, 1440, "1d");
  });

  tg.for('/bfx3d', ($) => {
    return controller.velaBitfinex($, 4320, "3d");
  });

  tg.for('/bfx1w', ($) => {
    return controller.velaBitfinex($, 10080, "1w");
  });
});

tg.controller('VelasKrakenController', ($) => {
  tg.for('/ultima_vela_kraken', ($) => {
    client.get('https://s5.bitcoinwisdom.com/trades?since=1466822692000&sid=a0bb8680&symbol=krakenbtcusd&nonce=1466822711170', (data, response) => {
      $.sendMessage("El valor de la vela actual es " + data[0].price + " con un volumen de " + data[0].amount);
    })
  });

  tg.for('/krk1m', ($) => {
    return controller.velaKraken($, 1, "1m");
  });

  tg.for('/krk3m', ($) => {
    return controller.velaKraken($, 3, "3m");
  });

  tg.for('/krk5m', ($) => {
    return controller.velaKraken($, 5, "5m");
  });

  tg.for('/krk15m', ($) => {
    return controller.velaKraken($, 15, "15m");
  });

  tg.for('/krk30m', ($) => {
    return controller.velaKraken($, 30, "30m");
  });

  tg.for('/krk1h', ($) => {
    return controller.velaKraken($, 60, "1h");
  });

  tg.for('/krk2h', ($) => {
    return controller.velaKraken($, 120, "2h");
  });

  tg.for('/krk4h', ($) => {
    return controller.velaKraken($, 240, "4h");
  });

  tg.for('/krk6h', ($) => {
    return controller.velaKraken($, 320, "6h");
  });

  tg.for('/krk12h', ($) => {
    return controller.velaKraken($, 740, "12h");
  });

  tg.for('/krk1d', ($) => {
    return controller.velaKraken($, 1440, "1d");
  });

  tg.for('/krk3d', ($) => {
    return controller.velaKraken($, 4320, "3d");
  });

  tg.for('/krk1w', ($) => {
    return controller.velaKraken($, 10080, "1w");
  });
});

tg.controller('VelasLTCController', ($) => {
  tg.for('/ultima_vela_bitfinex', ($) => {
    client.get('https://s5.bitcoinwisdom.com/trades?since=1466822692000&sid=a0bb8680&symbol=bitfinexltcusd&nonce=1466822711170', (data, response) => {
      $.sendMessage("El valor de la vela actual es " + data[0].price + " con un volumen de " + data[0].amount);
    })
  });

  tg.for('/ltc1m', ($) => {
    return controller.velaBitfinexLTC($, 1, "1m");
  });

  tg.for('/ltc3m', ($) => {
    return controller.velaBitfinexLTC($, 3, "3m");
  });

  tg.for('/ltc5m', ($) => {
    return controller.velaBitfinexLTC($, 5, "5m");
  });

  tg.for('/ltc15m', ($) => {
    return controller.velaBitfinexLTC($, 15, "15m");
  });

  tg.for('/ltc30m', ($) => {
    return controller.velaBitfinexLTC($, 30, "30m");
  });

  tg.for('/ltc1h', ($) => {
    return controller.velaBitfinexLTC($, 60, "1h");
  });

  tg.for('/ltc2h', ($) => {
    return controller.velaBitfinexLTC($, 120, "2h");
  });

  tg.for('/ltc4h', ($) => {
    return controller.velaBitfinexLTC($, 240, "4h");
  });

  tg.for('/ltc6h', ($) => {
    return controller.velaBitfinexLTC($, 320, "6h");
  });

  tg.for('/ltc12h', ($) => {
    return controller.velaBitfinexLTC($, 740, "12h");
  });

  tg.for('/ltc1d', ($) => {
    return controller.velaBitfinexLTC($, 1440, "1d");
  });

  tg.for('/ltc3d', ($) => {
    return controller.velaBitfinexLTC($, 4320, "3d");
  });

  tg.for('/ltc1w', ($) => {
    return controller.velaBitfinexLTC($, 10080, "1w");
  });
});


tg.controller('StartController', ($) => {
  tg.for('/start', ($) => {
    botan.track($.message, 'Start Bot');
    $.sendMessage("Bienvenido a Dafcoin Bot, Conoce el precio de bitcoin en tiempo real \n El bot posee los siguientes comandos: \n 1) /exchange_consultar, ejemplo: /bitfinex /surbitcoin /foxbit /kraken \n 2) /convert de_a monto, ejemplo: /convert btc_usd 2000 \n 3) /ether \n 4) /dao \n 5) /lisk \n 6) /bitven \n Gracias por usarme, puedes hacerme alguna donación para mantener al bot funcionando y a su vez apoyar nuevos aportes a la comunidad a través de mi dirección 12GWmx5n8Dbo76Mw4AAJQXZGQD9yUhbr5i \n luisfernando.us");

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
      '/kraken_kether': () => {
        return controller.krakenEther($);
      },
      '/argenbtc': () => {
        return controller.argenBTC($);
      },
      '/bitstamp': () => {
        return controller.bitstamp($);
      },
      '/convert': () => {
        $.runInlineMenu('sendMessage', 'Conversiones Disponibles:', {}, [
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

                          botan.track($.message, 'Convert Inline Menu');
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

                        botan.track($.message, 'Convert Inline Menu');
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
                        botan.track($.message, 'Convert Inline Menu');
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
                      botan.track($.message, 'Convert Inline Menu');
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

                            botan.track($.message, 'Convert Inline Menu');
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

                          botan.track($.message, 'Convert Inline Menu');
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

                          botan.track($.message, 'Convert Inline Menu');
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

                            botan.track($.message, 'Convert Inline Menu');
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
                        botan.track($.message, 'Convert Inline Menu');
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
                        botan.track($.message, 'Convert Inline Menu');
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
                        botan.track($.message, 'Convert Inline Menu');
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
                        botan.track($.message, 'Convert Inline Menu');
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
                        botan.track($.message, 'Convert Inline Menu');
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
                        botan.track($.message, 'Convert Inline Menu');
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
                        botan.track($.message, 'Convert Inline Menu');
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
                        botan.track($.message, 'Convert Inline Menu');
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
                          botan.track($.message, 'Convert Inline Menu');
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
                          botan.track($.message, 'Convert Inline Menu');
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
                        botan.track($.message, 'Convert Inline Menu');
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
                        botan.track($.message, 'Convert Inline Menu');
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
                          botan.track($.message, 'Convert Inline Menu');
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
                          botan.track($.message, 'Convert Inline Menu');
                          $.sendMessage("" + monto + " $ equivalen a " + result_convert.toFixed(2) + " DAO");
                        });
                      });
                    });
                }
            },
        ], [3, 3, 3, 3, 3, 3, 3])
      }
    });
  });
});

tg.controller('BitvenController', ($) => {
  tg.for('/bitven', ($) => {
    return controller.bitven($);
  });

  tg.for('cero maricoteo', ($) => {
    return controller.ceroMaricoteo($);
  })
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

    tg.for('/bitstamp', () => {
      return controller.bitstamp($);
    });

    tg.for('/okcoin', () => {
      return controller.okcoin($);
    });

    tg.for('/futuros', () => {
      return controller.futuros($);
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

                botan.track($.message, 'Convert direct commands');
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

                botan.track($.message, 'Convert direct commands');
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

                botan.track($.message, 'Convert direct commands');
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

                botan.track($.message, 'Convert direct commands');
                $.sendMessage("" + monto + " R$ equivalen a " + result.toFixed(8) + " BTC");
            });
            break
          case "btc_usd":
            var monto = parseFloat($.query.amount);

            client.get('https://api.bitfinex.com/v1/pubticker/btcusd', function(data, response){
                var rate_usd = parseFloat(data.high) + parseFloat(data.low);
        				    rate_usd = rate_usd / 2;

                var result = monto * rate_usd;

                botan.track($.message, 'Convert direct commands');
                $.sendMessage("" + monto + " BTC equivalen a " + result.toFixed(2) + "$");
            });
            break;
          case "usd_btc":
            var monto = parseFloat($.query.amount);

            client.get('https://api.bitfinex.com/v1/pubticker/btcusd', function(data, response){
                var rate_usd = parseFloat(data.high) + parseFloat(data.low);
        				    rate_usd = rate_usd / 2;

                var result = monto / rate_usd;

                botan.track($.message, 'Convert direct commands');
                $.sendMessage("" + monto + " $ equivalen a " + result.toFixed(8) + " BTC");
            });
            break;
          case "btc_eur":
            var monto = parseFloat($.query.amount);
            client.get('https://api.kraken.com/0/public/Ticker?pair=BTCEUR', (data, response) => {
              var result =  monto * parseFloat(data.result.XXBTZEUR.c[0])
              botan.track($.message, 'Convert direct commands');
              $.sendMessage("Hola," + monto + " Ƀ equivalen a " + result.toFixed(2) + " €");
            });
            break;
          case "eur_btc":
            var monto = parseFloat($.query.amount);
            client.get('https://api.kraken.com/0/public/Ticker?pair=BTCEUR', (data, response) => {
              var result =  monto / parseFloat(data.result.XXBTZEUR.c[0])
              botan.track($.message, 'Convert direct commands');
              $.sendMessage("Hola," + monto + " € equivalen a " + result.toFixed(2) + " Ƀ");
            });
            break;
          case "btc_ether":
            var monto = parseFloat($.query.amount);

            client.get('https://poloniex.com/public?command=returnTicker', (data, response) => {
              var result_ether = monto / parseFloat(data.BTC_ETH.last);
              botan.track($.message, 'Convert direct commands');
              $.sendMessage("" + monto + " Ƀ equivalen a " + result_ether.toFixed(8) + " ETH");
            });

            break;
          case "ether_btc":
            var monto = parseFloat($.query.amount);

            client.get('https://poloniex.com/public?command=returnTicker', (data, response) => {
              var result_ether = monto * parseFloat(data.BTC_ETH.last);
              botan.track($.message, 'Convert direct commands');
              $.sendMessage("" + monto + " eth equivalen a " + result_ether.toFixed(8) + " Ƀ");
            });

            break;
          case "ether_usd":
            var monto = parseFloat($.query.amount);

            client.get('https://api.kraken.com/0/public/Ticker?pair=ETHUSD', (data, response) => {
              botan.track($.message, 'Convert direct commands');
              var result = monto * parseFloat(data.result.XETHZUSD.c[0]);
              $.sendMessage("" + monto + " eth equivalen a " + result + "$");
            });
            break;
          case "usd_ether":
            var monto = parseFloat($.query.amount);

            client.get('https://api.kraken.com/0/public/Ticker?pair=ETHUSD', (data, response) => {
              botan.track($.message, 'Convert direct commands');
              var result = monto / parseFloat(data.result.XETHZUSD.c[0]);
              $.sendMessage("" + monto + " $ equivalen a " + result.toFixed(4) + " eth");
            });
            break;
          case "ether_eur":
            var monto = parseFloat($.query.amount);
            client.get('https://api.kraken.com/0/public/Ticker?pair=ETHEUR', (data, response) => {
              botan.track($.message, 'Convert direct commands');
              var result = monto * parseFloat(data.result.XETHZEUR.c[0]);
              $.sendMessage("" + monto + " eth equivalen a " + result + " €");
            });
            break;
          case "eur_ether":
            var monto = parseFloat($.query.amount);
            client.get('https://api.kraken.com/0/public/Ticker?pair=ETHEUR', (data, response) => {
              botan.track($.message, 'Convert direct commands');
              var result = monto / parseFloat(data.result.XETHZEUR.c[0]);
              $.sendMessage("" + monto + " € equivalen a " + result.toFixed(4) + " eth");
            });
            break;
          case "btc_dao":
            var monto = parseFloat($.query.amount);

            client.get('https://poloniex.com/public?command=returnTicker', (data, response) => {
              var result_ether = monto / parseFloat(data.BTC_DAO.last);
              botan.track($.message, 'Convert direct commands');
              $.sendMessage("" + monto + " Ƀ equivalen a " + result_ether.toFixed(8) + " DAO");
            });

            break;
          case "dao_btc":
            var monto = parseFloat($.query.amount);

            client.get('https://poloniex.com/public?command=returnTicker', (data, response) => {
              var result_dao = monto * parseFloat(data.BTC_DAO.last);
              botan.track($.message, 'Convert direct commands');
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
                botan.track($.message, 'Convert direct commands');
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
                botan.track($.message, 'Convert direct commands');
                $.sendMessage("" + monto + " $ equivalen a " + result_convert.toFixed(2) + " DAO");
              });
            });
            break;
          case "btc_lisk":
            var monto = parseFloat($.query.amount);

            client.get('https://poloniex.com/public?command=returnTicker', (data, response) => {
              var result_ether = monto / parseFloat(data.BTC_LSK.last);
              botan.track($.message, 'Convert direct commands');
              $.sendMessage("" + monto + " btc equivalen a " + result_ether.toFixed(8) + " LSK");
            });

            break;
          case "lisk_btc":
            var monto = parseFloat($.query.amount);

            client.get('https://poloniex.com/public?command=returnTicker', (data, response) => {
              var result_ether = monto * parseFloat(data.BTC_LSK.last);
              botan.track($.message, 'Convert direct commands');
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
                botan.track($.message, 'Convert direct commands');
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
                botan.track($.message, 'Convert direct commands');
                $.sendMessage("" + monto + " $ equivalen a " + result_convert.toFixed(2) + " LSK");
              });
            });
            break;
          default:
            botan.track($.message, 'Error');
            $.sendMessage("No reconozco ese comando, por favor envia /start para conocer las instrucciones");
            //return inlineMenu.convertMenu();
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
          botan.track($.message, 'Grafico bitfinex');
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
          botan.track($.message, 'Grafico Kraken');
          $.sendPhoto(fs.createReadStream(results.fullPNGPath));
      });
    });

    tg.for('/dolartoday', ($) => {
      return controller.dolartoday($);
    });
});
