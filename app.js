const {
  sendSMS,
  sendSMSSandBox,
  inspectSMS,
  cancelSMS,
} = require("./controllers/messageController");
const { checkApiKey } = require("./utils/checks");

class MessageClient {
  constructor(apiKey) {
    checkApiKey(apiKey);

    this.apiKey = apiKey;
  }

  async send(to, message, ...rest) {
    return (await sendSMS(this.apiKey, to, message, ...rest)).data;
  }
  async sendToSandBox(to, message, ...rest) {
    return (await sendSMSSandBox(this.apiKey, to, message, ...rest)).data;
  }

  async inspectSMS(messageId) {
    return (await inspectSMS(this.apiKey, messageId)).data;
  }
  async cancel(messageId) {
    return (await cancelSMS(this.apiKey, messageId)).data;
  }
}

exports.MessageClient = MessageClient;
