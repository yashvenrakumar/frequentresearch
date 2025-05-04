export interface UsernameCheckResponse {
  statusCode: number;
  message: string;
  data: {
    available: boolean;
  };
}

export interface ProfileForm {
  profilePhoto: string;
  username: string;
  currentPassword: string;
  newPassword: string;
  profession: string;
  companyName: string;
  addressLine1: string;
  country: string;
  state: string;
  city: string;
  subscriptionPlan: string;
  newsletter: string;
}

export interface RegisterUserData {
  username: string;
  currentPassword: string;
  newPassword: string;
  profession: string;
  companyName: string;
  addressLine1: string;
  country: string;
  state: string;
  city: string;
  subscriptionPlan: string;
  newsletter: boolean;
  profilePhoto: string;
}


