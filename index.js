const TelegramBot = require('node-telegram-bot-api');

// Token bot
const token = '7971857678:AAEEjSVxrG850rXeirVNYeTDqjNFWPd-LFU'; // Ganti token ya

// Inisialisasi Bot
const bot = new TelegramBot(token, { polling: true });

// SET COMMANDS
bot.setMyCommands([
  { command: 'start', description: 'Mulai Bot NADA777' },
  { command: 'rtp', description: 'Cek RTP Online NADA777' },
  { command: 'promo', description: 'Lihat Info Promo Terbaru' },
  { command: 'daftar', description: 'Daftar Akun NADA777' },
  { command: 'cs', description: 'Hubungi Customer Service' }
]);

// Daftar semua game
const pragmaticGames = [...]; // (sama seperti yang kamu buat)
const pgSoftGames = [...]; // (sama juga)

// Fungsi buat pola random
function generateRandomPola() { /* Sama */ }

// Variabel RTP aktif
let rtpData = { pragmatic: [], pgSoft: [] };

// Fungsi buat RTP random
function generateRandomRTP() { /* Sama */ }

// Update RTP setiap 2 jam
function updateRTP() { /* Sama */ }
updateRTP();
setInterval(updateRTP, 2 * 60 * 60 * 1000);

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

// Handler klik tombol RTP Online
bot.on('callback_query', async (callbackQuery) => {
  const chatId = callbackQuery.message.chat.id;
  const data = callbackQuery.data;

  if (data === 'rtp_online') {
    await bot.sendChatAction(chatId, 'typing');

    const currentTime = new Date().toLocaleString('id-ID', { timeZone: 'Asia/Jakarta' });

    setTimeout(() => {
      let rtpMessage = `🎰 *RTP ONLINE UPDATE!*\n\n`;

      rtpMessage += `📌 *Pragmatic Play RTP Saat Ini:*\n`;
      rtpData.pragmatic.forEach((game) => {
        rtpMessage += `• ${game.name} → *${game.rtp}%*\n${game.pola}\n\n`;
      });

      rtpMessage += `\n📌 *PG Soft RTP Saat Ini:*\n`;
      rtpData.pgSoft.forEach((game) => {
        rtpMessage += `• ${game.name} → *${game.rtp}%*\n${game.pola}\n\n`;
      });

      rtpMessage += `⏰ Terakhir dilihat: *${currentTime}*\n🔄 Data update otomatis setiap 2 jam`;

      bot.sendMessage(chatId, rtpMessage, { parse_mode: 'Markdown' });
    }, 1000);
  }
});

// Handler /rtp
bot.onText(/^\/rtp$/, (msg) => {
  const chatId = msg.chat.id;
  const currentTime = new Date().toLocaleString('id-ID', { timeZone: 'Asia/Jakarta' });

  let rtpMessage = `🎰 *RTP ONLINE UPDATE!*\n\n`;

  rtpMessage += `📌 *Pragmatic Play RTP Saat Ini:*\n`;
  rtpData.pragmatic.forEach((game) => {
    rtpMessage += `• ${game.name} → *${game.rtp}%*\n${game.pola}\n\n`;
  });

  rtpMessage += `\n📌 *PG Soft RTP Saat Ini:*\n`;
  rtpData.pgSoft.forEach((game) => {
    rtpMessage += `• ${game.name} → *${game.rtp}%*\n${game.pola}\n\n`;
  });

  rtpMessage += `⏰ Terakhir dilihat: *${currentTime}*\n🔄 Data update otomatis setiap 2 jam`;

  bot.sendMessage(chatId, rtpMessage, { parse_mode: 'Markdown' });
});

// Handler /promo
bot.onText(/^\/promo$/, (msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, '🎁 Cek promo terbaru di sini ya bosku:\n👉 https://t.ly/promonada777');
});

// Handler /daftar
bot.onText(/^\/daftar$/, (msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, '📝 Mau daftar akun NADA777?\nKlik link berikut ya:\n👉 https://t.ly/loginnada777');
});

// Handler /cs
bot.onText(/^\/cs$/, (msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, '📞 Butuh bantuan?\nHubungi CS Resmi NADA777:\n👉 https://t.me/nada777Official');
});

// Handler pesan lain yang tidak dikenali
bot.on('message', (msg) => {
  const chatId = msg.chat.id;
  const text = msg.text;

  // Cek kalau bukan command yang kita kenali
  if (!/^\/(start|rtp|promo|daftar|cs)/.test(text)) {
    const reminderMessage = `
Mohon Maaf, perintah tidak dikenali. 🙏

Silakan chat ke > (@nada777Official) untuk pertanyaan lebih lanjut ya, Bosku!`;

    bot.sendMessage(chatId, reminderMessage, { parse_mode: 'Markdown' });
  }
});
