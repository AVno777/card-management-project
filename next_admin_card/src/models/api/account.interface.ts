export interface IAccountListDataResponse {
  currentPage: number;
  itemsPerPage: number;
  totalPages: number;
  totalItems: number;
  items: IAccountListData[];
}
export interface IAccountListData {
  id: string;
  username: string;
  password: string;
}

export interface ICreateAccountDataResponse {
  id: string;
  username: string;
  password: string;
}

export interface IEditAccountDataResponse {
  id: string;
  username: string;
  password: string;
}
