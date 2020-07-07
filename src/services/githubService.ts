import axios from 'axios';
import ApplicationError from '../errors/applicationError';
import env from '../env';

export default class GithubService {

	public static async search (languages: string[], username?: string, limit = 10) : Promise<any> {
		if (!languages || languages.length < 1) {
			throw new ApplicationError('Request should contain at least one language');
		}

		const langs = languages.map((language) => `language:${language}`);
		const searchQuery = [username ? `${username} in:login type:user` : '', ...langs].join(' ');

		const query = `
          query {
            search(query: "${searchQuery}", type: USER, first: ${limit}) {
                userCount
                nodes {
                    ... on User {
                        login
                        url
                        name
                        avatarUrl
                        followers {
                            totalCount
                        }
                    }
                }
            }
          }`;

		const headers = {
			'User-Agent': 'Mozilla/5.0',
			'Authorization': `Bearer ${env.GITHUB_API_TOKEN}`,
		};

		const { data, errors } = await axios.post(
			'https://api.github.com/graphql',
			JSON.stringify({
				query,
			}),
			{
				headers,
			}
		);

		if (errors && errors.length > 0) {
			throw new Error('Wrong request to GitHub'); // internal error
		}

		const users = data.data.search.nodes.map((user) => ({
			username: user.login,
			name: user.name,
			url: user.url,
			avatar_url: user.avatarUrl,
			followers_count: user.followers.totalCount,
		}));

		const meta = {
			total_count: data.data.search.userCount,
		};

		return {
			meta,
			users,
		};
	}

}
