// backend-boilerplate/src/server.ts
import app from './app';
import { config } from './config/env';

app.listen(config.PORT, () => {
  console.log(`🚀 Server ready on http://localhost:${config.PORT}`);
});
