import TelegramBot from 'node-telegram-bot-api';

const TOKEN = '6671132102:AAHDvEJtO8gkoRWZUHnZZZ-uzR5D53IVY58';

const bot = new TelegramBot(TOKEN, {polling: false}); // Отключаем polling

const WEBHOOK_URL = 'https://drab-plum-dalmatian-gear.cyclic.app/todoskabot';

bot.setWebHook(WEBHOOK_URL);

console.log('bot started');

export default bot;
