import { useState, useEffect } from "react";
import { Button, Modal, Input, message } from "antd";
import EmergencyService from "@/services/EmergencyService/EmergencyService";

interface UpdateEmergencyModalProps {
  open: boolean;
  onClose: () => void;
  userData: any;
}

const UpdateEmergency = ({ open, onClose, userData }: UpdateEmergencyModalProps) => {
  const { useUpdateEmergency } = EmergencyService();
  const { mutate: updateStaff, isPending } = useUpdateEmergency();

  const [name, setName] = useState("");
  const [helpline_no, setHelplineno] = useState("");


  useEffect(() => {
    if (userData) {
      setName(userData.name || "");
      setHelplineno(userData.helpline_no || "");
  
    }
  }, [userData, open]);

  const isDirty =
    name !== (userData?.name || "") ||
    helpline_no !== (userData?.helpline_no || "") 

  const handleSave = () => {
    const data = {
      name,
      helpline_no
    };

    updateStaff(
      {
        id: userData.id,
        data,
      },
      {
        onSuccess: () => {
          message.success("Emergency Updated Successfully");
          onClose();
        },
        onError: (err: any) => {
          const msg = err?.response?.data?.message || "Failed to update Emergency";
          message.error(msg);
        },
      }
    );
  };

  return (
    <Modal
      title="Update Emergency"
      open={open}
      onCancel={onClose}
      footer={[
        <Button
          key="cancel"
          className="bg-red-500 text-backgroundPrimary hover:!bg-red-700 text-white"
          onClick={onClose}
        >
          Cancel
        </Button>,
        <Button
          key="save"
          className="bg-primary text-backgroundPrimary hover:!bg-green-700 transition disabled:opacity-50 text-white"
          onClick={handleSave}
          loading={isPending}
          disabled={!isDirty}
        >
          Update
        </Button>,
      ]}
      centered
    >
      <div className="space-y-4">
        <div className="">
          <label className="block text-gray-600 mb-1">Name</label>
          <Input
            type="text"
            value={name}
            onChange={(e) => {
                const value = e.target.value;
                // Capitalize first letter of each word
                const formatted = value.replace(/\b\w/g, (char) =>
                  char.toUpperCase()
                );
                setName(formatted);
              }}
            //onChange={(e) => setName(e.target.value)}
            className="flex-1 !border-[#D1D5DB] hover:!border-[#D1D5DB]"
          />
        </div>
       

        <div>
          <label className="block text-gray-600 mb-1">Helpline No</label>
          <Input
            type="tel"
            value={helpline_no}
            onChange={(e) => setHelplineno(e.target.value)}
            className="flex-1 !border-[#D1D5DB] hover:!border-[#D1D5DB]"
          />
        </div>

      
      </div>
    </Modal>
  );
};

export default UpdateEmergency;
