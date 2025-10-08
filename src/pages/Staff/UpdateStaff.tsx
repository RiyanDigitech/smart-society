import { useState, useEffect } from "react";
import { Button, Modal, Input, message } from "antd";
import StaffService from "@/services/StaffService/StaffService";

interface UpdateStaffModalProps {
  open: boolean;
  onClose: () => void;
  userData: any;
}

const UpdateStaff = ({ open, onClose, userData }: UpdateStaffModalProps) => {
  const { useUpdateStaff } = StaffService();
  const { mutate: updateStaff, isPending } = useUpdateStaff();

  const [name, setName] = useState("");
  const [gender, setGender] = useState("");
  const [phone, setPhone] = useState("");
  const [cnic, setCnic] = useState("");
  const [address, setAddress] = useState("");
  const [designation, setDesignation] = useState("");

  useEffect(() => {
    if (userData) {
      setName(userData.name || "");
      setGender(userData.gender || "");
      setPhone(userData.phone || "");
      setCnic(userData.cnic || "");
      setAddress(userData.address || "");
      setDesignation(userData.designation ?? true);
    }
  }, [userData, open]);

  const isDirty =
    name !== (userData?.name || "") ||
    gender !== (userData?.gender || "") ||
    phone !== (userData?.phone || "") ||
    cnic !== (userData?.cnic || "") ||
    address !== (userData?.address || "") ||
    designation !== (userData?.designation || "");

  const handleSave = () => {
    const data = {
      name,
      gender,
      phone,
      cnic,
      address,
      designation,
    };

    updateStaff(
      {
        id: userData.id,
        data,
      },
      {
        onSuccess: () => {
          message.success("Staff Updated Successfully");
          onClose();
        },
        onError: (err: any) => {
          const msg = err?.response?.data?.message || "Failed to update staff";
          message.error(msg);
        },
      }
    );
  };

  return (
    <Modal
      title="Update Staff"
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
          <label className="block text-gray-600 mb-1">Gender</label>
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
          {/* <Input
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            className="flex-1 !border-[#D1D5DB] hover:!border-[#D1D5DB]"
          /> */}
        </div>

        <div>
          <label className="block text-gray-600 mb-1">Phone</label>
          <Input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="flex-1 !border-[#D1D5DB] hover:!border-[#D1D5DB]"
          />
        </div>

        <div>
          <label className="block text-gray-600 mb-1">Cnic</label>
          <Input
            value={cnic}
            onChange={(e) => setCnic(e.target.value)}
            className="flex-1 !border-[#D1D5DB] hover:!border-[#D1D5DB]"
          />
        </div>

        <div className="">
          <label className="block text-gray-600 mb-1">Address</label>
          <Input
            type="text"
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
            className="flex-1 !border-[#D1D5DB] hover:!border-[#D1D5DB]"
          />
        </div>
        <div className="">
          <label className="block text-gray-600 mb-1">Designation</label>
          <Input
            type="text"
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
            className="flex-1 !border-[#D1D5DB] hover:!border-[#D1D5DB]"
          />
        </div>
      </div>
    </Modal>
  );
};

export default UpdateStaff;
