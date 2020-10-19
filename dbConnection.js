const mongoose = require("mongoose");

const connectDB = async () => {
 mongoose.connect("mongodb://dbuser:dbpassword@localhost:27017/projectdb", { useNewUrlParser: true }).
  catch(error => handleError(error));
  var db = mongoose.connection;
  db.on('error', console.error.bind(console, 'connection error:'));
  db.once('open', function() {
  console.log("Connected to mongodb")
});
};

module.exports = { connectDB };