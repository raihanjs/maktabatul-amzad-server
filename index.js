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

    const users = database.collection("users");
    const orders = database.collection("users");

    const banners = database.collection("banners");

    const books = database.collection("books");

    const writers = database.collection("writers");
    const editors = database.collection("editors");
    const translators = database.collection("translators");

    const publishers = database.collection("publishers");
    const importers = database.collection("importers");

    const categories = database.collection("categories");
    const subCategories = database.collection("subCategories");

    // -------------------------------Banners Route-------------------------------
    // get all banners
    app.get("/banners", async (req, res) => {
      const result = await banners.find().toArray();
      res.send(result);
    });
    // get single banner by id
    app.get("/banners/:id", async (req, res) => {
      const query = { _id: new ObjectId(req.params.id) };
      const result = await banners.findOne(query);
      res.send(result);
    });
    // add a banner
    app.post("/banners", async (req, res) => {
      const result = await banners.insertOne(req.body);
      res.send(result);
    });
    // edit banner
    app.patch("/banners/:id", async (req, res) => {
      const query = { _id: new ObjectId(req.params.id) };
      delete req.body._id;
      const result = await banners.updateOne(query, { $set: req.body });
      res.send(result);
    });
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
    // -------------------------------Importers Route-------------------------------
    // get all importers
    app.get("/importers", async (req, res) => {
      const result = await importers.find().toArray();
      res.send(result);
    });
    // get single importers by id
    app.get("/importers/:id", async (req, res) => {
      const query = { _id: new ObjectId(req.params.id) };
      const result = await importers.findOne(query);
      res.send(result);
    });
    // add a importers
    app.post("/importers", async (req, res) => {
      const result = await importers.insertOne(req.body);
      res.send(result);
    });
    // edit importers
    app.patch("/importers/:id", async (req, res) => {
      const query = { _id: new ObjectId(req.params.id) };
      delete req.body._id;
      const result = await importers.updateOne(query, { $set: req.body });
      res.send(result);
    });
    // delete publishers
    app.delete("/publishers/:id", async (req, res) => {
      const query = { _id: new ObjectId(id) };
      const result = await publishers.deleteOne(query);
      res.send(result);
    });
    // -------------------------------Categories Route-------------------------------
    // get all categories
    app.get("/categories", async (req, res) => {
      const result = await categories.find().toArray();
      res.send(result);
    });
    // get single categories by id
    app.get("/categories/:id", async (req, res) => {
      const query = { _id: new ObjectId(req.params.id) };
      const result = await categories.findOne(query);
      res.send(result);
    });
    // add a categories
    app.post("/categories", async (req, res) => {
      const result = await categories.insertOne(req.body);
      res.send(result);
    });
    // edit categories
    app.patch("/categories/:id", async (req, res) => {
      const query = { _id: new ObjectId(req.params.id) };
      delete req.body._id;
      const result = await categories.updateOne(query, { $set: req.body });
      res.send(result);
    });
    // delete categories
    app.delete("/categories/:id", async (req, res) => {
      const query = { _id: new ObjectId(id) };
      const result = await categories.deleteOne(query);
      res.send(result);
    });
    // -------------------------------Sub Categories Route-------------------------------
    // get all sub categories
    app.get("/subcategories", async (req, res) => {
      const result = await subCategories.find().toArray();
      res.send(result);
    });
    // get single sub categories by id
    app.get("/subcategories/:id", async (req, res) => {
      const query = { _id: new ObjectId(req.params.id) };
      const result = await subCategories.findOne(query);
      res.send(result);
    });
    // add a sub categories
    app.post("/subcategories", async (req, res) => {
      const result = await subCategories.insertOne(req.body);
      res.send(result);
    });
    // edit sub categories
    app.patch("/subcategories/:id", async (req, res) => {
      const query = { _id: new ObjectId(req.params.id) };
      delete req.body._id;
      const result = await subCategories.updateOne(query, { $set: req.body });
      res.send(result);
    });
    // delete sub categories
    app.delete("/subcategories/:id", async (req, res) => {
      const query = { _id: new ObjectId(id) };
      const result = await subCategories.deleteOne(query);
      res.send(result);
    });
    // -------------------------------Users Route-------------------------------
    // get all Users
    app.get("/users", async (req, res) => {
      const result = await users.find().toArray();
      res.send(result);
    });
    // get single Users by id
    app.get("/users/:id", async (req, res) => {
      const query = { _id: new ObjectId(req.params.id) };
      const result = await users.findOne(query);
      res.send(result);
    });
    // add a Users
    app.post("/users", async (req, res) => {
      const result = await users.insertOne(req.body);
      res.send(result);
    });
    // edit Users
    app.patch("/users/:id", async (req, res) => {
      const query = { _id: new ObjectId(req.params.id) };
      delete req.body._id;
      const result = await users.updateOne(query, { $set: req.body });
      res.send(result);
    });
    // delete Users
    app.delete("/users/:id", async (req, res) => {
      const query = { _id: new ObjectId(id) };
      const result = await users.deleteOne(query);
      res.send(result);
    });
    // -------------------------------Orders Route-------------------------------
    // get all orders
    app.get("/orders", async (req, res) => {
      const result = await orders.find().toArray();
      res.send(result);
    });
    // get single orders by id
    app.get("/orders/:id", async (req, res) => {
      const query = { _id: new ObjectId(req.params.id) };
      const result = await orders.findOne(query);
      res.send(result);
    });
    // add a orders
    app.post("/orders", async (req, res) => {
      const result = await orders.insertOne(req.body);
      res.send(result);
    });
    // edit orders
    app.patch("/orders/:id", async (req, res) => {
      const query = { _id: new ObjectId(req.params.id) };
      delete req.body._id;
      const result = await orders.updateOne(query, { $set: req.body });
      res.send(result);
    });
    // delete orders
    app.delete("/orders/:id", async (req, res) => {
      const query = { _id: new ObjectId(id) };
      const result = await orders.deleteOne(query);
      res.send(result);
    });
  } finally {
  }
}
run().catch(console.dir);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
