const mineflayer = require('mineflayer');

const botsConfig = [
  { username: 'MO_Khaled', command: '/login bot1123$$$', delay: 0 },
  { username: 'ItzRealAli', command: '/login bot2123$$$', delay: 5000 }
];

function createBot(config) {
  const bot = mineflayer.createBot({
    host: 'waffle-smp.mcsh.gg',
    port: 25565,
    username: config.username,
    version: '1.20.4'
  });

  bot.on('spawn', () => {
    console.log(`[+] البوت ${config.username} دخل السيرفر بنجاح.`);
  });

  // البوت هيقرا الشات أول ما يفتح، وأول ما يشوف كلمة تخص التسجيل هيبعت الأمر فوراً
  bot.on('messagestr', (message) => {
    const text = message.toLowerCase();
    if (text.includes('login') || text.includes('register') || text.includes('تسجيل')) {
      setTimeout(() => {
        bot.chat(config.command);
        console.log(`[<] تم إرسال أمر تسجيل الدخول للبوت ${config.username} بناءً على استجابة السيرفر.`);
      }, 1000); // تأخير بسيط جداً ثانية واحدة بعد ظهور الرسالة لضمان الاستقرار
    }
  });

  bot.on('end', (reason) => {
    console.log(`[-] انقطع اتصال البوت ${config.username} (${reason}). إعادة محاولة خلال 30 ثانية...`);
    setTimeout(() => createBot(config), 30000);
  });

  bot.on('error', (err) => {
    // تجاهل الأخطاء العابرة
  });
}

console.log('🚀 جاري إطلاق البوتين بنظام الاستماع الذكي للشات...');

botsConfig.forEach((config) => {
  setTimeout(() => {
    createBot(config);
  }, config.delay);
});
