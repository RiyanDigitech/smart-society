import { buildUrlWithParams } from "@/lib/helpers";
import axios from "@/lib/config/axios-instance";
import { RenovationData } from "@/lib/types/renovation";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { message, notification } from "antd";

interface RenovationListResponse {
  data: RenovationData[];
  total: number;
  page: number;
  lastPage: number;
}

const RenovationService = () => {

  const useFetchRenovation = (page?: number,pageSize?: number) => {
    async function fetchRenovation(): Promise<RenovationListResponse> {
      const url = buildUrlWithParams("/renovation", { page, pageSize });
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
      queryKey: ["renovation", page, pageSize],
      queryFn: fetchRenovation,
      retry: 0,
      refetchOnWindowFocus: false,
    });
  };

  const useDeleteRenovationById = () => {
      const queryClient = useQueryClient();
  
      return useMutation({
        mutationFn: async (id: number) => {
          const response = await axios.delete(`/renovation/${id}`);
          return response.data;
        },
        onSuccess: () => {
          message.success("Renovation form deactivated successfully");
          queryClient.invalidateQueries({ queryKey: ["renovation"] });
        },
        onError: (error: any) => {
          const message =
            error?.response?.data?.message || "Failed to Delete Renovation";
          notification.error({ message });
        },
      });
    };

 

  return {
    useFetchRenovation,
    useDeleteRenovationById
  
  };
};

export default RenovationService;