import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { UsersRepository } from "../repositories/UsersRepository";

class UserController {
	async create(request: Request, response: Response){
		const { name, email } = request.body;
		
		// O repositório é um entity manager, ele permite realizar algumas ações no banco de dados,
		// toda a a comunicação com o banco de dados será feita pelos repositórios
		// e cada entidade(classe) terá seu repositório específico.
		const usersRepository = getCustomRepository(UsersRepository);

		// SELECT * FROM USERS WHERE EMAIL = "EMAIL"
		const userAlreadyExists =  await usersRepository.findOne({
			email
		});

		if(userAlreadyExists) {
			return response.status(400).json({
				error: "User already exists!"
			});
		}

		const user = usersRepository.create({
			name, 
			email,
		});

		await usersRepository.save(user);

		return response.status(201).json(user);
	}
}

export { UserController };
