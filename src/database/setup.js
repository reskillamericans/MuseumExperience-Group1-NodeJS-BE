const mongoose = require('mongoose');
module.exports = function () {
  mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
    .then(() => {
      console.log('Mongo Connection Open!');
    })
    .catch((err) => {
      console.log('Mongo Connection Error!', err);
    });
};