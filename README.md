# Handy Bot

Custom Slack bot made for my workspace. Try it out!
This bot is made with Node.js and uses Slack's Socket Mode to receive events and slash commands.

---

## Available Commands

**Normal Commands**

`/handy-help` - Show a help message
`/handy-ping` - Check bot latency
`/handy-reminder [minutes][reason]` - Set a reminder

**API Commands**

`/handy-catfact` - Get a cat fact
`/handy-exchange [initialCurrency][targetCurrency][amount]` - Exchange any amount of money from one currency to another
`/handy-astronomy` - Get NASA's APOD
---

## How to run Locally

### 1. Register your bot

Go to the [Slack Apps dashboard](https://api.slack.com/apps) and click **Create New App** → **From scratch**.

* Name the app **Handy Bot** and select your workspace.
* Click **Create App**.
* Open **Socket Mode** in the left sidebar and enable it.
* Open **Basic Information** in the left sidebar.
* Scroll down to **App-Level Tokens** and click **Generate Token and Scopes**.
* Give the token a name, such as `handy-bot-socket`.
* Add the `connections:write` scope.
* Click **Generate** and copy the token.

Open **OAuth & Permissions** and under **Bot Token Scopes**, add:

```text
chat:write
commands
app_mentions:read
channels:history
```

Go to **Install App** and click **Install to Workspace**.
Copy the **Bot User OAuth Token**.
Open **Slash Commands** and create each of the commands listed above.

---

### 2. Clone the repository

```bash
git clone https://github.com/Zadow67/HandyBot.git
cd Handy-bot
```
---

### 3. Install dependencies

```bash
npm install
```

---

### 4. Set up environment variables

Get your NASA API key from [NASA's API portal](https://api.nasa.gov/#signUp).

Create a `.env` file in the root of the project and add:

```env
SLACK_APP_TOKEN=xapp....
SLACK_BOT_TOKEN=xoxb....
NASA_API_KEY=your_key...
```

**Never upload your `.env` file to GitHub.**
---

### 5. Run the bot
```bash
node index.js
```

If everything is configured correctly, you should see:
```text
Bot is Running!!
```

Your Handy Bot should now be connected to Slack.

---

## Hosting

Handy Bot uses Slack Socket Mode, so it needs to run continuously on a server.

You can host it on a service that supports a continuously running Node.js process, such as **Render**, **Railway**, or another Node.js hosting provider.

When deploying, you will need to:

1. Upload/push the project to GitHub.
2. Create a new Node.js service on your hosting provider.
3. Set the start command to:

```bash
node index.js
```

4. Add the environment variables from your local `.env` file to the hosting provider's environment-variable settings:

```text
SLACK_APP_TOKEN
SLACK_BOT_TOKEN
NASA_API_KEY
```

5. Deploy the application.
6. Keep the service running so Handy Bot stays connected to Slack.

Do **not** upload `.env` or your tokens to GitHub.

---

## Customization

You can modify the commands, messages, APIs, and other functionality directly in `index.js`.

To add a new Slack slash command, create the command in your Slack App and add the corresponding handler to the bot.

---

## Environment Variables

| Variable          | Purpose                                                |
| ----------------- | ------------------------------------------------------ |
| `SLACK_APP_TOKEN` | Allows Handy Bot to connect to Slack using Socket Mode |
| `SLACK_BOT_TOKEN` | Allows Handy Bot to interact with Slack                |
| `NASA_API_KEY`    | Used for NASA API requests                             |

Keep all tokens private and never commit them to GitHub.
