const mineflayer = require('mineflayer');

function createBot() {
  const bot = mineflayer.createBot({
    host: 'propvps.mcsh.io',
    port: 25565,
    username: 'AFK_Bot_THIS_IS_THE_LONGEST_BOT_NAME_U_HAVE_SEEN_EVER_AND_UNBEATBLE' // Using a shorter, more conventional username
  });

  bot.once('spawn', () => {
    console.log('Bot successfully joined!');
    startNaturalBehavior(bot);
  });

  bot.on('chat', (username, message) => {
    if (username === bot.username) return;

    const lowerMessage = message.toLowerCase();
    if (lowerMessage.includes('hello') || lowerMessage.includes('bot')) {
      bot.chat(`Hello ${username}! I am just an AFK bot.`);
    }
  });

  bot.on('kicked', (reason) => {
    console.log('Bot was kicked due to:', reason);
  });

  bot.on('error', (err) => {
    console.log('Error:', err);
  });

  bot.on('end', () => {
    console.log('Bot disconnected. Reconnecting...');
    const delay = 4000 + Math.random() * 3000;
    setTimeout(createBot, delay);
  });

  function gracefulShutdown() {
    console.log('Shutting down gracefully...');
    try {
      bot.quit();
    } catch (e) {}
    setTimeout(() => process.exit(0), 1500);
  }

  process.on('SIGTERM', gracefulShutdown);
  process.on('SIGINT', gracefulShutdown);
}

function startNaturalBehavior(bot) {
  const randomBetween = (min, max) => min + Math.random() * (max - min);

  const lookAround = () => {
    if (bot.isSleeping) return;

    try {
      const yaw = (Math.random() * Math.PI * 2) - Math.PI;
      const pitch = randomBetween(-0.18, 0.18);
      bot.look(yaw, pitch, true);
    } finally {
      // Add a small chance for a much longer pause to break patterns
      const delay = Math.random() < 0.1
        ? randomBetween(30000, 60000) // 10% chance of a long pause
        : randomBetween(7000, 11000); // Normal pause
      setTimeout(lookAround, delay);
    }
  };

  const doSmallStep = () => {
    if (bot.isSleeping) return;

    try {
      const directions = ['forward', 'back', 'left', 'right'];
      const direction = directions[Math.floor(Math.random() * directions.length)];
      bot.setControlState(direction, true);
      setTimeout(() => bot.setControlState(direction, false), 350 + Math.random() * 300);
    } finally {
      setTimeout(doSmallStep, randomBetween(25000, 40000));
    }
  };

  const doGentleJump = () => {
    if (bot.isSleeping) return;
    try {
      bot.setControlState('jump', true);
      setTimeout(() => bot.setControlState('jump', false), 180 + Math.random() * 120);
    } finally {
      setTimeout(doGentleJump, randomBetween(18000, 30000));
    }
  };

  const swingArm = () => {
    if (bot.isSleeping) return;
    try {
      bot.swingArm();
    } finally {
      setTimeout(swingArm, randomBetween(8000, 15000));
    }
  };

  const sneak = () => {
    if (bot.isSleeping) return;
    try {
      bot.setControlState('sneak', true);
      setTimeout(() => bot.setControlState('sneak', false), randomBetween(500, 1500));
    } finally {
      setTimeout(sneak, randomBetween(30000, 50000));
    }
  };


  const trySleep = () => {
    try {
      if (bot.isSleeping) return;
      const timeOfDay = bot.time.timeOfDay;
      const isNight = timeOfDay > 13000 || timeOfDay < 1000;
      if (isNight) {
        const bed = bot.findBlock({ matching: (block) => bot.isABed(block), maxDistance: 6 });
        if (bed) {
          bot.sleep(bed).catch(err => { console.log(`Could not sleep: ${err.message}`); });
        }
      }
    } finally {
      setTimeout(trySleep, 30000);
    }
  };
  lookAround();
  doSmallStep();
  doGentleJump();
  swingArm();
  sneak();
  trySleep();
}

createBot();
