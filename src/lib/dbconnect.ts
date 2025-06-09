// lib/mongodb.js
import { Db, MongoClient, ServerApiVersion } from 'mongodb';

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.zovp9.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

let db: Db | null = null;

export async function connectToDB(collectionName:string) {
  if (!db) {
    await client.connect();
    db = client.db(process.env.MONGODB_DB); 
    console.log("✅ Connected to MongoDB");
  }

  return db.collection(collectionName);
}
