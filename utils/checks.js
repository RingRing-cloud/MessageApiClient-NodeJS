const {InvalidArgumetError} = require('../errors/Errors');
const checkApiKey = (apiKey) => {
  if (!apiKey) {
    throw new InvalidArgumetError('You must initialize this SDK with your API KEY !');
  }
};
const checkApiUrl = (apiUrl) => {
  if (!apiUrl) {
    throw new InvalidArgumetError('You must initialize this SDK with the ringring messageAPI url !');
  }
};

module.exports.checkApiKey = checkApiKey;
module.exports.checkApiUrl = checkApiUrl;
