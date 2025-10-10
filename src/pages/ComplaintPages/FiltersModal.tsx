import { Form, Modal, Select, Button } from "antd";

const { Option } = Select;

interface Props {
    isOpen: boolean;
    onClose: () => void;
    setFilterStatus: (value: string | undefined) => void;
}

const FiltersModal: React.FC<Props> = ({
    isOpen,
    onClose,
    setFilterStatus,
}) => {
    const [form] = Form.useForm();


    const handleApplyFilter = () => {
        form.validateFields().then((values) => {
            setFilterStatus(values?.status || undefined);
            onClose();
        });
    };


    const handleReset = () => {
        form.resetFields();
        setFilterStatus(undefined);
    };

    return (
        <Modal
            title="Complaint Filters"
            open={isOpen}
            onCancel={onClose}
            className="lg:top-55"
            footer={[
                <Button key="reset" type="default" onClick={handleReset}>
                    Reset
                </Button>,
                <Button
                    //   key="apply"
                    //   type="primary"
                    className="bg-[#008444] text-white hover:!bg-green-500"
                    onClick={handleApplyFilter}
                >
                    Apply Filter
                </Button>
            ]}
        >
            <Form form={form} layout="vertical">
                <div className="flex justify-between w-full">
                    {/* <Form.Item name="speaker_id" label="Speaker" className="w-[48%]">
      <Select
        allowClear
        placeholder="Filter by Speaker"
        // options={speakersData?.data?.map((sp: any) => ({
        //   value: sp.id,
        //   label: sp.name,
        // }))}
      />
    </Form.Item> */}
                    <Form.Item name="status" label="Status" className="w-[48%]">
                        <Select allowClear placeholder="Select Status">
                            {["Pending", "Resolved", "Re Open", "Assign", "Closed", "In Progress"].map((status, index) => (
                                <Option key={index} value={status}>
                                    {status}
                                </Option>
                            ))}
                        </Select>
                    </Form.Item>
                </div>
            </Form>

        </Modal>
    );
};

export default FiltersModal;