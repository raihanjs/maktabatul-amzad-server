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
    const writers = database.collection("writers");
    const editors = database.collection("editors");
    const translators = database.collection("translators");
    const publishers = database.collection("publishers");

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
    // -------------------------------Writers Route-------------------------------
    // get all writers
    app.get("/writers", async (req, res) => {
      const result = await writers.find().toArray();
      res.send(result);
    });
    // get single writers by id
    app.get("/writers/:id", async (req, res) => {
      const query = { _id: new ObjectId(req.params.id) };
      const result = await writers.findOne(query);
      res.send(result);
    });
    // add a writers
    app.post("/writers", async (req, res) => {
      const result = await writers.insertOne(req.body);
      res.send(result);
    });
    // edit writers
    app.patch("/writers/:id", async (req, res) => {
      const query = { _id: new ObjectId(req.params.id) };
      delete req.body._id;
      const result = await writers.updateOne(query, { $set: req.body });
      res.send(result);
    });
    // delete writers
    app.delete("/writers/:id", async (req, res) => {
      const query = { _id: new ObjectId(id) };
      const result = await writers.deleteOne(query);
      res.send(result);
    });
    // -------------------------------Editors Route-------------------------------
    // get all editors
    app.get("/editors", async (req, res) => {
      const result = await editors.find().toArray();
      res.send(result);
    });
    // get single editors by id
    app.get("/editors/:id", async (req, res) => {
      const query = { _id: new ObjectId(req.params.id) };
      const result = await editors.findOne(query);
      res.send(result);
    });
    // add a editors
    app.post("/editors", async (req, res) => {
      const result = await editors.insertOne(req.body);
      res.send(result);
    });
    // edit editors
    app.patch("/editors/:id", async (req, res) => {
      const query = { _id: new ObjectId(req.params.id) };
      delete req.body._id;
      const result = await editors.updateOne(query, { $set: req.body });
      res.send(result);
    });
    // delete editors
    app.delete("/editors/:id", async (req, res) => {
      const query = { _id: new ObjectId(id) };
      const result = await editors.deleteOne(query);
      res.send(result);
    });
    // -------------------------------Translators Route-------------------------------
    // get all translators
    app.get("/translators", async (req, res) => {
      const result = await translators.find().toArray();
      res.send(result);
    });
    // get single translators by id
    app.get("/translators/:id", async (req, res) => {
      const query = { _id: new ObjectId(req.params.id) };
      const result = await translators.findOne(query);
      res.send(result);
    });
    // add a translators
    app.post("/translators", async (req, res) => {
      const result = await translators.insertOne(req.body);
      res.send(result);
    });
    // edit translators
    app.patch("/translators/:id", async (req, res) => {
      const query = { _id: new ObjectId(req.params.id) };
      delete req.body._id;
      const result = await translators.updateOne(query, { $set: req.body });
      res.send(result);
    });
    // delete translators
    app.delete("/translators/:id", async (req, res) => {
      const query = { _id: new ObjectId(id) };
      const result = await translators.deleteOne(query);
      res.send(result);
    });
    // -------------------------------Publishers Route-------------------------------
    // get all publishers
    app.get("/publishers", async (req, res) => {
      const result = await publishers.find().toArray();
      res.send(result);
    });
    // get single publishers by id
    app.get("/publishers/:id", async (req, res) => {
      const query = { _id: new ObjectId(req.params.id) };
      const result = await publishers.findOne(query);
      res.send(result);
    });
    // add a publishers
    app.post("/publishers", async (req, res) => {
      const result = await publishers.insertOne(req.body);
      res.send(result);
    });
    // edit publishers
    app.patch("/publishers/:id", async (req, res) => {
      const query = { _id: new ObjectId(req.params.id) };
      delete req.body._id;
      const result = await publishers.updateOne(query, { $set: req.body });
      res.send(result);
    });
    // delete publishers
    app.delete("/publishers/:id", async (req, res) => {
      const query = { _id: new ObjectId(id) };
      const result = await publishers.deleteOne(query);
      res.send(result);
    });
  } finally {
  }
}
run().catch(console.dir);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
