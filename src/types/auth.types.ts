
export type LoginRequest = {
  username: string;
  password: string;
};

export type LoginResponse = {
  token: string;
};

export type RegisterRequest = {
  username: string;
  password: string;
  email: string;
};

export type UserDetailsResponse = {
  username: string;
  email: string;
  role: string;
}

export type AuthUser = {
  username: string;
  role: string;
};

export type AuthContextType = {
  user: AuthUser | null;
  
  isAuthenticated: boolean;
  isAdmin: boolean;
  
  loading: boolean;
  
  login: (token: string) => void;
  logout: () => void;
};

