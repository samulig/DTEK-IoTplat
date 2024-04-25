import dotenv from 'dotenv'
import express from 'express'
import { MongoClient } from 'mongodb'
import cors from 'cors'

dotenv.config()

const app = express()
const client = new MongoClient(process.env.VITE_MONGO_URI)

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