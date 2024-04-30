const express = require("express");
const app = express();
var cors = require("cors");
const bodyParser = require("body-parser");
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Welcome to Maktabatul Amzad Server");
});

const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const uri =
  "mongodb+srv://amzad-admin:Raihan1234@cluster0.e4yec41.mongodb.net/?retryWrites=true&w=majority";

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
    const carts = database.collection("carts");
    const users = database.collection("users");
    const writers = database.collection("writers");
    const editors = database.collection("editors");
    const categories = database.collection("categories");
    const publishers = database.collection("publishers");
    const translators = database.collection("translators");
    const subcategories = database.collection("subcategories");
    const importedCountries = database.collection("importedCountries");

    // ----------------------------------------------------------Book Route----------------------------------------------------------
    app.get("/api/books", async (req, res) => {
      // const allBooks = await books.find().toArray();
      const allBooks = await database
        .collection("books")
        .aggregate([
          {
            $lookup: {
              from: "writers",
              localField: "writer",
              foreignField: "writerId",
              as: "writerDetails",
            },
          },
          {
            $lookup: {
              from: "translators",
              localField: "translator",
              foreignField: "translatorId",
              as: "translatorDetails",
            },
          },
          {
            $lookup: {
              from: "editors",
              localField: "editor",
              foreignField: "editorId",
              as: "editorDetails",
            },
          },
          {
            $lookup: {
              from: "publishers",
              localField: "publisher",
              foreignField: "publisherId",
              as: "publisherDetails",
            },
          },
          {
            $lookup: {
              from: "categories",
              localField: "category",
              foreignField: "categoryId",
              as: "categoryDetails",
            },
          },
          {
            $lookup: {
              from: "subcategories",
              localField: "subCategory",
              foreignField: "subCategoryId",
              as: "subCategoryDetails",
            },
          },
          {
            $lookup: {
              from: "importedCountries",
              localField: "importedCountry",
              foreignField: "countryId",
              as: "importedCountryDetails",
            },
          },
        ])
        .toArray();
      res.status(200).json(allBooks);
    });
    // ---------- Get book by id
    app.get("/api/books/:id", async (req, res) => {
      const allBooks = await database
        .collection("books")
        .aggregate([
          {
            $lookup: {
              from: "writers",
              localField: "writer",
              foreignField: "writerId",
              as: "writerDetails",
            },
          },
          {
            $lookup: {
              from: "translators",
              localField: "translator",
              foreignField: "translatorId",
              as: "translatorDetails",
            },
          },
          {
            $lookup: {
              from: "editors",
              localField: "editor",
              foreignField: "editorId",
              as: "editorDetails",
            },
          },
          {
            $lookup: {
              from: "publishers",
              localField: "publisher",
              foreignField: "publisherId",
              as: "publisherDetails",
            },
          },
          {
            $lookup: {
              from: "categories",
              localField: "category",
              foreignField: "categoryId",
              as: "categoryDetails",
            },
          },
          {
            $lookup: {
              from: "subcategories",
              localField: "subCategory",
              foreignField: "subCategoryId",
              as: "subCategoryDetails",
            },
          },
          {
            $lookup: {
              from: "importedCountries",
              localField: "importedCountry",
              foreignField: "countryId",
              as: "importedCountryDetails",
            },
          },
        ])
        .toArray();
      const book = allBooks.find((singleBook) => {
        let str = singleBook._id + "";
        return str === req.params.id;
      });
      res.send(book);
    });
    // ---------- Get book categoryId by push method
    app.post("/api/books/getcategory", async (req, res) => {
      const allBooks = await database
        .collection("books")
        .aggregate([
          {
            $lookup: {
              from: "writers",
              localField: "writer",
              foreignField: "writerId",
              as: "writerDetails",
            },
          },
        ])
        .toArray();
      const books = allBooks.filter(
        (book) => book.category === req.body.category
      );
      res.send(books);
    });
    // ---------- Get book subcategoryid by push method
    // app.post("/api/books/getcategory", async (req, res) => {
    //   const query = req.body;
    //   const getBooks = await books.find(query).toArray();
    //   res.status(200).json(getBooks);
    // });

    // ---------- Add Book
    app.post("/api/addbook", async (req, res) => {
      const book = await books.insertOne(req.body);
      res.send(book);
    });
    // ---------- Edit Book
    app.patch("/api/editbook/:id", async (req, res) => {
      const bookId = req.params.id;
      const {
        thumb,
        title,
        category,
        subCategory,
        writer,
        translator,
        editor,
        publisher,
        importedCountry,
        price,
        pages,
        stock,
        desc,
        status,
        sold,
      } = req.body;
      const query = { _id: new ObjectId(bookId) };
      const options = { upsert: true };
      const updateDoc = {
        $set: {
          thumb,
          title,
          category,
          subCategory,
          writer,
          translator,
          editor,
          publisher,
          importedCountry,
          price,
          pages,
          stock,
          desc,
          status,
          sold,
        },
      };
      const result = await books.updateOne(query, updateDoc, options);
      res.send(result);
    });
    // ---------- Delete Book
    app.delete("/api/deletebook/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const deleteBook = await books.deleteOne(query);
      res.send(deleteBook);
    });

    // ----------------------------------------------------------Writer Route----------------------------------------------------------
    app.get("/api/writers", async (req, res) => {
      const allWriters = await writers.find().toArray();
      res.status(200).json(allWriters);
    });
    // ---------- Get writer by writerId
    app.get("/api/writers/:writerId", async (req, res) => {
      const writer = await writers.findOne({ writerId: req.params.writerId });
      res.status(200).json(writer);
    });
    // ---------- Get writer by post method
    app.post("/api/writers/getwriters", async (req, res) => {
      const writerIds = req.body;
      const query = { writerId: { $in: writerIds } };
      const writer = await writers.find(query).toArray();
      res.status(200).json(writer);
    });
    // ---------- Add Writer
    app.post("/api/addwriter", async (req, res) => {
      const writer = await writers.insertOne(req.body);
      res.send(writer);
    });
    // ---------- Edit Writer
    app.patch("/api/editwriter/:writerId", async (req, res) => {
      const writerId = req.params.writerId;
      const { name, desc, image } = req.body;
      const query = { writerId: writerId };
      const options = { upsert: true };
      const updateDoc = {
        $set: { name, desc, image },
      };
      const result = await writers.updateOne(query, updateDoc, options);
      res.send(result);
    });
    // ---------- Delete Writer
    app.delete("/api/deletewriter/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const deleteWriter = await writers.deleteOne(query);
      res.send(deleteWriter);
    });
    // ----------------------------------------------------------Editor Route----------------------------------------------------------
    app.get("/api/editors", async (req, res) => {
      const allEditors = await editors.find().toArray();
      res.status(200).json(allEditors);
    });
    // ---------- Get Editor by editorId
    app.get("/api/editors/:editorId", async (req, res) => {
      const editor = await editors.findOne({ editorId: req.params.editorId });
      res.send(editor);
    });
    // ---------- Add Editor
    app.post("/api/addeditor", async (req, res) => {
      const editor = await editors.insertOne(req.body);
      res.send(editor);
    });
    // ---------- Edit Editor
    app.patch("/api/editeditor/:editorId", async (req, res) => {
      const editorId = req.params.editorId;
      const query = { editorId: editorId };
      const options = { upsert: true };
      const updateDoc = {
        $set: {
          name: req.body.name,
        },
      };
      const result = await editors.updateOne(query, updateDoc, options);
      res.send(result);
    });
    // ---------- Delete Editor
    app.delete("/api/deleteeditor/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const deleteEditor = await editors.deleteOne(query);
      res.send(deleteEditor);
    });
    // ----------------------------------------------------------Translator Route----------------------------------------------------------
    app.get("/api/translators", async (req, res) => {
      const allTranslators = await translators.find().toArray();
      res.send(allTranslators);
    });
    // ---------- Get Translator by translatorId
    app.get("/api/translators/:translatorId", async (req, res) => {
      const translator = await translators.findOne({
        translatorId: req.params.translatorId,
      });
      res.send(translator);
    });
    // ---------- Add Translator
    app.post("/api/addtranslator", async (req, res) => {
      const translator = await translators.insertOne(req.body);
      res.send(translator);
    });
    // ---------- Edit Translator
    app.patch("/api/edittranslator/:translatorId", async (req, res) => {
      const translatorId = req.params.translatorId;
      const query = { translatorId: translatorId };
      const options = { upsert: true };
      const updateDoc = {
        $set: {
          name: req.body.name,
        },
      };
      const result = await translators.updateOne(query, updateDoc, options);
      res.send(result);
    });
    // ---------- Delete Editor
    app.delete("/api/deletetranslator/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const deletetranslator = await translators.deleteOne(query);
      res.send(deletetranslator);
    });
    // ----------------------------------------------------------Publisher Route----------------------------------------------------------
    app.get("/api/publishers", async (req, res) => {
      const allPublishers = await publishers.find().toArray();
      res.status(200).json(allPublishers);
    });
    // ---------- Get publisher by id
    app.get("/api/publishers/:id", async (req, res) => {
      console.log(req.params.id);
      const query = { publisherId: req.params.id };
      const publisher = await publishers.findOne(query);
      res.send(publisher);
    });
    // ---------- Get publisher by post method
    app.post("/api/publishers/getpublisher", async (req, res) => {
      const queryArray = req.body;
      const query = {};
      queryArray.forEach((item) => {
        const [field, value] = item.split(":");
        query[field] = value;
      });
      const publisher = await publishers.find(query).toArray();
      res.status(200).json(publisher);
    });
    // ---------- Add Publisher
    app.post("/api/addpublisher", async (req, res) => {
      const publisher = await publishers.insertOne(req.body);
      res.send(publisher);
    });
    // ---------- Edit Publisher
    app.patch("/api/editimportedcountry/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const options = { upsert: true };
      const updateDoc = {
        $set: {
          name: req.body.name,
        },
      };
      const result = await publishers.updateOne(query, updateDoc, options);
      res.send(result);
    });
    // ---------- Delete Publisher
    app.delete("/api/deletepublisher/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const deletePublisher = await publishers.deleteOne(query);
      res.send(deletePublisher);
    });
    // -
    // ----------------------------------------------------------Category Route----------------------------------------------------------
    app.get("/api/categories", async (req, res) => {
      const allCategories = await categories.find().toArray();
      res.status(200).json(allCategories);
    });
    // ---------- Get category by post method
    app.post("/api/categories/getcategory", async (req, res) => {
      const query = req.body;
      const category = await categories.find(query).toArray();
      res.status(200).json(category);
    });
    // ---------- Get category by categoryId
    app.get("/api/categories/:categoryId", async (req, res) => {
      const category = await categories.findOne({
        categoryId: req.params.categoryId,
      });
      res.send(category);
    });

    // ---------- Add category
    app.post("/api/addsubject", async (req, res) => {
      const category = await categories.insertOne(req.body);
      res.send(category);
    });
    // ---------- Delete Category
    app.delete("/api/deletecategory/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const deleteCategory = await categories.deleteOne(query);
      res.send(deleteCategory);
    });
    // ---------- Edit Category
    app.patch("/api/editcategory/:categoryid", async (req, res) => {
      const categoryid = req.params.categoryid;
      const query = { categoryId: categoryid };
      const options = { upsert: true };
      const updateDoc = {
        $set: {
          name: req.body.name,
        },
      };
      const result = await categories.updateOne(query, updateDoc, options);
      res.send(result);
    });

    // ----------------------------------------------------------Sub Category Route----------------------------------------------------------
    app.get("/api/subcategories", async (req, res) => {
      const allSubCategories = await database
        .collection("subcategories")
        .aggregate([
          {
            $lookup: {
              from: "categories",
              localField: "mainCategory",
              foreignField: "categoryId",
              as: "mainCategoryDetails",
            },
          },
        ])
        .toArray();
      res.send(allSubCategories);
    });
    // ---------- Get subcategory by post method
    app.post("/api/subcategories/getsubCategory", async (req, res) => {
      const query = req.body;
      const subCategory = await subcategories.find(query).toArray();
      res.send(subCategory);
    });
    // ---------- Get sub category by subCategoryId
    app.get("/api/subcategories/:subCategoryId", async (req, res) => {
      const subCategory = await subcategories.findOne({
        subCategoryId: req.params.subCategoryId,
      });
      res.status(200).json(subCategory);
    });
    // ---------- Add Subcategory
    app.post("/api/addsubsubject", async (req, res) => {
      const subcategory = await subcategories.insertOne(req.body);
      res.send(subcategory);
    });
    // ---------- Delete SubCategory
    app.delete("/api/deletesubcategory/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const deleteSubCategory = await subcategories.deleteOne(query);
      res.send(deleteSubCategory);
    });
    // ---------- Edit Subcategory
    app.patch("/api/editsubcategory/:subcategoryid", async (req, res) => {
      const subCategoryId = req.params.subcategoryid;
      const { name, mainCategory } = req.body;
      const query = { subCategoryId: subCategoryId };
      const options = { upsert: true };
      const updateDoc = {
        $set: {
          name,
          mainCategory,
        },
      };
      const result = await subcategories.updateOne(query, updateDoc, options);
      res.send(result);
    });
    // ----------------------------------------------------------Imported Country Route----------------------------------------------------------
    app.get("/api/importedcountry", async (req, res) => {
      const result = await importedCountries.find().toArray();
      res.send(result);
    });
    app.get("/api/importedcountry/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await importedCountries.findOne(query);
      res.send(result);
    });
    app.post("/api/addimportedcountry", async (req, res) => {
      const result = await importedCountries.insertOne(req.body);
      res.send(result);
    });
    app.patch("/api/editimportedcountry/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const options = { upsert: true };
      const updateDoc = {
        $set: {
          name: req.body.name,
        },
      };
      const result = await importedCountries.updateOne(
        query,
        updateDoc,
        options
      );
      res.send(result);
    });
    app.delete("/api/deleteimportedcountry/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await importedCountries.deleteOne(query);
      res.send(result);
    });
    // ----------------------------------------------------------Order Route----------------------------------------------------------
    app.post("/api/addcart", async (req, res) => {
      const cart = req.body;
      cart.timestamp = new Date();
      const result = await carts.insertOne(cart);
      res.send(result);
    });
    // Get orders list
    app.get("/api/orders", async (req, res) => {
      const allOrders = await carts.find().toArray();
      res.send(allOrders);
    });
    // Update order status
    app.patch("/api/orders/:orderid", async (req, res) => {
      const orderId = req.params.orderid;
      const query = { _id: new ObjectId(orderId) };
      const updateDoc = {
        $set: {
          status: req.body.editedStatus,
        },
      };
      const result = await carts.updateOne(query, updateDoc);
      res.send(result);
    });
    // Delete Order
    app.delete("/api/orders/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await carts.deleteOne(query);
      res.send(result);
    });

    // ----------------------------------------------------------User Route----------------------------------------------------------
    // Create User --------------
    app.post("/api/users", async (req, res) => {
      const user = req.body;

      const query = { email: user.email };
      const existUser = await users.findOne(query);

      if (existUser) {
        return res.send("User Already Exist");
      }

      const result = await users.insertOne(user);
      res.send(result);
    });
    // Get Single user by email -------------
    app.get("/api/users", async (req, res) => {
      const email = req.query.email;
      if (email) {
        const singleUser = await users.findOne({ email: email });
        return res.send(singleUser);
      }
    });

    // Update user ----------------------------
    app.patch("/api/users/:id", async (req, res) => {
      const id = req.params.id;
      const { name, address, phone } = req.body;
      const filter = { _id: new ObjectId(id) };
      const options = { upsert: true };
      const updateDoc = {
        $set: {
          name: name,
          address: address,
          phone: phone,
        },
      };
      const result = await users.updateOne(filter, updateDoc, options);
      res.send(result);
    });

    // Connect the client to the server	(optional starting in v4.7)
    // await client.connect();
    // Send a ping to confirm a successful connection
    // await client.db("admin").command({ ping: 1 });
    // console.log("Database Connected");
  } finally {
  }
}
run().catch(console.dir);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
