import TelegramBot from 'node-telegram-bot-api';

const TOKEN = '6519194051:AAG2kj0L7zwYCl0K3eyfQT2DCtMkoH7Nk6Y';

const bot = new TelegramBot(TOKEN, {polling: false}); // Отключаем polling

const WEBHOOK_URL = 'https://functions.yandexcloud.net/d4emu8jfdfv14p03e95p/telegram';

bot.setWebHook(WEBHOOK_URL);

console.log('bot started');

export default bot;


//
// import { Telegraf } from 'telegraf'
//
// const bot = new Telegraf('6519194051:AAG2kj0L7zwYCl0K3eyfQT2DCtMkoH7Nk6Y')
//
// bot.start((ctx) => ctx.reply('Hello World!'))
//
// bot.launch({
// 	webhook: {
// 		domain: 'localhost',
// 		port: 3000
// 	}
// })


// import TelegramBot from 'node-telegram-bot-api';
//
// const token = '6519194051:AAG2kj0L7zwYCl0K3eyfQT2DCtMkoH7Nk6Y';
//
// const bot = new TelegramBot(token, {polling: true});
//
// bot.on('message', (msg) => {
// 	bot.sendMessage(msg.chat.id, 'Hello World!');
// });
//
// bot.onText(/\/start/, (msg) => {
// 	bot.sendMessage(msg.chat.id, 'START!');
// });
//
// export default bot;
