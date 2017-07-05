const https = require('https');
const http = require('http');

// Print error messages
function printError(e) {
  console.error(`There was an error: ${e.message}`);
}

// Print message to the console
function printMessage(username, badgeCount, points) {
  const message = `${username} has ${badgeCount} total badge(s) and ${points} points in JavaScript`;
  console.log(message);
}

// Test print message
// printMessage("ccabo1", 100, 2000);

function get(username) {
  //Connect to the API
  try {
    const request = https.get(
      `https://teamtreehouse.com/${username}.json`,
      (response) => {
        if (response.statusCode === 200) {
          let body="";
          response.on('data', (data) => {
            body += data.toString();
          });

          response.on('end', () => {
            try {
              const profile = JSON.parse(body);
              printMessage(username, profile.badges.length, profile.points.JavaScript);
            } catch (e) {
              printError(e);
            }
          });
        } else {
          const message = `There was an error getting the profile for ${username} (${http.STATUS_CODES[response.statusCode]})`;
          console.error(message);
        }
      }
    );

    // Catch runtime error
    request.on('error', e => printError(e));
  } catch (e) {
    // Catch compilation error
    printError(e);
  }
}

module.exports.get = get;
