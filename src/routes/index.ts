
import * as express from 'express';
import GithubController from '../controllers/githubController';
import PageController from '../controllers/pageController';

const githubController: GithubController = new GithubController();
const pageController: PageController = new PageController();

export default class Routes {

	public routes(app: express.Application): void {

		app.route('/api/github/v4/users/search')
			.get(githubController.search);

		app.route('/')
			.get(pageController.renderMainPage);

		app.route('/search')
			.get(pageController.renderUserPage);
	}
}
