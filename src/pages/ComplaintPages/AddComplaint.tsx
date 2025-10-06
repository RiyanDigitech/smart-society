import { postComplaintFunc } from "@/services/ComplaintServices/ComplaintServices";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Col, Form, Input, InputNumber, message, Modal, Row, Select } from "antd";

function AddComplaint({ postModalOpen, onClose }: any) {
    const [form] = Form.useForm();

    const handleSubmit = (values: any) => {
        console.log("Final Payload:", values);
        onClose();
        form.resetFields();
        complaintMutation.mutate(values);
    };

    const queryClient = useQueryClient();
    const complaintMutation = useMutation({
  mutationFn: postComplaintFunc,
  onSuccess: (response) => {
    queryClient.invalidateQueries({ queryKey: ["complaint"] });

    if (response?.message) {
      message.success(response.message);
    } else if (response?.error) {
      message.error(response.error);
    }
  },
  onError: (error: any) => {
    message.error(error?.response?.data?.message || "Something went wrong");
  },
});


    return (

        <div>
            <Modal
                title="Add Complaint"
                open={postModalOpen}
                onCancel={onClose}
                onOk={() => form.submit()}
                confirmLoading={complaintMutation.isPending}
                okText="Add Complaint"
                cancelText="Cancel"
                okButtonProps={{
                    className: "bg-green-600 hover:!bg-green-700 text-white",
                }}
                cancelButtonProps={{
                    className: "hover:bg-red-600 hover:!text-white",
                }}
                width={800}
            >
                <Form
                    form={form}
                    layout="vertical"
                    onFinish={handleSubmit}
                >


                    {/* Personal Information */}
                    <Row gutter={16}>
                        <Col span={8}>
                            <Form.Item
                                name="title"
                                label="Title"
                                rules={[{ required: true }]}
                            >
                                <Input placeholder="eg. Electric" />
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item
                                name="description"
                                label="Description"
                                rules={[{ required: true }]}
                            >
                                <Input placeholder="eg. abc..." />
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item
                                name="type"
                                label="Type"
                                rules={[{ required: true }]}
                            >
                                <Select
                                    options={[
                                        { label: "Water", value: "Water" },
                                        { label: "Electric", value: "Electric" },
                                        { label: "Security", value: "Security" },
                                        { label: "Admin", value: "Admin" },
                                        { label: "Other", value: "Other" },
                                    ]}
                                />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row gutter={16}>


                        <Col span={8}>
                            <Form.Item
                                name="priority"
                                label="Priority"
                                rules={[{ required: true }]}
                            >
                                <Select
                                    options={[
                                        { label: "Low", value: "Low" },
                                        { label: "Medium", value: "Medium" },
                                        { label: "High", value: "High" },
                                        { label: "Urgent", value: "Urgent" },
                                    ]}
                                />
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item
                                name="unitNo"
                                label="Unit No"
                                rules={[{ required: true , type:"number" }]}
                            >
                                <InputNumber placeholder="eg. 1" />
                            </Form.Item>
                        </Col>
                    </Row>


                </Form>
            </Modal>
        </div>
    )
}

export default AddComplaint
