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
# If you want to constraint it to a node
    deploy:
      placement:
        constraints:
          - "node.hostname==swarm-1.myswarm"
```