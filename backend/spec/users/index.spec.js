
var axios = require('axios');
// var Express = require('express');
const dotenv = require('dotenv');
dotenv.config();

describe('Server', () => {
	// eslint-disable-next-line no-unused-vars
	let server;
	var requests;
	beforeAll(() => {
		server = require('../../index');
		requests = require('../helpers/index.spec-requests');
	});

	// #region User tests
	describe('POST /user', () => {
		var registerData = {};
		var deleteData = {};
		beforeAll((done) => {
			axios(requests.userRegisterCorrectRequest)
				.then((registerRes) => {
					registerData.status = registerRes.status;
					registerData.body = registerRes.data;

					return axios(requests.userRemoveUserRequest);
				})
				.then((delteRes) => {
					deleteData.status = delteRes.status;
					deleteData.body = delteRes.data;
					done();
				});

		});

		describe('POST /user/register', () => {
			it('Status 200', () => {
				expect(registerData.status).toBe(200);
			});
		});

		describe('POST /user/delete', () => {
			it('Status 200', () => {
				expect(deleteData.status).toBe(200);
				expect(deleteData.body === 'User removed!');
			});
		});
		
	});
	// #endregion
});