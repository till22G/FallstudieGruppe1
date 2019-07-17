const uuid = require('uuid/v4');

process.env.DB_HOST = "db4free.net";
process.env.DB_USER = "alexander92";
process.env.DB_PASSWORD = "esistsoschön";
process.env.DB_DATABASE = "fallstudieindepa";
process.env.DB_INDEPAYACCOUNT = 1;
process.env.SECRET_KEY = uuid();
process.env.FEE_PERCENTAGE = 0.02;
process.env.MINIMAL_AMOUNT = 0.5;
