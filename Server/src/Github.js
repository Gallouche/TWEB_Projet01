const fetch = require('node-fetch');
const parse = require('parse-link-header');


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

  request(path, opts = {}) {
    const url = `${this.baseUrl}${path}`;
    //const url = path;
    const options = {
      ...opts,
      headers: {
        Accept: 'application/vnd.github.v3+json',
        Authorization: `token ${this.token}`,
      },
    };

    return fetch(url, options)
      .then(res => res.json()
        .then((data) => {
          if (!res.ok) {
            throw new ResponseError(res, data);
          }
          return data;
        }));
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

    let nbPages = 0;

    return fetch(url, options)
      .then(res => {
        const apiPromises = [];
        let parsedLink = parse(res.headers.get('link'));
        nbPages = parsedLink.last.page;
        let data = [];

        console.log(url)

        data.push(res.json())

        for (let i = 2; i <= nbPages; i++) {
          let u = url + '&page=' + i;
          console.log(u)
          apiPromises.push(fetch(url + '&page=' + i, options));
        }

        Promise.all(apiPromises)
          .then(responses => {
            responses.map(r => r.json()
            .then((d) => {
              console.log(d.length);
            }))
          })
      })
  }

  getRepo(username, repoName) {
    return this.request(`/repos/${username}/${repoName}`);
  }

  getUser(username) {
    return this.request(`/users/${username}`);
  }

  getRepoContributors(username, repoName) {
    return this.request(`/repos/${username}/${repoName}/contributors`);
  }

  getRepoContributorsTest(username, repoName) {
    return this.requestAllPages(`/repos/${username}/${repoName}/contributors`);
  }

  getContributorsLocations(username, repoName) {
    let locations = []

    this.request(`/repos/${username}/${repoName}/contributors`)
      .then(res => res.map(user => {
        locations.push(fetch(user.url)
          .then(r => r.json()))
      }))

    return locations
  }
}


module.exports = Github;