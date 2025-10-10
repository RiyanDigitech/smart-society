import { buildUrlWithParams } from "@/lib/helpers";
import axios from "@/lib/config/axios-instance";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";


const CommunityService = () => {
     const useGetCommunity = (
   page? :number, pageSize?:number ) => {
  async function fetchExpense() {
    const url = buildUrlWithParams("/communityposts", {
      page,
      pageSize,
    });
    const res = await axios.get(url);
    return res.data; // { success, count, data: [...] }
  }

  return useQuery({
    queryFn: fetchExpense,
    queryKey: ["communityposts", {  page, pageSize }],
    retry: 0,
    refetchOnWindowFocus: false,
  });
};

  // Create Community post
const useCreateCommunity = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ data }: { data: FormData }) => {
      return axios
        .post(`/communityposts`, data)
        .then((res) => res.data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["communityposts"] });
    },
  });
};
// update communityposts
const useUpdateCommunity = () => {
    const queryClient = useQueryClient();

    return useMutation({
      mutationFn: async ({ postId, data }: { postId: string | number; data: any }) => {
        return axios
          .put(`/communityposts/${postId}`, data)
          .then((res) => res.data);
      },

      onSuccess: (_data) => {
        queryClient.invalidateQueries({ queryKey: ["communityposts"] });
      },
    });
  };
//   delete communityposts
  const useDeleteCommunity = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      postId
    }: {
      postId: number | string;
    }) => {
      const res = await axios.delete(`/communityposts/${postId}`);
      return res.data;
    },
    onSuccess: (_data) => {
      queryClient.invalidateQueries({ queryKey: ["communityposts"] });
    },
  });
};
  return {
    useGetCommunity,
    useDeleteCommunity,
    useCreateCommunity,
    useUpdateCommunity,
  }
}

export default CommunityService
