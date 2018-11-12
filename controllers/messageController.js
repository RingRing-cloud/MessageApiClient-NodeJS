const ajv = require('ajv')({ schemaId: 'auto', allErrors: true });
const axios = require('axios');
const config = require('config');

const sendSchema = require('../schemas/sendSMSSchema.json');
const inspectCancelSchema = require('../schemas/inspectCancelSMSSchema.json');

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
    const resultOfSend = await axios.post(config.messageApi.sendSandbox, reqBody);
    return resultOfSend;
  } catch (error) {
    throw new Error(
      error.response.data.ResultDescription
    );
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
    throw new Error(
      error
    );
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
    const resultOfinspect = await axios.get(
      config.messageApi.inspect,
      {
        params: {
          ...reqParams
        }
      }
    );
    return resultOfinspect;
  } catch (error) {
    throw new Error(
      error
    );
  }
};

const ajvValidation = (schema, data) => {
  const valid = ajv.validate(schema, data);

  if (!valid) {
    throw new Error(
      ajv.errors[0].message
    );
  }
};

module.exports.sendSMS = sendSMS;
module.exports.cancelSMS = cancelSMS;
module.exports.inspectSMS = inspectSMS;
