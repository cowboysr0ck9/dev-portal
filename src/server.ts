// Import everything from express and assign it to the express variable
import express from 'express';

// Create a new express application instance
const app: express.Application = express();
// The port the express app will listen on
const port: any = process.env.PORT || 3000;

// Mount the WelcomeController at the /welcome route
app.get('/', (req, res) => {
  res.send('Hello Developer, Tyler')
});

// Serve the application at the given port
app.listen(port, () => {
  // Success callback
  console.log(`Listening at http://localhost:${port}/`);
});
