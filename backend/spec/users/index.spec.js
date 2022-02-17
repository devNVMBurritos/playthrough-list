
var axios = require('axios');
var Express = require('express');
const dotenv = require('dotenv');
dotenv.config();

describe('Server', () => {
  var server;
  var requests;
  beforeAll(() => {
    server = require('../../index');
    requests = require('../helpers/index.spec-requests');
  });

  // #region User tests
  describe('POST /user', () => {
    var registerData = {};
    beforeAll((done) => {
      axios(requests.userRegisterCorrectRequest).then((res) => {
        registerData.status = res.status;
        registerData.body = res.data
        done();
      });
    })

    describe('POST /user/register', () => {
      it("Status 200", () => {
        expect(registerData.status).toBe(200);
      })
    })

    describe('POST /user/delete', () => {
      var data = {};
      beforeAll((done) => {
        axios(requests.userRemoveUserRequest).then((res) => {
          data.status = res.status;
          data.body = res.data
          done();
        })
      })
      it("Status 200", () => {
        expect(data.status).toBe(200)
        expect(data.body === 'User removed!')
      })
    })
  })
  // #endregion
})