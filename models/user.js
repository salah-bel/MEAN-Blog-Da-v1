 const mongoose = require('mongoose');
 const Schema = mongoose.Schema;

  const userSchema = new Schema({
    email:      {String, required, unique, lowercase},
    username:   {String, required, unique, lowercase},
    password:   {String, required},
  });

model.exports = mongoose.model('User', userSchema);