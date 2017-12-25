'use strict';

const express = require('express');
const router = express.Router();

router.get('/', (req,res) => {
  res.sendFile(__dirname +  '/views/badgeDashboard.html');
});

module.exports = router;