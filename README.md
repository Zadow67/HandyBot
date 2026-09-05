# Handy Bot

Custom Slack bot made for Stardance. Try it out!

This bot was made with **Node.js** following the [Stardance Slack Bot guide](https://stardance.hackclub.com/missions/slack-bot/guide), which helped with laying the foundation for the bot.

---

## Available Commands

### Normal Commands

#### `/handy-help`

Displays a list of all available Handy Bot commands.

**Example:**

```text
/handy-help
```

#### `/handy-ping`

Checks the bot's response time and returns its latency.

**Example:**

```text
/handy-ping
```

#### `/handy-reminder`

Creates a reminder after a specified number of minutes.

**Usage:**

```text
/handy-reminder [minutes] [reason]
```

**Example:**

```text
/handy-reminder 10 finish my homework
```

This will remind you about `finish my homework` after 10 minutes.

---

### API Commands

#### `/handy-catfact`

Fetches and displays a random cat fact using an external API.

**Example:**

```text
/handy-catfact
```

#### `/handy-exchange`

Converts an amount from one currency into another.

**Usage:**

```text
/handy-exchange [initialCurrency] [targetCurrency] [amount]
```

**Example:**

```text
/handy-exchange USD EUR 100
```

This converts **100 USD to EUR** using the exchange-rate API.

Currency codes should use standard three-letter codes such as `USD`, `EUR`, `GBP`, `INR`, etc.

#### `/handy-astronomy`

Gets NASA's **Astronomy Picture of the Day (APOD)** and displays the result.

**Example:**

```text
/handy-astronomy
```

---

## How to Run Locally

### 1. Register your Slack app

Go to the [Slack Apps dashboard](https://api.slack.com/apps) and click **Create New App → From scratch**.

Choose a name for your bot and select your workspace.

After creating the app:

* Open **Socket Mode** and enable it.
* Go to **Basic Information** → **App-Level Tokens**.
* Click **Generate Token and Scopes**.
* Give the token a name such as `my-bot-socket`.
* Add the `connections:write` scope.
* Generate the token and save it.

Next, open **OAuth & Permissions** and add these Bot Token Scopes:

```text
chat:write
commands
app_mentions:read
channels:history
```

Then go to **Install App** and install the bot into your workspace. Save the **Bot User OAuth Token**.

Finally, open **Slash Commands** and create the commands listed in the [Available Commands](#available-commands) section.

---

### 2. Clone the repository

```bash
git clone https://github.com/Zadow67/HandyBot.git

cd HandyBot
```

### 3. Install dependencies

```bash
npm install
```

### 4. Set up environment variables

The astronomy command requires a NASA API key. You can get one from the [NASA API portal](https://api.nasa.gov/#signUp).

Create a `.env` file in the project directory:

```env
SLACK_APP_TOKEN=xapp....

SLACK_BOT_TOKEN=xoxb....

NASA_API_KEY=your_key...
```

Do not share or commit your `.env` file, since it contains your private API credentials.

### 5. Run the bot

```bash
node index.js
```

If everything is configured correctly, you should see:

```text
Bot is Running!!
```

in your terminal.

If you need additional help setting up the Slack app, check the [Stardance Slack Bot guide](https://stardance.hackclub.com/missions/slack-bot/guide#step-1).
