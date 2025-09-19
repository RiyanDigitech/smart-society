import { message } from "antd";
import axios from "../../lib/config/axios-instance";

const LoginServiceMutation = async ({ phone, password }: any) => {
  try {
    const response = await axios.post('/register-unit/login', { phone, password });
    if (response.status === 200) {
      return response.data; 
    }
  } catch (error: any) {
    const errMsg =
      error.response?.data?.message ||
      error.message ||
      "Login failed, please try again";
    message.error(errMsg);
    throw new Error(errMsg); 
  }
};

export default LoginServiceMutation;
