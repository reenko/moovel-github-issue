import { createServer } from 'http';

import app from './app';
import env from './env';

const PORT = env.PORT;

(async () => {
	createServer(app).listen(PORT, () =>
		console.info(`Server running on port ${PORT}`)
	);
})();
