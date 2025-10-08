import { useForm } from "react-hook-form";
import { Button, message, Modal } from "antd";

import { useState } from "react";
import EmergencyService from "@/services/EmergencyService/EmergencyService";

//import StaffService from "@/services/StaffService/StaffService";


interface EmergencyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AddEmergency = ({ isOpen, onClose }: EmergencyModalProps) => {
  const { handleSubmit } = useForm();

  const onSubmit = (data: any) => {
    console.log("Form Data:", data);
    alert("Form submitted successfully!");
  };

 
  const { useCreateEmergency } = EmergencyService();

  const mutation = useCreateEmergency();

  const [name, setName] = useState("");
  const [helpline_no, setHelplineno] = useState("");
  //const [phone, setPhone] = useState("");



  const handleSave = () => {
    const formData = new FormData();

    formData.append("name", name);
    formData.append("helpline_no", helpline_no);
    //formData.append("phone", phone);
    

    for (const [key, value] of formData.entries()) {
      console.log(`${key}:`, value);
    }

    console.log("emergency values", {
      name,
      helpline_no,
     
    });

    mutation.mutate(
      { data: formData },
      {
        onSuccess: (res) => {
          message.success(res?.message || "Emergency Created Successfully");
          onClose();
          // Reset fields
          setName("");
          setHelplineno("");
         
        
        },
        onError: (err: any) => {
          const msg = err?.response?.data?.message || "Failed to create Emergency";
          message.error(msg);
          

        },
      }
    );
  };

  return (
    <Modal
      title="Add Emergency"
      open={isOpen}
      onCancel={onClose}
      footer={[
        <Button
          key="cancel"
          className="bg-red-500 text-backgroundPrimary hover:!bg-red-500 text-white"
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
      <form onSubmit={handleSubmit(onSubmit)} className=" w-full lg:max-w-4xl">
        <div className=" mt-6">
          <div className="space-y-2 font-poppins">
            <label className="text-[16px] font-semibold ">Name</label>
            <div className="flex items-center border rounded-md px-3 py-2">
              <input
                type="text"
                value={name}
                //onChange={(e) => setName(e.target.value)}

                onChange={(e) => {
                  const value = e.target.value;
                  // Capitalize first letter of each word
                  const formatted = value.replace(/\b\w/g, (char) =>
                    char.toUpperCase()
                  );
                  setName(formatted);
                }}
                placeholder="Enter Name"
                className="flex-1 outline-none text-sm"
              />
            </div>
          </div>

             <div className="mt-2 space-y-2 font-poppins">
          <label className="block text-[16px] font-semibold mb-1">Helpline No</label>
          <input
            type="number"
            value={helpline_no}
            onChange={(e) => setHelplineno(e.target.value)}
            placeholder="Enter helpline no"
            className="w-full border rounded-lg p-2 text-sm text-gray-700 bg-white shadow-sm outline-none resize-none"
          />
        </div>

          
        </div>


      </form>
    </Modal>
  );
};

export default AddEmergency;
