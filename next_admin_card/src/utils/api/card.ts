import axiosInstance from "../../common/axios";

export const getCardDataApi = async () => {
  const { data } = await axiosInstance.get("/cards");

  return data;
};
