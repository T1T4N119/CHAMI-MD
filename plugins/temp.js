const { cmd } = require('../lib/command');
const axios = require('axios');

cmd({
  pattern: "tiktok",
  alias: ["tt", "tiktokdl"],
  desc: "Download TikTok video",
  category: "download",
  filename: __filename,
}, async (conn, m, msg, { q, reply }) => {
  try {
    if (!q || !q.includes("tiktok.com")) {
      return reply("❗ *Please provide a valid TikTok URL.*\n\nExample:\n.tiktok https://vt.tiktok.com/abc123");
    }

    const res = await axios.get(`https://supun-md-api-xmjh.vercel.app/api/down/tt?q=${encodeURIComponent(q)}`);
    const data = res.data;

    if (!data || !data.url || !data.url.nowm) {
      return reply("❌ Failed to fetch TikTok video. Try another link.");
    }

    await conn.sendMessage(msg.from, {
      video: { url: data.url.nowm },
      caption: `🎵 *TikTok Video Downloaded Successfully!*

🎥 *User:* ${data.author.nickname || 'N/A'}
📝 *Description:* ${data.title || 'No title'}

> 𝗣𝗢𝗪𝗘𝗥𝗗 𝗕𝗬 𝗖𝗛𝗔𝗠𝗜`,
    }, { quoted: m });

  } catch (err) {
    console.error("TikTok Plugin Error:", err);
    reply("❌ Error: Something went wrong while downloading.");
  }
});
