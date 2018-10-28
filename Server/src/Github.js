const fetch = require('node-fetch');
const parse = require('parse-link-header');
const utils = require('./utils')


class ResponseError extends Error {
  constructor(res, body) {
    super(`${res.status} error requesting ${res.url}: ${res.statusText}`);
    this.status = res.status;
    this.path = res.url;
    this.body = body;
  }
}

class Github {
  constructor({
    token,
    baseUrl = 'https://api.github.com'
  } = {}) {
    this.token = token;
    this.baseUrl = baseUrl;
  }

  setToken(token) {
    this.token = token;
  }

  requestAllPages(path, opts = {}) {
    const url = `${this.baseUrl}${path}?per_page=20`;
    const options = {
      ...opts,
      headers: {
        Accept: 'application/vnd.github.v3+json',
        Authorization: `token ${this.token}`,
      },
    };
    
    return fetch(url, options).then(page => {
      let link = parse(page.headers.get('link'));
      let nbPages = link && link.last && link.last.page || 0
      let apiPromises = []

      apiPromises.push(Promise.resolve(utils.parseResponse(page)))

      for (let i = 2; i <= nbPages; i++) {
        let fetchPromise = fetch(url + '&page=' + i, options).then(utils.parseResponse)
        apiPromises.push(fetchPromise);
      }

      return Promise.all(apiPromises)
    })
  }

  requestAllLocations(contributorsUrls) {
    const options = {
      headers: {
        Accept: 'application/vnd.github.v3+json',
        Authorization: `token ${this.token}`,
      },
    };

    let apiPromises = contributorsUrls.map(url => fetch(url, options).then(utils.parseResponse))
  
    return Promise.all(apiPromises).then(utils.getLocations)
  }

  getRepo(username, repoName) {
    return this.requestAllPages(`/repos/${username}/${repoName}`);
  }

  getUser(username) {
    return this.requestAllPages(`/users/${username}`);
  }

  getRepoContributors(username, repoName) {
    return this.requestAllPages(`/repos/${username}/${repoName}/contributors`);
  }

  getRepoContributorsLocations(username, repoName) {
    return this.requestAllPages(`/repos/${username}/${repoName}/contributors`)
      .then(utils.spreadArrays)
      .then(utils.getUrls)
      .then(this.requestAllLocations.bind(this))
      .then(utils.getCountryCodes)
  }
}
module.exports = Github;