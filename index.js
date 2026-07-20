const mineflayer = require('mineflayer');

function createBot() {
  const bot = mineflayer.createBot({
    host: 'propvps.mcsh.io',
    port: 25565,
    username: 'BotName'
  });

  bot.on('spawn', () => {
    console.log('Bot successfully joined the server!');
    startAntiAfk(bot);
  });

  function startAntiAfk(b) {
    setInterval(() => {
      if (!b.player) return;
      
      b.setControlState('jump', true);
      setTimeout(() => {
        b.setControlState('jump', false);
      }, 500);

      const yaw = b.entity.yaw + 1;
      b.look(yaw, b.entity.pitch, true);
      
      console.log('Anti-AFK action performed.');
    }, 60000);
  }

  bot.on('kicked', (reason) => {
    console.log('Bot was kicked due to:', reason);
  });

  bot.on('error', (err) => {
    console.log('An error occurred:', err);
  });

  bot.on('end', () => {
    console.log('Bot disconnected. Reconnecting in 5 seconds...');
    setTimeout(createBot, 5000);
  });
}

createBot();
