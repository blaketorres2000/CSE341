const apiKeyMiddleware = (req, res, next) => {
    const expectedApiKey = process.env.API_KEY;
    const providedApiKey = process.env.API_KEY;
    
    if (!providedApiKey || providedApiKey !== expectedApiKey) {
      console.log('Unauthorized. Invalid API key.');
      return res.status(401).json({ error: 'Unauthorized. Invalid API key.' });
    }
  
    next();
  };
  
  module.exports = apiKeyMiddleware;