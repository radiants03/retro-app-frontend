import { SortOrder } from "./enum";

export type PRegisterUser = {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  confirm_password: string;
};

export type PLoginUser = {
  email: string;
  password: string;
};

export type PSearchAllBoards = {
  sortBy: SortOrder;
};

export type PCreateCard = {
  content: string;
  username: string;
  category_id: number;
};

export type PUpdateCard = {
  content: string;
};

export type PCreateComment = {
  content: string;
  username: string;
  cardId: number;
};

export type PUpdateComment = {
  content: string;
};