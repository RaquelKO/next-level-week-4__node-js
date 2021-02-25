import nodemailer, { Transporter } from 'nodemailer';
import handlebars from 'handlebars';
import fs from 'fs';

class SendMailService {

	private client: Transporter

	// O construtor é um método que é executado assim que uma classe é instanciada, 
	// ou seja quando uma classe é criada/chamada as informações que estão dentro do construtor são executadas
	constructor() {
		nodemailer.createTestAccount().then(account => {
			// Create a SMTP transporter object (from: https://ethereal.email/)
			const transporter = nodemailer.createTransport({
				host: account.smtp.host,
				port: account.smtp.port,
				secure: account.smtp.secure,
				auth: {
					user: account.user,
					pass: account.pass
				}
			});
		
		this.client = transporter;	

		});
	}
	// Obs: o método construtor não permite utilizar async/await por isso utiliza-se a forma antiga: ".then()"
	// const reposta = await execute ()
	// em caso de sucesso .then(), em caso de falha .catch()
	

	async execute(to: string, subject: string, variables: object, path: string) {
		
		const templateFileContent = fs.readFileSync(path).toString("utf8");

		const mailTemplateParse = handlebars.compile(templateFileContent);

		const html = mailTemplateParse(variables);

		const message = await this.client.sendMail({
			to,
			subject,
			html,
			from: "NPS <noreply@nps.com.br>"
		});

		console.log('Message sent: %s', message.messageId);
        // Preview only available when sending through an Ethereal account
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(message));
	}
}

// Cria a instância assim que a aplicação for executada
export default new SendMailService();