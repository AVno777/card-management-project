import axiosInstance from "../../common/axios";

export const getEventDataApi = async () => {
  const { data } = await axiosInstance.get("/events");

  return data;
};
