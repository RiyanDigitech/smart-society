import { Form, Modal, Select, Button } from "antd";
import { useParams } from "react-router";

const { Option } = Select;

interface Props {
    isOpen: boolean;
    onClose: () => void;
    setSpeakerId: (value: number | undefined) => void;
    setStatus: (value: string | undefined) => void;
}

const FiltersModal: React.FC<Props> = ({
    isOpen,
    onClose,
    setSpeakerId,
    setStatus,
}) => {
    const [form] = Form.useForm();


    const handleApplyFilter = () => {
        form.validateFields().then((values) => {
            setSpeakerId(values?.speaker_id || undefined);
            setStatus(values?.status || undefined);
            onClose();
        });
    };


    const handleReset = () => {
        form.resetFields();
        // Reset all filters in parent component
        setSpeakerId(undefined);
        setStatus(undefined);
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