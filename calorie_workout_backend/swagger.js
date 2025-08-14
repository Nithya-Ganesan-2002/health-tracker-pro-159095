const swaggerJSDoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Calorie & Workout Tracker API',
      version: '1.0.0',
      description: 'REST API for user authentication, calorie logging, workout logging, user profiles, goals, and analytics.',
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
          description: 'Provide a valid JWT token in the Authorization header using the Bearer scheme.',
        },
      },
    },
    security: [{ bearerAuth: [] }],
    tags: [
      { name: 'Health', description: 'Service health' },
      { name: 'Auth', description: 'User authentication' },
      { name: 'Users', description: 'User profile and goals' },
      { name: 'Foods', description: 'Calorie intake logging' },
      { name: 'Exercises', description: 'Workout logging' },
      { name: 'Analytics', description: 'Analytics and progress' },
    ],
  },
  apis: ['./src/routes/*.js'], // Path to the API docs
};

const swaggerSpec = swaggerJSDoc(options);
module.exports = swaggerSpec;
