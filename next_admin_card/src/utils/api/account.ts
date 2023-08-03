import axiosInstance from "../../common/axios";

export const getAccountDataApi = async () => {
  const { data } = await axiosInstance.get("/accounts");

  return data;
};
