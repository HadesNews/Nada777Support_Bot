const TelegramBot = require('node-telegram-bot-api');
const token = '7971857678:AAEEjSVxrG850rXeirVNYeTDqjNFWPd-LFU';
const bot = new TelegramBot(token, { polling: true });

// Data Game RTP by Provider
let pragmaticGames = [
  { name: "Gates of Olympus", rtp: randomRTP() },
  { name: "Sweet Bonanza", rtp: randomRTP() },
  { name: "Starlight Princess", rtp: randomRTP() },
  { name: "Sugar Rush", rtp: randomRTP() },
  { name: "Wild West Gold", rtp: randomRTP() },
  { name: "The Dog House", rtp: randomRTP() },
  { name: "Fruit Party", rtp: randomRTP() }
];

let pgSoftGames = [
  { name: "Mahjong Ways 2", rtp: randomRTP() },
  { name: "Lucky Neko", rtp: randomRTP() },
  { name: "Wild Bandito", rtp: randomRTP() },
  { name: "Caishen Wins", rtp: randomRTP() },
  { name: "Treasures of Aztec", rtp: randomRTP() },
  { name: "Fortune Tiger", rtp: randomRTP() },
  { name: "Ways of The Qilin", rtp: randomRTP() }
];

// Fungsi random RTP 88% - 95%
function randomRTP() {
  return Math.floor(Math.random() * 10) + 90;
}

// Refresh RTP Setiap 2 Jam
setInterval(() => {
  pragmaticGames.forEach(game => game.rtp = randomRTP());
  pgSoftGames.forEach(game => game.rtp = randomRTP());
  console.log("✅ RTP Update Otomatis Setiap 2 Jam");
}, 2 * 60 * 60 * 1000); // 2 jam dalam milidetik

// Start Command
bot.onText(/^\/start$/, (msg) => {
  const chatId = msg.chat.id;
  const name = msg.from.first_name || 'Teman';

  // Kirim banner gambar terlebih dahulu
  const bannerPath = 'https://via.placeholder.com/400x200.png?text=NADA777+SUPPORT+BOT'; // Ganti dengan link gambar banner kamu
  bot.sendPhoto(chatId, bannerPath).then(() => {
    // Ketik efek sebelum kirim pesan
    bot.sendMessage(chatId, 'Sedang memuat...', { parse_mode: 'Markdown' })
      .then(() => {
        setTimeout(() => {
          const welcomeMessage = `
Selamat Datang Di *NADA777*, ${name}!
🤖 Layanan Bot Nada777 Hadir Untuk Kamu Agar Lebih Praktis 🤖

⬇️ Silahkan Pilih Menu Yang Kamu Butuhkan ⬇️`;

          const options = {
            parse_mode: 'Markdown',
            reply_markup: {
              inline_keyboard: [
                [
                  { text: '📥 DOWNLOAD APK NADA777', url: 'https://t.ly/APKNADA' }
                ],
                [
                  { text: '🔐 LOGIN', url: 'https://t.ly/loginnada777' },
                  { text: '🌐 LINK ALTERNATIF', url: 'https://tembus.xyz/nada777' }
                ],
                [
                  { text: '📞 HUBUNGI CS', url: 'https://t.me/nada777Official' },
                  { text: '🎁 PROMO', url: 'https://t.ly/promonada777' }
                ],
                [
                  { text: '🎯 RTP ONLINE', callback_data: 'rtp_online' }
                ],
                [
                  { text: '👥 GRUP RESMI NADA777', url: 'https://t.me/slotgacornada777' }
                ]
              ]
            }
          };

          bot.sendMessage(chatId, welcomeMessage, options);
        }, 1500); // Delay 1.5 detik untuk efek ketik
      });
  });
});

// Handle button klik
bot.on('callback_query', (callbackQuery) => {
  const message = callbackQuery.message;
  const data = callbackQuery.data;

  if (data === 'rtp_online') {
    const providerOptions = {
      reply_markup: {
        inline_keyboard: [
          [{ text: '🎰 Pragmatic Play', callback_data: 'pragmatic' }],
          [{ text: '🀄 PG Soft', callback_data: 'pgsoft' }],
          [{ text: '⬅️ Kembali ke Menu', callback_data: 'back_to_menu' }]
        ]
      }
    };
    bot.sendMessage(message.chat.id, 'Pilih Provider RTP:', providerOptions);
  }

  if (data === 'pragmatic') {
    const games = getRandomGames(pragmaticGames, 5);
    const text = `🎰 *Pragmatic Play RTP Saat Ini:*\n\n${games}`;
    bot.sendMessage(message.chat.id, text, { parse_mode: 'Markdown' });
  }

  if (data === 'pgsoft') {
    const games = getRandomGames(pgSoftGames, 5);
    const text = `🀄 *PG Soft RTP Saat Ini:*\n\n${games}`;
    bot.sendMessage(message.chat.id, text, { parse_mode: 'Markdown' });
  }

  if (data === 'back_to_menu') {
    bot.emit('text', { chat: { id: message.chat.id }, text: '/start' });
  }

  bot.answerCallbackQuery(callbackQuery.id);
});

// Fungsi ambil 5 game random
function getRandomGames(gamesArray, count) {
  const shuffled = [...gamesArray].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count).map(game => `🎮 *${game.name}* — *${game.rtp}%*`).join('\n');
}

// Auto Response untuk selain /start
bot.on('message', (msg) => {
  const chatId = msg.chat.id;
  const text = msg.text;

  if (!text.startsWith('/start')) {
    const reminderMessage = `
Mohon Maaf, perintah tidak dikenali. 🙏

Silakan chat ke sini > (@nada777Official) untuk konfirmasi lebih lanjut.`;
    bot.sendMessage(chatId, reminderMessage, { parse_mode: 'Markdown' });
  }
});
