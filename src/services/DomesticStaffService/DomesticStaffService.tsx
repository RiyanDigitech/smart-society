import { buildUrlWithParams } from "@/lib/helpers";
import axios from "@/lib/config/axios-instance";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { message, notification } from "antd";

const DomesticStaffService = () => {

  const useGetDomesticStaff = (page?: number, pageSize?: number) => {
    async function fetchDomesticStaff() {
      const url = buildUrlWithParams("/supplementary/domestic-staff", {
        page,
        pageSize,
      });
      const res = await axios.get(url);
      return res.data;
    }

    return useQuery({
      queryFn: fetchDomesticStaff,
      queryKey: ["domesticstaff", { page, pageSize }],
      retry: 0,
      refetchOnWindowFocus: false,
    });
  };

    const useDeleteDomesticStaff = () => {
    const queryClient = useQueryClient();

    return useMutation({
      mutationFn: async (id: number) => {
        const response = await axios.delete(`/supplementary/delete-domestic-staff/${id}`);
        return response.data;
      },
      onSuccess: () => {
        message.success( "Domestic staff deactivated successfully" );
        queryClient.invalidateQueries({ queryKey: ["domesticstaff"] });
      },
      onError: (error: any) => {
        const message =
          error?.response?.data?.message || "Failed to deactivated Domestic staff";
        notification.error({ message });
      },
    });
  };


  return {
    useGetDomesticStaff,
    useDeleteDomesticStaff
  };
};

export default DomesticStaffService;
