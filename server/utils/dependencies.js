const express = require('express');
const mongoose = require('mongoose');
const bot = require('./telegramBot');
const axios = require('axios');
const cors = require('cors');
const logger = require('morgan');
const cookieParser = require('cookie-parser');

module.exports = {
	express,
	mongoose,
	bot,
	axios,
	cors,
	logger,
	cookieParser
};