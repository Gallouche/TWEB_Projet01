const utils = {}
const fetch = require('node-fetch')

utils.spreadArrays = function (arrays) {
    let result = []

    arrays.forEach(array => {
        result = [...result, ...array]
    })

    return Promise.resolve(result)
}

utils.getUrls = function (contributors) {
    return Promise.resolve(contributors.map(c => c.url))
}

utils.getLocations = function (users) {
    return Promise.resolve(users.map(u => u.location).filter(location => location))
}

utils.parseResponse = function (res) {
    return res.json()
}

utils.getCountryCodes = function (locations) {
    let apiPromises = [];
    let baseUrl = new URL('https://www.mapquestapi.com/geocoding/v1/address')
    let params = new URLSearchParams({
        key: process.env.MAPQUEST_TOKEN
    })
    locations.forEach(location => {
        params.set('location', location)
        baseUrl.search = params
        apiPromises.push(fetch(baseUrl).then(utils.parseResponse))
    })
    return Promise.all(apiPromises)
        .then(mapQuestResponses => {
            let countryCodes = {}

            mapQuestResponses.forEach(mapQuestResponse => {
                let countryCode
                console.log(mapQuestResponse)

                if (mapQuestResponse.info.statuscode == 0) {
                    countryCode = mapQuestResponse.results[0].locations[0].adminArea1
                    let countryCodeRef = countryCodes[countryCode] 
                    countryCodes[countryCode] = countryCodeRef ? countryCodeRef + 1 : 1
                }
            })

            return Promise.resolve(countryCodes)
        })
}

module.exports = utils;