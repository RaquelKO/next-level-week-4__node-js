import { Request, Response } from 'express';
import { getCustomRepository } from "typeorm";
import { AppError } from '../errors/AppError';
import { SurveysUsersRepository } from "../repositories/SurveysUsersRepository";

class AnswerController {

	// http://localhost:3333/answers/1?u=9e772a56-0f8f-4e57-a732-a8fb6895ce15
	/**
	 * Route Params => Parâmetros que compõe a rota
	 * routes.get("/answers/:value")
	 *  
	 * Query Params => Busca, Paginação, não obrigatórios
	 * após => '?'
	 * chave = valor
	 */ 
	
	async execute(request: Request, response: Response) {
		// Recebendo os parâmetros advindos da rota
		const { value } = request.params;
		const { u } = request.query;

		// Buscando a existência dentro do repositório
		const surveysUsersRepository = getCustomRepository(SurveysUsersRepository);

		const surveyUser = await surveysUsersRepository.findOne({
			id: String(u),
		});

		// Não existindo, ocorre um erro
		if(!surveyUser) {
			throw new AppError("Survey User does not exist!");
		}

		// Existindo, o valor é sobreescrito
		surveyUser.value = Number(value);

		await surveysUsersRepository.save(surveyUser);

		return response.json(surveyUser);
	}
}

export { AnswerController };