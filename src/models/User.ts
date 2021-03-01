import { Column, CreateDateColumn, Entity, PrimaryColumn } from "typeorm";
import { v4 as uuid } from 'uuid';

@Entity("users")
class User {

	@PrimaryColumn()
	readonly id: string;

	@Column()
	name: string;

	// Obs: caso o nome da coluna seja diferente do atributo:
	// @Column("name")
	// nameUser: string;

	@Column()
	email: string;

	@CreateDateColumn()
	created_at: Date;

	constructor() {
		if(!this.id) {
			this.id = uuid()
		}
		// Se o ID não existir, quero que o ID tenha o valor de uuid 
		// (necessário para não criar um novo uuid quando fizermos alterações no usuário)
	}
}

export { User };