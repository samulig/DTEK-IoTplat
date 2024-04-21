import express from 'express'
import { MongoClient } from 'mongodb'

const app = express()
const client = new MongoClient('mongodb://mongo:27017')

app.get('/api/count', async (req, res) => {
  await client.connect()
  const db = client.db('sensors')
  const collection = db.collection('temperatures')
  const count = await collection.countDocuments()
  res.json({ count })
})

app.get('/api/testing', async (req, res) => {
  res.json({ message: 'Hello from the server!' })
})

app.listen(3100, () => console.log('Server is running on port 3100'))