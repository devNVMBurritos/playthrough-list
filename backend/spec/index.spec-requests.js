const dotenv = require('dotenv');
dotenv.config();

exports.modules = {
  userRegisterCorrectRequest: {
    "url": "localhost:" + process.env.PORT + "/user/register",
    "method": "POST",
    "timeout": 0,
    "headers": {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    "data": {
      "username": "testuser1",
      "password": "password12345",
      "email": "e-mailaddress@example2.com"
    }
  },
  userRegisterCorrectRequest: {
    "url": "localhost:" + process.env.PORT + "/user/remove-user",
    "method": "POST",
    "timeout": 0,
    "headers": {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    "data": {
      "username": "testuser1"
    }
  },
}