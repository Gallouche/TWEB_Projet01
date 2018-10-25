// loads environment variables
require('dotenv/config');
const express = require('express');
const cors = require('cors');
const Github = require('./src/Github');
// const utils = require('./src/utils');

const app = express();
const port = process.env.PORT || 3000;

const client = new Github({ token: process.env.OAUTH_TOKEN });

client.requestAllPages();

// Enable CORS for the client app
app.use(cors());

app.get('/', (req, res) => {
  res.send({ message: 'hi there' });
});

app.get('/user/:username', (req, res, next) => {
  client.getUser(req.params.username)
    .then(username => res.send(username))
    .catch(next);
});

app.get('/repo/:username/:repoName', (req, res, next) => {
  client.getRepo(req.params.username, req.params.repoName)
    .then(repoName => res.send(repoName))
    .catch(next);
});

app.get('/contrib/:username/:repoName', (req, res, next) => {
  client.getRepoContributors(req.params.username, req.params.repoName)
    .then(contrib => res.send(contrib.map(c => c.url)))
    .catch(next);
});

app.get('/stargazers/:username/:repoName', (req, res, next) => {
  client.getRepoStargazers(req.params.username, req.params.repoName)
    .then(star => res.send({ logins: star.map(c => c.login), size: star.length }))
    .catch(next);
});

// Forward 404 to error handler
app.use((req, res, next) => {
  const error = new Error('Not found');
  error.status = 404;
  next(error);
});

// Error handler
app.use((err, req, res, next) => { // eslint-disable-line no-unused-vars
  console.error(err);
  res.status(err.status || 500);
  res.send(err.message);
});

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Server listening at http://localhost:${port}`);
});
