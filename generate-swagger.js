const fs = require('fs');
const swaggerJSDoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Micro Hackathon API',
      version: '1.0.0',
    },
    servers: [{ url: 'http://localhost:4000' }],
  },
  apis: ['./routes/*.js'], // path to your route file
};

const swaggerSpec = swaggerJSDoc(options);
fs.writeFileSync('./openapi.json', JSON.stringify(swaggerSpec, null, 2));
console.log('✅ OpenAPI schema saved as openapi.json');
