import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import { AppError } from '../errors/AppError';
import { SurveysUsersRepository } from '../repositories/SurveysUsersRepository';

class AnswerController {
	// http://localhost:3333/answers/2?u=ddbb2e78-e493-4730-9e4f-f205a4ccd733

	async execute(request: Request, response: Response) {
		const { value } = request.params;
		const { u } = request.query;

		const surveysUsersRepository = getCustomRepository(SurveysUsersRepository);

		const surveyUser = await surveysUsersRepository.findOne({
			id: String(u),
		});

		if (!surveyUser) {
			throw new AppError('Survey User does not exists!');
		}

		surveyUser.value = Number(value);

		await surveysUsersRepository.save(surveyUser);

		return response.json(surveyUser);
	}
}

export { AnswerController };
