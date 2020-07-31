const router = require("express").Router();
const mongodb = require('mongodb');
require("dotenv").config();

//Get Posts
router.get('/', async (req, res) => {
  res.send(process.env.MONGODB_URI)
  console.log(typeof process.env.MONGODB_URI)
  const posts = await loadPostsCollection();
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
  const client = await mongodb.MongoClient.connect(uri, {useNewUrlParser: true});
  return client.db('vampdb').collection('vamp');
}

module.exports = router;