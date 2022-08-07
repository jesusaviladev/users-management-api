import httpServer from './config/http.js';
import connectDatabase from './config/db.js';
import './config/env.js';

const boot = async () => {
	await connectDatabase(process.env.MONGODB_URL);

	const PORT = process.env.PORT || 3000;

	httpServer.listen(PORT, () => {
		console.log(`Server running on port ${PORT}`);
	});
};

boot();
