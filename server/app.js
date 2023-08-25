// Импорт необходимых модулей

const express = require('express');

const mongoose = require('mongoose');
const bot = require('./telegramBot');
const axios = require('axios');


const cors = require('cors');
const logger = require('morgan');
const cookieParser = require('cookie-parser');



const url = process.env.MONGO_DB_URL


const connectDB = async () => {
	try {
		await mongoose.connect(url);
		console.log("MongoDB connected");
	} catch (err) {
		console.log(err);
	}
};

connectDB();

// Определение схемы для модели в MongoDB
const listSchema = mongoose.Schema({
	text: String // текст, связанный с элементом списка
});

// Ассоциация модели "List" с коллекцией "elements" в MongoDB
const List = mongoose.model("elements", listSchema);

// Создание Express.js приложения
const app = express();

app.use(cors({
	origin: 'https://todoska.netlify.app'
}));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());




app.post("/list", function (req, res) {
	let text = req.body.text;
	
	List.create({text: text})
		.then(function (doc) {
			res.json({id: doc._id, text: text});
		})
});

app.post("/telegram", async function (req, res) {
	let chatId;
	let text;
	
	if (req.body && req.body.message && req.body.message.chat) {
		chatId = req.body.message.chat.id;
		text = req.body.message.text;
		
		console.log(`Получен запрос от пользователя с ID ${chatId}`);
	} else {
		console.log(`Хреново`);
	}
	
	if (req.body.my_chat_member && req.body.my_chat_member.new_chat_member.status === 'kicked') {
		const userId = req.body.my_chat_member.chat.id;
		console.log(`Пользователь с ID ${userId} заблокировал бота.`);
		// Здесь вы можете добавить дополнительную логику, например, удалить пользователя из базы данных
	}

	if (text === '/test') {
		// Выполните запрос к серверу для получения списка элементов
		const response = await axios.get('https://drab-plum-dalmatian-gear.cyclic.app/list');

		// Форматируем список элементов для отправки пользователю
		const elementsList = response.data.elements.map((element, index) => `${index + 1}. ${element.text}`).join('\n');

		bot.sendMessage(chatId, elementsList);
	} else {
		bot.sendMessage(chatId, 'Привет! Я ваш бот.');
	}

	res.status(200).end();
});

app.get("/list", function (req, res) {
	
	console.log('get list');
	
	
	List.find({})
		.then(function (elements, err) {
			res.json({elements: elements});
		})
});

app.put("/list", function (req, res) {
	console.log(req.body);
	
	const id = req.body.id;
const text = req.body.text;

console.log(id, text);

List.updateOne({_id: id}, {text: text}).exec()

res.send("ok");
});

app.delete("/list", function (req, res) {
	const id = req.body.id;
	
	List.deleteOne({_id: id}).exec()
	
	res.send();
});


module.exports = app;
