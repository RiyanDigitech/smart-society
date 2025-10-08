import axios from "@/lib/config/axios-instance";
import { buildUrlWithParams } from "@/lib/helpers";
import { VehicleData } from "@/lib/types/vehicle";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

interface VehicleListResponse {
  data: VehicleData[];
  total: number;
  page: number;
  lastPage: number;
}

const VehicleService = () => {
  const useFetchVehicle = (page?: number, lastPage?: number) => {
    async function fetchVehicle(): Promise<VehicleListResponse> {
      const url = buildUrlWithParams("/register-unit", { page, lastPage });
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
      queryKey: ["vehicle", page, lastPage],
      queryFn: fetchVehicle,
      retry: 0,
      refetchOnWindowFocus: false,
    });
  };

  const useCreateVehicle = () => {
    const queryClient = useQueryClient();

    return useMutation({
      mutationFn: async ({
        id,
        plateNo,
        vehicleStatus,
      }: {
        id: number;
        plateNo: string;
        vehicleStatus: string;
      }) => {
        return axios
          .post("/register-unit/vehicles/approve", {
            id,
            plateNo,
            vehicleStatus,
          })
          .then((res) => res.data);
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["vehicle"] });
      },
    });
  };

  return {
    useFetchVehicle,
    useCreateVehicle,
  };
};

export default VehicleService;
