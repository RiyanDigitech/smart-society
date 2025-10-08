import { Button, Dropdown, Input, Menu, message, Modal, Select, Spin, Table, Tag } from "antd";
import {
  DeleteOutlined,
  EditOutlined,
  EyeOutlined,
  LoadingOutlined,
  MoreOutlined,
  PlusOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { useState } from "react";

import ExpenseService from "@/services/expenseService/ExpenseService";
import ExpenseModal from "./ExpenseModal";

function ExpenseTable() {
  const [open, setOpen] = useState(false);
  const [editingExpense, setEditingExpense] = useState<any | null>(null);
  // pagination state
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const { useGetExpense, useGetSummary, useDeleteExpense } = ExpenseService();

  const { data:expense, isLoading } = useGetExpense( page, pageSize);
  const { data:summary, isPending } = useGetSummary();
  const summaryData = summary?.data || {};


  const deleteExpense = useDeleteExpense();

const handleDelete = (id: number, callbacks?: any) => {
  if (!id) return;

  deleteExpense.mutate(
    { id },
    {
      onSuccess: (res) => {
        if (res?.success) {
          message.success(res.message || "Deleted successfully");
          callbacks?.onSuccess?.();
        } else {
          message.error(res?.message || "Failed to delete expense");
          callbacks?.onError?.();
        }
      },
      onError: (err: any) => {
        message.error(err?.response?.data?.message || "Delete request failed");
        callbacks?.onError?.();
      },
    }
  );
};


  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      width: 70,
    },
    {
      title: "Amount",
      dataIndex: "expenseAmount",
      key: "expenseAmount",
    },
    {
    title: "Payslip",
    dataIndex: "payslip",
    key: "payslip",
    render: (url: string) => (
      <img
        src={url}
        alt="Exhibitor"
        className="w-16 h-16 object-cover rounded-md border"
      />
    ),
  },
    {
      title: "Purpose",
      dataIndex: "purpose",
      key: "purpose",
    },
    {
      title: "Date",
      dataIndex: "Date",
      key: "Date",
    },
    {
  title: "Created At",
  dataIndex: "createdAt",
  key: "createdAt",
  render: (text:any) => new Date(text).toLocaleString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  }),
},
{
  title: "Updated At",
  dataIndex: "updatedAt",
  key: "updatedAt",
  render: (text:any) => new Date(text).toLocaleString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  }),
},

    {
    title: "Actions",
    key: "actions",
    render: (_: any, record: any) => (
      <Dropdown
        overlay={
          <Menu>
            <Menu.Item
              key="edit"
              icon={<EditOutlined />}
               onClick={() => {
                setEditingExpense(record);
                setOpen(true);
              }}
            >
              Edit
            </Menu.Item>
            {/* <Menu.Item
              key="delete"
              icon={<DeleteOutlined />}
              danger
              onClick={() => handleDelete(record.id)}
            >
              Delete
            </Menu.Item> */}
             <Menu.Item
                key="delete"
                icon={<DeleteOutlined />}
                danger
                onClick={() => {
                  Modal.confirm({
                    title: "Confirm Deletion",
                    content: `Are you sure you want to delete Expense Amount "${record.expenseAmount}"?`,
                    okText: "Yes",
                    cancelText: "No",
                    okButtonProps: {
                      className: "bg-green-600 text-white hover:!bg-green-700",
                    },
                    onOk: () =>
                      new Promise((resolve, reject) => {
                        handleDelete(record.id, {
                          onSuccess: () => resolve(null),
                          onError: (err: any) => reject(err),
                        });
                      }),
                  });
                }}
              >
                Delete
              </Menu.Item>
          </Menu>
        }
        trigger={["click"]}
      >
        <MoreOutlined className="text-lg cursor-pointer" />
      </Dropdown>
    ),
  },
  ];

  const antIcon = (
    <LoadingOutlined style={{ fontSize: 40, color: "#16a34a" }} spin />
  );

  return (
    <div className="p-4 bg-white  rounded-[10px]">
        {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <div className="flex items-center gap-2 text-black font-semibold text-[20px] md:text-[24px] cursor-pointer">
          Expenses
        </div>
        <button className="bg-green-600 text-white py-2 px-3 rounded-lg" onClick={() => setOpen(true)}>Create Expense</button>
      </div>
        {/* ✅ Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        <div className="bg-green-50 border border-green-200 rounded-2xl p-5 shadow-sm text-center">
          <h3 className="text-gray-600 text-sm font-medium">
            Total Maintenance
          </h3>
          <p className="text-2xl font-semibold text-green-700 mt-2">
            {isPending ? "Loading..." : summaryData.TotalMaintenanceAmount ?? 0}
          </p>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-2xl p-5 shadow-sm text-center">
          <h3 className="text-gray-600 text-sm font-medium">Total Expense</h3>
          <p className="text-2xl font-semibold text-blue-700 mt-2">
            {isPending ? "Loading..." : summaryData.expense ?? 0}
          </p>
        </div>

        <div className="bg-red-50 border border-red-200 rounded-2xl p-5 shadow-sm text-center">
          <h3 className="text-gray-600 text-sm font-medium">Balance</h3>
          <p
            className={`text-2xl font-semibold mt-2 ${
              summaryData.Balance < 0 ? "text-red-600" : "text-green-600"
            }`}
          >
            {isPending ? "Loading..." : summaryData.Balance ?? 0}
          </p>
        </div>
      </div>

      {/* Top Controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
        {/* Left Controls */}
        {/* <div className="flex flex-col sm:flex-row sm:items-center gap-3 w-full md:w-auto">
          <div className="flex items-center gap-2">
            <span className="text-[#4B5563] font-inter">Show</span>
            <Select
              value={pageSize.toString()}
              onChange={(value) => {
                setPageSize(Number(value));
                setPage(1); // reset to first page
              }}
              className="w-20 [&_.ant-select-selector]:!text-[#4B5563]"
              options={[
                { value: "10", label: "10" },
                { value: "20", label: "20" },
                { value: "50", label: "50" },
              ]}
            />
          </div>
    <Input
            placeholder="Search"
            className="w-full sm:w-64 !text-[15px] !font-Manrope !font-semibold text-[#6B6B6B]"
            prefix={
              <SearchOutlined className="text-[#6B6B6B] border-[#6B6B6B] hover:border-[#6B6B6B] pr-2" />
            }
          />
         
        </div> */}

        {/* Button */}
        {/* <button
          className="bg-primary text-sm text-white px-6 py-2 rounded-lg shadow hover:bg-primary w-full sm:w-auto"
          onClick={() => setOpen(true)}
        >
          <PlusOutlined className="mr-1 !text-white text-lg m-auto" /> New
          Exhibitor
        </button> */}
      </div>

      {/* Table */}
      <Spin
        spinning={isLoading}
        tip="Loading..."
        size="large"
        indicator={antIcon}
      >
        <div className="overflow-x-auto">
          <Table
            columns={columns}
            dataSource={expense?.data?.expenses || []}
            pagination={{
    current: expense?.data?.page || page,
    pageSize: pageSize,
    total: expense?.data?.total || 0,
    showSizeChanger: true,
    onChange: (p, ps) => {
      setPage(p);
      setPageSize(ps);
    },
  }}
            rowKey="id"
            bordered={false}
            className="custom-table min-w-[800px]"
          />
        </div>
      </Spin>
      <ExpenseModal
      open={open}
      onClose={() => {
        setOpen(false);
        setEditingExpense(null); // reset when closing
      }}
      editingExpense={editingExpense}
    />
    </div>
  );
}

export default ExpenseTable;
