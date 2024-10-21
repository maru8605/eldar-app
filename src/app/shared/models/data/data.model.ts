export interface Post {
  body: string;
  id: number;
  title: string;
  userId: number;
}

export interface UserData {
  id: string
  name: string
  rol: string
  email:string
}

export interface PostData {
  userId: number,
  title: string,
  description: string
}