"use strict";

const MongoClient = require("mongodb").MongoClient;

let dbUsername = REDACTEDUSER;
let dbPassword = REDACTED;
let dbUrl = `mongodb://${dbUsername}:${dbPassword}@cs3.calstatela.edu:4042/${dbUsername}`;

async function run() {
  let client = await MongoClient.connect(dbUrl, { useUnifiedTopology: true });
  let db = client.db("cs5220stu14");
  let collection = await db.collection("recipes");

  // index to do text search on recipe name
  await collection.createIndex({name: "text"});

  await client.close();
}

run();
