import { app } from './server';
import { logger } from './utils/logger';

const PORT = process.env.PORT || 8081;

app.listen(PORT, () => {
  logger.info(`*****Mailbag server accepting requests on port ${PORT}*****`);
});
