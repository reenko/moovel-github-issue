const envalid = require('envalid'); // eslint-disable-line

// Validator types https://github.com/af/envalid#validator-types
export default envalid.cleanEnv(
	process.env,
	{
		PORT: envalid.port({
			default: 3000,
			desc: 'The port to start the server on'
		}),

		GITHUB_API_TOKEN: envalid.str({
			desc: 'https://docs.github.com/en/github/authenticating-to-github/creating-a-personal-access-token'
		}),
	},
	{ strict: true }
);
