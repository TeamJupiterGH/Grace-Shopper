const express = require('express');
const app = express();
const router = require('express').Router();
const {
  models: { User },
} = require('../db');
module.exports = router;

// const requireToken = async(req, res, next) => {
//     try {
//         const token = req.headers.authorization
//         const user = await User.
//     }
// }