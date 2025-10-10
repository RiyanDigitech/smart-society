import CommunityService from "@/services/communityservice/CommunityService";
import { Button, Modal, message, Select, Input } from "antd";
import { Camera } from "lucide-react";
import { useEffect, useState } from "react";

const { Option } = Select;

interface CommunityModalProps {
  open: boolean;
  onClose: () => void;
  editingCommunity?: any | null;
}

const CommunityModal = ({ open, onClose, editingCommunity }: CommunityModalProps) => {
  const { useCreateCommunity, useUpdateCommunity } = CommunityService();

  const createCommunity = useCreateCommunity();
  const updateCommunity = useUpdateCommunity();

  const [type, setType] = useState("");
  const [text, setText] = useState("");
  const [image, setImage] = useState<File | null>(null);

  // Fields for pollpost
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [options, setOptions] = useState<string[]>([""]);
 
  const resetFields = () => {
  setType("");
  setText("");
  setImage(null);
  setTitle("");
  setDescription("");
  setOptions([]);
};

  useEffect(() => {
    if (editingCommunity) {
      setType(editingCommunity.type || "");
      if (editingCommunity.type === "pollpost") {
        setTitle(editingCommunity.title || "");
        setDescription(editingCommunity.description || "");
        setOptions(editingCommunity.options || [""]);
      } else {
        setText(editingCommunity.text || "");
      }
      setImage(null);
    } else {
      setType("");
      setText("");
      setTitle("");
      setDescription("");
      setOptions([""]);
      setImage(null);
    }
  }, [editingCommunity]);

  const handleAddOption = () => {
    setOptions([...options, ""]);
  };

  const handleOptionChange = (value: string, index: number) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const handleRemoveOption = (index: number) => {
    setOptions(options.filter((_, i) => i !== index));
  };

  const handleSave = () => {
  let payload: any;
  let mutationFn: any;

  if (type === "simplepost") {
    // For simplepost => use FormData
    const formData = new FormData();
    formData.append("type", type);
    formData.append("text", text);
    if (image) formData.append("image", image);

    payload = editingCommunity
      ? { postId: editingCommunity.id, data: formData }
      : { data: formData };
    mutationFn = editingCommunity
      ? updateCommunity.mutate
      : createCommunity.mutate;
  } else if (type === "pollpost") {
    // For pollpost => send JSON
    const jsonData = {
      type: "pollpost",
      title,
      description,
      options,
    };

    payload = editingCommunity
      ? { postId: editingCommunity.id, data: jsonData }
      : { data: jsonData };

    mutationFn = editingCommunity
      ? updateCommunity.mutate
      : createCommunity.mutate;
  } else {
    message.error("Please select a valid type");
    return;
  }

  mutationFn(payload, {
    onSuccess: (res: any) => {
      message.success(
        res?.message ||
          (editingCommunity
            ? "Post updated successfully ✅"
            : "Post created successfully ✅")
      );
      onClose();
      resetFields();
    },
    onError: (err: any) => {
      message.error(err?.response?.data?.message || "Request failed ❌");
    },
  });
};


  const isDisabled =
    !type ||
    createCommunity.isPending ||
    updateCommunity.isPending ||
    (type === "simplepost" && !text) ||
    (type === "pollpost" && (!title || !description || options.some((o) => !o)));

  return (
    <Modal
      title={editingCommunity ? "Update Community" : "Add Community"}
      open={open}
      onCancel={onClose}
      centered
      footer={[
        <Button
          key="cancel"
          className="bg-red-500 text-white hover:!bg-red-700"
          onClick={onClose}
        >
          Cancel
        </Button>,
        <Button
          key="save"
          className="bg-green-600 text-white hover:!bg-green-700"
          onClick={handleSave}
          disabled={isDisabled}
          loading={createCommunity.isPending || updateCommunity.isPending}
        >
          {editingCommunity ? "Update" : "Save"}
        </Button>,
      ]}
    >
      <div className="flex flex-col gap-6">
        {/* Type Select */}
        <div>
          <label className="block text-xs font-semibold mb-1">Type</label>
          <Select
            value={type}
            onChange={(value) => setType(value)}
            placeholder="Select Post Type"
            className="w-full"
          >
            <Option value="simplepost">Simple Post</Option>
            <Option value="pollpost">Poll Post</Option>
          </Select>
        </div>

        {/* ✅ Conditional Fields */}
        {type === "simplepost" && (
          <>
            {/* Image Upload */}
            <div className="flex flex-col items-center gap-4">
              <div className="relative w-32 h-32 rounded bg-gray-200 flex items-center justify-center">
                {image ? (
                  <img
                    src={URL.createObjectURL(image)}
                    alt="Preview"
                    className="w-full h-full object-cover rounded"
                  />
                ) : editingCommunity?.image ? (
                  <img
                    src={editingCommunity.image}
                    alt="Existing"
                    className="w-full h-full object-cover rounded-full"
                  />
                ) : (
                  <span className="text-gray-400 text-xs">No image</span>
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
            </div>

            {/* Text Field */}
            <div>
              <label className="block text-xs font-semibold mb-1">Text</label>
              <Input
                placeholder="Enter text"
                value={text}
                onChange={(e) => {
                let value = e.target.value;
                value = value.toLowerCase();
                value = value.replace(/(^\w{1})|(\.\s*\w{1})/g, (match) =>
                  match.toUpperCase()
                );
                setText(value);
              }}
                className="w-full rounded-md border border-gray-300 px-2 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-green-500"
              />
            </div>
          </>
        )}

        {type === "pollpost" && (
          <>
            <div>
              <label className="block text-xs font-semibold mb-1">Title</label>
              <Input
                placeholder="Enter poll title"
                value={title}
                onChange={(e) => {
                const value = e.target.value;
                // Capitalize first letter of each word
                const formatted = value.replace(/\b\w/g, (char) => char.toUpperCase());
                setTitle(formatted);
              }}
                className="w-full rounded-md border border-gray-300 px-2 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-green-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold mb-1">
                Description
              </label>
              <Input
                placeholder="Enter poll description"
                value={description}
                onChange={(e) => {
                let value = e.target.value;
                value = value.toLowerCase();
                value = value.replace(/(^\w{1})|(\.\s*\w{1})/g, (match) =>
                  match.toUpperCase()
                );
                setDescription(value);
              }}
                className="w-full rounded-md border border-gray-300 px-2 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-green-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold mb-1">Options</label>
              {options.map((opt, index) => (
                <div key={index} className="flex gap-2 mb-2">
                  <Input
                    placeholder={`Option ${index + 1}`}
                    value={opt}
                    onChange={(e) =>
                      handleOptionChange(e.target.value, index)
                    }
                    className="w-full rounded-md border border-gray-300 px-2 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-green-500"
                  />
                  {options.length > 1 && (
                    <Button danger onClick={() => handleRemoveOption(index)}>
                      Remove
                    </Button>
                  )}
                </div>
              ))}
              <Button
                type="dashed"
                className="mt-2 text-green-600 border-green-400 hover:!text-green-500 hover:!border-green-300"
                onClick={handleAddOption}
              >
                + Add Option
              </Button>
            </div>
          </>
        )}
      </div>
    </Modal>
  );
};

export default CommunityModal;
