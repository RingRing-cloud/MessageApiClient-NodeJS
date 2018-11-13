const {
  sendSMS,
  cancelSMS
} = require('./controllers/messageController');
const {
  checkApiKey
} = require('./utils/checks');

class MessageClient {
  constructor (apiKey) {
    checkApiKey(apiKey);

    this.apiKey = apiKey;
  }

  async send (to, message, ...rest) {
    await sendSMS(this.apiKey, to, message, ...rest);
  }

  cancel (messageId) {
    cancelSMS(this.apiKey, messageId);
  }
}

exports.messageClient = MessageClient;
try {
  const a = new MessageClient('loool');
  a.send().catch(err => {
    console.log(err);
  });
} catch (error) {
  console.log(error);
}
