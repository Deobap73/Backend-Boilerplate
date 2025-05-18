// backend-boilerplate/src/server.ts
import app from './app';
import { config } from './config/env';
import { applySecurity } from './middlewares/security';
import { connectToDB } from './config/db';

app.use(applySecurity);
connectToDB();

app.listen(config.PORT, () => {
  console.log(`🚀 Server ready on http://localhost:${config.PORT}`);
});

export default app;
