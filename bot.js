const mineflayer = require('mineflayer');

// إعدادات البوتين بأسماء مختلفة وفاصل زمني 5 ثواني
const botsConfig = [
  { username: 'afk_bot_1', delay: 0 },
  { username: 'afk_bot_2', delay: 5000 }
];

function createBot(config) {
  const bot = mineflayer.createBot({
    host: 'waffle-smp.mcsh.gg',
    port: 25565,
    username: config.username,
    version: '1.20.4' // إصدار مستقر وخفيف شغال مع ViaBackwards
  });

  bot.on('spawn', () => {
    console.log(`[+] البوت ${config.username} دخل السيرفر وثبت مكانه بسلام.`);
    
    setTimeout(() => {
      bot.chat('/login youssef123$$$');
      console.log(`[<] تم إرسال كلمة المرور للبوت ${config.username}.`);
    }, 4000);
  });

  bot.on('end', (reason) => {
    console.log(`[-] انقطع اتصال البوت ${config.username} (${reason}). إعادة محاولة خلال 30 ثانية...`);
    setTimeout(() => createBot(config), 30000);
  });

  bot.on('error', (err) => {
    // تجاهل الأخطاء العابرة للحفاظ على نظافة الكونسول
  });
}

console.log('🚀 جاري إطلاق البوتين بنظام الإصدار القديم والفاصل الآمن...');

botsConfig.forEach((config) => {
  setTimeout(() => {
    createBot(config);
  }, config.delay);
});