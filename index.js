const TelegramBot = require('node-telegram-bot-api');
const fs = require('fs');
const path = require('path');

const token = '7971857678:AAEEjSVxrG850rXeirVNYeTDqjNFWPd-LFU';
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
