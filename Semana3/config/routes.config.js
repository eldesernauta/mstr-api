const express = require('express');
const router = express.Router();

const posts = require('../controllers/posts.controller')
const users = require('../controllers/users.controller')
const secure = require('../middlewares/secure.middleware')

// Posts Routes
router.get('/posts', secure.auth, posts.list)
router.post('/posts', secure.auth, posts.create);
router.get('/posts/:id', secure.auth, posts.detail);
router.patch('/posts/:id', secure.auth, posts.edit);
router.delete('/posts/:id', secure.auth, posts.delete);

// Users Routes
router.get('/users', users.list)
router.get("/users/:id/activate", users.activate)
router.post("/users", users.create)
router.post("/login", users.login)

module.exports = router;
