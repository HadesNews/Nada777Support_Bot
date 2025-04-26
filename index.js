const TelegramBot = require('node-telegram-bot-api');

// Ganti dengan token bot Anda
const token = '7971857678:AAEEjSVxrG850rXeirVNYeTDqjNFWPd-LFU';

// Buat bot dengan polling
const bot = new TelegramBot(token, { polling: true });

// Handler untuk perintah /start
bot.onText(/^\/start$/, (msg) => {
  const chatId = msg.chat.id;
  const name = msg.from.first_name || 'Teman';

  const welcomeMessage = `👋 Halo, ${name}!\nSelamat datang di bot kami. Gunakan perintah /menu untuk melihat opsi yang tersedia.`;
  bot.sendMessage(chatId, welcomeMessage);
});

// Handler untuk anggota baru yang bergabung dalam grup
bot.on('new_chat_members', (msg) => {
  const chatId = msg.chat.id;
  const newMembers = msg.new_chat_members;

  newMembers.forEach((user) => {
    const name = user.first_name || 'Teman Baru';
    const welcomeMessage = `👋 Selamat datang, ${name}!\nSemoga betah di grup ini 😊`;
    bot.sendMessage(chatId, welcomeMessage);
  });
});
