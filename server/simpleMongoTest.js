const { MongoClient } = require('mongodb');

// Connection URI (with updated password)
const uri = "mongodb+srv://hareshswork:McPghY7ofQNf24Dz@vms.oqbam.mongodb.net/?retryWrites=true&w=majority";

console.log("Attempting to connect to MongoDB...");

// Create a new MongoClient
const client = new MongoClient(uri);

async function run() {
  try {
    // Connect the client to the server
    await client.connect();
    
    // Establish and verify connection
    await client.db("admin").command({ ping: 1 });
    console.log("✅ Connected successfully to MongoDB server!");
    
    // Create a test document
    const database = client.db("vms");
    const collection = database.collection("test");
    
    const testDoc = { message: "Test document", createdAt: new Date() };
    const result = await collection.insertOne(testDoc);
    
    console.log(`✅ Successfully inserted document with ID: ${result.insertedId}`);
    
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
    console.log("Connection closed");
  }
}

run().catch(console.error); 