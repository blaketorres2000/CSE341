// auto generates swagger documentation
const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
        title: "CSE341 Node.js",
        description: "Node.js assignments for CSE341",
    },
    host: "localhost:5600",
    schemes: ['https'],
};

const outputFile = './swagger_output.json';
const endpointsFiles = ['./routes/index.js', './routes/contacts.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);