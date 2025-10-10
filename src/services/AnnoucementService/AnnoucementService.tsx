import axios from "@/lib/config/axios-instance";
import { buildUrlWithParams } from "@/lib/helpers";
import { AnnoucementData } from "@/lib/types/annoucement";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { message, notification } from "antd";

 interface AnnoucementListResponse {
  data: AnnoucementData[];
  total: number;
  page: number;
  lastPage: number;
}

const AnnoucementService = () => {
  const useFetchAnnoucement = (page?: number, pageSize?: number) => {
    async function fetchAnnoucement(): Promise<AnnoucementListResponse> {
      const url = buildUrlWithParams("/announcement", { page, pageSize });
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
      queryKey: ["annoucement", page, pageSize],
      queryFn: fetchAnnoucement,
      retry: 0,
      refetchOnWindowFocus: false,
    });
  };

  const useCreateAnnoucement = () => {
    const queryClient = useQueryClient();

    return useMutation({
      mutationFn: async ({ data }: { data: FormData }) => {
        return axios.post(`/announcement`, data).then((res) => res.data);
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["annoucement"] });
      },
    });
  };

  const useDeleteAnnoucementById = () => {
    const queryClient = useQueryClient();

    return useMutation({
      mutationFn: async (id: number) => {
        const response = await axios.delete(`/announcement/${id}`);
        return response.data;
      },
      onSuccess: () => {
        message.success("Annoucement Deleted successfully");
        queryClient.invalidateQueries({ queryKey: ["annoucement"] });
      },
      onError: (error: any) => {
        const message =
          error?.response?.data?.message || "Failed to Delete Annoucement";
        notification.error({ message });
      },
    });
  };

  const useUpdateAnnoucement = () => {
      const queryClient = useQueryClient();
  
      return useMutation({
        mutationFn: async ({ id, data }: { id: string | number; data: any }) => {
          return axios
            .put(`/announcement/${id}`, data)
            .then((res) => res.data);
        },
  
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ["annoucement"] });
        },
      });
    };

  return {
    useFetchAnnoucement,
    useCreateAnnoucement,
    useDeleteAnnoucementById,
    useUpdateAnnoucement
  
  };
};

export default AnnoucementService;