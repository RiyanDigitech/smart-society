import {
  Modal,
  Button,
  Form,
  Input,
  InputNumber,
  Select,
  Row,
  Col,
  message,
} from "antd";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import {
  editRegisterUnit,
  getAllRegisterUsersbyId,
} from "@/services/RegisterUnitServices/RegisterUnitServic";

interface Props {
  putModalOpen: boolean;
  onClose: () => void;
  registerId: string;
}

const EditRegisterUnitModal = ({ putModalOpen, onClose, registerId }: Props) => {
  const [form] = Form.useForm();
  const queryClient = useQueryClient();

  // Fetch Data
  const { data, isLoading } = useQuery({
    queryKey: ["unit", registerId],
    queryFn: () => getAllRegisterUsersbyId(registerId),
    enabled: !!registerId,
  });

  const dataSources = data?.data;

  // Set Data in Form
  useEffect(() => {
    if (dataSources) {
      form.setFieldsValue({
        ...dataSources,
        block: Number(dataSources?.block),
        vehicle:
          dataSources?.vehicle?.length > 0
            ? dataSources.vehicle
            : [{ plateNo: "", name: "", model: "", color: "", type: "" }],
      });
    }
  }, [dataSources, form]);

  // Mutation
  const updateMutation = useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: any }) =>
      editRegisterUnit(id, payload),
    onSuccess: (res: any) => {
      queryClient.invalidateQueries({ queryKey: ["register"] });
      message.success(res?.message || "Unit Updated Successfully");
      form.resetFields();
      onClose();
    },
    onError: (error: any) => {
      message.error(error?.response?.data?.message || "Failed to update");
    },
  });

  // Submit Handler
  const handleSubmit = (values: any) => {
    const payload = {
      ...values,
      block: Number(values.block),
      children: values.children || 0,
      adult: values.adult || 0,
      infant: values.infant || 0,
      totalMembers:
        (values.children || 0) +
        (values.adult || 0) +
        (values.infant || 0),
    };

    updateMutation.mutate({ id: registerId, payload });
  };

  return (
    <Modal
      title="Update Register Unit"
      open={putModalOpen}
      onCancel={onClose}
      onOk={() => form.submit()}
      confirmLoading={updateMutation.isPending}
      okText="Update Unit"
      cancelText="Cancel"
      okButtonProps={{
        className: "bg-green-600 hover:bg-green-700 text-white",
      }}
      cancelButtonProps={{
        className: "hover:bg-red-600 hover:text-white",
      }}
      width={800}
      centered
    >
      {isLoading ? (
        <p className="text-center py-6">Loading...</p>
      ) : (
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          initialValues={{
            vehicle: [{ plateNo: "", name: "", model: "", color: "", type: "" }],
          }}
        >
          {/* Full Name / Email / Phone */}
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
              <Form.Item name="phone" label="Phone" rules={[{ required: true }]}>
                <Input placeholder="eg. 03123456123" />
              </Form.Item>
            </Col>
          </Row>

          {/* CNIC / Block / Flat Type */}
          <Row gutter={16}>
            <Col span={8}>
              <Form.Item name="cnic" label="CNIC" rules={[{ required: true }]}>
                <Input placeholder="25xxx-xxxxxxx-x" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item name="block" label="Block" rules={[{ required: true }]}>
                <Select
                  options={[
                    { label: "1", value: 1 },
                    { label: "2", value: 2 },
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

          {/* Flat No */}
          <Row gutter={16}>
            <Col span={8}>
              <Form.Item
                name="unitNo"
                label="Flat No"
                rules={[{ required: true }]}
              >
                <InputNumber style={{ width: "100%" }} />
              </Form.Item>
            </Col>
          </Row>

          {/* ✅ Conditionally show Members + Vehicles only if Owner */}
          <Form.Item noStyle shouldUpdate={(prev, curr) => prev.occupation !== curr.occupation}>
            {({ getFieldValue }) =>
              getFieldValue("occupation") === "Owner" ? (
                <>
                  {/* Children / Adult / Infant */}
                  <Row gutter={16}>
                    <Col span={8}>
                      <Form.Item name="children" label="Children">
                        <InputNumber style={{ width: "100%" }} />
                      </Form.Item>
                    </Col>
                    <Col span={8}>
                      <Form.Item name="adult" label="Adult">
                        <InputNumber style={{ width: "100%" }} />
                      </Form.Item>
                    </Col>
                    <Col span={8}>
                      <Form.Item name="infant" label="Infant">
                        <InputNumber style={{ width: "100%" }} />
                      </Form.Item>
                    </Col>
                  </Row>

                  {/* Vehicles */}
                  <Form.List name="vehicle">
                    {(fields, { add, remove }) => (
                      <>
                        <label className="font-semibold">Vehicles</label>
                        {fields.map(({ key, name, ...restField }) => (
                          <Row gutter={16} key={key} align="middle">
                            <Col span={6}>
                              <Form.Item
                                {...restField}
                                name={[name, "plateNo"]}
                                rules={[{ required: true, message: "Plate No required" }]}
                              >
                                <Input placeholder="Plate No" />
                              </Form.Item>
                            </Col>
                            <Col span={6}>
                              <Form.Item
                                {...restField}
                                name={[name, "name"]}
                                rules={[{ required: true, message: "Vehicle Name required" }]}
                              >
                                <Input placeholder="Vehicle Name" />
                              </Form.Item>
                            </Col>
                            <Col span={4}>
                              <Form.Item
                                {...restField}
                                name={[name, "model"]}
                                rules={[{ required: true, message: "Model required" }]}
                              >
                                <InputNumber placeholder="Model" style={{ width: "100%" }} />
                              </Form.Item>
                            </Col>
                            <Col span={4}>
                              <Form.Item {...restField} name={[name, "color"]}>
                                <Input placeholder="Color" />
                              </Form.Item>
                            </Col>
                            <Col span={3}>
                              <Form.Item {...restField} name={[name, "type"]}>
                                <Select
                                  placeholder="Type"
                                  options={[
                                    { label: "Car", value: "Car" },
                                    { label: "Bike", value: "Bike" },
                                  ]}
                                />
                              </Form.Item>
                            </Col>
                            <Col span={1}>
                              <MinusCircleOutlined onClick={() => remove(name)} />
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
                </>
              ) : null
            }
          </Form.Item>
        </Form>

      )}
    </Modal>
  );
};

export default EditRegisterUnitModal;
