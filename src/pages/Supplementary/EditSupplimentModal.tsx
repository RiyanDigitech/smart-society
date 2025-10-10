import { getComplaintbyId, updateComplaintFunc } from "@/services/ComplaintServices/ComplaintServices";
import { updateSupplementryMutationFunc } from "@/services/SupplementaryServices/SupplementaryServices";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Col, Form, message, Modal, Row, Select } from "antd";
import { useEffect } from "react";

function EditSupplimentModal({ editModal, onClose, supplimentID }: any) {
  const [form] = Form.useForm();
  const queryClient = useQueryClient();

  // 🔹 Mutation for updating complaint
  const SupplementryMutation = useMutation({
    mutationFn: updateSupplementryMutationFunc,
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ["supplementary"] });

      if (response?.success) {
        message.success(response?.message || "Supplementry updated successfully.");
      } else {
        message.error(response?.message || "Something went wrong");
      }

      form.resetFields();
      onClose();
    },
    onError: (error: any) => {
      message.error(error?.response?.data?.message || "Something went wrong");
    },
  });

  // 🔹 Submit handler
  const handleSubmit = (values: any) => {
    const payload = {id: supplimentID , supplementryStatus:values.supplementryStatus}
    SupplementryMutation.mutate(payload);
    // console.log(payload)
  };

  return (
    <Modal
      title="Edit Supplementry Status"
      open={editModal}
      onCancel={onClose}
      onOk={() => form.submit()}
      confirmLoading={SupplementryMutation.isPending}
      okText="Update Supplementary"
      cancelText="Cancel"
      okButtonProps={{
        className: "bg-green-600 hover:!bg-green-700 text-white",
      }}
      cancelButtonProps={{
        className: "hover:bg-red-600 hover:!text-white",
      }}
      width={600}
    >
      <Form form={form} layout="vertical" onFinish={handleSubmit}>
        <Row gutter={16}>
          <Col span={24}>
            <Form.Item
              name="supplementryStatus"
              label="Supplementry Status"
              rules={[{ required: true, message: "Please select complaint status" }]}
            >
              <Select
                // loading={isLoading}
                placeholder="Select complaint status"
                options={[
                  { label: "Approve", value: "approved" },
                  { label: "Pending", value: "pending" },
                  { label: "Decline", value: "decline" },
                  { label: "Freeze", value: "freeze" },
                ]}
              />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
}

export default EditSupplimentModal;
