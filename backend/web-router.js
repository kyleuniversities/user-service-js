/**
 * Router used to deploy frontend web pages
 */
const express = require('express');
const path = require('path');
const router = express.Router();

router.use(express.static(path.join(__dirname, '../frontend/build')));

router.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, '../frontend/build', 'index.html'));
});

module.exports = router;
