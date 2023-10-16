const mongoose = require('mongoose');
// const mongoURI = 'mongodb+srv://nidafx9:nida@cluster0.wiqxgzk.mongodb.net/?retryWrites=true&w=majority';

const connectDB = (url) => {
  mongoose.connect(url, {
    useNewUrlParser: true,
    // useCreateIndex: true,
    // useFindAndModify: false,
    useUnifiedTopology: true,
  }).then(() => {
    console.log('MongoDB Connected');
  })
    .catch((error) => {
      console.error("Error connecting to MongoDB:", error);
    });
};

module.exports = connectDB;