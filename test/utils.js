// loads environment variables
require('dotenv/config');
const { expect } = require('chai');
const Github = require('../src/Github');

let client;

describe('Test Locations return', () => {
  beforeEach(() => {
    client = new Github({
      token: process.env.OAUTH_TOKEN,
    });
  });
  it('should return a Json', () => {
    client.getRepoContributorsLocations('Gallouche', 'SWI_Lab4')
      .then((result) => {
        expect(result).to.be.instanceOf(Object);
      });
  });
});
