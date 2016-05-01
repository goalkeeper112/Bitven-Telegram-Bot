require 'telegram/bot'
require 'rest-client'
require 'timeout'
require 'byebug'

token = '125546968:AAG9LPSAqz1aBVi1iLyLfj-wQ9IKY0838Bw'

Telegram::Bot::Client.run(token) do |bot|
	bot.listen do |message|
		case message

		when Telegram::Bot::Types::CallbackQuery
	      # Here you can handle your callbacks from inline buttons
      		if message.data == 'surbitcoin'
		      	response = RestClient.get 'https://api.blinktrade.com/api/v1/VEF/ticker'
		      	response = JSON.parse response
		      	puts response

		      	rate_vef = response["high"].to_i + response["low"].to_i
		      	rate_vef = rate_vef.fdiv(2)

		      	bot.api.send_message(chat_id: message.from.id, text: "Hola, #{message.from.first_name}! \n Las estadisticas son las siguientes:  \n Precio de compra #{response['buy']} Bs. \n Precio de venta #{response['sell']} Bs. \n Precio Promedio #{rate_vef} Bs.")
		      	bot.api.send_message(chat_id: message.from.id, text: '¿Deseas hacer una conversión?')

		      	bot.listen do |reply|
		      		case reply.text
			      		when "si"
			      			bot.api.send_message(chat_id: message.from.id, text: "¿Qué tipo de conversión deseas?")
			      			bot.listen do |reply_2|
			      				case reply_2.text
				      				when "BTC a VEF"
			      						bot.api.send_message(chat_id: reply_2.from.id, text: "Ingrese el monto por favor")
				      					
				      					bot.listen do |reply_3|

				      						monto = reply_3.text
				      						monto = monto.to_i

				      						conversion = rate_vef * monto

				      						bot.api.send_message(chat_id: reply_3.from.id, text: "hola, esta es la conversión #{conversion} Bs.")
				      						bot.api.send_message(chat_id: reply_3.from.id, text: "Para un nuevo uso, envia /start")
				      					end
				      				when "VEF a BTC"
			      						bot.api.send_message(chat_id: reply_2.from.id, text: "Ingrese el monto por favor")
				      					
				      					bot.listen do |reply_3|

				      						monto = reply_3.text
				      						monto = monto.to_i

				      						conversion = monto.fdiv(rate_vef)

				      						bot.api.send_message(chat_id: reply_3.from.id, text: "hola, esta es la conversión #{conversion} BTC")
				      						bot.api.send_message(chat_id: reply_3.from.id, text: "Para un nuevo uso, envia /start")
				      					end
			      				end
			      			end
		      		end
		      	end
	      	end

		  	if message.data == 'foxbit'
			  	response = RestClient.get 'https://api.blinktrade.com/api/v1/BRL/ticker'
			  	response = JSON.parse response
			  	puts response

			  	rate_brl = response["high"].to_i + response["low"].to_i
			  	rate_brl = rate_brl.fdiv(2)

			  	bot.api.send_message(chat_id: message.from.id, text: "Hola, #{message.from.first_name}! \n Las estadisticas son las siguientes:  \n Precio de compra #{response['buy']} R$ \n Precio de venta #{response['sell']} R$ \n Precio Promedio #{rate_brl} R$")

			  	bot.listen do |reply|
			  		case reply.text
				  		when "si"
				  			bot.api.send_message(chat_id: message.from.id, text: "¿Qué tipo de conversión deseas?")
				  			bot.listen do |reply_2|
				  				case reply_2.text
					  				when "BTC a BRL"
				  						bot.api.send_message(chat_id: reply_2.from.id, text: "Ingrese el monto por favor")
					  					
					  					bot.listen do |reply_3|

					  						monto = reply_3.text
					  						monto = monto.to_i

					  						conversion = rate_brl * monto

					  						bot.api.send_message(chat_id: reply_3.from.id, text: "hola, esta es la conversión #{conversion} R$")
					  						bot.api.send_message(chat_id: reply_3.from.id, text: "Para un nuevo uso, envia /start")
					  					end
						  				when "BRL a BTC"
					  						bot.api.send_message(chat_id: reply_2.from.id, text: "Ingrese el monto por favor")
						  					
						  					bot.listen do |reply_3|

						  						monto = reply_3.text
						  						monto = monto.to_i

						  						conversion = monto.fdiv(rate_brl)

						  						bot.api.send_message(chat_id: reply_3.from.id, text: "hola, esta es la conversión #{conversion} BTC")
						  						bot.api.send_message(chat_id: reply_3.from.id, text: "Para un nuevo uso, envia /start")
					  						end
			  						
			  					end
			  				end
		  			end
		  		end
			end

	  	if message.data == 'bitfinex'
	  		response = RestClient.get 'https://api.bitfinex.com/v1/pubticker/btcusd'
	  		response = JSON.parse response
	  		puts response

	  		rate_usd = response["high"].to_i + response["low"].to_i
	  		rate_usd = rate_usd.fdiv(2)

	  		bot.api.send_message(chat_id: message.from.id, text: "Hola, #{message.from.first_name}! \n Las estadisticas son las siguientes:  \n Precio de compra #{response['bid']} $ \n Precio de venta #{response['ask']} $ \n Precio Promedio #{rate_usd} $")

	  		bot.listen do |reply|
	  			case reply.text
	  				when "si"
	  					bot.api.send_message(chat_id: message.from.id, text: "¿Qué tipo de conversión deseas?")
	  					bot.listen do |reply_2|
	  						case reply_2.text
	  							when "BTC a USD"
  									bot.api.send_message(chat_id: reply_2.from.id, text: "Ingrese el monto por favor")
	  								
	  								bot.listen do |reply_3|

	  									monto = reply_3.text
	  									monto = monto.to_i

	  									conversion = rate_usd * monto

	  									bot.api.send_message(chat_id: reply_3.from.id, text: "hola, esta es la conversión #{conversion} $")
	  									bot.api.send_message(chat_id: reply_3.from.id, text: "Para un nuevo uso, envia /start")
	  								end
	  							when "USD a BTC"
  									bot.api.send_message(chat_id: reply_2.from.id, text: "Ingrese el monto por favor")
	  								
	  								bot.listen do |reply_3|

	  									monto = reply_3.text
	  									monto = monto.to_i

	  									conversion = monto.fdiv(rate_usd)

	  									bot.api.send_message(chat_id: reply_3.from.id, text: "hola, esta es la conversión #{conversion} BTC")
	  									bot.api.send_message(chat_id: reply_3.from.id, text: "Para un nuevo uso, envia /start")
	  								end
	  						end
	  					end
	  			end
	  		end
	  	end

	when Telegram::Bot::Types::InlineQuery
		response_usd = RestClient.get 'https://api.bitfinex.com/v1/pubticker/btcusd'
		response_usd = JSON.parse response_usd
		puts response_usd

		rate_usd = response_usd["high"].to_i + response_usd["low"].to_i
		rate_usd = rate_usd.fdiv(2)

		result_usd = rate_usd + ' $'

		response_vef = RestClient.get 'https://api.blinktrade.com/api/v1/VEF/ticker'
		response_vef = JSON.parse response_vef
		puts response_vef

		rate_vef = response_vef["high"].to_i + response_vef["low"].to_i
		rate_vef = rate_vef.fdiv(2)

		result_vef = rate_vef + ' Bs.'

		results = [
			[1, 'Surbitcoin', result_vef],
			[2, 'Bitfinex', result_usd]
			].map do |arr|
				Telegram::Bot::Types::InlineQueryResultArticle.new(
					id: arr[0],
					title: arr[1],
					input_message_content: Telegram::Bot::Types::InputTextMessageContent.new(message_text: arr[2])
					)
			end

			bot.api.answer_inline_query(inline_query_id: message.id, results: results)
		when Telegram::Bot::Types::Message
			kb = [
				Telegram::Bot::Types::InlineKeyboardButton.new(text: 'Precio Surbitcoin', callback_data: 'surbitcoin'),
				Telegram::Bot::Types::InlineKeyboardButton.new(text: 'Precio Foxbit',     callback_data: 'foxbit'),
				Telegram::Bot::Types::InlineKeyboardButton.new(text: 'Precio Bitfinex',   callback_data: 'bitfinex')
			]
			markup = Telegram::Bot::Types::InlineKeyboardMarkup.new(inline_keyboard: kb)
			bot.api.send_message(chat_id: message.chat.id, text: 'Elige una opción', reply_markup: markup)
		end
	end
end

=begin
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
=end
