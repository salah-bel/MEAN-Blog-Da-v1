const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

// EMAIL VALIDATION
// 1-- validation Email: check length of email
const emailLenghtChecker = email => {
  if (!email) {
    return false;
  }else {
    if (email.length < 5 || email.length >30 ) {
      return false;
    }else {
      return true;
    }
  }
}
// 2--validation Email: RegExp
const validEmailChecker = email => {
  if (!email) {
    return false
  }else {
    const regExp = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
    return regExp.test(email);
  }
}
// 3-- validation array Email
const emailValidators = [
  {
    validator: emailLenghtChecker,
    msg: 'E-mail must be between 5 and 30 characters'
  },
  {
    validator: validEmailChecker,
    msg: 'Must be a valid Email'
  }
]


// USERNAME VALIDATION
// 1-- validation username: lengths
const usernameLenghtChecker = username => {
  if (!username) {
    return false;
  }else {
    if (username.length < 5 || username.length >15 ) {
      return false;
    }else {
      return true;
    }
  }
} 
// 2--validation username: RegExp
const validUsernameChecker = username => {
  if (!username) {
    return false
  }else {
    const regExp = new RegExp( /^[a-zA-Z\-]+$/);
    return regExp.test(username);
  }
}
// 3-- validation array Username
const usernameValidators = [
  {
    validator: usernameLenghtChecker,
    msg: 'Username must be between 5 and 15 characters'
  },
  {
    validator: validUsernameChecker,
    msg: 'Must be a valid Username'
  }
]

// PASSWORD VALIDATION
// 1-- validation password: lengths
const passwordLenghtChecker = password => {
  if (!password) {
    return false;
  }else {
    if (password.length < 8 || password.length >30 ) {
      return false;
    }else {
      return true;
    }
  }
} 
// 2--validation password: RegExp
const validPasswordChecker = password => {
  if (!password) {
    return false
  }else {
    const regExp = new RegExp( "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})" );
    return regExp.test(password);
  }
}
// 3-- validation array password
const passwordValidators = [
  {
    validator: passwordLenghtChecker,
    msg: 'Username must have 8 charactres min  and 30 characters max'
   },
  {
    validator: validPasswordChecker,
    msg: 'Password must have at least one Uppercase, Lowercase, special charactre, and number'
  }
]




const userSchema = new Schema({
  email: { type: String, required: true, unique: true, lowercase: true, validate: emailValidators },
  username: { type: String, required: true, unique: true, lowercase: true, validate: usernameValidators },
  password: { type: String, required: true, validate: passwordValidators },
});


//midellware
userSchema.pre('save', function (next) {
  const user = this;
  const salt = 10;

  // only hash the password if it has been modified (or is new)
  if (!user.isModified('password')) return next();

  // generate a salt
  bcrypt.genSalt(salt, function (err, salt) {
    if (err) return next(err);

    // hash the password using our new salt
    bcrypt.hash(user.password, salt, function (err, hash) {
      if (err) return next(err);
      // override the cleartext password with the hashed one
      user.password = hash;
      next();
    });
  });
});
//compare password

userSchema.methods.comparePassword = password => {
  bcrypt.compare(password, this.password, (err, isMatch) => {
    if (err) {
      console.log(err)
    } else {
      isMatch
    };

  });
};




module.exports = mongoose.model('User', userSchema);