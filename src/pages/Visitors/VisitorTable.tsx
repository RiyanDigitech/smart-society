import React, { useState } from "react";
import { Table, Button, Input, Spin, Tag } from "antd";
import type { ColumnsType } from "antd/es/table";
import { EditOutlined, SearchOutlined } from "@ant-design/icons";
import { VisitorData } from "@/lib/types/visitor";
import VisitorService from "@/services/VisitorService/VisitorsService";
import UpdateStatusModal from "./UpdateVisitorModal";
import VisitorFilterModal from "./VisitorFilterModal";

const VisitorTable: React.FC = () => {
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(5);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [search, setSearch] = useState("");
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [status, setStatus] = useState<string | undefined>(undefined);

  const handleTableChange = (pagination: any) => {
    setCurrentPage(pagination.current);
    setPageSize(pagination.pageSize);
  };

  const { getAllVisitors } = VisitorService();
  const { data, isFetching } = getAllVisitors(
    currentPage,
    pageSize,
    search,
    status
  );

  const visitors = data?.data?.visitor || [];
  const total = data?.data?.total || 0;

  const formattedData: VisitorData[] = visitors.map((item, index) => ({
    key: item.id.toString(),
    id: item.id,
    displayId: String(index + 1 + (currentPage - 1) * pageSize).padStart(
      2,
      "0"
    ),
    name: item.name,
    nic: item.cnic,
    phone: item.phone,
    Noofguest: item.no_guest?.toString() ?? "",
    purpose: item.purpose,
    meet_time: item.meet_time?.split("T")[0] ?? "",
    status: item.visitor_status,
    unitNo: item.registerUnit?.unitNo || "N/A",
  }));

  const ShowFilterModal = () => {
    setIsFilterModalOpen(true);
  };

  const handleFilterCloseModal = () => {
    setIsFilterModalOpen(false);
  };

  const columns: ColumnsType<any> = [
    {
      title: "ID",
      dataIndex: "displayId",
      key: "displayId",
      width: 70,
      render: (text) => <span className="text-[#4b5563]">{text}</span>,
    },
    {
      title: "Username",
      dataIndex: "name",
      key: "name",
      render: (name) => <span className="text-[#4b5563]">{name}</span>,
    },
    {
      title: "Cnic",
      dataIndex: "nic",
      key: "nic",
      render: (nic: string) =>
        nic ? (
          <span className="text-[#4b5563]">
            {nic.length > 6 ? `${nic.slice(0, 6)}...` : nic}
          </span>
        ) : (
          "-"
        ),
    },
    {
      title: "Contact No",
      dataIndex: "phone",
      key: "phone",
      render: (phone) => <span className="text-[#4b5563]">{phone}</span>,
    },
    {
      title: "Purpose",
      dataIndex: "purpose",
      key: "purpose",
      render: (purpose: string) =>
        purpose ? (
          <span className="text-[#4b5563]">
            {purpose.length > 7 ? `${purpose.slice(0, 7)}...` : purpose}
          </span>
        ) : (
          "-"
        ),
    },
    {
      title: "Meet Time",
      dataIndex: "meet_time",
      key: "meet_time",
      render: (meet_time) => (
        <span className="text-[#4b5563]">{meet_time}</span>
      ),
    },
    {
      title: "Flat",
      dataIndex: "unitNo",
      key: "unitNo",
      render: (unitNo) => <span className="text-[#4b5563]">{unitNo}</span>,
    },
    {
      title: "No of guest",
      dataIndex: "Noofguest",
      key: "Noofguest",
      render: (Noofguest) => (
        <span className="text-[#4b5563]">{Noofguest}</span>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <Tag
          className={`px-3 py-1 rounded-md border font-inter ${
            status === "Approved"
              ? "text-green-600 border-green-600 bg-green-100"
              : "text-gray-600 border-gray-400 bg-gray-200"
          }`}
        >
          {status}
        </Tag>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <div className="flex gap-3">
          <Button
            shape="circle"
            icon={<EditOutlined />}
            className="!bg-[#45B3692E] !border-none !text-[#45B369] hover:!text-[#45B369]"
            onClick={() => {
              setSelectedId(record.id);
              setIsUpdateModalOpen(true);
            }}
          />
        </div>
      ),
    },
  ];

  return (
    <div className="p-4 bg-white rounded-[10px]">
      <VisitorFilterModal
        isOpen={isFilterModalOpen}
        onClose={handleFilterCloseModal}
        setStatus={setStatus}
      />
      <div className="flex flex-col md:flex-row md:items-center gap-3 mb-4 justify-between">
        <div className="flex items-center gap-2">
          <Input
            placeholder="Search...."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1);
            }}
            className="max-w-xs !text-[15px] !font-Manrope !font-semibold text-[#6B6B6B]  !border !border-[#D1D5DB] hover:!border-[#D1D5DB] focus:!border-[#D1D5DB] font-inter"
            prefix={<SearchOutlined className="text-[#6B6B6B] pr-2" />}
          />
          <button
            onClick={ShowFilterModal}
            className="hidden xmd:flex items-center justify-center border-[2px] border-[#edf2ef] rounded-lg px-2 py-2 bg-[#fafafa] text-[#1F53A4] font-medium xmd:px-4"
          >
            <img src="/filters.png" alt="Filter" className="mr-2" />
            <span className="text-[#6B6B6B] font-semibold">Filters</span>
          </button>
        </div>
      </div>

      <Spin spinning={isFetching} tip={<span>Loading...</span>}>
        <Table
          columns={columns}
          dataSource={formattedData}
          pagination={{
            current: currentPage,
            pageSize: pageSize,
            total: total,
            showTotal: (total, range) =>
              `Showing ${range[0]} to ${range[1]} of ${total} entries`,
          }}
          onChange={handleTableChange}
          bordered={false}
          className="custom-table overflow-auto"
        />
      </Spin>

      <UpdateStatusModal
        isOpen={isUpdateModalOpen}
        onClose={() => setIsUpdateModalOpen(false)}
        visitorId={selectedId}
      />
    </div>
  );
};

export default VisitorTable;
