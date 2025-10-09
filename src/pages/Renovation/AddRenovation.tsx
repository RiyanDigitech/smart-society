import { useForm } from "react-hook-form";
import { Button, message, Modal } from "antd";
import { useState } from "react";
import RenovationService from "@/services/RenovationService/RenovationService";

interface RenovationModalProps {
  isOpen: boolean;
  onClose: () => void;
  renovationId: number | string;
}

const AddRenovation = ({ isOpen, onClose, renovationId }: RenovationModalProps) => {
  const { handleSubmit } = useForm();

  const userData = localStorage.getItem("userdetails");
  const approvedBy = userData ? JSON.parse(userData).fullname : "";

  const { useCreateRenovation } = RenovationService();
  const mutation = useCreateRenovation();

  const [charges, setCharges] = useState("");
  const [remarks, setRemarks] = useState("");

  const handleSave = () => {
    const payload = {
      charges: Number(charges),
      remarks,
      renovationId:Number(renovationId),
      approvedBy,
    };

    console.log("Sending Payload:", payload);

    mutation.mutate(payload, {
      onSuccess: (res) => {
        message.success(res?.message || "Renovation form status updated successfully");
        onClose();
        setCharges("");
        setRemarks("");
      },
      onError: (err: any) => {
        const msg = err?.response?.data?.message || "Failed to update renovation status";
        message.error(msg);
      },
    });
  };

  return (
    <Modal
      title="Add Renovation"
      open={isOpen}
      onCancel={onClose}
      footer={[
        <Button
          key="cancel"
          className="bg-red-500 text-white"
          onClick={onClose}
        >
          Cancel
        </Button>,
        <Button
          key="save"
          className="bg-primary text-backgroundPrimary hover:!bg-green-700 text-white"
          onClick={handleSave}
        >
          {mutation.isPending ? "Saving..." : "Save"}
        </Button>,
      ]}
      centered
    >
      <form onSubmit={handleSubmit(() => {})} className="w-full lg:max-w-4xl">
        <div className="mt-6">
          <div className="space-y-2 font-poppins">
            <label className="text-[16px] font-semibold">Charges</label>
            <div className="flex items-center border rounded-md px-3 py-2">
              <input
                type="number"
                value={charges}
                onChange={(e) => setCharges(e.target.value)}
                placeholder="Enter Charges"
                className="flex-1 outline-none text-sm"
              />
            </div>
          </div>

          <div className="mt-4 space-y-2 font-poppins">
            <label className="text-[16px] font-semibold">Remarks</label>
            <input
              type="text"
              value={remarks}
              onChange={(e) => setRemarks(e.target.value)}
              placeholder="Enter Remarks"
              className="w-full border rounded-lg p-2 text-sm text-gray-700 bg-white shadow-sm outline-none resize-none"
            />
          </div>
        </div>
      </form>
    </Modal>
  );
};

export default AddRenovation;