import axios from "@/lib/config/axios-instance";
import { buildUrlWithParams } from "@/lib/helpers";
import {  useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { message, notification } from "antd";

//  interface EmergencyListResponse {
//   data: EmergencyData[];
//   total: number;
//   page: number;
//   lastPage: number;
// }

const EmergencyService = () => {

  const useFetchEmergency = (
   page? :number, pageSize?:number ) => {
  async function fetchEmergency() {
    const url = buildUrlWithParams("/emergency", {
      page,
      pageSize,
    });
    const res = await axios.get(url);
    return res.data; 
  }

  return useQuery({
    queryFn: fetchEmergency,
    queryKey: ["emergency", {  page, pageSize }],
    retry: 0,
    refetchOnWindowFocus: false,
  });
};
  
  const useCreateEmergency = () => {
    const queryClient = useQueryClient();

    return useMutation({
      mutationFn: async ({ data }: { data: FormData }) => {
        return axios
          .post("/emergency", data, {
            headers: { "Content-Type": "multipart/form-data" },
          })
          .then((res) => res.data);
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["emergency"] });
      },
    });
  };

    const useDeleteEmergencyById = () => {
    const queryClient = useQueryClient();

    return useMutation({
      mutationFn: async (id: number) => {
        const response = await axios.delete(`/emergency/${id}`);
        return response.data;
      },
      onSuccess: () => {
        message.success( "Emergency Deleted successfully" );
        queryClient.invalidateQueries({ queryKey: ["emergency"] });
      },
      onError: (error: any) => {
        const message =
          error?.response?.data?.message || "Failed to Delete Emergency";
        notification.error({ message });
      },
    });
  };

  
  const useUpdateEmergency = () => {
    const queryClient = useQueryClient();

    return useMutation({
      mutationFn: async ({
        id,
        data,
      }: {
        id: string | number;
        data: {
          name: string;
          helpline_no: string;
         
        };
      }) => {
        return axios.put(`/emergency/${id}`, data).then((res) => res.data);
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["emergency"] });
      },
    });
  };


  return {
    useFetchEmergency,
    useCreateEmergency,
    useDeleteEmergencyById,
    useUpdateEmergency
  
  };
};

export default EmergencyService;