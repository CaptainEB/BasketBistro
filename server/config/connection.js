const mongoose = require('mongoose');

mongoose.connect(
	process.env.MONGO_URL,
	{
		useNewUrlParser: true,
		useUnifiedTopology: true,
	} || 'mongodb://127.0.0.1:27017/basketBistro'
);

module.exports = mongoose.connection;
