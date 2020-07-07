import { NextFunction, Response, Request } from 'express';
import * as HttpStatusCodes from 'http-status-codes';
import GithubService from '../services/githubService';

export default class GithubController {

	public async search(req: Request, res: Response, next: NextFunction) : Promise<any> {
		try {
			const username = req.query.username as string;
			const languages : string[] = req.query.languages ? (req.query.languages as string).split(',') : null;

			const { meta, users } = await GithubService.search(languages, username);

			res.status(HttpStatusCodes.OK).json({
				message: 'OK',
				meta,
				users // TODO: add transformer
			});
		}
		catch (error) {
			return next(error);
		}
	}
}
