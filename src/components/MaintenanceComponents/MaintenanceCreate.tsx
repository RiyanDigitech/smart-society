import { updateMaintenanceFunc } from "@/services/maintainance-service/MaintainanceService";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Col, Form, Input, message, Modal, Row } from "antd";
import { useEffect } from "react";

function MaintenanceCreate({ createMaintenanceModal, onClose, maintenanceData }: any) {
    const [form] = Form.useForm();

    // 🧮 Auto update balance when amount changes
    const handleAmountChange = (e: any) => {
        const enteredAmount = parseFloat(e.target.value) || 0;
        const total = parseFloat(maintenanceData.amount) || 0;
        const remaining = total - enteredAmount;
        form.setFieldsValue({ balance: remaining >= 0 ? remaining : 0 });
    };

    const CloseModal = () => {
        form.resetFields()
        onClose()
    }

    useEffect(() => {
        if (maintenanceData?.amount) {
            form.setFieldsValue({
                balance: maintenanceData.amount,
            });
        }
    }, [maintenanceData, form]);

    console.log(maintenanceData)
    const handleSubmit = (values: any) => {
        // console.log("F", values);
        if (values.balance === 0) {
            const payload = {
                "id": maintenanceData.id,
                "payAmount": Number(values.amount),
                "maintenancestatus": "Paid"
            }
            updateMaintenanceMutation.mutate(payload)

            // console.log(payload)
        } else {
            const payloadrarcelPay = {
                "id": maintenanceData.id,
                "payAmount": Number(values.amount),
                "maintenancestatus": "PartiallyPaid"
            }
            updateMaintenanceMutation.mutate(payloadrarcelPay)

            // console.log(payloadrarcelPay)
        }
    };

    const queryClient = useQueryClient();
    const updateMaintenanceMutation = useMutation({
        mutationFn: updateMaintenanceFunc,
        onSuccess: (res: any) => {
            queryClient.invalidateQueries({ queryKey: ["maintenance"] });
            message.success(res.message || "Updated successfully!");
            onClose();
            form.resetFields();
        },
        onError: () => { },
    })
    let isPending = maintenanceData?.maintenancestatus === "Pending";

    return (
        <Modal
            title={
                <div className="text-xl font-semibold text-gray-800 border-b pb-2">
                    🧾 View Maintenance Details
                </div>
            }
            open={createMaintenanceModal}
            onCancel={CloseModal}
            onOk={() => form.submit()}
            okText={isPending ? "Paid" : undefined}
            cancelText={isPending ? "Cancel" : undefined}
            footer={isPending ? undefined : null}
            okButtonProps={{
                className: "bg-green-600 hover:!bg-green-700 text-white font-semibold px-5",
            }}
            cancelButtonProps={{
                className: "hover:bg-red-600 hover:!text-white font-semibold px-5",
            }}
            width={650}
        >
            {/* Maintenance Info */}
            <div className="bg-gray-50 rounded-xl p-4 shadow-sm border mb-4 space-y-3">
                <div className="flex justify-between">
                    <span className="font-semibold text-gray-700">Amount:</span>
                    <span className="text-gray-900 font-bold">
                        PKR {maintenanceData.amount}
                    </span>
                </div>
                <div className="flex justify-between">
                    <span className="font-semibold text-gray-700">Bill Type:</span>
                    <span className="text-gray-900 font-bold">{maintenanceData.purpose}</span>
                </div>
                <div className="flex justify-between">
                    <span className="font-semibold text-gray-700">Status:</span>
                    <span className="text-gray-900 font-bold">
                        {maintenanceData.maintenancestatus}
                    </span>
                </div>
                <div className="flex justify-between">
                    <span className="font-semibold text-gray-700">Pay Amount:</span>
                    <span className="text-gray-900 font-bold">
                        {maintenanceData.payAmount || 0}
                    </span>
                </div>
                <div className="flex justify-between">
                    <span className="font-semibold text-gray-700">Created At:</span>
                    <span className="text-gray-900 font-bold">
                        {new Date(maintenanceData.createdAt).toLocaleString("en-GB", {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                        })}
                    </span>
                </div>
            </div>

            {/* Form Section */}
            {isPending && (
                <Form form={form} layout="vertical" onFinish={handleSubmit} className="mt-3">
                    <Row gutter={16}>
                        <Col span={24}>
                            <Form.Item
                                name="amount"
                                label={<span className="font-semibold text-gray-700">Paid Amount</span>}
                                rules={[{ required: true, message: "Please enter paid amount" }]}
                            >
                                <Input
                                    placeholder="Enter paid amount (e.g. 500)"
                                    className="rounded-lg"
                                    onChange={handleAmountChange}
                                />
                            </Form.Item>
                        </Col>
                        <Col span={24}>
                            <Form.Item
                                name="balance"
                                label={<span className="font-semibold text-gray-700">Remaining Balance</span>}
                            >
                                <Input disabled className="rounded-lg bg-gray-100 font-semibold" />
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
            )}

            {/* Payslip Image */}
            <div className="mt-5 text-center">
                <h3 className="font-semibold text-gray-700 mb-2">Attached Payslip</h3>
                {maintenanceData?.payslip ? (
                    <img
                        src={maintenanceData.payslip}
                        alt="Payslip"
                        className="w-full h-60 object-contain rounded-lg border shadow-sm"
                    />
                ) : (
                    <div className="text-gray-500 italic py-10 border rounded-lg bg-gray-50 shadow-inner">
                        No Image Attached
                    </div>
                )}
            </div>
        </Modal>
    );
}

export default MaintenanceCreate;
