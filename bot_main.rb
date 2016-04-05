require 'telegram_bot'
require 'rest-client'
require 'timeout'

bot = TelegramBot.new(token: '125546968:AAG9LPSAqz1aBVi1iLyLfj-wQ9IKY0838Bw')
bot.get_updates(fail_silently: true) do |message|
  puts "@#{message.from.username}: #{message.text}"
  command = message.get_command_for(bot)
puts command
  message.reply do |reply|
    case command
    when /precio surbitcoin/
      response = RestClient.get 'https://api.blinktrade.com/api/v1/VEF/ticker'
      response = JSON.parse response
      puts response

      rate_vef = response["high"].to_i + response["low"].to_i
      rate_vef = rate_vef.fdiv(2)

      reply.text = "Hola, #{message.from.first_name}! \n Las estadisticas son las siguientes:  \n Precio de compra #{response['buy']} Bs. \n Precio de venta #{response['sell']} Bs. \n Precio Promedio #{rate_vef} Bs."
    when /precio foxbit/i
      response = RestClient.get 'https://api.blinktrade.com/api/v1/BRL/ticker'
      response = JSON.parse response
      puts response

      rate_brl = response["high"].to_i + response["low"].to_i
      rate_brl = rate_brl.fdiv(2)

      reply.text = "Hola, #{message.from.first_name}! \n Las estadisticas son las siguientes:  \n Precio de compra #{response['buy']} R$ \n Precio de venta #{response['sell']} R$ \n Precio Promedio #{rate_brl} R$"
    when /precio bitfinex/i
      response = RestClient.get 'https://api.bitfinex.com/v1/pubticker/btcusd'
      response = JSON.parse response
      puts response

      rate_usd = response["high"].to_i + response["low"].to_i
      rate_usd = rate_usd.fdiv(2)

      reply.text = "Hola, #{message.from.first_name}! \n Las estadisticas son las siguientes:  \n Precio de compra #{response['bid']} $ \n Precio de venta #{response['ask']} $ \n Precio Promedio #{rate_usd} $"
    else
      reply.text = "#{message.from.first_name}, have no idea what #{command.inspect} means."
    end
    puts "sending #{reply.text.inspect} to @#{message.from.username}"
    reply.send_with(bot)
  end
end
