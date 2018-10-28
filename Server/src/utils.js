const utils = {}

utils.spreadArrays = function(arrays) {
  let result = []

  arrays.forEach(array => {
    result = [...result, ...array]
  })

  return Promise.resolve(result)
}

utils.getUrls = function(contributors) {
  return Promise.resolve(contributors.map(c => c.url))
}

utils.getLocations = function(users) {
  return Promise.resolve(users.map(u => u.location).filter(location => location))
}

module.exports = utils;
