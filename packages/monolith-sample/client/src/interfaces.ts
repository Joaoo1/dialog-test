export interface Post {
  id: string;
  text: string;
  createdBy: string;
  createdAt: Date;
}

export interface ListPost {
  id: string;
  text: string;
  createdAt: Date;
  authorId: string;
  authorName: string;
  likesCount: number;
  likedByUser: boolean;
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
