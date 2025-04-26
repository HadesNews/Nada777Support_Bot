const TelegramBot = require('node-telegram-bot-api');

// Token bot kamu
const token = '7971857678:AAEEjSVxrG850rXeirVNYeTDqjNFWPd-LFU';

// Buat bot dengan polling
const bot = new TelegramBot(token, { polling: true });

// Data RTP (dummy awal)
let rtpData = generateRTP();

// Fungsi generate RTP random
function generateRTP() {
  return {
    olympus: Math.floor(Math.random() * 11) + 90, // 80-95%
    starlight: Math.floor(Math.random() * 11) + 90,
    bonanza: Math.floor(Math.random() * 11) + 90,
    zeus: Math.floor(Math.random() * 11) + 90,
    mahjong: Math.floor(Math.random() * 11) + 90,
  };
}

// Update RTP setiap 2 jam (7200000 ms)
setInterval(() => {
  rtpData = generateRTP();
  console.log('🔄 Data RTP sudah diupdate!');
}, 7200000);

// Handler /start
bot.onText(/^\/start$/, (msg) => {
  const chatId = msg.chat.id;
  const name = msg.from.first_name || 'Teman';

  const welcomeMessage = `
Selamat Datang Di *NADA777*, ${name}!
🤖 Layanan Bot Nada777 Hadir Untuk Kamu Agar Lebih Praktis 🤖

⬇️ Silahkan Pilih Menu Yang Kamu Butuhkan ⬇️`;

  const options = {
    parse_mode: 'Markdown',
    reply_markup: {
      inline_keyboard: [
        [{ text: '📥 DOWNLOAD APK NADA777', url: 'https://t.ly/APKNADA' }],
        [
          { text: '🔐 LOGIN', url: 'https://t.ly/loginnada777' },
          { text: '🌐 LINK ALTERNATIF', url: 'https://tembus.xyz/nada777' }
        ],
        [
          { text: '📞 HUBUNGI CS', url: 'https://t.me/nada777Official' },
          { text: '🎁 PROMO', url: 'https://t.ly/promonada777' }
        ],
        [
          { text: '🎯 RTP ONLINE', callback_data: 'rtp_online' },
          { text: '👥 GRUP RESMI NADA777', url: 'https://t.me/slotgacornada777' }
        ]
      ]
    }
  };

  bot.sendMessage(chatId, welcomeMessage, options);
});

// Handler klik tombol
bot.on('callback_query', (callbackQuery) => {
  const chatId = callbackQuery.message.chat.id;
  const data = callbackQuery.data;

  if (data === 'rtp_online') {
    const rtpMessage = `
🎰 *RTP ONLINE NADA777* 🎰

- Gates of Olympus: *${rtpData.olympus}%*
- Starlight Princess: *${rtpData.starlight}%*
- Sweet Bonanza: *${rtpData.bonanza}%*
- Zeus: *${rtpData.zeus}%*
- Mahjong Ways: *${rtpData.mahjong}%*

Update Otomatis Setiap 2 Jam! 🔥
`;
    bot.sendMessage(chatId, rtpMessage, { parse_mode: 'Markdown' });
  }
});

// Handler chat biasa
bot.on('message', (msg) => {
  const chatId = msg.chat.id;
  const text = msg.text;

  if (!text.startsWith('/start')) {
    const reminderMessage = `
Mohon Maaf, perintah tidak dikenali. 🙏

Silakan chat ke > (@nada777Official) untuk pertanyaan lebih lanjut ya, Bosku!`;

    bot.sendMessage(chatId, reminderMessage, { parse_mode: 'Markdown' });
  }
});
