import bot from '~/server/telegram/telegramBot'

export default defineEventHandler(async (event) => {
	const body = await readBody(event)
	
	const text = body.text
	
	console.log(TEEEST)
	
	bot.sendMessage('Привет! Я ваш бот.')
	

})

// app.post("/telegram_update_12345", async function (req, res) {
//
// 	let chatId;
// 	let text;
//
// 	if (req.body && req.body.message && req.body.message.chat) {
// 		chatId = req.body.message.chat.id;
// 		text = req.body.message.text;
//
// 		console.log(`Получен запрос от пользователя с ID ${chatId}`);
// 	} else {
// 		console.log(`Хреново`);
// 	}
//
// 	if (req.body.my_chat_member && req.body.my_chat_member.new_chat_member.status === 'kicked') {
// 		const userId = req.body.my_chat_member.chat.id;
// 		console.log(`Пользователь с ID ${userId} заблокировал бота.`);
// 		// Здесь вы можете добавить дополнительную логику, например, удалить пользователя из базы данных
// 	}
//
// 	if (text === '/test') {
// 		// Выполните запрос к серверу для получения списка элементов
// 		const response = await axios.get('https://drab-plum-dalmatian-gear.cyclic.app/list');
//
// 		// Форматируем список элементов для отправки пользователю
// 		const elementsList = response.data.elements.map((element, index) => `${index + 1}. ${element.text}`).join('\n');
//
// 		bot.sendMessage(chatId, elementsList);
// 	} else {
// 		bot.sendMessage(chatId, 'Привет! Я ваш бот.');
// 	}
//
// 	res.status(200).end();
// });