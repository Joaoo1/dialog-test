export interface Post {
	id: number;
	text: string;
	likes: number;
}

export interface User {
	id: string;
	name: string;
	email: string;
	createdAt: Date;
}

export interface DefaultApiError {
	message: string;
}
