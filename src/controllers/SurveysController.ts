import { getCustomRepository } from "typeorm";
import { SurveysRepository } from "../repositories/SurveysRepository";
import { Request, Response } from "express";

class SurveysController {
	async create(request: Request, response: Response) {
		const { title, description } = request.body;

		const surveysRepository = getCustomRepository(SurveysRepository);

		const survey = surveysRepository.create({
			title,
			description
		});

		await surveysRepository.save(survey);

		return response.status(201).json(survey);
	}

	async show (request: Request, response: Response) {
		const surveysRepository = getCustomRepository(SurveysRepository);

		// O método find lista todos os registros que temos em uma tabela
		const all = await surveysRepository.find(); 

		return response.json(all);
	}
}

export { SurveysController };