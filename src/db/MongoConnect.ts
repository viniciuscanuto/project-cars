import { Collection, MongoClient } from 'mongodb'

export const MongoConnect = {
  uri: null as string,
  client: null as MongoClient,

  async connect(uri: string): Promise<void> {
    this.client = await MongoClient.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
  },

  async disconnect(): Promise<void> {
    await this.client.close()
    this.client = null
  },

  async getCollection(name: string): Promise<Collection> {
    if (!this.client?.isConnected()) {
      await this.connect(this.uri)
    }
    return this.client.db().collection(name)
  }
}


// const { MongoClient } = require("mongodb");
// // Replace the uri string with your MongoDB deployment's connection string.
// const uri =
//   "mongodb+srv://<user>:<password>@<cluster-url>?writeConcern=majority";
// const client = new MongoClient(uri);
// async function run() {
//   try {
//     await client.connect();
//     const database = client.db("sample_mflix");
//     const collection = database.collection("movies");
//     // create a document to be inserted
//     const doc = { name: "Red", town: "kanto" };
//     const result = await collection.insertOne(doc);
//     console.log(
//       `${result.insertedCount} documents were inserted with the _id: ${result.insertedId}`,
//     );
//   } finally {
//     await client.close();
//   }
// }