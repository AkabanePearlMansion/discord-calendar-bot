const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("Discord Calendar Bot is running!");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

setInterval(() => {
  // Discordに投稿する処理をここに書く
}, 1000 * 60 * 60); // 1時間ごと
