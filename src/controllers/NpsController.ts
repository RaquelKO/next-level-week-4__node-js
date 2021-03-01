import { Request, Response } from 'express';
import { getCustomRepository, Not, IsNull } from 'typeorm';
import { SurveysUsersRepository } from '../repositories/SurveysUsersRepository';

class NpsController {

	/**
	 * Sobre o cálculo de NPS (Net Promoter Score):
	 * 
	 *  1 2 3 4 5 6 7 8 9 10
	 * 
	 * Detratores => 0 - 6
	 * Passivos => 7 - 8
	 * Promotores => 9 - 10
	 * 
	 * (Número de promotores - número de detratores) / (número total de respondentes) x 100
	 */

	async execute(request: Request, response: Response){
		// Recebe o id da pesquisa da qual queremos saber o NPS
		const { survey_id } = request.params;

		const surveysUsersRepository = getCustomRepository(SurveysUsersRepository);

		// Busca todas as repostas referentes a essa pesquisa
		const surveysUsers = await surveysUsersRepository.find({
			survey_id,
			value: Not(IsNull()),
		});

		// Obtemos o tamanho do array gerado pelo .filter() para obter a quantidade de respostas de cada tipo
		const detractors = surveysUsers.filter(
			(survey) => survey.value >= 0 && survey.value <= 6	
		).length;

		const promoters = surveysUsers.filter(
			(survey) => survey.value >= 9 && survey.value <= 10
		).length;

		const passives = surveysUsers.filter(
			(survey) => survey.value >= 7 && survey.value <= 8
		).length;

		// Obtemos a quantidade total de respostas com o .length()
		const totalAnswers = surveysUsers.length;

		// Calculamos o NPS (e tratamos seu modo de exibição)
		const calculate = Number(
			(((promoters - detractors) / totalAnswers) * 100).toFixed(2)
		);

		// Retornamos as informações ao usuário
		return response.json({
			detractors,
			promoters,
			passives,
			totalAnswers,
			nps: calculate,
		});
	}
}

export { NpsController };