const mineflayer = require('mineflayer');

const bot = mineflayer.createBot({
  host: 'propvps.mcsh.io',
  port: 25565,
  username: 'BotName'
});

bot.on('spawn', () => {
  console.log('Bot successfully joined the server!');
  startAntiAfk();
});

// دالة منع الطرد بسبب الخمول (Anti-AFK)
function startAntiAfk() {
  setInterval(() => {
    if (!bot.player) return;
    
    // يخليه ينط أو يتحرك بشكل خفيف كل دقيقة
    bot.setControlState('jump', true);
    setTimeout(() => {
      bot.setControlState('jump', false);
    }, 500);

    // يغير اتجاه نظره شوية حتى يبين متفاعل
    const yaw = bot.entity.yaw + 1;
    bot.look(yaw, bot.entity.pitch, true);
    
    console.log('Anti-AFK action performed.');
  }, 60000); // تنفذت كل 60 ثانية (دقيقة)
}

bot.on('kicked', (reason) => {
  console.log('Bot was kicked due to:', reason);
});

bot.on('error', (err) => {
  console.log('An error occurred:', err);
});
