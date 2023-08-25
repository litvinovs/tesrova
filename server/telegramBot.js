const TelegramBot = require('node-telegram-bot-api');

const TOKEN = '6519194051:AAG2kj0L7zwYCl0K3eyfQT2DCtMkoH7Nk6Y';

const bot = new TelegramBot(TOKEN, {polling: false}); // Отключаем polling

const WEBHOOK_URL = 'https://drab-plum-dalmatian-gear.cyclic.app/todoskabot';

bot.setWebHook(WEBHOOK_URL);

module.exports = bot;
