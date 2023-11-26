require("dotenv").config();
const fs = require("fs");
const Path = require("path");
const Discord = require("discord.js");
const { TOKEN} = require("./config.json");
const { GatewayIntentBits, Partials } = require("discord.js");
const INTENTS = Object.values(GatewayIntentBits);
const PARTIALS = Object.values(Partials);
const client = global.client = new Discord.Client({
    intents: INTENTS,
    allowedMentions: {
        parse: ["users"]
    },
    partials: PARTIALS,
    retryLimit: 3
});

client.commands = global.commands = new Discord.Collection();
client.functions = global.functions = require("./helpers/functions");
const synchronizeSlashCommands = require('discord-sync-commands');


const eventsRegister = () => {
    let eventsDir = Path.resolve(__dirname, './events');
    if (!fs.existsSync(eventsDir)) return client.functions.log("Events klasörü yok.", "+");
    fs.readdirSync(eventsDir, { encoding: "utf-8" }).filter((cmd) => cmd.split(".").pop() === "js").forEach((event) => {
        let prop = require(`./events/${event}`);
        if (!prop) return client.functions.log("Props(lar) yok.", "+");
        client.functions.log(`${event} etkinliği uygulandı.`, "+");
        client.on(event.split('.')[0], prop.bind(null, client));
        delete require.cache[require.resolve(`./events/${event}`)];
    });
};

const commandsRegister = () => {
    let commandsDir = Path.resolve(__dirname, './commands');
    if (!fs.existsSync(commandsDir)) return client.functions.log("Events klasörü yok.", "+");
    fs.readdirSync(commandsDir, { encoding: "utf-8" }).filter((cmd) => cmd.split(".").pop() === "js").forEach((command) => {
        let prop = require(`./commands/${command}`);
        if (!prop) return client.functions.log("Props(lar) yok.", "+");
        client.functions.log(`${command} komutu kaydedildi.`, "+");
        client.commands.set(prop.options.name, prop);
        delete require.cache[require.resolve(`./commands/${command}`)];
    });
};



const slashCommandsRegister = () => {
    const commands = client.commands.filter((c) => c.options);
    const fetchOptions = { debug: true };
    synchronizeSlashCommands(client, commands.map((c) => c.options), fetchOptions);
};

const portRegister = () => {
    const app = require("express")();
    app.use("*", async (req, res, next) => {
        res.json({ message: "Api!" });
        next();
    });
    app.listen(process.env.PORT || 80);
};

eventsRegister();
commandsRegister();
slashCommandsRegister();
portRegister();


client.login(TOKEN);


process.on('unhandledRejection', error => {
    console.log(error);
});
