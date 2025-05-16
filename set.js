




const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiY0RXbHZ5bTBVWDZZcjg2MUFvL25jaTZFdDgySTlwUWoyRzRzOXh6dE1sRT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiTVVQUUFGdkUxb2NwWnlmZm0xWmQycFNzODV3Q1ArVnh3NzBGQmQ2elpqRT0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJ3RWF3ZTBaQVp0RkZSTEJvMnpZWnRvVEVqQlkxeDNpTWwrWVVOY3NUWVVVPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJpTkJQYkhNRE9zR1dSc0RSYjlRdkJ0VWcxSklFNEVsODZIWkowNGhBbGdFPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Ik1PSkRJTjd1TTVKbldmellsWVcyMTlJU0g1L2ZzWk9MeG8yRTlRODVIMmM9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InZVYWMwOUcvVG9QUmoxLzRTRG5UaFNPWTlBejlKNDNwQ0lXcGxPZnZzVkE9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiNEF2U0QvN0RMb1ROZVN4QkUzd1Erc2FSaFdKNVpCaW9BK0FSMDFNL24xZz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiTUZqd1l3NHhja2hTeXZxUi8zT29zb29xdXcxVHZvMEsxSmp3K1ZuL2RSaz0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IllKZlVCZHR6Tm9OMnRQNHdVSkN1QkpRMSthWUFRRG53UXpGNzBNMU5aN2ZTQlpML3AvNW9TTTByZ3k4VlZjcStwMDV2SUZpQXZYUEgybWMxcVlEU0NBPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MjM2LCJhZHZTZWNyZXRLZXkiOiI5NTNPTHRlSFRTa3FJUjEvRE1JdG9kSWNRQ2xCRm8rbkcvSFhXWXdacktVPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W3sia2V5Ijp7InJlbW90ZUppZCI6IjIzNDgxMzY0NDE5NDBAcy53aGF0c2FwcC5uZXQiLCJmcm9tTWUiOnRydWUsImlkIjoiRjBFQzhENDA0NkQ2QzI3QjcyRjM2MDUzNDkxODhEMjIifSwibWVzc2FnZVRpbWVzdGFtcCI6MTc0NzM5MDM2M30seyJrZXkiOnsicmVtb3RlSmlkIjoiMjM0ODEzNjQ0MTk0MEBzLndoYXRzYXBwLm5ldCIsImZyb21NZSI6dHJ1ZSwiaWQiOiIzMkQxRDQ0QjA4RUFGNzRDQzhGNkI0NkYzQUMwMDkwNSJ9LCJtZXNzYWdlVGltZXN0YW1wIjoxNzQ3MzkwMzYzfV0sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjoxLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwicmVnaXN0ZXJlZCI6ZmFsc2UsImFjY291bnQiOnsiZGV0YWlscyI6IkNQSFMzdUFERUl1Zm5NRUdHQXNnQUNnQSIsImFjY291bnRTaWduYXR1cmVLZXkiOiJNZ3FLc0RtMjBkK1k4Qll1WElPbkp6eHVhU3pWQ3h5NTFLdE5DZ1ovNDBvPSIsImFjY291bnRTaWduYXR1cmUiOiJLNGhCVHpWd2FURzQ3OFNJblAzd3Q2MHMvamNZT20rTE5ZQjdrTkVoTDZVSnZUUUhyWCtUTzZvQjYwekNsVHJ5QmtRb1FpQWNMc1V4M3NVQkVyWE1DZz09IiwiZGV2aWNlU2lnbmF0dXJlIjoiUHdQSUJ6SlhzVU1hbjAxTjIra0w3bE00SVRzTzJRK2s1ZVdJT0hITVBVY285dlNwTEdKa3hGSFgyWTV3Rk1tTEFHaEhkaGtBQ0Q2UlZkSDYxVDgwQ1E9PSJ9LCJtZSI6eyJpZCI6IjIzNDgxMzY0NDE5NDA6MTFAcy53aGF0c2FwcC5uZXQiLCJsaWQiOiIyNzgwMjI0NzczMjAzNjk6MTFAbGlkIiwibmFtZSI6IvCdkYfihI7wnZGSIPCdkLbwnZGM8J2QtfCdkLjwnZGFIPCdkLfwnZGI8J2Qt/CdkLjWjSJ9LCJzaWduYWxJZGVudGl0aWVzIjpbeyJpZGVudGlmaWVyIjp7Im5hbWUiOiIyMzQ4MTM2NDQxOTQwOjExQHMud2hhdHNhcHAubmV0IiwiZGV2aWNlSWQiOjB9LCJpZGVudGlmaWVyS2V5Ijp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQlRJS2lyQTV0dEhmbVBBV0xseURweWM4Ym1rczFRc2N1ZFNyVFFvR2YrTksifX1dLCJwbGF0Zm9ybSI6ImFuZHJvaWQiLCJyb3V0aW5nSW5mbyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkNCSUlBZz09In0sImxhc3RBY2NvdW50U3luY1RpbWVzdGFtcCI6MTc0NzM5MDM2MSwibGFzdFByb3BIYXNoIjoiMlAxWWhmIiwibXlBcHBTdGF0ZUtleUlkIjoiQUFBQUFGaW8ifQ==',
    PREFIXE: process.env.PREFIX || ".",
    OWNER_NAME: process.env.OWNER_NAME || "2348136441940",
    NUMERO_OWNER : process.env.NUMERO_OWNER || "𝐶𝑌𝐵𝐸𝑅 𝐷𝑈𝐷𝐸֍",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "no",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'no',
    BOT : process.env.BOT_NAME || 'BMW_MD',
    URL : process.env.BOT_MENU_LINKS || 'https://telegra.ph/file/17c83719a1b40e02971e4.jpg',
    MODE: process.env.PUBLIC_MODE || "no",
    PM_PERMIT: process.env.PM_PERMIT || 'yes',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || '',
    CHATBOT : process.env.PM_CHATBOT || 'no',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    ANTIDELETE1 : process.env.ANTI_DELETE_MESSAGE || 'no',
    ANTICALL : process.env.ANTICALL || 'no',
                  AUTO_REACT_STATUS : process.env.AUTO_REACT_STATUS || 'yes',
                  AUTO_READ : process.env.AUTO_READ || 'yes',
                  CHATBOT : process.env.CHATBOT || "yes",
                  AUTO_BIO : process.env.AUTO_BIO || "yes",
                  AUTO_REACT : process.env.AUTO_REACT || "yes",
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway" : "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway",
   
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
