import { Form, Modal, Select, Button } from "antd";
//import "../../../index.css";

const { Option } = Select;

interface Props {
  isOpen: boolean;
  onClose: () => void;
  setIsActive: (value: boolean | undefined) => void;
}

const VisitorFilterModal: React.FC<Props> = ({
  isOpen,
  onClose,
  setStatus,
}) => {
  const [form] = Form.useForm();

  const handleApplyFilter = () => {
    form
      .validateFields()
      .then((values) => {
        setStatus(values?.status);

        onClose();
      })
      .catch((error) => {
        console.error("Form validation failed:", error);
      });
  };

  const handleReset = () => {
    form.resetFields();
    setStatus(undefined);
  };

  return (
    <Modal
      title="Visitor Filter"
      open={isOpen}
      onCancel={onClose}
      className="lg:top-55"
      footer={[
        <Button key="reset" type="default" onClick={handleReset}>
          Reset
        </Button>,
        <Button
          className="bg-primary text-sm text-white hover:!bg-primary"
          onClick={handleApplyFilter}
        >
          Apply Filter
        </Button>,
      ]}
    >
      <Form form={form} layout="vertical">
        <Form.Item name="status" label=" Status">
          <Select placeholder="Select Status" allowClear className="text-[#6B6B6B]  !border !border-[#D1D5DB] hover:!border-[#D1D5DB] focus:!border-[#D1D5DB]">
            <Option value="In">In</Option>
            <Option value="Out">Out</Option>
            <Option value="Pending">Pending</Option>
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default VisitorFilterModal;
