const mongoose = require('mongoose');

module.exports = function () {
  mongoose
    .connect(process.env.DATABASE_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
    })
    .then(() => {
      console.log('MONGO CONNECTION OPEN!!!');
    })
    .catch((err) => {
      console.log('MONGO CONNECTION ERROR!!!!');
      console.log(err);
    });
};
