import ExpenseService from "@/services/expenseService/ExpenseService";


const Summary = () => {
    const {  useGetSummary } = ExpenseService();
    const { data:summary, isPending } = useGetSummary();
  const summaryData = summary?.data || {};
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        <div className="bg-green-50 border border-green-200 rounded-2xl p-5 shadow-sm text-center">
          <h3 className="text-gray-600 text-sm font-medium">
            Total Maintenance
          </h3>
          <p className="text-2xl font-semibold text-green-700 mt-2">
            {isPending ? "Loading..." : summaryData.TotalMaintenanceAmount ?? 0}
          </p>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-2xl p-5 shadow-sm text-center">
          <h3 className="text-gray-600 text-sm font-medium">Total Expense</h3>
          <p className="text-2xl font-semibold text-blue-700 mt-2">
            {isPending ? "Loading..." : summaryData.expense ?? 0}
          </p>
        </div>

        <div className="bg-red-50 border border-red-200 rounded-2xl p-5 shadow-sm text-center">
          <h3 className="text-gray-600 text-sm font-medium">Balance</h3>
          <p
            className={`text-2xl font-semibold mt-2 ${
              summaryData.Balance < 0 ? "text-red-600" : "text-green-600"
            }`}
          >
            {isPending ? "Loading..." : summaryData.Balance ?? 0}
          </p>
        </div>
      </div>
  )
}

export default Summary
