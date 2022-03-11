
var axios = require('axios');
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
		var getData = {};
		var deleteData = {};


		beforeAll((done) => {
			axios(requests.userRegisterCorrectRequest)
				.then((registerRes) => {
					registerData.status = registerRes.status;
					registerData.body = registerRes.data;
					return axios(requests.userGetUserRequest);

				})
				.then((getRes) => {
					getData.status = getRes.status;
					getData.body = getRes.data;
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

		describe('POST /user/get-user', () => {
			it('Status 200', () => {
				expect(getData.status).toBe(200);
				expect(getData.body === 'Got user data!');
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