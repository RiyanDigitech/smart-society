import { useForm } from "react-hook-form";
import { Button, Modal } from "antd";

import { useState } from "react";



interface RenovationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AddRenovation = ({ isOpen, onClose }: RenovationModalProps) => {
  const { handleSubmit } = useForm();

  const onSubmit = (data: any) => {
    console.log("Form Data:", data);
    alert("Form submitted successfully!");
  };

 
//   const { useCreateEmergency } = EmergencyService();

//   const mutation = useCreateEmergency();

  const [charges, setCharges] = useState("");
  const [remarks, setRemarks] = useState("");
  



  const handleSave = () => {
    const formData = new FormData();

    formData.append("charges", charges);
    formData.append("remarks", remarks);
    
    

    for (const [key, value] of formData.entries()) {
      console.log(`${key}:`, value);
    }

    console.log("renovation values", {
      charges,
      remarks,
     
    });

    // mutation.mutate(
    //   { data: formData },
    //   {
    //     onSuccess: (res) => {
    //       message.success(res?.message || "renovation Created Successfully");
    //       onClose();
    //       // Reset fields
    //       setCharges("");
    //       setRemarks("");
         
        
    //     },
    //     onError: (err: any) => {
    //       const msg = err?.response?.data?.message || "Failed to create renovation";
    //       message.error(msg);
          

    //     },
    //   }
    // );
  };

  return (
    <Modal
      title="Add Renovation"
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
            Save
          {/* {mutation.isPending ? "Saving..." : "Save"} */}
        </Button>,
      ]}
      centered
    >
      <form onSubmit={handleSubmit(onSubmit)} className=" w-full lg:max-w-4xl">
        <div className=" mt-6">
          <div className="space-y-2 font-poppins">
            <label className="text-[16px] font-semibold ">Charges</label>
            <div className="flex items-center border rounded-md px-3 py-2">
              <input
                type="text"
                value={charges}
                //onChange={(e) => setName(e.target.value)}

                onChange={(e) => {
                  const value = e.target.value;
                  // Capitalize first letter of each word
                  const formatted = value.replace(/\b\w/g, (char) =>
                    char.toUpperCase()
                  );
                  setCharges(formatted);
                }}
                placeholder="Enter Charges"
                className="flex-1 outline-none text-sm"
              />
            </div>
          </div>

             <div className="mt-2 space-y-2 font-poppins">
          <label className="block text-[16px] font-semibold mb-1">Remarks</label>
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
