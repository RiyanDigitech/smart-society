import axios from "@/lib/config/axios-instance";
import { buildUrlWithParams } from "@/lib/helpers";
import { AnnoucementData } from "@/lib/types/annoucement";
import { useQuery } from "@tanstack/react-query";

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

  

  return {
    useFetchAnnoucement
  
  };
};

export default AnnoucementService;