const mongoose = require('mongoose');

const listSchema = mongoose.Schema({
	text: String // текст, связанный с элементом списка
});

const List = mongoose.model("elements", listSchema);

module.exports = List;
