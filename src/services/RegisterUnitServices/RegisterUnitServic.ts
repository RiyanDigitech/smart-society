import { message } from "antd";
import axios from "../../lib/config/axios-instance";

export const getAllRegisterUsers = async () => {
  try {
    const response = await axios.get("/register-unit");

    if (response.status === 200) {
      return response.data; // { statusCode, data, message, success }
    }

    return { data: { register_unit: [] } }; // fallback
  } catch (error: any) {
    message.error(error?.response?.data?.message || "Something went wrong");
    return { data: { register_unit: [] } }; // fallback to empty
  }
};
