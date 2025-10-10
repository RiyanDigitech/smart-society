import { useState, useEffect } from "react";
import { Button, Modal, message } from "antd";
import AnnoucementService from "@/services/AnnoucementService/AnnoucementService";
import { Camera } from "lucide-react";


interface UpdateAnnouncementModalProps {
  open: boolean;
  onClose: () => void;
  userData: any;
}

const UpdateAnnouncement = ({ open, onClose, userData }: UpdateAnnouncementModalProps) => {
  const { useUpdateAnnoucement } = AnnoucementService();
  const { mutate: updateAnnouncement, isPending } = useUpdateAnnoucement();

  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [existingImage, setExistingImage] = useState<string | null>(null);



  useEffect(() => {
    if (userData) {
      setTitle(userData.title || "");
      setBody(userData.body || "");
      setImage(null)
      setExistingImage(userData.image || null);
  
    }
  }, [userData, open]);

  const isDirty =
    title !== (userData?.title || "") ||
    body !== (userData?.body || "") ||
    image !== (userData?.image )

    const handleSave = () => {
  const formData = new FormData();
  formData.append("title", title);
  formData.append("body", body);
  
  if (image) {
    formData.append("image", image);
  }

  updateAnnouncement(
    {
      id: userData.id,
      data: formData, 
    },
    {
      onSuccess: () => {
        message.success("Announcement Updated Successfully");
        onClose();
      },
      onError: (err: any) => {
        const msg = err?.response?.data?.message || "Failed to update Announcement";
        message.error(msg);
      },
    }
  );
};


//   const handleSave = () => {
//     const data = {
//       title,
//       body,image
//     };

//     updateStaff(
//       {
//         id: userData.id,
//         data,
//       },
//       {
//         onSuccess: () => {
//           message.success("Announcement Updated Successfully");
//           onClose();
//         },
//         onError: (err: any) => {
//           const msg = err?.response?.data?.message || "Failed to update Announcement";
//           message.error(msg);
//         },
//       }
//     );
//   };

  return (
    <Modal
      title="Update Announcement"
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
          <div>
            <label className="text-[16px] font-semibold ">Image</label>
            <div className="relative w-32 h-32 sm:w-36 sm:h-36 rounded-full bg-gray-200 flex items-center justify-center">
              {image ? (
                <img
                  src={URL.createObjectURL(image)}
                  alt="Preview"
                  className="w-full h-full object-cover rounded-lg"
                />
              ) : existingImage ? (
                <img
                  src={existingImage}
                  alt="Existing"
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
                      setExistingImage(null);
                    }
                  }}
                />
              </label>
            </div>

          </div>

          <label className="text-[16px] font-semibold ">Title</label>
          <div className="flex items-center border rounded-md px-3 py-2">
            <div>
              <input
                type="text"
                value={title}
               

                onChange={(e) => {
                  const value = e.target.value;
               
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

        <div>
          <label className="block text-[16px] font-semibold mb-1">Body</label>
          <input
            type="text"
            value={body}
            onChange={(e) => {
              const value = e.target.value;
              // Capitalize first letter of each word
              const formatted = value.replace(/\b\w/g, (char) =>
                char.toUpperCase()
              );
              setBody(formatted);
            }}
            //onChange={(e) => setBody(e.target.value)}
            placeholder="Enter Body"
            className="w-full border rounded-lg p-2 text-sm text-gray-700 bg-white shadow-sm outline-none resize-none"
          />
        </div>
      </div>
    </Modal>
  );
};

export default UpdateAnnouncement;
