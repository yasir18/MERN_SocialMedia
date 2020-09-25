var config = require('config');
var mongoose = require('mongoose');

var connectionString = config.mongoURI;

const connectDb = async () => {
	try {
		await mongoose.connect(connectionString, {
			useNewUrlParser: true,
			useCreateIndex: true,
			useFindAndModify: false,
			useUnifiedTopology: true,
		});
		console.log('Mongoose connection established');
	} catch (error) {
		console.log(error);
	}
};

module.exports = connectDb;
