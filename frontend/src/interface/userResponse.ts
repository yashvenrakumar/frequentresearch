export interface UserProfile {
  profilePhoto: string;
  username: string;
  password: string;
  profession: string;
  companyName: string;
  addressLine1: string;
  country: string;
  state: string;
  city: string;
  subscriptionPlan: string;
  newsletter: boolean;
  _id: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface AuthResponseRegister {
  statusCode: number;
  message: string;
  data: {
    user: UserProfile;
    accessToken: string;
    refreshToken: string;
  };
}
