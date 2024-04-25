import express from 'express'
import { MongoClient } from 'mongodb'
import cors from 'cors'
//const cors = require('cors')

const app = express()
const client = new MongoClient('mongodb://mongo:example@192.168.1.191:27017')

app.use(cors({ origin: '*'}))

app.get('/api/count', async (req, res) => {
  await client.connect()
  const db = client.db('sensors')
  const collection = db.collection('temp_sensors')
  const count = await collection.countDocuments()
  res.json({ count })
})

app.get('/api/testing', async (req, res) => {
  res.json({ message: 'Hello from the server!' })
})

app.listen(3100, () => console.log('Server is running on port 3100'))