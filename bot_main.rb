require 'telegram/bot'
require 'rest-client'
require 'timeout'
require 'byebug'

token = '204317225:AAHqFBk5aY_dKZDKToe8H93Ijn4z543edoM'

Telegram::Bot::Client.run(token) do |bot|

	bot.listen do |message|

		case message

		when Telegram::Bot::Types::CallbackQuery
			# Here you can handle your callbacks from inline buttons


			if message.data == 'instrucciones'
				bot.api.send_message(chat_id: message.from.id,
				text: "Hola #{message.from.first_name}! Gracias Por usarme, Mis instrucciones son las siguientes: \n
				1) Para iniciarlo, enviar '/start' \n
				2) ¿Deseas hacer una conversion?: Responder si o no \n
				3) ¿Qué tipo de conversión desea hacer?: Responder 'BTC a VEF', 'VEF a BTC', 'BTC a BRL', 'BRL a BTC', 'BTC a USD' y 'USD a BTC' \n
				4) Ingrese monto a convertir, solo números \n
				Gracias por elegirme!")
			end

			if message.data == 'surbitcoin'
				response = RestClient.get 'https://api.blinktrade.com/api/v1/VEF/ticker'
				response = JSON.parse response
				puts response

				rate_vef = response["high"].to_f + response["low"].to_f
				rate_vef = rate_vef.fdiv(2)

				bot.api.send_message(chat_id: message.from.id, text: "Hola, #{message.from.first_name}! \n Las estadisticas son las siguientes:  \n Precio de compra #{response['buy']} Bs. \n Precio de venta #{response['sell']} Bs. \n Precio Promedio #{rate_vef} Bs.")
				bot.api.send_message(chat_id: message.from.id, text: '¿Deseas hacer una conversión?')

				kb = [
					Telegram::Bot::Types::InlineKeyboardButton.new(text: 'Si', callback_data: 'si'),
					Telegram::Bot::Types::InlineKeyboardButton.new(text: 'No', callback_data: 'no')
				]
				markup = Telegram::Bot::Types::InlineKeyboardMarkup.new(inline_keyboard: kb)
				bot.api.send_message(chat_id: message.from.id, text: 'Elige una opción', reply_markup: markup)

				bot.listen do |reply|
					next if reply == false

					case reply.data
					when "si"
						bot.api.send_message(chat_id: reply.from.id, text: "¿Qué tipo de conversión deseas?")

						kb = [
							Telegram::Bot::Types::InlineKeyboardButton.new(text: 'BTC a VEF', callback_data: 'BTC a VEF'),
							Telegram::Bot::Types::InlineKeyboardButton.new(text: 'VEF a BTC', callback_data: 'VEF a BTC'),
						]
						markup = Telegram::Bot::Types::InlineKeyboardMarkup.new(inline_keyboard: kb)
						bot.api.send_message(chat_id: reply.from.id, text: 'Elige una opción', reply_markup: markup)

						bot.listen do |reply_2|
							next if reply_2 == false

							case reply_2.data
							when "BTC a VEF"
								bot.api.send_message(chat_id: reply_2.from.id, text: "Ingrese el monto por favor")

								bot.listen do |reply_3|
									next if reply_3 == false

									monto = reply_3.text
									monto = monto.to_f

									conversion = rate_vef * monto

									bot.api.send_message(chat_id: reply_3.from.id, text: "hola, esta es la conversión #{conversion} Bs.")
									bot.api.send_message(chat_id: reply_3.from.id, text: "Para un nuevo uso, envia /start")

									reply 	= false
									reply_2 = false
									reply_3 = false
									puts reply, reply_2, reply_3
									if reply_3 === false
										break
									end
								end
							when "VEF a BTC"
								bot.api.send_message(chat_id: reply_2.from.id, text: "Ingrese el monto por favor")

								bot.listen do |reply_3|
									next if reply_3 == nil

									monto = reply_3.text
									monto = monto.to_f

									conversion = monto.fdiv(rate_vef)

									bot.api.send_message(chat_id: reply_3.from.id, text: "hola, esta es la conversión #{conversion} BTC")
									bot.api.send_message(chat_id: reply_3.from.id, text: "Para un nuevo uso, envia /start")

									reply 	= false
									reply_2 = false
									reply_3 = false
								end
							end
							if reply_2 == false
								break
							end
						end
						if reply == false
							break
						end
					end
				end
			end

			if message.data == 'foxbit'
				response = RestClient.get 'https://api.blinktrade.com/api/v1/BRL/ticker'
				response = JSON.parse response
				puts response

				rate_brl = response["high"].to_f + response["low"].to_f
				rate_brl = rate_brl.fdiv(2)

				bot.api.send_message(chat_id: message.from.id, text: "Hola, #{message.from.first_name}! \n Las estadisticas son las siguientes:  \n Precio de compra #{response['buy']} R$ \n Precio de venta #{response['sell']} R$ \n Precio Promedio #{rate_brl} R$")
				bot.api.send_message(chat_id: message.from.id, text: '¿Deseas hacer una conversión?')

				kb = [
					Telegram::Bot::Types::InlineKeyboardButton.new(text: 'Si', callback_data: 'si'),
					Telegram::Bot::Types::InlineKeyboardButton.new(text: 'No', callback_data: 'no')
				]
				markup = Telegram::Bot::Types::InlineKeyboardMarkup.new(inline_keyboard: kb)
				bot.api.send_message(chat_id: message.from.id, text: 'Elige una opción', reply_markup: markup)


				bot.listen do |reply|
					next if reply == nil

					case reply.data
					when "si"
						bot.api.send_message(chat_id: reply.from.id, text: "¿Qué tipo de conversión deseas?")

						kb = [
							Telegram::Bot::Types::InlineKeyboardButton.new(text: 'BTC a BRL', callback_data: 'BTC a BRL'),
							Telegram::Bot::Types::InlineKeyboardButton.new(text: 'BRL a BTC', callback_data: 'BRL a BTC'),
						]
						markup = Telegram::Bot::Types::InlineKeyboardMarkup.new(inline_keyboard: kb)
						bot.api.send_message(chat_id: reply.from.id, text: 'Elige una opción', reply_markup: markup)

						bot.listen do |reply_2|
							next if reply_2 == nil
							case reply_2.data
							when "BTC a BRL"
								bot.api.send_message(chat_id: reply_2.from.id, text: "Ingrese el monto por favor")

								bot.listen do |reply_3|
									next if reply_3 == nil

									monto = reply_3.text
									monto = monto.to_f

									conversion = rate_brl * monto

									bot.api.send_message(chat_id: reply_3.from.id, text: "hola, esta es la conversión #{conversion} R$")
									bot.api.send_message(chat_id: reply_3.from.id, text: "Para un nuevo uso, envia /start")

									reply 	= nil
									reply_2 = nil
									reply_3 = nil
								end
							when "BRL a BTC"
								bot.api.send_message(chat_id: reply_2.from.id, text: "Ingrese el monto por favor")

								bot.listen do |reply_3|
									next if reply_3 == nil

									monto = reply_3.text
									monto = monto.to_f

									conversion = monto.fdiv(rate_brl)

									bot.api.send_message(chat_id: reply_3.from.id, text: "hola, esta es la conversión #{conversion} BTC")
									bot.api.send_message(chat_id: reply_3.from.id, text: "Para un nuevo uso, envia /start")

									reply 	= false
									reply_2 = false
									reply_3 = false
								end

							end
							if reply_2 == false
								break
							end
						end
						if reply == false
							break
						end
					end
				end
			end

			if message.data == 'bitfinex'
				response = RestClient.get 'https://api.bitfinex.com/v1/pubticker/btcusd'
				response = JSON.parse response
				puts response

				rate_usd = response["high"].to_f + response["low"].to_f
				rate_usd = rate_usd.fdiv(2)

				bot.api.send_message(chat_id: message.from.id, text: "Hola, #{message.from.first_name}! \n Las estadisticas son las siguientes:  \n Precio de compra #{response['bid']} $ \n Precio de venta #{response['ask']} $ \n Precio Promedio #{rate_usd} $")
				bot.api.send_message(chat_id: message.from.id, text: '¿Deseas hacer una conversión?')

				kb = [
					Telegram::Bot::Types::InlineKeyboardButton.new(text: 'Si', callback_data: 'si'),
					Telegram::Bot::Types::InlineKeyboardButton.new(text: 'No', callback_data: 'no')
				]
				markup = Telegram::Bot::Types::InlineKeyboardMarkup.new(inline_keyboard: kb)
				bot.api.send_message(chat_id: message.from.id, text: 'Elige una opción', reply_markup: markup)

				bot.listen do |reply|
					next if reply == nil

					case reply.data
					when "si"
						bot.api.send_message(chat_id: reply.from.id, text: "¿Qué tipo de conversión deseas?")

						kb = [
							Telegram::Bot::Types::InlineKeyboardButton.new(text: 'BTC a USD', callback_data: 'BTC a USD'),
							Telegram::Bot::Types::InlineKeyboardButton.new(text: 'USD a BTC', callback_data: 'USD a BTC'),
						]
						markup = Telegram::Bot::Types::InlineKeyboardMarkup.new(inline_keyboard: kb)
						bot.api.send_message(chat_id: reply.from.id, text: 'Elige una opción', reply_markup: markup)

						bot.listen do |reply_2|
							next if reply_2 == nil

							case reply_2.data
							when "BTC a USD"
								bot.api.send_message(chat_id: reply_2.from.id, text: "Ingrese el monto por favor")

								bot.listen do |reply_3|
									next if reply_3 == nil

									monto = reply_3.text
									monto = monto.to_f

									conversion = rate_usd * monto

									bot.api.send_message(chat_id: reply_3.from.id, text: "hola, esta es la conversión #{conversion} $")
									bot.api.send_message(chat_id: reply_3.from.id, text: "Para un nuevo uso, envia /start")

									reply 	= false
									reply_2 = false
									reply_3 = false
								end
							when "USD a BTC"
								bot.api.send_message(chat_id: reply_2.from.id, text: "Ingrese el monto por favor")

								bot.listen do |reply_3|
									next if reply_3 == nil

									monto = reply_3.text
									monto = monto.to_f

									conversion = monto.fdiv(rate_usd)

									bot.api.send_message(chat_id: reply_3.from.id, text: "hola, esta es la conversión #{conversion} BTC")
									bot.api.send_message(chat_id: reply_3.from.id, text: "Para un nuevo uso, envia /start")

									reply 	= false
									reply_2 = false
									reply_3 = false
									puts reply, reply_2, reply_3
								end
							end
							if reply_2 == false
								break
							end
						end
					else
						if reply == false
							break
						end
					end
				end
			end

		when Telegram::Bot::Types::InlineQuery
			response_usd = RestClient.get 'https://api.bitfinex.com/v1/pubticker/btcusd'
			response_usd = JSON.parse response_usd
			puts response_usd

			rate_usd = response_usd["high"].to_f + response_usd["low"].to_f
			rate_usd = rate_usd.fdiv(2)

			result_usd = rate_usd + ' $'

			response_vef = RestClient.get 'https://api.blinktrade.com/api/v1/VEF/ticker'
			response_vef = JSON.parse response_vef
			puts response_vef

			rate_vef = response_vef["high"].to_f + response_vef["low"].to_f
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
				Telegram::Bot::Types::InlineKeyboardButton.new(text: 'Instrucciones', callback_data: 'instrucciones'),
				Telegram::Bot::Types::InlineKeyboardButton.new(text: 'Precio Surbitcoin', callback_data: 'surbitcoin'),
				Telegram::Bot::Types::InlineKeyboardButton.new(text: 'Precio Foxbit',     callback_data: 'foxbit'),
				Telegram::Bot::Types::InlineKeyboardButton.new(text: 'Precio Bitfinex',   callback_data: 'bitfinex'),
				#Telegram::Bot::Types::InlineKeyboardButton.new(text: 'lol',   callback_data: 'lol')
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

rate_vef = response["high"].to_f + response["low"].to_f
rate_vef = rate_vef.fdiv(2)

reply.text = "Hola, #{message.from.first_name}! \n Las estadisticas son las siguientes:  \n Precio de compra #{response['buy']} Bs. \n Precio de venta #{response['sell']} Bs. \n Precio Promedio #{rate_vef} Bs."
when /precio foxbit/i
response = RestClient.get 'https://api.blinktrade.com/api/v1/BRL/ticker'
response = JSON.parse response
puts response

rate_brl = response["high"].to_f + response["low"].to_f
rate_brl = rate_brl.fdiv(2)

reply.text = "Hola, #{message.from.first_name}! \n Las estadisticas son las siguientes:  \n Precio de compra #{response['buy']} R$ \n Precio de venta #{response['sell']} R$ \n Precio Promedio #{rate_brl} R$"
when /precio bitfinex/i
response = RestClient.get 'https://api.bitfinex.com/v1/pubticker/btcusd'
response = JSON.parse response
puts response

rate_usd = response["high"].to_f + response["low"].to_f
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
