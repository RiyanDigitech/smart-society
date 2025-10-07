import axios from "@/lib/config/axios-instance";
import { buildUrlWithParams } from "@/lib/helpers";
import { StaffData } from "@/lib/types/staff";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { message, notification } from "antd";

 interface StaffListResponse {
  data: StaffData[];
  total: number;
  page: number;
  lastPage: number;
}

const StaffService = () => {
  const useFetchStaff = (page?: number, lastPage?: number) => {
    async function fetchStaff(): Promise<StaffListResponse> {
      const url = buildUrlWithParams("/staff/list", { page, lastPage });
      return axios.get(url).then((res) => {
        const result = res.data.data;
        return {
          data: result || [],
          total: result?.total || 0,
          page: result?.page || 1,
          lastPage: result?.lastPage || 1,
        };
      });
    }

    return useQuery({
      queryKey: ["staff", page, lastPage],
      queryFn: fetchStaff,
      retry: 0,
      refetchOnWindowFocus: false,
    });
  };

  const useCreateStaff = () => {
    const queryClient = useQueryClient();

    return useMutation({
      mutationFn: async ({ data }: { data: FormData }) => {
        return axios
          .post("/staff", data, {
            headers: { "Content-Type": "multipart/form-data" },
          })
          .then((res) => res.data);
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["staff"] });
      },
    });
  };

  const useDeleteStaffById = () => {
    const queryClient = useQueryClient();

    return useMutation({
      mutationFn: async (id: number) => {
        const response = await axios.delete(`/staff/${id}`);
        return response.data;
      },
      onSuccess: () => {
        message.success( "Staff deleted successfully" );
        queryClient.invalidateQueries({ queryKey: ["staff"] });
      },
      onError: (error: any) => {
        const message =
          error?.response?.data?.message || "Failed to delete staff";
        notification.error({ message });
      },
    });
  };

  
  const useUpdateStaff = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      id,
      data,
    }: {
      id: string | number;
      data:  {
        name: string;
        gender: string;
        phone: string;
        cnic: string;
        address: string;
        designation: string;

      };
    }) => {
      return axios
        .put(`/staff/${id}`, data)
        .then((res) => res.data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["staff"] });
      
    },
  });
};


  return {
    useFetchStaff,
    useCreateStaff,
    useDeleteStaffById,
    useUpdateStaff
  };
};

export default StaffService;

    




// const token = localStorage.getItem("token"); 

// export const getAllStaff = async ({
//   page,
//   lastPage,
// }: {
//   page: number;
//   lastPage: number;
  

// }) => {
//   try {
//     const url = buildUrlWithParams("/staff/list", {
//       page,
//       lastPage,
      
//     });

//     const response = await axios.get(url, {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     });

//     return {
//       data: response.data.data,
//       total: response.data.data.total,
//         page: response.data.data.page,
//       lastPage: response.data.data.lastPage,
//     };
//   } catch (error: any) {
//     notification.error({
//       message: error?.response?.data?.statusCode || "Error",
//       description: error?.response?.data?.message || "Something went wrong",
//     });

//     return {
//       data: [],
//       total: 0,
//     };
//   }
// };

//  export const useCreateStaff = () => {
//     const queryClient = useQueryClient();

//     return useMutation({
//       mutationFn: async ({ data }: { data: FormData }) => {
//         return axios
//           .post(`/staff`, data, {
//             headers: { "Content-Type": "multipart/form-data" },
//           })
//           .then((res) => res.data);
//       },
//       onSuccess: () => {

//         queryClient.invalidateQueries({ queryKey: ["staff"] });
//       },
//     });
//   }; 


  /*

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "@/lib/config/axios-instance";
import { buildUrlWithParams } from "@/lib/helpers";

export interface StaffListResponse {
  data: any[]; // Replace `any` with the actual staff data type
  total: number;
  page: number;
  lastPage: number;
}

const StaffService = () => {
  const useFetchStaff = (page?: number, lastPage?: number) => {
    async function fetchStaff(): Promise<StaffListResponse> {
      const url = buildUrlWithParams("/staff/list", { page, lastPage });
      return axios.get(url).then((res) => {
        const result = res.data.data;
        return {
          data: result || [],
          total: result?.total || 0,
          page: result?.page || 1,
          lastPage: result?.lastPage || 1,
        };
      });
    }

    return useQuery({
      queryKey: ["staff", page, lastPage],
      queryFn: fetchStaff,
      retry: 0,
      refetchOnWindowFocus: false,
    });
  };

  const useCreateStaff = () => {
    const queryClient = useQueryClient();

    return useMutation({
      mutationFn: async ({ data }: { data: FormData }) => {
        return axios
          .post("/staff", data, {
            headers: { "Content-Type": "multipart/form-data" },
          })
          .then((res) => res.data);
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["staff"] });
      },
    });
  };

  return {
    useFetchStaff,
    useCreateStaff,
  };
};

export default StaffService;

  
  */ 