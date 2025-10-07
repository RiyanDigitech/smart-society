import { Input, DatePicker, Button, Table, Card, Spin, Menu, Dropdown, message } from "antd";
import { LoadingOutlined, EyeOutlined, DownloadOutlined, EllipsisOutlined, DeleteOutlined } from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";
import { useState } from "react";
import dayjs from "dayjs";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import MaintenanceService, { deleteMaintenance } from "@/services/maintainance-service/MaintainanceService";
import MaintenanceCreate from "@/components/MaintenanceComponents/MaintenanceCreate";
import { MdPassword } from "react-icons/md";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const { RangePicker } = DatePicker;

const antIcon = <LoadingOutlined style={{ fontSize: 24, color: "#16a34a" }} spin />; // green spinner

interface DataType {
  key: string;
  purpose: string;
  amount: string;
  payAmount: string;
  totalAmount: string;
  maintenancestatus: string;
  unitNo: number;
  createdAt: string;
}

const Home = () => {
  const { useFetchMaintenance } = MaintenanceService();

  // local states
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [createMaintenanceModal, setCreateMaintenanceModal] = useState(false);
  const [maintenanceData, setMaintenanceData] = useState({});
  const [search, setSearch] = useState<string>();
  const [dates, setDates] = useState<[string?, string?]>();

  // query hook
  const { data, isLoading, error } = useFetchMaintenance(
    limit,
    page,
    search,
    dates?.[0],
    dates?.[1]
  );

  const tableData =
    data?.data?.maintenace?.map((item: any, idx: number) => ({
      key: String(item.id || idx),
      purpose: item.purpose,
      id: item.id,
      payslip: item.payslip,
      amount: item.amount,
      payAmount: item.payAmount,
      totalAmount: item.totalAmount,
      maintenancestatus: item.maintenancestatus,
      unitNo: item.registerUnit?.unitNo,
      createdAt: item?.createdAt,
    })) || [];

  const columns: ColumnsType<DataType> = [
    { title: "Purpose", dataIndex: "purpose", key: "purpose" },
    { title: "Amount", dataIndex: "amount", key: "amount" },
    { title: "Pay Amount", dataIndex: "payAmount", key: "payAmount" },
    { title: "Total Amount", dataIndex: "totalAmount", key: "totalAmount" },
    { title: "Status", dataIndex: "maintenancestatus", key: "maintenancestatus" },
    { title: "Unit No", dataIndex: "unitNo", key: "unitNo" },
    {
      title: "Created At", dataIndex: "createdAt", key: "createdAt", render: (text) => {
        const date = new Date(text);
        return date.toLocaleString("en-GB", {
          day: "2-digit",
          month: "short",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        });
      },
    },
    
     {
          title: 'Action',
          key: 'action',
          render: (record: any) => {
            const menu = (
              <Menu>
                {/* <Menu.Item
                  key="edit"
                  icon={<EditOutlined />}
                  onClick={() => handleEditModal(record)}
                >
                  Edit
                </Menu.Item> */}
                <Menu.Item
                  key="delete"
                  icon={<EyeOutlined />}
                  onClick={() => handleSubmit(record)}
                >
                  View More
                </Menu.Item>
                <Menu.Item
                  key="password"
                  icon={<DeleteOutlined />}
                  onClick={() => handleChangePassword.mutate(record.id)}
                >
                 Delete
                </Menu.Item>
              </Menu>
            );
            return (
              <Dropdown overlay={menu} trigger={['click']} placement="bottomRight">
                <EllipsisOutlined style={{ fontSize: 20, cursor: 'pointer' }} />
              </Dropdown>
            );
          },
        },
  ];

  // 🔽 PDF Download Function
  const handleDownloadPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text("Maintenance Report", 14, 15);

    autoTable(doc, {
      startY: 25,
      head: [["Purpose", "Amount", "Pay Amount", "Total Amount", "Status", "Unit No"]],
      body: tableData.map((row) => [
        row.purpose,
        row.amount,
        row.payAmount,
        row.totalAmount,
        row.maintenancestatus,
        row.unitNo,
      ]),
    });

    doc.save("maintenance-report.pdf");
  };

  const queryClient = useQueryClient();
  const handleChangePassword = useMutation({
     mutationFn: deleteMaintenance,
         onSuccess: (res: any) => {
              queryClient.invalidateQueries({ queryKey: ["maintenance"] });
              message.success(res.message || "Delete Maintenance Successfully!");
              
            },
            onError: () => {},
  })


  const handleSubmit = (record: any) => {
    setCreateMaintenanceModal(true)
    setMaintenanceData(record)
    // console.log(record , "MID")
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Maintenance</h1>

      {/* Filters Section */}
      <Card className="mb-4 shadow-md">
        <div className="flex flex-col md:flex-row justify-between gap-4 items-center">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <Input.Search
              placeholder="Search..."
              allowClear
              onSearch={(value) => {
                setSearch(value || undefined);
                setPage(1);
              }}
              className="w-full md:w-1/3 !border-gray-300 hover:!border-green-600 focus:!border-green-600 focus:!ring-0 transition-colors"
            />
            <RangePicker
              className="w-full md:w-1/3"
              onChange={(dates) => {
                if (dates) {
                  setDates([
                    dayjs(dates[0]).format("YYYY-MM-DD"),
                    dayjs(dates[1]).format("YYYY-MM-DD"),
                  ]);
                } else {
                  setDates(undefined);
                }
                setPage(1);
              }}
            />
          </div>
          <div className="flex flex-wrap gap-2">
            {/* <Button 
            onClick={}
            className="w-full bg-green-800 hover:!bg-green-600 text-white md:w-auto">
              Create Maintenance
            </Button> */}
            <Button className="w-full bg-green-800 hover:!bg-green-600 text-white md:w-auto">
              Set Amount
            </Button>
            <Button
              icon={<DownloadOutlined />}
              onClick={handleDownloadPDF}
              className="w-full bg-green-800 hover:!bg-green-600 text-white md:w-auto"
            >
              Download
            </Button>
          </div>
        </div>
      </Card>

      {/* Data Table */}
      <Card className="shadow-md">
        {error ? (
          <div className="text-red-500 p-6 text-center">Failed to load data</div>
        ) : (
          <Table
            columns={columns}
            dataSource={tableData}
            pagination={{
              current: page,
              pageSize: limit,
              total: data?.data?.total,
              onChange: (p) => setPage(p),
            }}
            bordered
            className="overflow-auto"
            scroll={{ x: "max-content" }}
            loading={{
              spinning: isLoading,
              indicator: <Spin indicator={antIcon} />,
            }}
          />
        )}
      </Card>

      <MaintenanceCreate createMaintenanceModal={createMaintenanceModal}
        onClose={() => setCreateMaintenanceModal(false)} maintenanceData={maintenanceData} />
    </div>
  );
};

export default Home;
