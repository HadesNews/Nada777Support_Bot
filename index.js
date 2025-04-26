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
    
    const welcomeMessage = `👋 Selamat datang, ${name}!\nSemoga betah di grup ini 😊`;
    bot.sendMessage(start, welcomeMessage);
  });
});
