const TelegramBot = require('node-telegram-bot-api');

// Token bot
const token = '7971857678:AAEEjSVxrG850rXeirVNYeTDqjNFWPd-LFU';

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

// Daftar semua game (Pragmatic + PG Soft)
const pragmaticGames = [
  'Gates of Olympus', 'Starlight Princess', 'Sweet Bonanza', 'Zeus', 'Wild West Gold',
  'Sugar Rush', 'Fruit Party', 'The Dog House', 'Great Rhino', 'Bonanza Gold',
  'Aztec Gems', 'Hot Fiesta', 'Joker’s Jewels', 'Madame Destiny Megaways'
];

const pgSoftGames = [
  'Mahjong Ways', 'Mahjong Ways 2', 'Lucky Neko', 'Dreams of Macau', 'Caishen Wins',
  'Dragon Tiger Luck', 'Treasures of Aztec', 'Fish Prawn Crab', 'Queen of Bounty', 'Gem Saviour'
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

  const welcomeMessage = 
`Selamat Datang Di *NADA777*, ${name}!
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
          { text: '📞 HUBUNGI CS', callback_data: 'contact_cs' }, // <== diubah jadi callback
          { text: '🎁 PROMO', callback_data: 'promo_info' }       // <== diubah jadi callback
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

// Handle klik tombol
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

      rtpMessage += `📌 *PG Soft RTP Saat Ini:*\n`;
      rtpData.pgSoft.forEach((game) => {
        rtpMessage += `• ${game.name} → *${game.rtp}%*\n${game.pola}\n\n`;
      });

      rtpMessage += `⏰ Terakhir dilihat: *${currentTime}*\n🔄 Data update otomatis setiap 2 jam`;

      bot.sendMessage(chatId, rtpMessage, { parse_mode: 'Markdown' });
    }, 1000);

  } else if (data === 'promo_info') {
    bot.sendMessage(chatId, '🎁 Promo Terbaru NADA777:\n\nDapatkan bonus new member 100% dan cashback harian!\n👉 Kunjungi: https://t.ly/promonada777', { parse_mode: 'Markdown' });

  } else if (data === 'contact_cs') {
    bot.sendMessage(chatId, '📞 Hubungi Customer Service NADA777 24 jam:\n👉 https://t.me/nada777Official', { parse_mode: 'Markdown' });

  }

  bot.answerCallbackQuery(callbackQuery.id); // Nutup loading di tombol
});

// Handle chat bebas selain /start
bot.on('message', (msg) => {
  const chatId = msg.chat.id;
  const text = msg.text;

  if (!text.startsWith('/start')) {
    const reminderMessage = 
`Mohon Maaf, perintah tidak dikenali. 🙏

Silakan chat ke > (@nada777Official) untuk pertanyaan lebih lanjut ya, Bosku!`;

    bot.sendMessage(chatId, reminderMessage, { parse_mode: 'Markdown' });
  }
});
