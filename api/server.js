const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const session = require('express-session')

const authRouter = require('../auth/auth-router.js');
const usersRouter = require('../users/users-router.js');

const server = express();

const sessionConfig = {
  name: 'eloquence',
  secret: 'Keep it secret',
  cookie: {
    maxAge: 1000 * 60 * 10, // milliseconds
    secure: false, // use cookie over https
    httpOnly: true, // false means session is not created uninitialized
  },
  resave: false, // avoid recreating unchanged sessions
  saveUninitialized: false, // GDPR compliance
}

server.use(helmet());
server.use(express.json());
server.use(cors());
server.use(session(sessionConfig))

server.use('/api/auth', authRouter);
server.use('/api/users', usersRouter);

server.get('/', (req, res) => {
  res.send("It's alive!");
});

module.exports = server;
