import { AppError } from "../../../common/AppError";

export class UserNotFoundError extends AppError {
	constructor() {
		super("Usuário não encontrado", 404);
	}
}
