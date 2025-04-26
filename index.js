const TelegramBot = require('node-telegram-bot-api');

// Ganti dengan token bot Anda
const token = '7971857678:AAEEjSVxrG850rXeirVNYeTDqjNFWPd-LFU';

// Buat bot dengan polling
const bot = new TelegramBot(token, { polling: true });

// Handler untuk perintah /start
bot.onText(/^\/start$/, (msg) => {
  const chatId = msg.chat.id;
  const name = msg.from.first_name || 'Teman';

  const welcomeMessage = `👋 Selamat Datang Di NADA777, ${name}!
Gunakan perintah /menu untuk mendapatkan opsi yang tersedia untuk menyelesaikan kendala kamu.`;
  bot.sendMessage(chatId, welcomeMessage);
});

// Handler untuk perintah /menu
bot.onText(/^\/menu$/, (msg) => {
  const chatId = msg.chat.id;

  const menuOptions = {
    reply_markup: {
      inline_keyboard: [
        [
          { text: '🔐 LOGIN', url: 'https://link-login-anda.com' },
          { text: '🌐 LINK ALTERNATIF', url: 'https://link-alternatif-anda.com' }
        ],
        [
          { text: '📞 HUBUNGI CS', url: 'https://t.me/CS_Nada777' }
        ],
        [
          { text: '🎁 PROMO', url: 'https://link-promo-anda.com' }
        ],
        [
          { text: '🎯 RTP ONLINE', url: 'https://link-rtp-online-anda.com' }
        ],
        [
          { text: '👥 GRUP RESMI NADA777', url: 'https://t.me/GrupResmiNada777' }
        ]
      ]
    }
  };

  bot.sendMessage(chatId, '👇 Silakan pilih menu yang kamu butuhkan:', menuOptions);
});
