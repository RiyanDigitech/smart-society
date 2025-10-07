import {
    Modal,
    Button,
    Form,
    Input,
    InputNumber,
    Select,
    Space,
    message,
    Row,
    Col,
} from "antd";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { postRegisterUnit } from "@/services/RegisterUnitServices/RegisterUnitServic";

const AddRegisterUnit = ({ postModalOpen, onClose }: any) => {
    const [form] = Form.useForm();
    const [occupation, setOccupation] = useState<string>("Owner");

    const handleSubmit = (values: any) => {
    const payload = {
        ...values,
        block: Number(values.block), // string -> number
        children: values.children || 0,
        adult: values.adult || 0,
        infant: values.infant || 0,
        totalMembers:
            (values.children || 0) +
            (values.adult || 0) +
            (values.infant || 0),
    };

    console.log("Final Payload:", payload);
    onClose();
    form.resetFields();
    addRegisterUnitMutation.mutate(payload);
};


    const queryClient = useQueryClient();
    const addRegisterUnitMutation = useMutation({
        mutationFn: postRegisterUnit,
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ["register"] });
            message.success(data?.message);
        },
        onError: (error: any) => {
            message.error(error?.reponse?.data?.message);
        },
    });

    return (
        <Modal
            title="Add Register Unit Modal"
            open={postModalOpen}
            onCancel={onClose}
            onOk={() => form.submit()}
            confirmLoading={addRegisterUnitMutation.isPending}
            okText="Add Register Unit"
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
                initialValues={{ vehicle: [{}], occupation: "Owner" }}
            >
                {/* Occupation */}
                <Row gutter={16}>
                    <Col span={8}>
                        <Form.Item
                            name="occupation"
                            label="Occupation"
                            rules={[{ required: true }]}
                        >
                            <Select
                                options={[
                                    { label: "Owner", value: "Owner" },
                                    { label: "Tenant", value: "Tenant" },
                                ]}
                                onChange={(value) => setOccupation(value)}
                            />
                        </Form.Item>
                    </Col>
                </Row>

                {/* Personal Information */}
                <Row gutter={16}>
                    <Col span={8}>
                        <Form.Item
                            name="fullname"
                            label="Full Name"
                            rules={[{ required: true }]}
                        >
                            <Input placeholder="eg. John Doe" />
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item
                            name="email"
                            label="Email"
                            rules={[{ required: true, type: "email" }]}
                        >
                            <Input placeholder="eg. john@example.com" />
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item
                            name="phone"
                            label="Phone"
                            rules={[{ required: true }]}
                        >
                            <Input placeholder="eg. 03123456123" />
                        </Form.Item>
                    </Col>
                </Row>

                <Row gutter={16}>
                    <Col span={8}>
                        <Form.Item
                            name="cnic"
                            label="CNIC"
                            rules={[{ required: true }]}
                        >
                            <Input placeholder="eg. 25xxx-xxxxxxx-x" />
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item
                            name="block"
                            label="Block"
                            rules={[{ required: true }]}
                        >
                            <Select
                                options={[
                                    { label: "1", value: "1" },
                                    { label: "2", value: "2" },
                                ]}
                            />
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item
                            name="flatType"
                            label="Flat Type"
                            rules={[{ required: true }]}
                        >
                            <Select
                                options={[
                                    { label: "2 Bed DD", value: "2 Bed DD" },
                                    { label: "3 Bed DD", value: "3 Bed DD" },
                                    { label: "Penthouse", value: "Penthouse" },
                                ]}
                            />
                        </Form.Item>
                    </Col>
                </Row>

                <Row gutter={16}>
                    <Col span={8}>
                        <Form.Item
                            name="unitNo"
                            label="Flat No"
                            rules={[{ required: true }]}
                        >
                            <InputNumber
                                placeholder="eg. 301"
                                type="number"
                                style={{ width: "100%" }}
                            />
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item
                            name="password"
                            label="Password"
                            rules={[{ required: true }]}
                        >
                            <Input.Password placeholder="**********" />
                        </Form.Item>
                    </Col>
                </Row>

                {/* Conditionally Show Members if Owner */}
                {occupation === "Owner" && (
                    <>
                        <h2 className="text-lg font-bold underline mb-4">
                            Members
                        </h2>
                        <Row gutter={16}>
                            <Col span={8}>
                                <Form.Item name="children" label="Children">
                                    <InputNumber
                                        type="number"
                                        style={{ width: "100%" }}
                                    />
                                </Form.Item>
                            </Col>
                            <Col span={8}>
                                <Form.Item name="adult" label="Adult">
                                    <InputNumber
                                        type="number"
                                        style={{ width: "100%" }}
                                    />
                                </Form.Item>
                            </Col>
                            <Col span={8}>
                                <Form.Item name="infant" label="Infant">
                                    <InputNumber
                                        type="number"
                                        style={{ width: "100%" }}
                                    />
                                </Form.Item>
                            </Col>
                        </Row>
                    </>
                )}

                {/* Conditionally Show Vehicles if Owner */}
                {occupation === "Owner" && (
                    <Form.List name="vehicle">
                        {(fields, { add, remove }) => (
                            <>
                                <label className="font-semibold">
                                    Vehicles (Optional)
                                </label>
                                {fields.map(({ key, name, ...restField }) => (
                                    <Row
                                        gutter={16}
                                        key={key}
                                        align="middle"
                                    >
                                        <Col span={6}>
                                            <Form.Item
                                                {...restField}
                                                name={[name, "plateNo"]}
                                                rules={[
                                                    {
                                                        required: true,
                                                        message:
                                                            "Plate No required",
                                                    },
                                                ]}
                                            >
                                                <Input placeholder="Plate No" />
                                            </Form.Item>
                                        </Col>

                                        <Col span={6}>
                                            <Form.Item
                                                {...restField}
                                                name={[name, "name"]}
                                                rules={[
                                                    {
                                                        required: true,
                                                        message:
                                                            "Vehicle name required",
                                                    },
                                                ]}
                                            >
                                                <Input placeholder="Vehicle Name" />
                                            </Form.Item>
                                        </Col>

                                        <Col span={4}>
                                            <Form.Item
                                                {...restField}
                                                name={[name, "model"]}
                                                rules={[
                                                    {
                                                        required: true,
                                                        message:
                                                            "Model required",
                                                    },
                                                ]}
                                            >
                                                <InputNumber
                                                    type="number"
                                                    placeholder="Model"
                                                    style={{ width: "100%" }}
                                                />
                                            </Form.Item>
                                        </Col>

                                        <Col span={4}>
                                            <Form.Item
                                                {...restField}
                                                name={[name, "color"]}
                                            >
                                                <Input placeholder="Color" />
                                            </Form.Item>
                                        </Col>

                                        <Col span={3}>
                                            <Form.Item
                                                {...restField}
                                                name={[name, "type"]}
                                            >
                                                <Select
                                                    placeholder="Type"
                                                    options={[
                                                        {
                                                            label: "Car",
                                                            value: "Car",
                                                        },
                                                        {
                                                            label: "Bike",
                                                            value: "Bike",
                                                        },
                                                    ]}
                                                />
                                            </Form.Item>
                                        </Col>

                                        <Col span={1}>
                                            <MinusCircleOutlined
                                                onClick={() => remove(name)}
                                            />
                                        </Col>
                                    </Row>
                                ))}
                                <Form.Item>
                                    <Button
                                        type="dashed"
                                        onClick={() => add()}
                                        block
                                        icon={<PlusOutlined />}
                                    >
                                        Add Vehicle
                                    </Button>
                                </Form.Item>
                            </>
                        )}
                    </Form.List>
                )}
            </Form>
        </Modal>
    );
};

export default AddRegisterUnit;
