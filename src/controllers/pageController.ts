import { NextFunction, Response, Request } from 'express';
import GithubService from '../services/githubService';

const PAGE_SIZE = 20;

export default class PageController {

	public async renderMainPage(req: Request, res: Response, next: NextFunction) : Promise<any> {
		try {
			res.redirect('/search?username=boss&languages=js,java');
		}
		catch (error) {
			return next(error);
		}
	}

	public async renderUserPage(req: Request, res: Response, next: NextFunction) : Promise<any> {
		try {
			const username = req.query.username as string;
			const languages : string[] = req.query.languages ? (req.query.languages as string).split(',') : null;

			const { meta, users } = await GithubService.search(languages, username, PAGE_SIZE);

			res.render('user', {
				title: `${meta.total_count} user(s)`,
				users,
				meta,
			});
		}
		catch (error) {
			return next(error);
		}
	}
}
