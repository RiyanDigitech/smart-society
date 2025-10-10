import { useForm } from "react-hook-form";
import { Button, message, Modal } from "antd";
import { useState } from "react";
import { Camera } from "lucide-react";
import AnnoucementService from "@/services/AnnoucementService/AnnoucementService";

interface AnnoucementModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AddAnnoucement = ({ isOpen, onClose }: AnnoucementModalProps) => {
  const { handleSubmit } = useForm();

  const onSubmit = (data: any) => {
    console.log("Form Data:", data);
    alert("Form submitted successfully!");
  };

  const { useCreateAnnoucement } = AnnoucementService();

  const mutation = useCreateAnnoucement();

  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [image, setImage] = useState<File | null>(null);


  const handleSave = () => {
    const formData = new FormData();

    formData.append("title", title);
    formData.append("body", body);
    if (image) formData.append("image", image);

    for (const [key, value] of formData.entries()) {
      console.log(`${key}:`, value);
    }

    console.log("emergency values", {
      title,
      body,
      image,
    });

    mutation.mutate(
      { data: formData },
      {
        onSuccess: (res) => {
          message.success(res?.message || "Annoucement Created Successfully");
          onClose();
          // Reset fields
          setTitle("");
          setBody("");
          setImage(null);
        },
        onError: (err: any) => {
          const msg =
            err?.response?.data?.message || "Failed to create Annoucement";
          message.error(msg);
        },
      }
    );
  };

  return (
    <Modal
      title="Add Annoucement"
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
            <label className="text-[16px] font-semibold ">Image</label>
            <div className="relative w-32 h-32 sm:w-36 sm:h-36 rounded-lg bg-gray-200 flex items-center justify-center">
              {image ? (
                <img
                  src={URL.createObjectURL(image)}
                  alt="Preview"
                  className="w-full h-full object-cover rounded-lg"
                />
              ) : (
                <span className="text-gray-400 text-xs">Image</span>
              )}
              <label className="absolute bottom-2 right-2 bg-[#E3FCDD] border border-green-500 rounded-full p-1 cursor-pointer hover:bg-green-50">
                <Camera className="w-4 h-4 text-green-600" />
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {
                    if (e.target.files && e.target.files[0]) {
                      setImage(e.target.files[0]);
                    }
                  }}
                />
              </label>
            </div>

            <label className="text-[16px] font-semibold ">Title</label>
            <div className="flex items-center border rounded-md px-3 py-2">
              <div>
                <input
                  type="text"
                  value={title}
                  //onChange={(e) => setName(e.target.value)}

                  onChange={(e) => {
                    const value = e.target.value;
                    // Capitalize first letter of each word
                    const formatted = value.replace(/\b\w/g, (char) =>
                      char.toUpperCase()
                    );
                    setTitle(formatted);
                  }}
                  placeholder="Enter Title"
                  className="flex-1 outline-none text-sm"
                />
              </div>
            </div>
          </div>

          <div className="mt-2 space-y-2 font-poppins">
            <label className="block text-[16px] font-semibold mb-1">Body</label>
            <input
              type="text"
              value={body}
              onChange={(e) => {
                    const value = e.target.value;
                   
                    const formatted = value.replace(/\b\w/g, (char) =>
                      char.toUpperCase()
                    );
                    setBody(formatted);
                  }}
      
              placeholder="Enter Body"
              className="w-full border rounded-lg p-2 text-sm text-gray-700 bg-white shadow-sm outline-none resize-none"
            />
          </div>
        </div>
      </form>
    </Modal>
  );
};

export default AddAnnoucement;
