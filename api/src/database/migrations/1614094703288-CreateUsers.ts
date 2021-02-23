import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateUsers1614094703288 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
		// O método up é para criação da migration
		await queryRunner.createTable(
			new Table({
				name: "users",
				columns: [
					{
						name: "id",
						type: "uiid",
						isPrimary: true,
					},
					{
						name: "name",
						type: "varchar"
					},
					{
						name: "email",
						type: "varchar",
					},
					{
						name: "created_at",
						type: "timestamp",
						default: "now()",
					}
				]
			})
		)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
		// O método up é para remoção da migration
		await queryRunner.dropTable("users");
    }

}
