"use strict";

const MongoClient = require("mongodb").MongoClient;

let recipes = [
  {
    name: "Shepherd's Pie",
    yield: 2,
    ingredients: [
      {food: "oil", quantity: "2 tsp"},
      {food: "beef", quantity: "1 cut"},
      {food: "potato", quantity: "3"}, 
      {food: "salt", quantity: null}    
    ],
    directions: "Step 1: Cook beef. Step 2: Fry potatoes. Step 3: Salt as desired.",
  },

  {
    name: "Steak Tacos",
    yield: 1,
    ingredients: [
      {food: "taco shell", quantity: "1"},
      {food: "lettuce", quantity: "1/2"},
      {food: "beef", quantity: "handful"},
      {food: "potato", quantity: "1"}    
    ],
    directions: "Step 1: Put fillings in taco shell.",
  },
];

let dbUsername = REDACTEDUSER;
let dbPassword = REDACTED;
let dbUrl = `mongodb://${dbUsername}:${dbPassword}@cs3.calstatela.edu:4042/${dbUsername}`;

async function run() {
  let client = await MongoClient.connect(dbUrl, { useUnifiedTopology: true });
  let db = client.db("cs5220stu14");
  let collection = await db.collection("recipes");
  await collection.insertMany(recipes);
  await client.close();
}

run();
