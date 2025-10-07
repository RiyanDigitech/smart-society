import { message } from "antd";
import axios from "../../lib/config/axios-instance";

export const getAllRegisterUsers = async () => {
  try {
    const response = await axios.get("/register-unit" , {
      params:{role : "User"}
    });

    if (response.status === 200) {
      return response.data; 
    }

    // return { data: { register_unit: [] } };
  } catch (error: any) {
    message.error(error?.response?.data?.message || "Something went wrong");
    return { data: { register_unit: [] } };
  }
};

export const getAllRegisterUsersbyId = async (id:any) => {
  try {
    const response = await axios.get(`/register-unit/${id}`);

    if (response.status === 200) {
      return response.data; 
    }

    // return { data: { register_unit: [] } };
  } catch (error: any) {
    message.error(error?.response?.data?.message || "Something went wrong");
    return { data: { register_unit: [] } };
  }
};

export const postRegisterUnit = async (values:any) => {
  try {
    const response = await axios.post("/register-unit" , values);

    if (response.status === 200) {
      return response.data; 
    }

    return { data: { register_unit: [] } }; 
  } catch (error: any) {
    message.error(error?.response?.data?.message || "Something went wrong");
    return { data: { register_unit: [] } }; 
  }
};

export const editRegisterUnit = async (id:any , newPassword:any) => {
  try {
    const response = await axios.put(`/register-unit/${id}` , newPassword);

    if (response.status === 200) {
      return response.data; 
    }

    return { data: { register_unit: [] } }; 
  } catch (error: any) {
    message.error(error?.response?.data?.message || "Something went wrong");
    return { data: { register_unit: [] } }; 
  }
};

export const changePasswordRegisterUnit = async ({id , newPassword}:any) => {
  try {
    const response = await axios.post(`/auth/admin/update-password/${id}` , {newPassword:newPassword});

    if (response.status === 200) {
      return response.data; 
    }

    // return { data: { register_unit: [] } }; 
  } catch (error: any) {
    message.error(error?.response?.data?.message || "Something went wrong");
    return { data: { register_unit: [] } }; 
  }
};

export const getStatsRegisterUsersbyId = async (id:any) => {
  try {
    const response = await axios.get(`/user-unit/stats/${id}`);

    if (response.status === 200) {
      return response.data; 
    }

    // return { data: { register_unit: [] } };
  } catch (error: any) {
    message.error(error?.response?.data?.message || "Something went wrong");
    return { data: { register_unit: [] } };
  }
};
