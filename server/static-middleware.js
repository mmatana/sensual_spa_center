const path = require('path');
const express = require('express');
const publicPath = path.join(__dirname, 'build/');
const staticMiddlware = express.static(publicPath);

module.exports = staticMiddlware;
