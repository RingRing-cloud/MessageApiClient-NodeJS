const { sendSMS, sendSMSSandBox, inspectSMS, cancelSMS } = require('./controllers/messageController');
const { checkApiKey } = require('./utils/checks');

class MessageClient {
  constructor(apiKey) {
    checkApiKey(apiKey);

    this.apiKey = apiKey;
  }

  async send(to, message, ...rest) {
    const responseOfSend = await sendSMS(this.apiKey, to, message, ...rest);
    return responseOfSend.data;
  }
  async sendToSandBox(to, message, ...rest) {
    const responseOfSend = await sendSMSSandBox(this.apiKey, to, message, ...rest);
    return responseOfSend.data;
  }

  async inspectSMS(messageId) {
    const responseOfInspect = await inspectSMS(this.apiKey, messageId);
    return responseOfInspect.data;
  }
  async cancel(messageId) {
    const responseOfCancel = await cancelSMS(this.apiKey, messageId);
    return responseOfCancel.data;
  }
}

exports.MessageClient = MessageClient;
