const express = require('express');
const routes = express.Router();

const AuthenticationController = require('./controllers/AuthenticationController');
const ProfileController = require('./controllers/ProfileController');
const SummariesController = require('./controllers/SummariesController');
const ChargesController = require('./controllers/ChargesController');
const TransactionsController = require('./controllers/TransactionsController');

routes.post('/getQrCode', AuthenticationController.getQrCode);
routes.post('/watchLogin', AuthenticationController.watchLogin);
routes.post('/logout', AuthenticationController.logout);
routes.get('/profile', ProfileController.index);
routes.get('/summaries', SummariesController.index);
routes.get('/charges', ChargesController.index);
routes.get('/transactions', TransactionsController.index);

module.exports = routes;