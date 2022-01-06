var Express = require('express');
const dotenv = require('dotenv');
dotenv.config();

describe('Server', () => {
  var server;
  var requests;
  beforeAll(() => {
    server = require('../index');
    requests = require('./index.spec-requests');
  });
  afterAll(() => {
    server.close();
  });

  // #region User tests
  describe('GET /user/register', () => {
    var data = {};
    beforeAll((done) => {
      Request.get(requests.userRegisterCorrectRequest, (error, res, body) => {
        data.status = res.statusCode;
        data.body = body
        done();
      }).catch((err) => {
        console.log(err);
      });
    });
    afterAll(() => {
      Request.delete(requests.cleanUpRegister)
    })

    it("Status 200", () => {
      expect(data.status).toBe(200);
    })

  // #endregion
  })
})