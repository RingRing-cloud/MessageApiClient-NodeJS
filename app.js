const { sendSMS, sendSMSSandBox, inspectSMS, cancelSMS } = require('./controllers/messageController');
const { checkApiKey } = require('./utils/checks');

class MessageClient {
  constructor(apiKey) {
    checkApiKey(apiKey);

    this.apiKey = apiKey;
  }

  async send(to, message, ...rest) {
    await sendSMS(this.apiKey, to, message, ...rest);
  }
  async sendToSandBox(to, message, ...rest) {
    await sendSMSSandBox(this.apiKey, to, message, ...rest);
  }

  async inspectSMS(messageId) {
    await inspectSMS(this.apiKey, messageId);
  }
  async cancel(messageId) {
    await cancelSMS(this.apiKey, messageId);
  }
}

exports.MessageClient = MessageClient;
