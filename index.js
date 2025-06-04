const { Client, GatewayIntentBits } = require("discord.js");
const express = require("express");
const fetch = require("node-fetch");

const app = express();
const PORT = process.env.PORT || 3000;

// 環境変数
const DISCORD_TOKEN = process.env.DISCORD_TOKEN;
const CHANNEL_ID = process.env.CHANNEL_ID;
const CALENDAR_URL = process.env.CALENDAR_URL;

// Discord Bot クライアントの準備
const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages],
});

// Discordにカレンダーを投稿する関数
async function sendCalendar() {
  try {
    const channel = await client.channels.fetch(CHANNEL_ID);
    if (!channel) {
      console.error("チャンネルが見つかりませんでした。");
      return;
    }

    await channel.send({
      content: "🗓️ 最新のカレンダーはこちら！",
      embeds: [
        {
          title: "カレンダーを見る",
          url: CALENDAR_URL,
          description: "クリックするとカレンダーが表示されます。",
          color: 0x00aeff,
        },
      ],
    });

    console.log("✅ カレンダーをDiscordに投稿しました！");
  } catch (error) {
    console.error("❌ カレンダーの投稿中にエラー:", error);
  }
}

// 起動時に一度だけカレンダー送信
client.once("ready", async () => {
  console.log(`🤖 ログイン成功: ${client.user.tag}`);
  await sendCalendar();

  // 1時間ごとに投稿（必要に応じて）
  setInterval(sendCalendar, 1000 * 60 * 60);
});

// Botログイン
client.login(DISCORD_TOKEN);

// Expressサーバー（RenderのHealth Check用）
app.get("/", (req, res) => {
  res.send("Discord Calendar Bot is running!");
});
app.listen(PORT, () => {
  console.log(`🌐 Webサーバー起動: http://localhost:${PORT}`);
});
