// auto generates swagger documentation
const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
        title: "CSE341 Node.js",
        description: "Node.js assignments for CSE341",
    },
    host: "cse341-9n6f.onrender.com",
    schemes: ['https'],
};

const outputFile = './swagger_output.json';
const endpointsFiles = ['./routes/index.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);