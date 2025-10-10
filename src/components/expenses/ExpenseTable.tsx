import { Button, Dropdown, Menu, message, Modal, Spin, Table } from "antd";
import {
  DeleteOutlined,
  DownloadOutlined,
  EditOutlined,
  LoadingOutlined,
  MoreOutlined,
} from "@ant-design/icons";
import { DatePicker } from "antd";
import { useState } from "react";

import ExpenseService from "@/services/expenseService/ExpenseService";
import ExpenseModal from "./ExpenseModal";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import Summary from "./Summary";

const { RangePicker } = DatePicker;
function ExpenseTable() {
  const [open, setOpen] = useState(false);
  const [editingExpense, setEditingExpense] = useState<any | null>(null);
  // pagination state
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [filterRange, setFilterRange] = useState<[string | undefined, string | undefined]>([undefined, undefined]);
  const [appliedRange, setAppliedRange] = useState<[string | undefined, string | undefined]>([undefined, undefined]);

  const startDate = appliedRange[0];
  const endDate = appliedRange[1];

  const { useGetExpense, useDeleteExpense } = ExpenseService();
  const { data:expense, isLoading } = useGetExpense( page, pageSize, startDate, endDate);
  const deleteExpense = useDeleteExpense();

   const handleApplyFilter = () => {
    setAppliedRange(filterRange);
  };

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

const handleDownloadPDF = () => {
  const doc = new jsPDF();

  doc.setFontSize(16);
  doc.text("Expense Report", 14, 15);

  // Table columns
  const columns = [
    { header: "ID", dataKey: "id" },
    { header: "Amount", dataKey: "expenseAmount" },
    { header: "Purpose", dataKey: "purpose" },
    { header: "Date", dataKey: "Date" },
    {
      header: "Created At",
      dataKey: "createdAt",
    },
    {
      header: "Updated At",
      dataKey: "updatedAt",
    },
  ];

  // Prepare table rows
  const tableData = expense?.data?.expenses?.map((item: any) => ({
    id: item.id,
    expenseAmount: item.expenseAmount,
    purpose: item.purpose,
    Date: item.Date,
    createdAt: new Date(item.createdAt).toLocaleString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    }),
    updatedAt: new Date(item.updatedAt).toLocaleString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    }),
  }));

  // Generate PDF table
  autoTable(doc, {
    startY: 25,
    head: [columns.map((c) => c.header)],
    body: tableData.map((row:any) =>
      columns.map((c) => row[c.dataKey as keyof typeof row])
    ),
    styles: {
      fontSize: 10,
      cellPadding: 3,
    },
    headStyles: {
      fillColor: [22, 163, 74], // green
      textColor: 255,
      halign: "center",
    },
  });

  doc.save("Expense_Report.pdf");
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
    <div className="flex justify-center">
      {url ? (
        <img
          src={url}
          alt="Payslip"
          className="w-16 h-16 object-cover rounded-md border cursor-pointer"
          onClick={() => {
            Modal.info({
              title: "Payslip Preview",
              centered: true,
              width: "auto",
              content: (
                <img
                  src={url}
                  alt="Payslip"
                  className="max-w-full max-h-[80vh] object-contain cursor-zoom-in"
                  onClick={(e) => {
                    e.stopPropagation();
                    const modal = window.open(url, "_blank");
                    if (modal) modal.focus();
                  }}
                />
              ),
              okButtonProps: {
                className: "bg-green-600 text-white hover:!bg-green-700",
              },
            });
          }}
        />
      ) : (
        <span className="text-gray-400 text-sm">No Image</span>
      )}
    </div>
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
      <Summary />

      {/* Top Controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
        {/* Left Controls */}
         {/* Date Filter */}
  <div className="flex items-center gap-3 mb-4">
        <RangePicker
  allowClear
  className="custom-green-picker"
  placeholder={["Start Date", "End Date"]}
  onChange={(dates, dateStrings) => {
    if (!dates || dateStrings.every((d) => d === "")) {
      // user clicked "clear"
      setFilterRange([undefined, undefined]);
      setAppliedRange([undefined, undefined]);
      return;
    }
    setFilterRange([
      dateStrings[0] || undefined,
      dateStrings[1] || undefined,
    ]);
  }}
/>

        <Button
          type="primary"
          className="bg-green-600 hover:!bg-green-700"
          onClick={handleApplyFilter}
        >
          Filter
        </Button>
      </div>

        <button
          className="flex bg-primary text-sm text-white px-6 py-2 rounded-lg shadow hover:bg-primary w-full sm:w-auto"
          onClick={handleDownloadPDF}
        >
          <DownloadOutlined className="mr-1 !text-white text-lg my-auto" /><span>Download</span>
        </button>
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
