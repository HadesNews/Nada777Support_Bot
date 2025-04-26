const TelegramBot = require('node-telegram-bot-api');

// Token bot
const token = '7971857678:AAEEjSVxrG850rXeirVNYeTDqjNFWPd-LFU';

// Inisialisasi Bot
const bot = new TelegramBot(token, { polling: true });

// List Game Pragmatic Play
const pragmaticGames = [
  '🎰 Gates of Olympus',
  '👸 Starlight Princess',
  '🍭 Sweet Bonanza',
  '⚡ Zeus',
  '🤠 Wild West Gold',
  '🍬 Sugar Rush',
  '🍓 Fruit Party',
  '🐶 The Dog House',
  '🦏 Great Rhino',
  '💰 Bonanza Gold',
  '💎 Aztec Gems',
  '🎉 Hot Fiesta',
  '🃏 Joker’s Jewels',
  '🎰 Madame Destiny Megaways',
];

// List Game PG Soft
const pgSoftGames = [
  '🀄 Mahjong Ways',
  '🀄 Mahjong Ways 2',
  '🐱 Lucky Neko',
  '🌸 Dreams of Macau',
  '🍀 Caishen Wins',
  '🐉 Dragon Tiger Luck',
  '🏯 Treasures of Aztec',
  '🐟 Fish Prawn Crab',
  '👑 Queen of Bounty',
  '💎 Gem Saviour',
];

// Variabel Data
let rtpPragmatic = [];
let rtpPGSoft = [];
let lastUpdateTime = '';

// Fungsi generate RTP Random
function generateRandomRTP(games) {
  return games.map(game => ({
    name: game,
    rtp: Math.floor(Math.random() * 11) + 90 // 90%-100%
  }));
}

// Fungsi Update RTP
function updateRTP() {
  rtpPragmatic = generateRandomRTP(pragmaticGames);
  rtpPGSoft = generateRandomRTP(pgSoftGames);

  const now = new Date();
  lastUpdateTime = now.toLocaleString('id-ID', { timeZone: 'Asia/Jakarta' });

  console.log('✅ RTP Online berhasil diupdate:', lastUpdateTime);
}

// Update pertama kali dan setiap 2 jam
updateRTP();
setInterval(updateRTP, 2 * 60 * 60 * 1000); // 2 jam sekali

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

// Handler Klik "RTP Online"
bot.on('callback_query', (callbackQuery) => {
  const chatId = callbackQuery.message.chat.id;
  const data = callbackQuery.data;

  if (data === 'rtp_online') {
    let topGame = [...rtpPragmatic, ...rtpPGSoft].sort((a, b) => b.rtp - a.rtp)[0];

    let rtpMessage = `🔥 *RTP ONLINE TERBARU!*\n\n`;

    rtpMessage += `⭐ *Game RTP Tertinggi:* ${topGame.name} — *${topGame.rtp}%*\n\n`;

    rtpMessage += `🎰 *Pragmatic Play*\n`;
    rtpPragmatic.forEach(game => {
      rtpMessage += `• ${game.name} → *${game.rtp}%*\n`;
    });

    rtpMessage += `\n🀄 *PG Soft*\n`;
    rtpPGSoft.forEach(game => {
      rtpMessage += `• ${game.name} → *${game.rtp}%*\n`;
    });

    rtpMessage += `\n⏰ Update: *${lastUpdateTime}*\n🔄 Data diperbarui otomatis setiap 2 jam`;

    bot.sendMessage(chatId, rtpMessage, { parse_mode: 'Markdown' });
  }
});

// Handler pesan tidak dikenali
bot.on('message', (msg) => {
  const chatId = msg.chat.id;
  const text = msg.text;

  if (!text.startsWith('/start') && !text.startsWith('/')) {
    const reminderMessage = `
Mohon Maaf, perintah tidak dikenali. 🙏

Silakan chat ke > (@nada777Official) untuk bantuan lebih lanjut ya, Bosku!`;

    bot.sendMessage(chatId, reminderMessage, { parse_mode: 'Markdown' });
  }
});
