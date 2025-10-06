import { getComplaintbyId, updateComplaintFunc } from "@/services/ComplaintServices/ComplaintServices";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Col, Form, message, Modal, Row, Select } from "antd";
import { useEffect } from "react";

function EditComplaintModal({ putModalOpen, onClose, registerId }: any) {
  const [form] = Form.useForm();
  const queryClient = useQueryClient();

  // 🔹 Fetch complaint data by ID
  const { data, isLoading } = useQuery({
    queryKey: ["complaint", registerId],
    queryFn: () => getComplaintbyId(registerId),
    enabled: !!registerId,
  });

  const complaintData = data?.data;

  // 🔹 Pre-fill form when data loads
  useEffect(() => {
    if (complaintData) {
      form.setFieldsValue({
        complaintStatus: complaintData.complaintStatus,
      });
    }
  }, [complaintData, form]);

  // 🔹 Mutation for updating complaint
  const complaintMutation = useMutation({
    mutationFn: updateComplaintFunc,
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ["complaint"] });

      if (response?.success) {
        message.success(response?.message || "Complaint updated successfully.");
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
    complaintMutation.mutate({ id: registerId, values });
  };

  return (
    <Modal
      title="Edit Complaint"
      open={putModalOpen}
      onCancel={onClose}
      onOk={() => form.submit()}
      confirmLoading={complaintMutation.isPending}
      okText="Update Complaint"
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
              name="complaintStatus"
              label="Complaint Status"
              rules={[{ required: true, message: "Please select complaint status" }]}
            >
              <Select
                loading={isLoading}
                placeholder="Select complaint status"
                options={[
                  { label: "Resolved", value: "Resolved" },
                  { label: "Pending", value: "Pending" },
                  { label: "InProgress", value: "InProgress" },
                  { label: "Assign", value: "Assign" },
                  { label: "Closed", value: "Closed" },
                  { label: "Re Open", value: "Re Open" },
                ]}
              />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
}

export default EditComplaintModal;
