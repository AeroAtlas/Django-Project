const express = require('express');
const mongodb = require('mongodb');
const router = express.Router();
const MongoClient = require('mongodb').MongoClient;

// const client = new MongoClient(uri, { useNewUrlParser: true });
// client.connect(err => {
//   const collection = client.db("test").collection("devices");
//   // perform actions on the collection object
//   client.close();
// });

const uri = `mongodb+srv://${process.env.USERNAME}:${process.env.PASSWORD}@cluster0.lk4gs.mongodb.net/${process.env.DB}?retryWrites=true&w=majority`;
//Get Posts
router.get('/', async (req, res) => {
  const posts = await loadPostsCollection();
  res.send(await posts.find({}).toArray());
})

//Add Post
router.post('/', async (req, res) => {
  const posts = await loadPostsCollection();
  await posts.insertOne({
    text: req.body.text,
    createdAt: new Date()
  });
  res.status(201).send();
})
//Delete Post
router.delete('/:id', async (req, res) => {
  const posts = await loadPostsCollection();
  await posts.deleteOne({_id: new mongodb.ObjectID(req.params.id)})
  res.status(200).send();
});

async function loadPostsCollection() {
  const client = await mongodb.MongoClient.connect('mongodb+srv://atlas1:SBztQTIqyFrKkufH@cluster0.lk4gs.mongodb.net/vampdb?retryWrites=true&w=majority', {useNewUrlParser: true});
  return client.db('vampdb').collection('vamp');
}

module.exports = router;