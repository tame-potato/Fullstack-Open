const app = require('./app'); // the actual Express application
const config = require('./utils/config');
const logger = require('./utils/logger');

app.listen(config.PORT, () => {
  logger.logInfo(`Server running on port ${config.PORT}`);
});
