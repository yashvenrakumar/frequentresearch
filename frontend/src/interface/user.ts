export interface RegisterPayload {
    name: string;
    email: string;
    password: string;
  }

  export interface LoignPayload {
     email: string;
    password: string;
  }
  
  export interface User {
    name: string;
    email: string;
    password: string;
    _id: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
  }
  
  export  interface RegisterResponse {
    user: User;
    accessToken: string;
    refreshToken: string;
  }
  
  export interface AuthError {
    message: string;
  }


 
  
 export interface AuthResponse {
    success: boolean;
    message: string;
    user: User;
    accessToken: string;
    refreshToken: string;
  }
  