import { message } from "antd";
import axios from "../../lib/config/axios-instance";

export const getAllStaffFunction = async () => {
  try {
    const response = await axios.get("/staff/list");

    if (response.status === 200) {
      return response.data; 
    }

    // return { data: { register_unit: [] } };
  } catch (error: any) {
    message.error(error?.response?.data?.message || "Something went wrong");
    return { data: { register_unit: [] } };
  }
};