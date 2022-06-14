const UserService = require('../services/userService');

const createUserValid = (req, res, next) => {
  // TODO: Implement validatior for user entity during creation

  try {
    const { firstName, lastName, email, phoneNumber, password } = req.body;

    if (req.body.id) {
      throw Error("You can't declare id");
    }

    if (firstName === '' || lastName === '' || !firstName || !lastName) {
      throw Error('Name or lastname cannot be empty!');
    }

    if (password.length < 3 || password === '') {
      throw Error('Password cannot be < 3 characters!');
    }

    const gmailRegex = /[a-zA-Z0-9]+\@gmail.com/.test(email);

    if (!gmailRegex) {
      throw Error('Please enter a valid gmail post');
    }

    const telRegex = /^[-]?\d+$/.test(phoneNumber.slice(4));

    if (
      phoneNumber.length !== 13 ||
      phoneNumber.indexOf('+380') !== 0 ||
      !telRegex
    ) {
      throw Error('Please enter a correct phone number (+380xxxxxxxxx)');
    }
  } catch (err) {
    res.err = err;
  } finally {
    next();
  }
};

const updateUserValid = (req, res, next) => {
  // TODO: Implement validatior for user entity during update
  try {
    const { firstName, lastName, email, phoneNumber, password } = req.body;

    if (req.body.id) {
      throw Error("You can't declare id");
    }

    if (firstName === '' || lastName === '') {
      throw Error('Please enter valid name or lastname');
    }

    if (password.length < 3) {
      throw Error('Please enter valid password with 3 or more characters');
    }

    const telRegex = /^[-]?\d+$/.test(phoneNumber.slice(4));

    if (
      phoneNumber.length !== 13 ||
      phoneNumber.indexOf('+380') !== 0 ||
      !telRegex
    ) {
      throw Error('Please enter a correct phone number (+380xxxxxxxxx)');
    }

    const gmailRegex = /[a-zA-Z0-9]+\@gmail.com/.test(email);

    if (!gmailRegex) {
      throw Error('Please include a valid gmail post');
    }

    const existingUser = UserService.search({ id: req.params.id });

    if (!existingUser) {
      throw Error('User not found');
    }
  } catch (err) {
    res.err = err;
  } finally {
    next();
  }
};

exports.createUserValid = createUserValid;
exports.updateUserValid = updateUserValid;
