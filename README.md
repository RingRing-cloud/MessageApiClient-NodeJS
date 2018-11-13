# MessageAPIClient for NodeJS

RingRing provides simple and fast API for sending and receiving text messages (SMS).

# How to use

- Contact us at sales@ringring.be, we will create an account for you.
- Once you have access to your account, you will be able to access to interface at https://portal.ringring.be. Here you will see all account information you need to send real messages through the API.
- Lastly, install our npm package **in your nodeJS Project** by running :
```
$ npm install @ringring/messageapi-client-nodejs
```
<aside class="notice">
You must have your personal API key. And you must be in your project's folder to run this install command.
</aside>
# Example

```Javascript
const { MessageClient } = require('@ringring/messageapi-client-nodejs');

const m = new MessageClient('YOUR-API-KEY');

try {
  // First param  => phone numbers separated by , (up to 1000)
  // Second param => message content
  m.send('32123456789', 'My sms content');
} catch (error) {
  // handle error
  console.log(error);
}
```

# Version

NodeJS 10.13 or more

# Installation

It is recommended to read the messageApi docs first. For example, the send function accept all the params of messageAPI to send an SMS.

# Documentation

http://docs.ringring.be 
