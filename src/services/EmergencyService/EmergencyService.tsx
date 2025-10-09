import axios from "@/lib/config/axios-instance";
import { buildUrlWithParams } from "@/lib/helpers";
import { EmergencyData } from "@/lib/types/emergency";
import {  useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { message, notification } from "antd";

 interface EmergencyListResponse {
  data: EmergencyData[];
  total: number;
  page: number;
  lastPage: number;
}

const EmergencyService = () => {
  const useFetchEmergency = (page?: number, pageSize?: number) => {
    async function fetchEmergency(): Promise<EmergencyListResponse> {
      const url = buildUrlWithParams("/emergency", { page, pageSize });
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
      queryKey: ["emergency", page, pageSize],
      queryFn: fetchEmergency,
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