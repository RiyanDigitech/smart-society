import ExpenseService from "@/services/expenseService/ExpenseService";
import { Button, Modal, message } from "antd";
import { Camera, Pencil } from "lucide-react";
import { useEffect, useState } from "react";

interface ExpenseModalProps {
  open: boolean;
  onClose: () => void;
  editingExpense?: any | null;
}

const ExpenseModal = ({ open, onClose, editingExpense }: ExpenseModalProps) => {
  const { useCreateExpense, useUpdateExpense } = ExpenseService();

  const createExpense = useCreateExpense();
  const updateExpense = useUpdateExpense();

  const [purpose, setPurpose] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");
  const [payslip, setPayslip] = useState<File | null>(null);

  useEffect(() => {
    if (editingExpense) {
      setPurpose(editingExpense.purpose || "");
      setAmount(editingExpense.expenseAmount || "");
       setDate(
      editingExpense.Date
        ? new Date(editingExpense.Date).toISOString().split("T")[0] // ✅ only date part
        : ""
    );
      setPayslip(null);
    } else {
      setPurpose("");
      setAmount("");
      setDate("");
      setPayslip(null);
    }
  }, [editingExpense]);

  const handleSave = () => {
    const formData = new FormData();
    formData.append("purpose", purpose);
    formData.append("amount", amount);
    formData.append("date", date);
    if (payslip) formData.append("payslip", payslip);

    if (editingExpense) {
      // UPDATE
      updateExpense.mutate(
        { id: editingExpense.id, data: formData },
        {
          onSuccess: (res) => {
            message.success(res?.message || "Expense updated successfully ✅");
            onClose();
          },
          onError: (err: any) => {
            message.error(
              err?.response?.data?.message || "Failed to update expense ❌"
            );
          },
        }
      );
    } else {
      // CREATE
      createExpense.mutate(
        { data: formData },
        {
          onSuccess: (res) => {
            message.success(res?.message || "Expense created successfully ✅");
            setPurpose("");
            setAmount("");
            setDate("");
            setPayslip(null);
            onClose();
          },
          onError: (err: any) => {
            message.error(
              err?.response?.data?.message || "Failed to create expense ❌"
            );
          },
        }
      );
    }
  };

  const isDisabled =
    !purpose ||
    !amount ||
    !date ||
    createExpense.isPending ||
    updateExpense.isPending;

  return (
    <Modal
      title={editingExpense ? "Update Expense" : "Add Expense"}
      open={open}
      onCancel={onClose}
      footer={[
        <Button
          key="cancel"
          className="bg-red-500 text-white hover:!bg-red-700"
          onClick={onClose}
        >
          Cancel
        </Button>,
        <Button
          key="save"
          className="bg-green-600 text-white hover:!bg-green-700"
          onClick={handleSave}
          disabled={isDisabled}
          loading={createExpense.isPending || updateExpense.isPending}
        >
          {editingExpense ? "Update" : "Save"}
        </Button>,
      ]}
      centered
    >
      <div className="p-6 flex flex-col lg:flex-row gap-8 items-start w-full lg:max-w-4xl">
        {/* Image Upload */}
        <div className="flex flex-col items-center gap-4 w-full lg:w-1/4">
          <div className="relative w-32 h-32 sm:w-36 sm:h-36 rounded-full bg-gray-200 flex items-center justify-center">
            {payslip ? (
              <img
                src={URL.createObjectURL(payslip)}
                alt="Preview"
                className="w-full h-full object-cover rounded-full"
              />
            ) : editingExpense?.payslip ? (
              <img
                src={editingExpense.payslip}
                alt="Existing"
                className="w-full h-full object-cover rounded-full"
              />
            ) : (
              <span className="text-gray-400 text-xs">No Payslip</span>
            )}
            <label className="absolute bottom-2 right-2 bg-[#E3FCDD] border border-green-500 rounded-full p-1 cursor-pointer hover:bg-green-50">
              <Camera className="w-4 h-4 text-green-600" />
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                  if (e.target.files && e.target.files[0]) {
                    setPayslip(e.target.files[0]);
                  }
                }}
              />
            </label>
          </div>
        </div>

        {/* Fields */}
        <div className="flex-1 space-y-4 font-poppins w-full">
          <div>
            <label className="block text-xs font-semibold mb-1">Purpose</label>
            <input
              type="text"
              value={purpose}
              onChange={(e) => setPurpose(e.target.value)}
              className="w-full rounded-md border border-gray-300 px-2 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-green-500"
            />
            <Pencil className="absolute right-2.5 top-2.5 w-4 h-4 text-gray-400" />
          </div>

          <div>
            <label className="block text-xs font-semibold mb-1">Amount</label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full rounded-md border border-gray-300 px-2 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-green-500"
            />
          </div>

          <div>
  <label className="block text-xs font-semibold mb-1">Date</label>
  <input
    type="date" // ✅ changed from datetime-local
    value={date}
    onChange={(e) => setDate(e.target.value)}
    className="w-full rounded-md border border-gray-300 px-2 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-green-500"
  />
</div>

        </div>
      </div>
    </Modal>
  );
};

export default ExpenseModal;
