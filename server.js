const express = require('express')
const mongodb = require('mongodb')

const app = express()
const client = new mongodb.MongoClient('mongodb://mongo:27017')

app.get('/api/count', async (req, res) => {
  await client.connect()
  const db = client.db('sensors')
  const collection = db.collection('temperatures')
  const count = await collection.countDocuments()
  res.json({ count })
})

app.listen(3100, () => console.log('Server is running on port 3100'))