import { message } from "antd";
import axios from "../../lib/config/axios-instance";

export const getAllRegisterUsers = async () => {
    try {
        const response = await axios.get('/register-unit')
        if(response.status === 200){return response?.data}
    } catch (error:any) {
        message.error(error?.response?.data?.message)
    }
}
