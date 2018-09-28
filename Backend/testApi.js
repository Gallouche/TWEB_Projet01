var request = require('superagent');

var token = 'fef19a5fe1e319997767c0369598ce641569f3fe'

var url = 'https://api.github.com/users/gallouche';

request
  .get(url)
  .set('Authorization', token)
  .set('Content-Type', 'application/json')
  .end(function (err, res) {
    if (err) {
      console.log(err)
    } else {
      console.log(res.body.bio)
    }
  })