import { useQuery } from "@tanstack/react-query";
import axios from "@/lib/config/axios-instance";
import { buildUrlWithParams } from "@/lib/helpers";

export interface MaintenanceResponse {
  data: { key: string; name: string; amount: number; date: string }[];
  total: number;
}

const MaintenanceService = () => {
  const useFetchMaintenance = (
    limit?: number,
    page?: number,
    search?: string,
    startDate?: string,
    endDate?: string
  ) => {
    async function fetchMaintenance(): Promise<MaintenanceResponse> {
      const url = buildUrlWithParams("/maintenance", {
        limit,
        page,
        search,
        startDate,
        endDate,
      });
      return axios.get(url).then((res) => res.data);
    }

    return useQuery({
      queryFn: fetchMaintenance,
      queryKey: ["maintenance", limit, page, search, startDate, endDate],
      retry: 0,
      refetchOnWindowFocus: false,
    });
  };

  return {
    useFetchMaintenance,
  };
};

export default MaintenanceService;
