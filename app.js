const https = require('https');

//Print message to the console
function printMessage(username, badgeCount, points) {
  const message = `${username} has ${badgeCount} total badge(s) and ${points} points in JavaScript`;
  console.log(message);
}

//Test print message
// printMessage("ccabo1", 100, 2000);


function getProfile(username) {
  //Connect to the API
  try {
    const request = https.get(
      `https://teamtreehouse.com/${username}.json`,
      (response) => {
        let body="";
        response.on('data', (data) => {
          body += data.toString();
        });

        response.on('end', () => {
          const profile = JSON.parse(body);
          printMessage(username, profile.badges.length, profile.points.JavaScript);
        });
      }
    );

    // Catch runtime error
    request.on('error', e => console.error(`Problem with request: ${e.message}`));
  } catch (e) {
    // Catch compilation error
    console.error(e.message);
  }
}

// Test to get info about chalkers's profile
// getProfile('chalkers');

// const users = ["chalkers", "alenaholligan"];
const users = process.argv.slice(2);

users.forEach(username => {
  getProfile(username);
});
