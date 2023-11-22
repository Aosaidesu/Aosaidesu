import { system, world } from '@minecraft/server';
import { HttpRequest, HttpHeader, HttpRequestMethod, http } from "@minecraft/server-net";
const channelID = "1172516110634078259";
const botToken = "MTE3Njc2NTI5ODU5MDg4MzkzMA.G83cKL.fGEJ2Dh3UUCWxOY3qgITeTv8PoP9Rxv5t7tsbQ";

async function sendDiscordMessage(content) {
    const req = new HttpRequest(`https://discord.com/api/v10/channels/${channelID}/messages`);
    req.body = JSON.stringify({ content });
    req.method = HttpRequestMethod.POST;
    req.headers = [
        new HttpHeader("Content-Type", "application/json"),
        new HttpHeader("Authorization", `Bot ${botToken}`),
    ];
    await http.request(req);
}

async function sendDiscordEmbed(message) {
    const req = new HttpRequest(`https://discord.com/api/v10/channels/${channelID}/messages`);
    req.body = JSON.stringify(message);
    req.method = HttpRequestMethod.POST;
    req.headers = [
        new HttpHeader("Content-Type", "application/json"),
        new HttpHeader("Authorization", `Bot ${botToken}`),
    ];
    await http.request(req);
}

world.afterEvents.worldInitialize.subscribe(async () => {
    (async () => {
        const req = new HttpRequest(`https://naqnanaserver-default-rtdb.asia-southeast1.firebasedatabase.app/server/status/online.json`);
        req.body = JSON.stringify(true);
        req.method = HttpRequestMethod.POST;
        await http.request(req);
    })();
    let title = `**サーバー起動**`;
    const embedData = {
        title: title,
        color: 7186930,
        timestamp: new Date().toISOString()
    };
    const message = {
        content: "",
        embeds: [embedData]
    };
    sendDiscordEmbed(message);
});

world.afterEvents.chatSend.subscribe(async (eventData) => {
    let player = eventData.sender.name;
    let message = eventData.message;
    let dMessage = `<${player}> ${message}`;
    sendDiscordMessage(dMessage);
});

world.afterEvents.playerJoin.subscribe(async (eventData) => {
    let player = eventData.playerName;
    let title = `**${player}がサーバーに参加しました**`;
    const embedData = {
        title: title,
        color: 8438594,
        timestamp: new Date().toISOString()
    };
    const message = {
        content: "",
        embeds: [embedData]
    };
    sendDiscordEmbed(message);
});

world.afterEvents.playerLeave.subscribe(async (eventData) => {
    let player = eventData.playerName;
    let title = `**${player}がサーバーから退出しました**`;
    const embedData = {
        title: title,
        color: 13182255,
        timestamp: new Date().toISOString()
    };
    const message = {
        content: "",
        embeds: [embedData]
    };
    sendDiscordEmbed(message);
});

const messageURL = `https://discord.com/api/v10/channels/${channelID}/messages`;
let lastMessageID = null;
let i = 0;

async function handleNewMessages() {
    const url = lastMessageID ? `${messageURL}?after=${lastMessageID}` : messageURL;
    const req = new HttpRequest(url);
    req.headers = [
        new HttpHeader("Authorization", `Bot ${botToken}`)
    ];
    const response = await http.request(req);
    const messages = JSON.parse(response.body);
    messages.forEach(message => {
        if (!message.author.bot && i !== 0) {
            if (message.referenced_message) {
                world.sendMessage(`返信：§b[${message.referenced_message.author.username}] §f${message.referenced_message.content} >\n§b[${message.author.username}] §f${message.content}`);
            } else {
                world.sendMessage(`§b[${message.author.username}] §f${message.content}`);
            }
        }
    });

    if (messages.length > 0) {
        lastMessageID = messages[0].id;
    }
    i++;
}

system.runInterval(() => {
    handleNewMessages();
}, 20);
