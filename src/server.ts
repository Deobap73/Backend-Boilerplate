// backend-boilerplate/src/server.ts
import app from './app';
import { config } from './config/env';
import { applySecurity } from './middlewares/security';

app.use(applySecurity);

app.listen(config.PORT, () => {
  console.log(`🚀 Server ready on http://localhost:${config.PORT}`);
});

export default app;
