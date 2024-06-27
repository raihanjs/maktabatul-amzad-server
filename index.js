const express = require("express");
var cors = require("cors");
require("dotenv").config();
const app = express();
const port = process.env.PORT || 5000;

// --------------------------------Middlewares--------------------------------
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Welcome to Maktabatul Amzad Server");
});

const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.bhifpq3.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    const database = client.db("maktabatul-amzad");
    const books = database.collection("books");

    // -------------------------------Books Route-------------------------------
    // get all books
    app.get("/books", async (req, res) => {
      const result = await books.find().toArray();
      res.send(result);
    });
    // get single book by id
    app.get("/books/:id", async (req, res) => {
      const query = { _id: new ObjectId(req.params.id) };
      const result = await books.findOne(query);
      res.send(result);
    });
    // add a book
    app.post("/books", async (req, res) => {
      const result = await books.insertOne(req.body);
      res.send(result);
    });
    // edit book
    app.patch("/books/:id", async (req, res) => {
      const query = { _id: new ObjectId(req.params.id) };
      delete req.body._id;
      const result = await books.updateOne(query, { $set: req.body });
      res.send(result);
    });
    // delete book
    app.delete("/books/:id", async (req, res) => {
      const query = { _id: new ObjectId(id) };
      const result = await books.deleteOne(query);
      res.send(result);
    });
  } finally {
  }
}
run().catch(console.dir);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
