import mongoose from "mongoose";

const listSchema = mongoose.Schema({
	text: String // текст, связанный с элементом списка
});

const List = mongoose.model("elements", listSchema);

export default List;
