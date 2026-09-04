require("dotenv").config();

const { App } = require("@slack/bolt");
const axios = require("axios");

const app = new App({
    token: process.env.SLACK_BOT_TOKEN,
    appToken: process.env.SLACK_APP_TOKEN,
    socketMode: true
});

app.command("/handy-help", async ({command, ack, respond}) => {
    await ack();
    await respond({
        text: 
        `Hello <@${command.user_id}>! Thanks for using Handy Bot!\nHere are all available Commands:\n\n*Normal Commands*\n\`/handy-help\` - Show this help message\n\`/handy-ping\` - Check bot latency\n\`/handy-reminder [minutes][reason]\` - Set a reminder\n\n*API Commands*\n\`/handy-catfact\` - Get a cat fact\n\`/handy-exchange [initialCurrency][targetCurrency][amount]\` - Exchange any amount of money from one currency to another\n\`/handy-astronomy\` - Get NASA\'s APOD\n`
    });
});

app.command("/handy-ping", async({ ack, respond}) => {
    const start = Date.now();
    await ack();
    const latency = Date.now() - start;
    await respond ({text: `Pong!\nLatency: ${latency}ms`}); 
});

app.command("/handy-catfact", async({ack, respond}) => {
    await ack();

    try {
        const response = await axios.get("https://catfact.ninja/fact");
        await respond({ text: `Cat Fact:\n${response.data.fact}` });
    } catch (e) {
        await respond({ text: "Failed to fetch a cat fact :(" });
    }
});

app.command("/handy-astronomy", async({ack, respond}) => {
    await ack();

    try {
        const apiKey = process.env.NASA_API_KEY;
        const response = await axios.get(`https://api.nasa.gov/planetary/apod?api_key=${apiKey}`);
        if (response.data.media_type === "image") {
            await respond({ 
                text: `Here is NASA's APOD!\n\n*${response.data.title}*\n${response.data.explanation}`,
                attachments: [
                    {
                        fallback: 'Image preview: ${response.data.title}',
                        image_url: response.data.url,
                        alt_text: "APOD"
                    }
                ]            
            })  
        } else {
            await respond({
                text: `NASA has a video today, get the link below:\n\n*${response.data.title}*\n${response.data.explanation}\n\n${response.data.url}`
            })
        }
    } catch (e) {
        await respond({ text: "Sorry! Couldn't fetch :("});
    }
});

app.command("/handy-exchange", async({ command, ack, respond}) => {
    await ack();
    const args = command.text.split(' ');
    if (args.length != 3) {
        await respond({ text: "Error! Make sure to put the right parameters (3)."});
        return;
    }
    
    try {
        const from = args[0];
        const to = args[1];
        const amount = args[2];

        const response = await axios.get(`https://api.frankfurter.dev/v2/rate/${from}/${to}`);
        const rate = response.data.rate;

        const result = (amount * rate).toFixed(2);

        await respond({ text: `${amount} *${from.toUpperCase()}* is ${result} *${to.toUpperCase()}*\n\n>Current rate: ${rate}`});
    } catch (e) {
        await respond({ text: "Failed to convert. Sorry!"});
    }
});

app.command("/handy-reminder", async({command, ack, respond}) => {

    await ack();

    const args = command.text.split(" ");

    if (args.length != 2) {
        await respond({ text: "Invalid number or arguments!"})
        return;
    }

    try {
        const seconds = parseInt(args[0]) * 60;
        const title = args[1];

        if (!(seconds >= 60) || isNaN(seconds)) {
            await respond({ text: "Your number must be equal or greated than 1."});
            return;
        }


        let time;
        if (seconds == 60) {
            time = "min";
        } else {
            time = "mins";
        }

        await respond({ text: `You will be notified in ${args[0]} ${time}, reason: ${title}`});

        setTimeout(async () => {await respond({ text: `<@${command.user_id}>! Here is your reminder, reason: ${title}`})}, seconds*1000);
    } catch (e) {
        await respond({ text: "Error! Make sure you typed the correct info" });
    }

});

(async() => {
    await app.start();
    console.log("Bot is Running!!");
})();
