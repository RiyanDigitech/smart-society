import { message } from "antd";
import axios from "../../lib/config/axios-instance";
import { buildUrlWithParams } from "@/lib/helpers";

export const getAllSupplementary = async () => {
  try {
    const url = buildUrlWithParams("/supplementary/get-all-supplementary-accounts" , {})
    const response = await axios.get(url);

    if (response.status === 200) {
      return response.data; 
    }
  } catch (error: any) {
    message.error(error?.response?.data?.message || "Something went wrong");
  }
};

export const deleteSupplementary = async (id:any) => {
  try {
    const response = await axios.delete(`/supplementary/delete-supplementary-account/${id}`);

    if (response.status === 200) {
      return response.data; 
    }
  } catch (error: any) {
    throw error
  }
};


export const updateSupplementryMutationFunc = async (data:any) => {
  try {
    const response = await axios.post(`/supplementary/update-status` , data);

    if (response.status === 200) {
      return response.data; 
    }
  } catch (error: any) {
    throw error
  }
};