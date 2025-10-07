import { message } from "antd";
import axios from "../../lib/config/axios-instance";
import { buildUrlWithParams } from "@/lib/helpers";

export const getAllComplaints = async () => {
  try {
    const url = buildUrlWithParams("/complaint/get-all-complaints" , {})
    const response = await axios.get(url);

    if (response.status === 200) {
      return response.data; 
    }
  } catch (error: any) {
    message.error(error?.response?.data?.message || "Something went wrong");
    return { data: { register_unit: [] } };
  }
};

export const postComplaintFunc = async (values:any) => {
  try {
    const response = await axios.post("/complaint/create-complaint" , values);

    if (response.status === 200 || response.status === 201) {
      return response.data; 
    }
  } catch (error: any) {
     throw error;
  }
};

export const deleteComplaint = async (id:any) => {
  try {
    const response = await axios.delete(`/complaint/delete-complaint/${id}`);

    if (response.status === 200) {
      return response.data; 
    }
  } catch (error: any) {
    throw error
  }
};

export const updateComplaintFunc = async ({id , values}:any) => {
  try {
    const response = await axios.put(`/complaint/update-complaint/${id}` , values);

    if (response.status === 200) {
      return response.data; 
    }
  } catch (error: any) {
    throw error
  }
};

export const getComplaintbyId = async (id:any) => {
  try {
    const url = buildUrlWithParams(`/complaint/get-complaint-by-id/${id}` , {})
    const response = await axios.get(url);

    if (response.status === 200) {
      return response.data; 
    }
  } catch (error: any) {
    throw error
  }
};

export const assignComplainttoStaff = async (values:any) => {
  try {
    const response = await axios.post("/complaint/assign-complaint" , values);

    if (response.status === 200 || response.status === 201) {
      return response.data; 
    }
  } catch (error: any) {
     throw error;
  }
};

export const assignStatusResolved = async (id:any , complaintStatus = "Assign") => {
  try {
    const response = await axios.put(`/complaint/update-complaint/${id}` , {complaintStatus});

    if (response.status === 200) {
      return response.data; 
    }
  } catch (error: any) {
    throw error
  }
};

export const statusResolved = async (id:any , complaintStatus = "Resolved") => {
  try {
    const response = await axios.put(`/complaint/update-complaint/${id}` , {complaintStatus});

    if (response.status === 200) {
      return response.data; 
    }
  } catch (error: any) {
    throw error
  }
};