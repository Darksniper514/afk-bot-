const mineflayer = require('mineflayer');

function createBot() {
  const bot = mineflayer.createBot({
    host: 'hussam134-oeCI.aternos.me',
    port: 62530,
    username: 'mustafa_Go',
    physicsEnabled: false
  });

  bot.once('spawn', () => {
    console.log('Bot successfully joined and staying still!');
  });

  bot.on('kicked', (reason) => {
    console.log('Bot was kicked due to: ', reason);
  });

  bot.on('error', (err) => {
    console.log('Error: ', err);
  });

  bot.on('end', () => {
    console.log('Bot disconnected. Reconnecting in 5 seconds...');
    setTimeout(createBot, 5000);
  });
}

createBot();
