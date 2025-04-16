import type { ErrorRequestHandler } from "express";
import { AppError } from "../../common/AppError";
import { env } from "../../env";

export const ExceptionHandler: ErrorRequestHandler = (
	error,
	req,
	res,
	next,
) => {
	if (env.NODE_ENV === "development" || env.NODE_ENV === "production") {
		console.error(error);
	}

	if (error instanceof AppError) {
		return res.status(error.statusCode).send({ message: error.message });
	}

	return res.status(500).json({ message: "Ocorreu um erro" });
};
