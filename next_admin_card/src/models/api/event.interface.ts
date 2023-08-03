export interface IEventListDataResponse {
  currentPage: number;
  itemsPerPage: number;
  totalPages: number;
  totalItems: number;
  items: IEventListData[];
}
export interface IEventListData {
  id: string;
  idCard: number;
  eventDate: string;
}

export interface ICreateEventDataResponse {
  id: string;
  idCard: number;
  eventDate: string;
}

export interface IEditEventDataResponse {
  id: string;
  idCard: number;
  eventDate: string;
}
