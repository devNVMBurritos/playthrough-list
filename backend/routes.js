// Handlers:
// User
const login = require('./handlers/user/login');
const register = require('./handlers/user/register');
const addUserRole = require('./handlers/user/role/add-user-role');
const getUser = require('./handlers/user/get-user');
const removeUser = require('./handlers/user/remove-user');

// Game
const addGame = require('./handlers/game/add-game');
const getGame = require('./handlers/game/get-game');
const removeGame = require('./handlers/game/remove-game');
const editGame = require('./handlers/game/edit-game');

const getGameListAll = require('./handlers/game/list/get-game-list-all');
const getGameListPromoted = require('./handlers/game/list/get-game-list-promoted');

// Review
const addReview = require('./handlers/review/add-review');
const getReview = require('./handlers/review/get-review');
const editReview = require('./handlers/review/edit-review');
const removeReview = require('./handlers/review/remove-review');

const getGameReviewScore = require('./handlers/game/review/get-game-review-score');
const getReviewListUsers = require('./handlers/review/list/get-review-list-users');

// Playthrough
const addPlaythrough = require('./handlers/playthrough/add-playthrough');
const editPlaythrough = require('./handlers/playthrough/edit-playthrough');
const removePlaythrough = require('./handlers/playthrough/remove-playthrough');
const getPlaythrough = require('./handlers/playthrough/get-playthrough');

const getPlaythroughListUsers = require('./handlers/playthrough/list/get-playthrough-list-users');

// Middleware:
const isAuthenticated = require('./middleware/authentiuacation/is-authenticated');

const isAdmin = require('./middleware/authorization/is-admin');
const isGameModerator = require('./middleware/authorization/is-game-moderator');
const isCustomerService = require('./middleware/authorization/is-customer-service');
const isCustomer = require('./middleware/authorization/is-customer');

module.exports =  [
	//#region User paths
	{
		method: 'post',
		path: '/user/login',
		middleware: [],
		handler: login,
	},
	{
		method: 'post',
		path: '/user/register',
		middleware: [],
		handler: register,
	},
	{
		method: 'put',
		path: '/user/add-role',
		middleware: [isAuthenticated, isCustomerService],
		handler: addUserRole,
	},
	{
		method: 'get',
		path: '/user/get-user',
		middleware: [isAuthenticated, isCustomerService],
		handler: getUser,
	},
	{
		method: 'delete',
		path: '/user/remove-user',
		middleware: [isAuthenticated, isAdmin],
		handler: removeUser,
	},
	//#endregion
	//#region Game paths
	{
		method: 'post',
		path: '/game/add-game',
		middleware: [isAuthenticated, isGameModerator],
		handler: addGame,
	},	
	{
		method: 'post',
		path: '/game/get-game',
		middleware: [],
		handler: getGame,
	},
	{
		method: 'delete',
		path: '/game/remove-game',
		middleware: [isAuthenticated, isGameModerator],
		handler: removeGame,
	},
	{
		method: 'put',
		path: '/game/edit-game',
		middleware: [isAuthenticated, isGameModerator],
		handler: editGame,
	},
	//#endregion
	//#region GameList paths
	{
		method: 'get',
		path: '/game/list/get-game-list-all',
		middleware: [],
		handler: getGameListAll
	},
	{
		method: 'get',
		path: '/game/list/get-game-list-promoted',
		middleware: [],
		handler: getGameListPromoted
	},
	//endregion
	//#endregion
	//#region GameReviewScore paths
	{
		method: 'get',
		path: '/game/review/get-game-review-score',
		middleware: [],
		handler: getGameReviewScore
	},
	//#endregion
	//#region Review paths
	{
		method: 'post',
		path: '/review/add-review',
		middleware: [isAuthenticated, isCustomer],
		handler: addReview,
	},
	{
		method: 'post',
		path: '/review/edit-review',
		middleware: [isAuthenticated, isCustomer],
		handler: editReview,
	},
	{
		method: 'delete',
		path: '/review/remove-review',
		middleware: [isAuthenticated, isCustomer],
		handler: removeReview,
	},
	{
		method: 'post',
		path: '/review/get-review',
		middleware: [isAuthenticated, isCustomer],
		handler: getReview,
	},
	//#region ReveiwList paths
	{
		method: 'post',
		path: '/review/list/get-review-list-users',
		middleware: [isAuthenticated, isCustomer],
		handler: getReviewListUsers
	},
	//#endregion
	//#endregion
	//#region Playthrough paths
	{
		method: 'post',
		path: '/playthrough/add-playthrough',
		middleware: [isAuthenticated, isCustomer],
		handler: addPlaythrough,
	},
	{
		method: 'put',
		path: '/playthrough/edit-playthrough',
		middleware: [isAuthenticated, isCustomer],
		handler: editPlaythrough,
	},  
	{
		method: 'post',
		path: '/playthrough/get-playthrough',
		middleware: [isAuthenticated, isCustomer],
		handler: getPlaythrough,
	},
	{
		method: 'delete',
		path: '/playthrough/remove-playthrough',
		middleware: [isAuthenticated, isCustomer],
		handler: removePlaythrough,
	},	
	//#region Playthrough paths
	{
		method: 'post',
		path: '/playthrough/list/get-playthrough-list-users',
		middleware: [isAuthenticated, isCustomer],
		handler: getPlaythroughListUsers,
	},

	//#endregion
	//#endregion
];
