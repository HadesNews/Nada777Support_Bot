const TelegramBot = require('node-telegram-bot-api');

// Token bot
const token = '7971857678:AAEEjSVxrG850rXeirVNYeTDqjNFWPd-LFU';

// Inisialisasi Bot
const bot = new TelegramBot(token, { polling: true });

// Daftar semua game (Pragmatic + PG Soft)
const pragmaticGames = [
  'Gates of Olympus 1000',
  'Starlight Princess',
  'Sweet Bonanza',
  '15.000x Mania',
  'Wild West Gold',
  'Sweet Bonanza 1000',
  'Mahjong Wins 3 - Black Scatter',
  'The Dog House',
  'Gates of Olympus',
  'Bonanza Gold',
  'Slot Mania Sugar',
  'Starlight Princess 1000',
  'Slot Mania Princess',
  'Madame Destiny Megaways'
];

const pgSoftGames = [
  'Mahjong Ways',
  'Mahjong Ways 2',
  'Lucky Neko',
  'Ways Of The Qilin',
  'Wild Bounty Showdown',
  'Dragon Tiger Luck',
  'Treasures of Aztec',
  'The Great Icescape',
  'Queen of Bounty',
  'Gem Saviour'
];

// Fungsi buat pola random
function generateRandomPola() {
  const polaTemplates = [
    `Pola 1: Auto Spin 20 ❌❌✅
Pola 2: Spin Normal 30 ❌✅✅
Pola 3: Auto Spin 20 ❌✅❌`,

    `Pola 1: Auto Spin 10 ✅❌✅
Pola 2: Spin Normal 50 ✅✅❌
Pola 3: Auto Spin 30 ❌✅❌`,

    `Pola 1: Spin Normal 20 ❌✅✅
Pola 2: Auto Spin 50 ✅❌✅
Pola 3: Spin Normal 40 ✅✅❌`
  ];
  return polaTemplates[Math.floor(Math.random() * polaTemplates.length)];
}

// Variabel RTP aktif
let rtpData = {
  pragmatic: [],
  pgSoft: []
};

// Fungsi buat RTP random + pola
function generateRandomRTP() {
  const randomizeGames = (games) => {
    const shuffled = games.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 3).map(game => ({
      name: game,
      rtp: Math.floor(Math.random() * 11) + 90, // 90-100%
      pola: generateRandomPola()
    }));
  };

  rtpData.pragmatic = randomizeGames(pragmaticGames);
  rtpData.pgSoft = randomizeGames(pgSoftGames);
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
          { text: '🎁 PROMO', url: 'https://gofile.io/d/vqp4qc' }
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
        rtpMessage += `• ${game.name} → *${game.rtp}%*\n${game.pola}\n\n`;
      });

      rtpMessage += `\n📌 *PG Soft RTP Saat Ini:*\n`;
      rtpData.pgSoft.forEach((game) => {
        rtpMessage += `• ${game.name} → *${game.rtp}%*\n${game.pola}\n\n`;
      });

      rtpMessage += `⏰ Terakhir dilihat: *${currentTime}* `;

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

Silakan chat ke (@nada777Official) untuk pertanyaan lebih lanjut ya, Bosku!`;

    bot.sendMessage(chatId, reminderMessage, { parse_mode: 'Markdown' });
  }
});
