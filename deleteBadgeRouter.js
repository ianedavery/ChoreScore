'use strict';

const express = require('express');
const router = express.Router();

router.get('/', (req,res) => {
  res.sendFile(__dirname +  '/views/deleteBadges.html');
});

module.exports = router;