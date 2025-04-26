const TelegramBot = require('node-telegram-bot-api');

// Ganti dengan token bot Anda
const token = '7971857678:AAEEjSVxrG850rXeirVNYeTDqjNFWPd-LFU';

// Buat bot dengan polling
const bot = new TelegramBot(token, { polling: true });

// Handler untuk perintah /start
bot.onText(/^\/start$/, (msg) => {
  const chatId = msg.chat.id;
  const name = msg.from.first_name || 'Teman';

  const welcomeMessage = `Selamat Datang Di NADA777, ${name}!
  Layanan Bot Nada777 Hadir Untuk Kamu Agar Lebih Praktis
  
  ⬇️ Silahkan Pilih Menu Yang Kamu Butuhkan ⬇️`;

  const options = {
    reply_markup: 'Markdown',
      inline_keyboard: [
        [
          {text: '📥 DOWNLOAD APK NADA777', url: 'https://t.ly/APKNADA' },
        ],
        [
          {text: '🔐 LOGIN', url: 'https://t.ly/loginnada777' },
        ],
        [
          {text: '🌐 LINK ALTERNATIF', url: 'https://tembus.xyz/nada777' }
        ],
        [
          { text: '📞 HUBUNGI CS', url: 'https://t.me/nada777Official' }
        ],
        [
          { text: '🎁 PROMO', url: 'https://t.ly/promonada777' }
        ],
        [
          { text: '🎯 RTP ONLINE', url: 'https://t.ly/Nada777RTP' }
        ],
        [
          {text: '👥 GRUP RESMI NADA777', url: 'https://t.me/GrupResmiNada777' }
        ]
      ]
  }
 
  bot.sendMessage(chatId, welcomeMessage);
});
