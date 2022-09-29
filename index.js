const qrcode = require("qrcode-terminal");
const cron = require("node-cron");

const { Client, LocalAuth } = require("whatsapp-web.js");
const client = new Client({
  authStrategy: new LocalAuth(),
});
let date;

client.on("message", async (msg) => {
  const chat = await msg.getChat();
  if (chat.id.user === "77071587041") {
    if (msg.body === "hi") {
      client.sendMessage(msg.from, "Hello");
    }
    let arrMsg = msg.body.split(" ");
    if (arrMsg.includes("newDate") && arrMsg.length == 6) {
      date = arrMsg.slice(1).join(" ");
    }
    arrMsg.forEach((el) => {
      let yes = el.replace(/^8|\+7/, "7");
      if (!isNaN(Number(el)) && el.length == 11) {
        cron.schedule(
          date,
          () => {
            client.sendMessage(`${yes}@c.us`, "Hello");
          },
          {
            scheduled: true,
          }
        );
      }
    });
  }
});

client.on("qr", (qr) => {
  qrcode.generate(qr, { small: true });
});

client.on("ready", () => {
  console.log("Client is ready!");
});

client.initialize();
