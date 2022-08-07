import { createServer } from 'http';
import app from './express.js';

// create http server for separation of concerns

const httpServer = createServer(app);

export default httpServer;
