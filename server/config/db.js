const mongoose = require('mongoose');
const dbURL = require('./properties').DB;

// Create mongoDB Connection object and export it
module.exports = () => {

	// Connect to the MongoDB database or create it if doesn't exists
	// dbURL is the name of the database
	// useNewUrlParser and useUnifiedTopology are required parameters to properly connect to MongoDB in current version (4.2.1)
	mongoose.connect(dbURL, {useNewUrlParser : true, useUnifiedTopology : true})
		// Event handler for successful connection
		.then(() => console.log(`Mongo connected on ${dbURL}`))

		// Event handler for unsuccessful connection
		.catch(err => console.log(`Connection has error ${err}`));

	// Automatically disconnect from database only in the case of a process interruption (Ctrl^C)
	process.on('SIGINT', () => {
		mongoose.connection.close(() => {
			console.log(`Mongo is disconnected`);
			process.exit(0);
		});
	});
}