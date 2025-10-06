import { Modal, Button, Input, Form, message } from "antd";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { changePasswordRegisterUnit } from "@/services/RegisterUnitServices/RegisterUnitServic";

const ChangePasswordModal = ({ registerId, changePasswordModal, onClose }: any) => {
  const [form] = Form.useForm();

  const handleOk = async () => {
    try {
      const values = await form.validateFields();

      // Sirf newPassword console me show karega
      const payload = { 
        id : registerId,
        newPassword: values.newPassword };

      console.log("Form Data:", payload);

      updatePasswordMutation.mutate(payload);
    } catch (error) {
      console.error(error);
      message.error("Please fill all fields correctly.");
    }
  };

  const queryClient = useQueryClient();
  const updatePasswordMutation = useMutation({
    mutationFn: changePasswordRegisterUnit,
    onSuccess: (res: any) => {
      queryClient.invalidateQueries({ queryKey: ["register"] });
      message.success(res.message || "Password updated successfully!");
      onClose();
      form.resetFields();
    },
    onError: () => {},
  });

  return (
    <>
      <Modal
        title="Change Password"
        open={changePasswordModal}
        onCancel={onClose}
        footer={null}
        centered
      >
        <Form form={form} layout="vertical">
          {/* New Password */}
          <Form.Item
            name="newPassword"
            label="New Password"
            rules={[
              { required: true, message: "Please enter new password" },
              { min: 6, message: "Password must be at least 6 characters" },
            ]}
          >
            <Input.Password placeholder="Enter new password" />
          </Form.Item>

          {/* Confirm Password */}
          <Form.Item
            name="confirmPassword"
            label="Confirm Password"
            dependencies={["newPassword"]}
            rules={[
              { required: true, message: "Please confirm your password" },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("newPassword") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error("Passwords do not match!")
                  );
                },
              }),
            ]}
          >
            <Input.Password placeholder="Confirm new password" />
          </Form.Item>

          <div className="flex justify-end gap-4 mt-6">
            <Button
              onClick={onClose}
              className="bg-red-500 text-white hover:!bg-red-700"
            >
              Cancel
            </Button>
            <Button
              htmlType="submit"
              className="bg-primary text-white hover:!bg-green-700"
              onClick={handleOk}
            >
              Update Password
            </Button>
          </div>
        </Form>
      </Modal>
    </>
  );
};

export default ChangePasswordModal;
