const router = require("express").Router();
const mongodb = require('mongodb');
require("dotenv").config();

//Need to get dotenv working


//Get Posts
router.get('/', async (req, res) => {
  res.send(process.env.MONGODB_URI)
  console.log(typeof process.env.MONGODB_URI)
  const posts = await loadPostsCollection();
<<<<<<< HEAD
=======
  // res.send(await posts.find({}).toArray());
>>>>>>> a09701dd217cbe6db47aaaf014c6b90695ec3556
})
// router.get('/', (req, res) => {
//   mongodb.MongoClient.connect(uri,{useNewUrlParser: true}).db('vampdb').collection('vamp').then(res => 
//     res.send(await posts.find({}).toArray()))
// })


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