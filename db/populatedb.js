const { Client } = require("pg")
const {createTable: SQL, populate} = require('./createTables')
require('dotenv').config()

// console.log(SQL)

async function main() {
    console.log("seeding...");
    const client = new Client({
        connectionString: process.env.DEV_DB_URL,
    });
    await client.connect();
    await client.query(SQL);
    await client.query(populate);
    await client.end();
    console.log("done");
}

main();