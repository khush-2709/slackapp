require('dotenv').config()

const SlackBot = require('slackbots');
const { App } = require("@slack/bolt");
const { Axios } = require('axios')


const bot = new SlackBot({
  token: `${process.env.BOT_TOKEN}`,
  name: 'coco'
})

bot.on('start', () => {
  const params = {
      icon_emoji: ':robot_face:'
  }

  bot.postMessageToChannel(
      'random',
      'Get inspired while working with @coco',
      params
  );
})

bot.on('error', (err) => {
  console.log(err);
})


bot.on('message', (data) => {
  if(data.type !== 'message') {
      return;
  }
  handleMessage(data.text);
})

// Response Handler
function handleMessage(message) {
  if(message.includes(' inspire me')) {
      inspireMe()
  } else if(message.includes(' random joke')) {
      randomJoke()
  } else if(message.includes(' help')) {
      runHelp()
  }
}


const app = new App({
  token: process.env.SLACK_APP_BOT_TOKEN,
  socketMode:true,
  appToken:process.env.SLACK_APP_TOKEN,
  signingSecret: process.env.SLACK_APP_SIGNING_SECRET
});

// All the room in the world for your code
app.message('hello', async ({ message, say }) => {
  await say(`Hello, <@${message.user}>`);
});

(async () => {
  // Start your app
  console.log('App Has Started')
  await app.start(process.env.PORT || 3000);
})();