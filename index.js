const TelegramBot = require('node-telegram-bot-api');

// Token bot
const token = '7971857678:AAEEjSVxrG850rXeirVNYeTDqjNFWPd-LFU';

// Inisialisasi Bot
const bot = new TelegramBot(token, { polling: true });

// Daftar semua game (Pragmatic + PG Soft)
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
  '🎰 Madame Destiny Megaways'
];

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
  '💎 Gem Saviour'
];

// Fungsi buat pola random + keterangan spin berdasarkan provider
function generateRandomPola(provider) {
  const polaList = [
    '🕹️ 100x - 20x - 10x',
    '🎯 50x - 30x - 20x',
    '🎰 60x - 30x - 20x',
    '🎲 40x - 25x - 15x',
    '🎮 80x - 40x - 10x',
    '🏆 90x - 50x - 30x'
  ];
  const randomPola = polaList[Math.floor(Math.random() * polaList.length)];

  let spinInfo = '';

  if (provider === 'pragmatic') {
    spinInfo = `
🔧 Setting:
✅ Spin Turbo
❌ Spin Cepat
✅ Lewati Layar`;
  } else if (provider === 'pgsoft') {
    spinInfo = `
🔧 Setting:
🎯 Spin Auto
🎮 Spin Normal (Manual)
⚡ Spin Turbo`;
  }

  return `${randomPola}\n${spinInfo}`;
}

// Variabel RTP aktif
let rtpData = {
  pragmatic: [],
  pgSoft: []
};

// Fungsi buat RTP random + pola + spin
function generateRandomRTP() {
  const randomizeGames = (games, provider) => {
    const shuffled = games.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 5).map(game => ({
      name: game,
      rtp: Math.floor(Math.random() * 11) + 90, // 90-100%
      pola: generateRandomPola(provider)
    }));
  };

  rtpData.pragmatic = randomizeGames(pragmaticGames, 'pragmatic');
  rtpData.pgSoft = randomizeGames(pgSoftGames, 'pgsoft');
}

// Update RTP setiap 2 jam
function updateRTP() {
  generateRandomRTP();
  console.log('🔄 Data RTP diupdate:', new Date().toLocaleString('id-ID', { timeZone: 'Asia/Jakarta' }));
}
updateRTP();
setInterval(updateRTP, 2 * 60 * 60 * 1000); // Update setiap 2 jam

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

    const currentTime = new Date().toLocaleString('id-ID', { timeZone: 'Asia/Jakarta' });

    setTimeout(() => {
      let rtpMessage = `🎰 *RTP ONLINE UPDATE!*\n\n`;

      rtpMessage += `📌 *Pragmatic Play RTP Saat Ini:*\n`;
      rtpData.pragmatic.forEach((game) => {
        rtpMessage += `• ${game.name} → *${game.rtp}%*\n  Pola: ${game.pola}\n\n`;
      });

      rtpMessage += `\n📌 *PG Soft RTP Saat Ini:*\n`;
      rtpData.pgSoft.forEach((game) => {
        rtpMessage += `• ${game.name} → *${game.rtp}%*\n  Pola: ${game.pola}\n\n`;
      });

      rtpMessage += `⏰ Terakhir dilihat: *${currentTime}*\n🔄 Data update otomatis setiap 2 jam`;

      bot.sendMessage(chatId, rtpMessage, { parse_mode: 'Markdown' });
    }, 1000);
  }
});

// Handle chat bebas selain /start
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
