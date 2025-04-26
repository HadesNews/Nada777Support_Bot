const TelegramBot = require('node-telegram-bot-api');

// Ganti dengan token bot kamu
const token = '7971857678:AAEEjSVxrG850rXeirVNYeTDqjNFWPd-LFU';

// Buat bot dengan polling
const bot = new TelegramBot(token, { polling: true });

// Event saat anggota baru masuk grup
bot.on('/start', (msg) => {
  const chatId = msg.chat.id;
  const newMembers = msg.new_chat_members;

  newMembers.forEach((user) => {
    const name = user.first_name || 'Teman Baru';
    const welcomeMessage = `👋 Selamat datang, ${name}!\nSemoga betah di grup ini 😊`;
    bot.sendMessage(chatId, welcomeMessage);
  });
});

require('dotenv').config();
const TelegramBot = require('node-telegram-bot-api');
const fs = require('fs');

const token = process.env.TOKEN;
const bot = new TelegramBot(token, { polling: true });

// Load command files
const commandFiles = fs.readdirSync('./commands');

commandFiles.forEach((file) => {
  const command = require(`./commands/${file}`);
  bot.onText(command.pattern, (msg, match) => {
    command.execute(bot, msg, match);
  });
});

// Welcome message
bot.on('new_chat_members', (msg) => {
  msg.new_chat_members.forEach((user) => {
    const name = user.first_name || 'Teman Baru';
    bot.sendMessage(msg.chat.id, `👋 Selamat datang, ${name}!`);
  });
});

// Handle callback queries
bot.on('callback_query', (callbackQuery) => {
  const msg = callbackQuery.message;
  const data = callbackQuery.data;

  let response = '/start/';

  switch (data) {
    case 'login':
      response = '🔐 Silakan login di: https://link-login-kamu.com';
      break;
    case 'link_alternatif':
      response = '🌐 Link alternatif: https://link-alternatif-kamu.com';
      break;
    case 'hubungi_cs':
      response = '📞 Hubungi CS kami di: @CS_Nada777';
      break;
    case 'daftar_akun':
      response = '📋 Daftar akun baru di: https://link-daftar-kamu.com';
      break;
    case 'panduan':
      response = '📄 Panduan lengkap: https://link-panduan-kamu.com';
      break;
    default:
      response = '❓ Pilihan tidak dikenal.';
  }

  bot.sendMessage(msg.chat.id, response);
  bot.answerCallbackQuery(callbackQuery.id);
});
