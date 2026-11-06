const mineflayer = require('mineflayer');

// إعدادات البوتين، مع إضافة كلمة المرور (password) بشكل مستقل لكل بوت
const botsConfig = [
  { username: 'afk_bot_1', password: 'bot1123$$$', delay: 0 },
  { username: 'afk_bot_2', password: 'bot2123$$$', delay: 0 } // تقدر تغير كلمة مرور البوت الثاني براحتك
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
      // استخدام كلمة المرور الخاصة بكل بوت من الإعدادات فوق تلقائياً
      bot.chat(`/login ${config.password} ${config.password}`);
      console.log(`[<] تم إرسال أمر تسجيل الدخول للبوت ${config.username}.`);
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
