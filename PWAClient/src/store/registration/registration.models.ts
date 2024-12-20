export interface RegistrationRequest {
  email: string;
  password: string;
  username: string;
}

export interface RegistrationResponse {
  userId: string;
}
