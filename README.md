# DTEK-IoTplat

A simple IoT platform, university project work. 

# Configure:

Rename the env_example file to .env and fill the variables with correct information. 

Due to Vite, environment variables cannot be defined in the compose file without a fuzz, so for now they are not available there.

# Install:

```bash
git clone <thisrepository>
cd <thisrepository>
npm install
npm run dev
```

or

```bash
docker build -t <imagename:tag> .
```


# Docker compose

```
version: '3'
services:
  dtek_iot:
    image: dtek:1
    ports:
      - 5000:3000

```

# Start sever

```bash
cd <codeDirectory>
./start.sh
```

# MongoDB 

This service uses MongoDB timeseries database. Example docker compose file: 
```yaml
version: '3.1'

services:

  mongo:
    image: mongodb/mongodb-community-server:6.0-ubi8
    restart: always
    ports:
      - 27017:27017
    volumes:
      - mongodb:/data/db
    environment:
      - MONGODB_INITDB_ROOT_USERNAME=mongo
      - MONGODB_INITDB_ROOT_PASSWORD=example

volumes:
  mongodb:
```

# MQTT

This service can use MQTT to update sensor values. Example Mosquitto docker compose file: 

```yaml
version: "3.7"
services:
  mqtt:
    image: eclipse-mosquitto:2.0.18
    container_name: mqtt
    ports:
      - "1883:1883" #default mqtt port
      - "9001:9001" #default mqtt port for websockets
    volumes:
      - ./config:/mosquitto/config:rw
      - ./data:/mosquitto/data:rw
      - ./log:/mosquitto/log:rw

# volumes for mapping data,config and log
volumes:
  config:
  data:
  log:
```