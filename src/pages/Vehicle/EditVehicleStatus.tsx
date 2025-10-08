import { useForm } from "react-hook-form";
import { Button, message, Modal } from "antd";
import { useState, useEffect } from "react";
import VehicleService from "@/services/VehicleService/VehicleService";

interface VehicleModalProps {
  isOpen: boolean;
  onClose: () => void;
  userData: any; 
}

const EditVehicleStatus = ({ isOpen, onClose, userData }: VehicleModalProps) => {
  const { handleSubmit } = useForm();

  const { useCreateVehicle } = VehicleService();
  const mutation = useCreateVehicle();

  const [vehicleStatus, setVehicleStatus] = useState("");

  useEffect(() => {
    if (userData) {
      setVehicleStatus(userData.vehicleStatus || "");
    }
  }, [userData, isOpen]);

  const onSubmit = (data: any) => {
    console.log("Form Data:", data);
    alert("Form submitted successfully!");
  };

   const isDirty =
    vehicleStatus !== (userData?.vehicleStatus || "") 

  const handleSave = () => {
    const formData = new FormData();
    formData.append("vehicleStatus", vehicleStatus);

    mutation.mutate(
        {
        id: userData.id,
        plateNo: userData.plateNo,
        vehicleStatus,
      },
    
      {
        onSuccess: (res) => {
          message.success(res?.message || "Vehicle Status Updated Successfully");
          onClose();
          setVehicleStatus("");
        },
        onError: (err: any) => {
          const msg = err?.response?.data?.message || "Failed to update vehicle status";
          message.error(msg);
        },
      }
    );
  };

  return (
    <Modal
      title="Update Vehicle Status"
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
            <label className="text-[16px] font-semibold">Vehicle Status</label>
            <div className="flex items-center border rounded-md px-3 py-2">
              <select
                value={vehicleStatus}
                onChange={(e) => setVehicleStatus(e.target.value)}
                className="flex-1 outline-none text-sm"
              >
                <option value="">Select Status</option>
                <option value="Approved">Approved</option>
                <option value="Freeze">Freeze</option>
                <option value="Pending">Pending</option>
              </select>
            </div>
          </div>
        </div>
      </form>
    </Modal>
  );
};

export default EditVehicleStatus;


