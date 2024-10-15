const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiS0J0emRiZnVtWGZocGlEVUhva2ZTOTNVU3RhbUQrYkhoN3kzN1k3S29VOD0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiaVpqUGtNZ0F2aXlTUFFFOTJmaVRTQ2ZkUENhNTdrMXBFOFl2TVNLYTFYQT0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiI2UEtLb1h5enFPREdIUThxS1VUd2J2blFWR3VNcWRNM01yQkJkeWxUYlhjPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJ5VE9ZWmdaZjJJczlraXl2aEJ4dDRpTXNFQXdCcGQxRFlHMlkvSHpwREdVPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IlVENmlIaVRTWjk0ZlFkbWlaS01KendjZldBZ0pHMkVUOGo4Qlh3Zm5BRVU9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkxJN2RDNmI0YzMwL3JFUlBFOWFtUmRnQ3hzVjVJOThQZC91NTBIanZiazg9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiR0NXODJ5MEVlazZ5RE16VkRUUnpVT0FDbEpTQ09MTVBDUDRQVVR4S1cyND0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiNWtVdmd3dGkwVFBnRXdWU3hBai9FeHcvZzVZanpmVlNGcFRBbW1xb09CTT0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Ii9TcmZzcGM1NUQyZ1VYNHBSKy9xbTBwRGNFMUtFMklWZDRaVkdyVmJ5WGt0YzdlNkpwSWVRMW5YSEhNSnl0Ymg2a2V6V2JIQzVmK3NQOC9VTndORUFnPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTYxLCJhZHZTZWNyZXRLZXkiOiIxdUZyMXFmZ05IMDF6elhwbDNPTzJzbnBWdGpVeWxMaElWSnRpR2VpckdNPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W10sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjowLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwiZGV2aWNlSWQiOiJZNnVzVkJES1JvSzE5NVU3S2ZzX0FBIiwicGhvbmVJZCI6IjZhMzczMzNlLWEzZjQtNGJmOC05MjM5LTFjYzM0OTRhNGU3MSIsImlkZW50aXR5SWQiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJvWU9rL21nMnZ0NUd3cHl2VmZpYVJuVlk1ZEU9In0sInJlZ2lzdGVyZWQiOnRydWUsImJhY2t1cFRva2VuIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiVWUwT2xEWHFJM1UybXh2T3IrU3prWTVzZ3NJPSJ9LCJyZWdpc3RyYXRpb24iOnt9LCJwYWlyaW5nQ29kZSI6Ik03TUIyTFZHIiwibWUiOnsiaWQiOiIyNTQxMTE4Njk2Nzk6MTBAcy53aGF0c2FwcC5uZXQifSwiYWNjb3VudCI6eyJkZXRhaWxzIjoiQ01IeXZ1UUdFUGJsdXJnR0dBTWdBQ2dBIiwiYWNjb3VudFNpZ25hdHVyZUtleSI6ImJjTU04b2VsYTNkZ1gxN3ZPeDZIM3h4NTAxem90UDIxUGtFRHZaRnV1amM9IiwiYWNjb3VudFNpZ25hdHVyZSI6Ii83cUhmY1VGdXZEYWxVMFJ0RjhzVnBxUmppdUtkSHZWQWN4aGpmTmRWVitTeG40cG9IL3NXWFpuSUw2WTJJcFNCUzE2bTZEZ21qalJERWxPbXMzd0NnPT0iLCJkZXZpY2VTaWduYXR1cmUiOiJVaUJFY2J1VmlqSXFLblZGREo4cTJKNm42cnhsU1NDa0RCajRCcXZBSzhsSFF4cWh6MWdrOXp6d29iRDBEb2FKNmlOVi9waUZtRDRLYThudXVMQzNEZz09In0sInNpZ25hbElkZW50aXRpZXMiOlt7ImlkZW50aWZpZXIiOnsibmFtZSI6IjI1NDExMTg2OTY3OToxMEBzLndoYXRzYXBwLm5ldCIsImRldmljZUlkIjowfSwiaWRlbnRpZmllcktleSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkJXM0REUEtIcFd0M1lGOWU3enNlaDk4Y2VkTmM2TFQ5dFQ1QkE3MlJicm8zIn19XSwicGxhdGZvcm0iOiJhbmRyb2lkIiwibGFzdEFjY291bnRTeW5jVGltZXN0YW1wIjoxNzI5MDE2NTc5LCJteUFwcFN0YXRlS2V5SWQiOiJBQUFBQUxSTSJ9',
    PREFIXE: process.env.PREFIX || ".",
    OWNER_NAME: process.env.OWNER_NAME || "ex black comando",
    NUMERO_OWNER : process.env.NUMERO_OWNER || "254111869679",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "non",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'non',
    BOT : process.env.BOT_NAME || 'BONIPHACE MD',
    URL : process.env.BOT_MENU_LINKS || 'https://telegra.ph/file/5462ea7070b61eb790caa.jpg',
    MODE: process.env.PUBLIC_MODE || "no",
    PM_PERMIT: process.env.PM_PERMIT || 'no',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || '',
    CHATBOT : process.env.PM_CHATBOT || 'no',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    ADM : process.env.ANTI_DELETE_MESSAGE || 'yes',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9" : "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9",
    /* new Sequelize({
     dialect: 'sqlite',
     storage: DATABASE_URL,
     logging: false,
})
: new Sequelize(DATABASE_URL, {
     dialect: 'postgres',
     ssl: true,
     protocol: 'postgres',
     dialectOptions: {
         native: true,
         ssl: { require: true, rejectUnauthorized: false },
     },
     logging: false,
}),*/
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
