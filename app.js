const {
  sendSMS,
  cancelSMS
} = require('./controllers/messageController');

class MessageClient {
  constructor (apiKey) {
    if (!apiKey) {
      throw new Error('You must initialize this SDK with your API KEY !');
    }
    this.apiKey = apiKey;
  }

  async send (to, message, ...rest) {
    if (!this.apiKey) {
      throw new Error('You must initialize this SDK with your API KEY !');
    }

    await sendSMS(this.apiKey, to, message, ...rest);
  }

  cancel (messageId) {
    if (!this.apiKey) {
      throw new Error('You must initialize this SDK with your API KEY !');
    }
    cancelSMS(this.apiKey, messageId);
  }
}

exports.messageClient = MessageClient;

const a = new MessageClient('loool');

a.send().catch(err => {
  console.log(err);
});
