const TelegramBot = require('node-telegram-bot-api');

// Token bot
const token = '7971857678:AAEEjSVxrG850rXeirVNYeTDqjNFWPd-LFU';

// Inisialisasi Bot
const bot = new TelegramBot(token, { polling: true });

// Daftar semua game (Pragmatic + PG Soft)
const allGames = [
  // Pragmatic Play
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

  // PG Soft
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

// Variabel RTP aktif
let rtpData = [];
let lastUpdateTime = '';

// Fungsi buat RTP random
function generateRandomRTP() {
  const shuffled = allGames.sort(() => 0.5 - Math.random());
  const selectedGames = shuffled.slice(0, 8); // Pilih 8 game random
  return selectedGames.map(game => ({
    name: game,
    rtp: Math.floor(Math.random() * 11) + 90 // 90-100%
  }));
}

// Update RTP setiap 2 jam
function updateRTP() {
  rtpData = generateRandomRTP();
  const now = new Date();
  lastUpdateTime = now.toLocaleString('id-ID', { timeZone: 'Asia/Jakarta' });
  console.log('🔄 Data RTP diupdate:', lastUpdateTime);
}
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

// Handle klik tombol RTP Online
bot.on('callback_query', async (callbackQuery) => {
  const chatId = callbackQuery.message.chat.id;
  const data = callbackQuery.data;

  if (data === 'rtp_online') {
    await bot.sendChatAction(chatId, 'typing');
    setTimeout(() => {
      let rtpMessage = `🎰 *RTP ONLINE UPDATE!*\n\n`;

      rtpData.forEach((game) => {
        rtpMessage += `• ${game.name} → *${game.rtp}%*\n`;
      });

      rtpMessage += `\n⏰ Terakhir update: *${lastUpdateTime}*\n🔄 Auto Update Setiap 2 Jam`;

      bot.sendMessage(chatId, rtpMessage, { parse_mode: 'Markdown' });
    }, 1000);
  }
});

// Handle chat bebas
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
