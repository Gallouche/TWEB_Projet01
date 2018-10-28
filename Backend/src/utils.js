const fetch = require('node-fetch');

function spreadArrays(arrays) {
  let result = [];

  arrays.forEach((array) => {
    result = [...result, ...array];
  });

  return Promise.resolve(result);
}

function getUrls(contributors) {
  return Promise.resolve(contributors.map(c => c.url));
}

function getLocations(users) {
  return Promise.resolve(users.map(u => u.location).filter(location => location));
}

function parseResponse(res) {
  return res.json();
}

function getCountryCodes(locations) {
  const apiPromises = [];
  const baseUrl = new URL('https://www.mapquestapi.com/geocoding/v1/address');
  const params = new URLSearchParams({
    key: process.env.MAPQUEST_TOKEN,
  });
  locations.forEach((location) => {
    params.set('location', location);
    baseUrl.search = params;
    apiPromises.push(fetch(baseUrl).then(parseResponse));
  });
  return Promise.all(apiPromises)
    .then((mapQuestResponses) => {
      const countryCodes = {};

      mapQuestResponses.forEach((mapQuestResponse) => {
        let countryCode;
        if (mapQuestResponse.info.statuscode === 0) {
          countryCode = mapQuestResponse.results[0].locations[0].adminArea1;
          const countryCodeRef = countryCodes[countryCode];
          countryCodes[countryCode] = countryCodeRef ? countryCodeRef + 1 : 1;
        }
      });

      return Promise.resolve(countryCodes);
    });
}

module.exports = {
  spreadArrays, getUrls, getLocations, parseResponse, getCountryCodes,
};
