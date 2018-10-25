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
    const url = path;
    //const url = `${this.baseUrl}${path}`;
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
          return Promise.resolve(res);
        }));
  }

  requestAllPages() {
    const url = 'https://api.github.com/repos/openfaas/faas/contributors?per_page=20';

    let result = []

    let fetchPage = (url) => {
      this.request(url).then(res => {
        let data = res.json()
        if (!res.ok) {
          throw new ResponseError(res, data);
        }
        result.concat(data);

        if (!res.headers.get('link')) {
          return null;
        }
        
        let parsedLink = parse(res.headers.get('link'));

        if(parsedLink.next) {
          console.log(parsedLink.next.url);
          fetchPage(parsedLink.next.url);
        }
      })
    }
    fetchPage(url)
    return result;
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
}


module.exports = Github;