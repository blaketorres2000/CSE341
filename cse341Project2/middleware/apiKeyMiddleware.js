const apiKeyMiddleware = (req, res, next) => {
    const expectedApiKey = process.env.API_KEY;
    const providedApiKey = req.headers['z-key'];

    console.log('Incoming request headers:', req.headers); // Log all headers for debugging
    console.log('Expected API key:', expectedApiKey); // Log the expected API key for debugging
    console.log('Provided API key:', providedApiKey); // Log the provided API key for debugging
    
    if (!providedApiKey || providedApiKey !== expectedApiKey) {
      console.log('Unauthorized. Invalid API key.');
      return res.status(401).json({ error: 'Unauthorized. Invalid API key.' });
    }
  
    next();
  };
  
  module.exports = apiKeyMiddleware;