import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "@/lib/config/axios-instance";
import { buildUrlWithParams } from "@/lib/helpers";
import { VisitorData } from "@/lib/types/visitor";

export interface VisitorListResponse {
  data: VisitorData[];
  total: number;
}

const useVisitorService = () => {
  const queryClient = useQueryClient();

  const getAllVisitors = (
    page?: number,
    limit?: number,
    search?: string,
    status?: string
  ) => {
    async function fetchVisitors(): Promise<VisitorListResponse> {
      const url = buildUrlWithParams("/visitor/get-All-Visitors", {
        page,
        limit,
        search,
        status,
      });

      return axios.get(url).then((res) => ({
        data: res.data.data || [],
        total: res.data.data?.total || 0,
      }));
    }

    return useQuery({
      queryKey: ["visitors", page, limit, search, status],
      queryFn: fetchVisitors,
      retry: 0,
      refetchOnWindowFocus: false,
    });
  };

  const getVisitorById = (id: number) => {
    async function fetchVisitorById(): Promise<VisitorData> {
      return axios.get(`/visitor/${id}`).then((res) => res.data.data);
    }

    return useQuery({
      queryKey: ["visitors", id],
      queryFn: fetchVisitorById,
      enabled: !!id,
      retry: 0,
    });
  };

  const updateVisitorStatus = useMutation({
    mutationFn: async ({
      visitorId,
      visitorStatus,
    }: {
      visitorId: number;
      visitorStatus: string;
    }) => {
      return axios
        .post(`/visitor/update-visitor-status`, {
          visitorId,
          visitorStatus,
        })
        .then((res) => res.data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["visitors"] });
    },
  });

  return {
    getAllVisitors,
    getVisitorById,
    updateVisitorStatus
  };
};

export default useVisitorService;

