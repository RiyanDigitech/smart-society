import { useForm } from "react-hook-form";
import { Button, message, Modal } from "antd";
import { useState, useEffect } from "react";
import RenovationService from "@/services/RenovationService/RenovationService";

interface RenovationStatusProps {
  isOpen: boolean;
  onClose: () => void;
  userData: any; 
  renovationId: number ;
}

const EditRenovationStatus = ({ isOpen, onClose, userData,renovationId }: RenovationStatusProps) => {
  const { handleSubmit } = useForm();

  const { useUpdateRenovationStatus } = RenovationService();
  const mutation = useUpdateRenovationStatus();

  const [renovationStatus, setRenovationStatus] = useState("");

  useEffect(() => {
    if (userData) {
      setRenovationStatus(userData.renovationStatus || "");
    }
  }, [userData, isOpen]);

  const onSubmit = (data: any) => {
    console.log("Form Data:", data);
    alert("Form submitted successfully!");
  };

   const isDirty =
    renovationStatus !== (userData?.renovationStatus || "") 

  const handleSave = () => {
    const formData = new FormData();
    formData.append("renovationStatus", renovationStatus);

    mutation.mutate(
        {
        id: userData.id,
        renovationId,
        renovationStatus,
      },
    
      {
        onSuccess: (res) => {
          message.success(res?.message || "Renovation Status Updated Successfully");
          onClose();
          setRenovationStatus("");
        },
        onError: (err: any) => {
          const msg = err?.response?.data?.message || "Failed to update renovation status";
          message.error(msg);
        },
      }
    );
  };

  return (
    <Modal
      title="Update Renovation Status"
      open={isOpen}
      onCancel={onClose}
      footer={[
        <Button
          key="cancel"
          className="bg-red-500 hover:!bg-red-500 text-white"
          onClick={onClose}
        >
          Cancel
        </Button>,
        <Button
          key="save"
          className="bg-primary text-white hover:!bg-green-700 transition disabled:opacity-50"
          onClick={handleSave}
          loading={mutation.isPending}
          disabled={!isDirty}
        >
          Update
        </Button>,
      ]}
      centered
    >
      <form onSubmit={handleSubmit(onSubmit)} className="w-full lg:max-w-4xl">
        <div className="mt-6">
          <div className="space-y-2 font-poppins">
            <label className="text-[16px] font-semibold">Renovation Status</label>
            <div className="flex items-center border rounded-md px-3 py-2">
              <select
                value={renovationStatus}
                onChange={(e) => setRenovationStatus(e.target.value)}
                className="flex-1 outline-none text-sm"
              >
                <option value="">Select Status</option>
                 <option value="Pending">Pending</option>
                <option value="Payment Awaited">Payment Awaited</option>
                <option value="Approval Awaited">Approval Awaited</option>
                <option value="Proposal Awaited">Proposal Awaited</option>
                <option value="Approved">Approved</option>
                <option value="Rejected">Rejected</option>
              </select>
            </div>
          </div>
        </div>
      </form>
    </Modal>
  );
};

export default EditRenovationStatus;


