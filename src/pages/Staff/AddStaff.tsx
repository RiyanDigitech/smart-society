import { useForm } from "react-hook-form";
import { Button, message, Modal } from "antd";

import { useState } from "react";

import StaffService from "@/services/StaffService/StaffService";


interface StaffModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AddStaff = ({ isOpen, onClose }: StaffModalProps) => {
  const { handleSubmit } = useForm();

  const onSubmit = (data: any) => {
    console.log("Form Data:", data);
    alert("Form submitted successfully!");
  };

 
  const { useCreateStaff } = StaffService();

  const mutation = useCreateStaff();

  const [name, setName] = useState("");
  const [gender, setGender] = useState("");
  const [phone, setPhone] = useState("");
  const [cnic, setCnic] = useState("");
  const [address, setAddress] = useState("");
  const [designation, setDesignation] = useState("");


  const handleSave = () => {
    const formData = new FormData();

    formData.append("name", name);
    formData.append("gender", gender);
    formData.append("phone", phone);
    formData.append("cnic", cnic);
    formData.append("address", address);
    formData.append("designation", designation);

    for (const [key, value] of formData.entries()) {
      console.log(`${key}:`, value);
    }

    console.log("staff values", {
      name,
      gender,
      phone,
      cnic,
      address,
      designation,
    });

    mutation.mutate(
      { data: formData },
      {
        onSuccess: (res) => {
          message.success(res?.message || "Staff Created Successfully");
          onClose();
          // Reset fields
          setName("");
          setGender("");
          setCnic("");
          setPhone("");
          setAddress("");
          setDesignation("");
        
        },
        onError: (err: any) => {
          const msg = err?.response?.data?.message || "Failed to create staff";
          message.error(msg);
          

        },
      }
    );
  };

  return (
    <Modal
      title="Add Staff"
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

          <div className="space-y-2 font-poppins">
            <label className="text-[16px] font-semibold">Gender</label>
            <div className="flex items-center border rounded-md px-3 py-2 text-sm gap-2">
              <select
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                className="flex-1 outline-none bg-transparent"
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>
        </div>

        <div className="mt-2 space-y-2 font-poppins">
          <label className="block text-[16px] font-semibold mb-1">Phone</label>
          <input
            type="number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Enter Phone No"
            className="w-full border rounded-lg p-2 text-sm text-gray-700 bg-white shadow-sm outline-none resize-none"
          />
        </div>

        <div className="mt-2 space-y-2 font-poppins">
          <label className="block text-[16px] font-semibold mb-1">Cnic</label>
          <input
            type="text"
            value={cnic}
            onChange={(e) => setCnic(e.target.value)}
            placeholder="Enter Cnic"
            className="w-full border rounded-lg p-2 text-sm text-gray-700 bg-white shadow-sm outline-none resize-none"
          />
        </div>

        <div className="space-y-2 font-poppins ">
          <label className="text-[16px] font-semibold">Address</label>
          <div className="flex items-center border rounded-md px-3 py-2 text-sm gap-2">
            <input
              type="text"
              placeholder="Enter Address"
              className="flex-1 outline-none"
              value={address}
              onChange={(e) => {
                const value = e.target.value;
                // Capitalize first letter of each word
                const formatted = value.replace(/\b\w/g, (char) =>
                  char.toUpperCase()
                );
                setAddress(formatted);
              }}
              //onChange={(e) => setAddress(e.target.value)}
            />
          </div>
        </div>

        <div className="space-y-2 font-poppins">
          <label className="text-[16px] font-semibold">Designation</label>
          <div className="flex items-center border rounded-md px-3 py-2 text-sm gap-2">
            <input
              type="text"
              placeholder="Enter Designation"
              className="flex-1 outline-none"
              value={designation}
              onChange={(e) => {
                const value = e.target.value;
                // Capitalize first letter of each word
                const formatted = value.replace(/\b\w/g, (char) =>
                  char.toUpperCase()
                );
                setDesignation(formatted);
              }}
              //onChange={(e) => setDesignation(e.target.value)}
            />
          </div>
        </div>
      </form>
    </Modal>
  );
};

export default AddStaff;
