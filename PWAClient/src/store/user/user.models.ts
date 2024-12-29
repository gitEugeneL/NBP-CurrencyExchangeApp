export interface UserResponse {
  userId: string;
  username: string;
  email: string;
  geoData: string;
}

export interface GetUserParams {
  userLatitude: string | undefined;
  userLongitude: string | undefined;
}
