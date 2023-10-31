export type IUsers = {
  first_name: string;
  last_name: string;
  email: string;
  avatar: string | null;
};

export type IUserModalType = 'create' | 'edit' 