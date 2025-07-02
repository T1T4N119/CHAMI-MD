const { cmd } = require('../lib/command');
const axios = require('axios');

cmd({
  pattern: "attp",
  desc: 'Make RGB animated sticker from text',
  category: 'fun',
  use: '.attp <text>',
  react: '🌈'
}, async (m, command) => {
  let text = command[1] || '';
  if (!text.trim()) return m.reply('❗ Text ekak danna!\nEg: .attp Infinity');

  try {
    const response = await axios.get('https://api.infinityapi.org/rgb-animation', {
      headers: {
        'Authorization': 'Bearer Infinity-manoj-x-mizta'
      },
      params: {
        text,
        font: 'go3v2'
      },
      responseType: 'arraybuffer'
    });

    const buffer = Buffer.from(response.data);
    await m.sendSticker(buffer, {
      packname: "CHAMI-MD",
      author: "ATT-Power"
    });

  } catch (error) {
    console.error(error);
    m.reply('❌ Sticker hadanna bari una. Try later.');
  }
});
