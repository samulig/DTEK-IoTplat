import dotenv from 'dotenv'
import express from 'express'
import { MongoClient } from 'mongodb'
import cors from 'cors'

dotenv.config()

const app = express()
const client = new MongoClient(process.env.VITE_MONGO_URI)

app.use(cors({ origin: '*'}))

// List all documents on the temp_sensors collection
app.get('/api/count', async (req, res) => {
  await client.connect()
  const db = client.db('sensors')
  const collection = db.collection('temp_sensors')
  const count = await collection.countDocuments()
  res.json({ count })
})

// List all distinct sensors on the temp_sensors collection
app.get('/api/sensors/temperature', async (req, res) => {
  await client.connect()
  const db = client.db('sensors')
  const collection = db.collection('temp_sensors')
  const sensors = await collection.distinct('metadata.sensorId')
  res.json({sensors})
})

// Get data for a specific sensor
app.get('/api/sensors/temperature/:sensorId', async (req, res) => {
  const sensorId = req.params.sensorId
  await client.connect()
  const db = client.db('sensors')
  const collection = db.collection('temp_sensors')
  const sensorData = await collection.findOne({ 'metadata.sensorId': parseInt(sensorId) }, { sort: { timestamp: -1 } })

  res.json({sensorData})
})

// Add a new sensor
app.post('/api/sensors/temperature', async (req, res) => {
  const sensorData = req.body;
  await client.connect();
  const db = client.db('sensors');
  const collection = db.collection('temp_sensors');
  const result = await collection.insertOne(sensorData);
  res.json({ result });
});

// Just a testing endpoint
app.get('/api/testing', async (req, res) => {
  res.json({ message: 'Hello from the server!' })
})

app.listen(3100, () => console.log('Server is running on port 3100'))