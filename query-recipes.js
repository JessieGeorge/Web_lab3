"use strict";

const MongoClient = require("mongodb").MongoClient;

let dbUsername = REDACTEDUSER;
let dbPassword = REDACTED;
let dbUrl = `mongodb://${dbUsername}:${dbPassword}@cs3.calstatela.edu:4042/${dbUsername}`;

async function run() {
  let client = await MongoClient.connect(dbUrl, { useUnifiedTopology: true });
  let db = client.db("cs5220stu14");
  let collection = await db.collection("recipes");

  console.log("QUERY: Recipes that use the ingredients beef and potato.");
  const result1 = await collection.find({
      'ingredients.food': {
          $all: ['beef', 'potato']
        }
    }).project({name: true}).toArray();
  console.log(result1);

  console.log("\nQUERY: Recipes whose names include the word Steak");
  const result2 = await collection.find({
      $text: { $search: "Steak" }
    }).project({name: true}).toArray();
  console.log(result2);

  await client.close();
}

run();
