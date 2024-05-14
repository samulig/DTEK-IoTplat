import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';

function Apidoc() {

  const markdownContent = `
  # Update sensor data

  ## via POST
  \`\`\`
  curl -X POST http://localhost:3100/api/sensors/temperature/2/update -H Content-Type:Application/json --data '{"value":2}'
  \`\`\`
  
  ## via MQTT
  \`\`\`
  mosquitto_pub -L mqtt://mqttuser:mqttpass@192.168.1.191:1883/temperature -m '{"metadata":{"sensorId":2,"type":"temperature"},"temp":22.5}'
  \`\`\`
  
  # Add new sensor
  
  ## Via POST
  
  ### /api/temperature/add
  
  The following data should be sent:
  
  \`\`\`javascript
  {
        timestamp: new Date().toISOString(),
        metadata: {
          sensorId: parseInt(sensorId),
          type: 'temperature',
        },
        temp: 1, // Placeholder value
      }
  \`\`\`
  
  
  # Get data
  
  ## /api/count
  
  - Get the number of entries
  
  ## /api/sensors/temperature
  
  - Get all the sensors in the temperature group
  
  ## /api/sensors/temperature/sensorID
  
  - Get the latest entry of a sensor
`;

return (
    <div>
      <ReactMarkdown>
        {markdownContent}
      </ReactMarkdown>
    </div>
  );
}

export default Apidoc;