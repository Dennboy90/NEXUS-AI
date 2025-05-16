




const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiVUl3NUFUV1VSalF5Rk9UUTA4RUVjTWtMVFl0WW5BeG5QN0hWb1FRZ0NXND0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiYXZtcjhGVm1tOHBPQU4xemtNNnZvRkJFZHRDZ3Y5MWFQN2VvcGg1alhTZz0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJNUEtseE1hMVhOa0prWGw0b0EvRmpBcWxDb0RsSDRqTkVEbEl0WHgxRDJBPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiIyRmtHeFE0c0JFWDNqRDNkVEZUaEMrL2xnQ3M5NzRHR2pmcUdhRithVmd3PSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InVNeUg5TnZXakRPNUkzOTk1aFd2MXdlVzFXR1FrWXN5SmthbVpENXlnRTQ9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IklGd3RRNFVseUU5SlV1NkptMjFnVkt2cldqTUxKbjU3aXdTVkY0cUczQXM9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoieUpNRFdIZERLc1V2YStPUTJNeUlzWWVtL2dVazZwd2g2V2lJNFZQVCtFRT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoib1R2YS93cDAzd1BheWhkS21BT20wRklVRGg0WHc3bzQ4bDdvOXl0SnNDND0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IlF1TlAxcVZxYzN4NzNlZHF3S0J0ZU14b1RsMVd0Rk90clIwVGJjdFhJVjUzTTBDR05sUnBObmdxM25lMGYzM2tkL3ZTSDlaY2ltKzdVRTBodnc4bGlBPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MjExLCJhZHZTZWNyZXRLZXkiOiJZQ1MxM2JQRlJBdGE4VHJDTXBjMUFpeE5SRS9mY2xCL3lUTnNvVTQyUmFNPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W10sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjowLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwicmVnaXN0ZXJlZCI6ZmFsc2UsImFjY291bnQiOnsiZGV0YWlscyI6IkNMVEVpTWNFRU5hRm5jRUdHQUVnQUNnQSIsImFjY291bnRTaWduYXR1cmVLZXkiOiJaaUdrZWxVRFhuQUQwZ1NyWmdkRCtxSHpHeWYxbXZqOXFPeHpuU2dVbDFRPSIsImFjY291bnRTaWduYXR1cmUiOiJBOU1ZSmxRMW9CZUtVaVlGY1R1MVVlUFh6LzR3ZlJPY09LOU5wTUEveGhQNXFBMWRKaHNxbHl1ZjVQRG5rWm4zMTZZNzJKbzg3LzVwbkhuN0xmZW5CUT09IiwiZGV2aWNlU2lnbmF0dXJlIjoiQjBBcy9RSHNscDFjejN5UXB1Y1dKaUhOR2U1eU1ENEVoS2NlMlI2MnJsZitWR3BPdkV3aGZSamRGTE14MFprRTFFOG1MbHNOMDcwNU9jNmpmcVZTZ1E9PSJ9LCJtZSI6eyJpZCI6IjI2Mzc4NzE4MjY2ODoxQHMud2hhdHNhcHAubmV0IiwibGlkIjoiNTA0MTkxMjQ0MzI5NDI6MUBsaWQiLCJuYW1lIjoiQHRkeWxhbjA3In0sInNpZ25hbElkZW50aXRpZXMiOlt7ImlkZW50aWZpZXIiOnsibmFtZSI6IjI2Mzc4NzE4MjY2ODoxQHMud2hhdHNhcHAubmV0IiwiZGV2aWNlSWQiOjB9LCJpZGVudGlmaWVyS2V5Ijp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQldZaHBIcFZBMTV3QTlJRXEyWUhRL3FoOHhzbjlacjQvYWpzYzUwb0ZKZFUifX1dLCJwbGF0Zm9ybSI6ImFuZHJvaWQiLCJyb3V0aW5nSW5mbyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkNBMElFZz09In0sImxhc3RBY2NvdW50U3luY1RpbWVzdGFtcCI6MTc0NzQwMzQ5MSwibGFzdFByb3BIYXNoIjoiMkc0QW11IiwibXlBcHBTdGF0ZUtleUlkIjoiQUFBQUFMQkMifQ==',
    PREFIXE: process.env.PREFIX || ".",
    OWNER_NAME: process.env.OWNER_NAME || "TADEXX",
    NUMERO_OWNER : process.env.NUMERO_OWNER || "263787182668",              
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
                  AUTO_READ : process.env.AUTO_READ || 'no',
                  CHATBOT : process.env.CHATBOT || "no",
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
