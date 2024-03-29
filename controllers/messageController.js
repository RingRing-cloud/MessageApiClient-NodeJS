const ajv = require('ajv')({ schemaId: 'auto', allErrors: true });
const axios = require('axios').create({
  baseURL: 'https://api.ringring.be/sms'
});
const config = require('../config/default.json');

const sendSchema = require('../schemas/sendSMSSchema.json');
const inspectCancelSchema = require('../schemas/inspectCancelSMSSchema.json');

const { InvalidArgumetError, InternalError, ForbiddenError } = require('../errors/Errors');

const sendSMS = async (apiKey, to, message, ...rest) => {
  console.log('Send Process started . . . ');
  const reqBody = {
    apiKey: apiKey,
    to: to,
    message: message,
    ...rest
  };

  ajvValidation(sendSchema, reqBody);

  try {
    const resultOfSend = await axios.post(config.messageApi.send, reqBody);
    return resultOfSend;
  } catch (error) {
    spreadApiErrors(error);
  }
};
const sendSMSSandBox = async (apiKey, to, message, ...rest) => {
  console.log('Send To Sandbox Process started . . . ');
  const reqBody = {
    apiKey: apiKey,
    to: to,
    message: message,
    ...rest
  };

  ajvValidation(sendSchema, reqBody);

  try {
    const resultOfSend = await axios.post(config.messageApi.sendSandbox, reqBody);
    return resultOfSend;
  } catch (error) {
    spreadApiErrors(error);
  }
};

const cancelSMS = async (apiKey, messageId) => {
  console.log('Cancel Process started . . . ');
  const reqBody = {
    apiKey: apiKey,
    messageId: messageId
  };

  ajvValidation(inspectCancelSchema, reqBody);

  try {
    const resultOfCancel = await axios.post(config.messageApi.cancel, reqBody);
    return resultOfCancel;
  } catch (error) {
    spreadApiErrors(error);
  }
};

const inspectSMS = async (apiKey, messageId) => {
  console.log('Inspect Process started . . . ');
  const reqParams = {
    apiKey: apiKey,
    messageId: messageId
  };
  ajvValidation(inspectCancelSchema, reqParams);
  try {
    const resultOfinspect = await axios.get(config.messageApi.inspect, {
      params: {
        ...reqParams
      }
    });
    return resultOfinspect;
  } catch (error) {
    spreadApiErrors(error);
  }
};

const ajvValidation = (schema, data) => {
  const valid = ajv.validate(schema, data);

  if (!valid) {
    throw new InvalidArgumetError(ajv.errors[0].message, 400,ajv.errors);
  }
};

const spreadApiErrors = err => {
  const { status } = err.response;
  if (status >= 400 && status <= 499) {
    if (status === 401 || status === 403) {
      throw new ForbiddenError(err.message, status, err.response.data);
    }
    throw new InvalidArgumetError(err.message, status, err.response.data);
  } else {
    throw new InternalError(err.message, status, err.response.data);
  }
};

module.exports.sendSMS = sendSMS;
module.exports.sendSMSSandBox = sendSMSSandBox;
module.exports.cancelSMS = cancelSMS;
module.exports.inspectSMS = inspectSMS;
