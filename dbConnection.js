const mongoose = require("mongoose");

const connectDB = async () => {
 mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true }).
  catch(error => handleError(error));
  var db = mongoose.connection;
  db.on('error', console.error.bind(console, 'connection error:'));
  db.once('open', function() {
  console.log("Connected to mongodb")
});
};

module.exports = { connectDB };