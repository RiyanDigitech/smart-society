import { buildUrlWithParams } from "@/lib/helpers";
import axios from "@/lib/config/axios-instance";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";


const ExpenseService = () => {
     const useGetExpense = (
   page? :number, pageSize?:number ) => {
  async function fetchExpense() {
    const url = buildUrlWithParams("/expense", {
      page,
      pageSize,
    });
    const res = await axios.get(url);
    return res.data; // { success, count, data: [...] }
  }

  return useQuery({
    queryFn: fetchExpense,
    queryKey: ["expense", {  page, pageSize }],
    retry: 0,
    refetchOnWindowFocus: false,
  });
};
     const useGetSummary = () => {
  async function fetchSummary() {
    const url = buildUrlWithParams("/expense/summary", { });
    const res = await axios.get(url);
    return res.data; // { success, count, data: [...] }
  }

  return useQuery({
    queryFn: fetchSummary,
    queryKey: ["expense"],
    retry: 0,
    refetchOnWindowFocus: false,
  });

};
  // Create Expense
const useCreateExpense = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ data }: { data: FormData }) => {
      return axios
        .post(`/expense`, data)
        .then((res) => res.data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["expense"] });
    },
  });
};
// update expense
const useUpdateExpense = () => {
    const queryClient = useQueryClient();

    return useMutation({
      mutationFn: async ({ id, data }: { id: string | number; data: any }) => {
        return axios
          .put(`/expense/${id}`, data)
          .then((res) => res.data);
      },

      onSuccess: (_data) => {
        queryClient.invalidateQueries({ queryKey: ["expense"] });
      },
    });
  };
//   delete expense
  const useDeleteExpense = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      id
    }: {
      id: number | string;
    }) => {
      const res = await axios.delete(`/expense/${id}`);
      return res.data;
    },
    onSuccess: (_data) => {
      queryClient.invalidateQueries({ queryKey: ["expense"] });
    },
  });
};
  return {
    useGetExpense,
    useGetSummary,
    useDeleteExpense,
    useCreateExpense,
    useUpdateExpense,
  }
}

export default ExpenseService
