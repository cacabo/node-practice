// Require profile get methods and printing
const profile = require('./profile.js');

// Test to get info about chalkers's profile
// getProfile('chalkers');

// const users = ["chalkers", "alenaholligan"];

// get all usernames (third argument onwards)
const users = process.argv.slice(2);

users.forEach(username => {
  profile.get(username);
});
