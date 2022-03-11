const dotenv = require('dotenv');
var qs = require('qs');
dotenv.config();

const port = process.env.PORT;

module.exports = {
	userRegisterCorrectRequest: {
		method: 'post',
		url: (`http://localhost:${port}/user/register`),
		data: qs.stringify({
			'username': 'testuser1',
			'password': 'password12345',
			'email': 'e-mailaddress@example2.com'
		}),
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded'
		},
	},
	userGetUserRequest: {
		url: `http://localhost:${port}/user/get-user`,
		method: 'GET',
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded',
			'Authorization': 'Bearer f59cf8df33a6b60d8b995b4e2e40251426f518579d9cbab0c10ed4e0f872cd7508c61e544afc2b847fa5c817bec08f29a2b352b60e7a394ba4f2d476fc494aa9fe81433f18aa2038171876d2c2c315545a3f9e760af6e4f42ff3b59deb7c9d882c4641d567ee66a775836266862f0fe68a1684a58dbfa9bd5543d3fb75e46858ed9682c5cfd29964047b35dd8de03202e7254825d6f315bb65baa68344e5a4b4886555c902de7062eb1b5c25916c3e2e05985ef5158a57e68e222b35a5a177ebaeaf547ca957365458917d70ca98b95561a1037da4e87ea6a0011262586b864db71c8df652e8305270ed50b9fc31331bc9993a94e2ecf48dcc39d81c5948426d0a90ea667c3a700e4e8de290a1b57645415cd4ee6ea7ee84998c092c2bc44bdf2de61a8ec912d1238e388aa2e1fc9d355a872bcd367a1cffef1c242fbf0d26575e5ce92d3795cebfb2633f727dd5d26e68c30aabe97f7f71124ddd6f05513c01c19bd501236bf43b8e08bca28cdbea6ac6d0eebd956d2c0c64c5d15a9dbeb472466c3625ec64d176eef27628627a51aa8dbcfab4ba53ee09f9baded47632a14b7818adfbf793ef8179cb27782f003f4e1e5130d9351ae7d5b0cfaeb8878d1423f656ce5209035b6a71717e46f1d8d26dbb438d1b6a3d2ba2951606a4bec38415a45251960b649e3e30e0603ee694c4f6fe217ea56e02d44fe721a659aae9d204'
		},
		data: qs.stringify({
			'username': 'testuser1',
		}),
	},
	userRemoveUserRequest: {
		url: `http://localhost:${port}/user/remove-user`,
		method: 'DELETE',
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded',
			'Authorization': 'Bearer f59cf8df33a6b60d8b995b4e2e40251426f518579d9cbab0c10ed4e0f872cd7508c61e544afc2b847fa5c817bec08f29a2b352b60e7a394ba4f2d476fc494aa9fe81433f18aa2038171876d2c2c315545a3f9e760af6e4f42ff3b59deb7c9d882c4641d567ee66a775836266862f0fe68a1684a58dbfa9bd5543d3fb75e46858ed9682c5cfd29964047b35dd8de03202e7254825d6f315bb65baa68344e5a4b4886555c902de7062eb1b5c25916c3e2e05985ef5158a57e68e222b35a5a177ebaeaf547ca957365458917d70ca98b95561a1037da4e87ea6a0011262586b864db71c8df652e8305270ed50b9fc31331bc9993a94e2ecf48dcc39d81c5948426d0a90ea667c3a700e4e8de290a1b57645415cd4ee6ea7ee84998c092c2bc44bdf2de61a8ec912d1238e388aa2e1fc9d355a872bcd367a1cffef1c242fbf0d26575e5ce92d3795cebfb2633f727dd5d26e68c30aabe97f7f71124ddd6f05513c01c19bd501236bf43b8e08bca28cdbea6ac6d0eebd956d2c0c64c5d15a9dbeb472466c3625ec64d176eef27628627a51aa8dbcfab4ba53ee09f9baded47632a14b7818adfbf793ef8179cb27782f003f4e1e5130d9351ae7d5b0cfaeb8878d1423f656ce5209035b6a71717e46f1d8d26dbb438d1b6a3d2ba2951606a4bec38415a45251960b649e3e30e0603ee694c4f6fe217ea56e02d44fe721a659aae9d204'
		},
		data: qs.stringify({
			'username': 'testuser1',
		}),
	},
};
