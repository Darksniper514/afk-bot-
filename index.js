const mineflayer = require('mineflayer');

function createBot() {
  const bot = mineflayer.createBot({
    host: 'propvps.mcsh.io',
    port: 25565,
    username: 'BotName'
  });

  bot.on('spawn', () => {
    console.log('Bot successfully joined!');
    
    setInterval(() => {
      bot.setControlState('jump', true);
      setTimeout(() => {
        bot.setControlState('jump', false);
      }, 250);
    }, 15000);

    setInterval(() => {
      const yaw = Math.random() * Math.PI * 2;
      const pitch = (Math.random() * 0.5) - 0.25;
      bot.look(yaw, pitch, true);
    }, 8000);
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
