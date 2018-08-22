'use strict';

const express = require('express');
const router = express.Router();

const dashboard = require('./controllers/dashboard.js');
const about = require('./controllers/about.js');
const accounts = require('./controllers/accounts.js');
const trainerdashboard = require('./controllers/trainerdashboard.js');

//router.get('/', dashboard.index);
// Home Page
router.get('/dashboard', dashboard.index);
router.get('/about', about.index);
router.post('/dashboard/addassessment', dashboard.addAssessment);
router.get('/dashboard/deleteassessment/:id', dashboard.deleteAssessment);

// Accounts
router.get('/', accounts.index);
router.get('/signup', accounts.signup);
router.get('/login', accounts.login);
router.get('/logout', accounts.logout);
router.post('/authenticate', accounts.authenticate);
router.post('/register', accounts.register);
router.get('/settings', accounts.settings);
router.post('/settings/update', accounts.updateSettings);

//Trainer page
router.get('/trainerdashboard', trainerdashboard.index);
router.get('/trainerassessment/:id', trainerdashboard.trainerAssessment);
router.get('/trainerdashboard/deletemember/:id', trainerdashboard.deleteMember);
//router.post('/editcomment/:id', trainerdashboard.editComment);

module.exports = router;
