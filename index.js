const mineflayer = require('mineflayer');

function createBot() {
  const bot = mineflayer.createBot({
    host: 'propvps.mcsh.io',
    port: 25565,
    username: 'mustafa_Go'
    // physicsEnabled شلناها -> تصير true افتراضيا (مهم جدا)
  });

  bot.once('spawn', () => {
    console.log('Bot successfully joined!');
    startAntiAfk(bot);
  });

  bot.on('kicked', (reason) => {
    console.log('Bot was kicked due to: ', reason);
  });

  bot.on('error', (err) => {
    console.log('Error: ', err);
  });

  bot.on('end', () => {
    console.log('Bot disconnected. Reconnecting...');
    // تأخير عشوائي بسيط يمنع نمط ثابت عند إعادة الاتصال
    const delay = 4000 + Math.random() * 3000;
    setTimeout(createBot, delay);
  });

  // إغلاق نظيف لما GitHub يوقف الـ job (SIGTERM من concurrency cancel)
  function gracefulShutdown() {
    console.log('Shutting down gracefully...');
    try { bot.quit(); } catch (e) {}
    setTimeout(() => process.exit(0), 1500);
  }
  process.on('SIGTERM', gracefulShutdown);
  process.on('SIGINT', gracefulShutdown);
}

function startAntiAfk(bot) {
  // 1. تحريك النظر (view) بشكل عشوائي خفيف كل فترة
  setInterval(() => {
    const yaw = (Math.random() * Math.PI * 2) - Math.PI;
    const pitch = (Math.random() * 0.4) - 0.2;
    bot.look(yaw, pitch, true);
  }, 8000 + Math.random() * 7000); // كل 8-15 ثانية تقريبا، مو ثابت

  // 2. قفزة خفيفة كل فترة أطول (حركة فيزيائية حقيقية)
  setInterval(() => {
    bot.setControlState('jump', true);
    setTimeout(() => bot.setControlState('jump', false), 400);
  }, 25000 + Math.random() * 20000); // كل 25-45 ثانية تقريبا

  // 3. خطوة قصيرة للأمام أحيانا (تحرك موقعه شوي)
  setInterval(() => {
    bot.setControlState('forward', true);
    setTimeout(() => bot.setControlState('forward', false), 600 + Math.random() * 500);
  }, 45000 + Math.random() * 30000); // كل 45-75 ثانية تقريبا
}

createBot();
