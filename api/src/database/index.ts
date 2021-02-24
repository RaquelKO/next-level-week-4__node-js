import { Connection, createConnection, getConnectionOptions } from 'typeorm';

export default async (): Promise<Connection> => {
	const defaultOptions = await getConnectionOptions();

	return createConnection(
		// Essa funcionalidade do JavaScript acessará todos as informações do 'ormcongif' (objeto: defaultOptions) 
		// e sobreescreverá somente a variável 'database'
		Object.assign(defaultOptions, {
			// Ao executar um teste será criando um banco de dados específico para testes
			// caso contrário, usará o banco de dados padrão 
			database: 
				process.env.NODE_ENV === "test" 
					? "./src/database/database.test.sqlite" 
					: defaultOptions.database,
		})
	);
};