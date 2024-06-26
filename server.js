import dotenv from 'dotenv'
import express from 'express'
import { MongoClient } from 'mongodb'
import cors from 'cors'
import mqtt from 'mqtt'

dotenv.config()

const app = express()
const mqttClient = mqtt.connect(process.env.VITE_MQTT_URL)
const client = new MongoClient(process.env.VITE_MONGO_URI)

app.use(cors({ origin: '*'}))
app.use(express.json())

mqttClient.on('connect', () => {
  mqttClient.subscribe('test', (err) => {
    if (!err) {
      console.log('Subscribed to test topic')
    }
    if (err) {
      console.error(err)
    }
  })
});

mqttClient.on('connect', () => {
  mqttClient.subscribe('temperature', (err) => {
    if (!err) {
      console.log('Subscribed to test topic')
    }
    if (err) {
      console.error(err)
    }
  })
});

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

// Add a new sensor
app.post('/api/sensors/temperature/add', async (req, res) => {
  const sensorData = req.body;
  sensorData.timestamp = new Date();
  await client.connect();
  const db = client.db('sensors');
  const collection = db.collection('temp_sensors');
  const result = await collection.insertOne(sensorData);
  res.json({ result });
});

// Get data for a specific sensor
app.get('/api/sensors/temperature/:sensorId', async (req, res) => {
  const sensorId = req.params.sensorId
  await client.connect()
  const db = client.db('sensors')
  const collection = db.collection('temp_sensors')
  const sensorData = await collection.findOne({ 'metadata.sensorId': parseInt(sensorId) }, { sort: { timestamp: -1 } })

  res.json({sensorData})
})

// Update a sensor's value
app.post('/api/sensors/temperature/:sensorId/update', async (req, res) => {
  const sensorId = parseInt(req.params.sensorId, 10);
  const newValue = req.body.value;

  // Check that the sensorID is a number. If not, return a 400 error.
  if (isNaN(sensorId)) {
    return res.status(400).json({ error: 'Invalid sensorId' });
  }

  await client.connect();
  const collection = client.db('sensors').collection('temp_sensors');

  // Check if a sensor with the given sensorId exists
  const sensorExists = await collection.findOne({ 'metadata.sensorId': sensorId });
  if (!sensorExists) {
    return res.status(404).json({ error: 'Sensor not found' });
  }

  const sensorData = {
    timestamp: new Date(),
    metadata: {
      sensorId: sensorId,
      type: 'temperature',
    },
    temp: newValue,
  };

  await client.connect();
  const result = await collection.insertOne(sensorData);

  if (result.insertedCount === 0) {
    return res.status(500).json({ error: 'Failed to insert document' });
  }

  res.json({ message: 'Document inserted successfully', id: result.insertedId });
});

// MQTT

mqttClient.on('message', async (topic, message) => {
  console.log(`Received message on topic ${topic}: ${message.toString()}`)
  if (topic === 'temperature') {
    try {
      await client.connect();
      const db = client.db('sensors')
      const collection = db.collection('temp_sensors')
      const sensorData = JSON.parse(message.toString())
      sensorData.timestamp = new Date()
      const sensorExists = await collection.findOne({ 'metadata.sensorId': sensorData.metadata.sensorId });
      if (!sensorExists) {
        console.error('Sensor not found');
        return;
      }
      await collection.insertOne(sensorData);
      console.log('Document inserted successfully');
    } catch (err) {
      console.error(err);
    }
  }
});



// Just some testing endpoints
// REST
app.get('/api/testing', async (req, res) => {
  res.json({ message: 'Hello from the server!' })
})



app.listen(3100, () => console.log('Server is running on port 3100'))