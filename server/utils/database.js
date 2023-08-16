import mongoose from "mongoose";
const url = "mongodb://gen_user:6,m|^VIihN7OA)@77.232.129.4:27017/default_db?authSource=admin&directConnection=true"

const connectDB = async () => {
	try {
		await mongoose.connect(url);
		console.log("MongoDB connected");
	} catch (err) {
		console.log(err);
	}
};

module.exports = connectDB;
