const mineflayer = require('mineflayer');

// حطينا الكوماند كامل لكل بوت براحتك
const botsConfig = [
  { username: 'MO_Khaled', command: '/login bot1123$$$ bot1123$$$', delay: 0 },
  { username: 'ItzRealAli', command: '/login bot2123$$$ bot2123$$$', delay: 0 }
];

function createBot(config) {
  const bot = mineflayer.createBot({
    host: 'waffle-smp.mcsh.gg',
    port: 25565,
    username: config.username,
    version: '1.20.4'
  });

  bot.on('spawn', () => {
    console.log(`[+] البوت ${config.username} دخل السيرفر وثبت مكانه بسلام.`);
    
    setTimeout(() => {
      // إرسال الكوماند اللي أنت كاتبه فوق بالظبط
      bot.chat(config.command);
      console.log(`[<] تم إرسال أمر تسجيل الدخول للبوت ${config.username}.`);
    }, 4000);
  });

  bot.on('end', (reason) => {
    console.log(`[-] انقطع اتصال البوت ${config.username} (${reason}). إعادة محاولة خلال 30 ثانية...`);
    setTimeout(() => createBot(config), 30000);
  });

  bot.on('error', (err) => {
    // تجاهل الأخطاء العابرة
  });
}

console.log('🚀 جاري إطلاق البوتين بنظام الإصدار القديم والفاصل الآمن...');

botsConfig.forEach((config) => {
  setTimeout(() => {
    createBot(config);
  }, config.delay);
});
