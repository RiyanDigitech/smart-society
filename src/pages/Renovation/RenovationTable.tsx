import React, { useState } from "react";
import { Table, Spin, Dropdown, Menu, Modal } from "antd";
import type { ColumnsType } from "antd/es/table";
import { DeleteOutlined, EditOutlined, EyeOutlined, MoreOutlined } from "@ant-design/icons";
import { RenovationData } from "@/lib/types/renovation";
import RenovationService from "@/services/RenovationService/RenovationService";
import AddRenovation from "./AddRenovation";
import EditRenovationStatus from "./EditRenovationStatus";

const RenovationTable: React.FC = () => {
  //const [currentPage, setCurrentPage] = useState<number>(1);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState<number>(5);
  const [deletingId, setDeletingId] = useState(null);
  const [OpenEdit, setOpenEditodal] = useState(false);
  const [statusModal, setStatusModal] = useState(false);
  const [recordId, setrecordId] = useState("");
  const [selectedRecord, setSelectedRecord] = useState<any>(null);

  const { useFetchRenovation, useDeleteRenovationById } = RenovationService();

  const deleteMutation = useDeleteRenovationById();

  const { data, isFetching } = useFetchRenovation(page, pageSize);
  
  console.log("RenovationData", data);

  console.log(data);

  

  const formattedData: RenovationData[] =
    data?.data?.allRenovationForms?.map((item, index) => ({
      key: item.id.toString(),
      id: item.id,
      applicantName: item.applicantName,
      block: item.block,
      detailsWork: item.detailsWork,
      startDate: item.startDate,
      endDate: item.endDate,
      status: item.status,
      contractorName: item.contractorName,
      contractorNumber: item.contractorNumber,
      signature: item.signature,
      image: item.image,
      renovationStatus: item.renovationStatus,
      personName: item.personName,
      personNumber: item.personNumber,
      userId: item.userId,
    })) || [];




  const showDeleteConfirm = (id: number) => {
    Modal.confirm({
      title: "Are you sure you want to Delete this Renovation?",

      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk() {
        setDeletingId(id);
        handleDelete(id);
      },
      onCancel() {
        setDeletingId(null);
      },
    });
  };

  const handleDelete = (id: number) => {
    deleteMutation.mutate(id);
  };

  const handleEdit = (record: any) => {
    setOpenEditodal(true);
    setrecordId(record.id);
  };

  const handleUpdateStatus = (record: any) => {
    setSelectedRecord(record);
    setrecordId(record.id);
    setStatusModal(true);
  };

  const columns: ColumnsType<RenovationData> = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      width: 70,
      render: (sl) => <span className="text-[#4b5563] ">{sl}</span>,
    },
     {
      title: "UserId",
      dataIndex: "userId",
      key: "userId",
      width: 70,
      render: (userId) => <span className="text-[#4b5563] ">{userId}</span>,
    },

    {
      title: "ApplicantName",
      dataIndex: "applicantName",
      key: "applicantName",
      render: (applicantName) => (
        <span className="text-[#4b5563] ">{applicantName}</span>
      ),
    },
    {
      title: "Block",
      dataIndex: "block",
      key: "block",
      render: (block) => <span className="text-[#4b5563] ">{block}</span>,
    },
    {
      title: "DetailsWork",
      dataIndex: "detailsWork",
      key: "detailsWork",
      render: (detailsWork) => (
        <span className="text-[#4b5563] ">{detailsWork}</span>
      ),
    },
    {
      title: "StartDate",
      dataIndex: "startDate",
      key: "startDate",
      render: (startDate) => (
        <span className="text-[#4b5563] ">{startDate}</span>
      ),
    },
    {
      title: "EndDate",
      dataIndex: "endDate",
      key: "endDate",
      render: (endDate) => <span className="text-[#4b5563] ">{endDate}</span>,
    },
    {
      title: "ContractorName",
      dataIndex: "contractorName",
      key: "contractorName",
      render: (contractorName) => (
        <span className="text-[#4b5563] ">{contractorName}</span>
      ),
    },
    {
      title: "ContractorNumber",
      dataIndex: "contractorNumber",
      key: "contractorNumber",
      render: (contractorNumber) => (
        <span className="text-[#4b5563] ">{contractorNumber}</span>
      ),
    },
    {
      title: "RenovationStatus",
      dataIndex: "renovationStatus",
      key: "renovationStatus",
      render: (renovationStatus) => (
        <span className="text-[#4b5563] ">{renovationStatus}</span>
      ),
    },

    {
      title: "Signature",
      dataIndex: "signature",
      key: "signature",
      align: "center",
      render: (url: string) =>
        url ? (
          <img
            src={url}
            alt="signature"
            className="w-12 h-12 object-cover rounded-md border cursor-pointer hover:scale-105 transition-transform"
            onClick={() => {
              Modal.info({
                title: "Signature Preview",
                centered: true,
                width: "auto",
                content: (
                  <img
                    src={url}
                    alt="signature"
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
        ),
    },

    {
    title: "Image",
    dataIndex: "image",
    key: "image",
    align: "center",
    render: (url: string) =>
      url ? (
        <img
          src={url}
          alt="img"
          className="w-12 h-12 object-cover rounded-md border cursor-pointer hover:scale-105 transition-transform"
          onClick={() => {
            Modal.info({
              title: "Image Preview",
              centered: true,
              width: "auto",
              content: (
                <img
                  src={url}
                  alt="img"
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
      ),
  },
    {
      title: "PersonName",
      dataIndex: "personName",
      key: "personName",
      render: (personName) => (
        <span className="text-[#4b5563] ">{personName}</span>
      ),
    },
    {
      title: "PersonNumber",
      dataIndex: "personNumber",
      key: "personNumber",
      render: (personNumber) => (
        <span className="text-[#4b5563] ">{personNumber}</span>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => <span className="text-[#4b5563] ">{status}</span>,
    },
    {
  title: "Actions",
  key: "actions",
  render: (_, record) => {
    const menuItems = [];

    // Show View More + Delete when status = "Payment Awaited"
    if (record.renovationStatus === "Proposal Awaited") {
      menuItems.push(
        <Menu.Item
          key="view"
          icon={<EyeOutlined />}
          onClick={() => handleEdit(record)}
        >
          View More
        </Menu.Item>,
        <Menu.Item
          key="delete"
          icon={<DeleteOutlined />}
          danger
          onClick={() => showDeleteConfirm(Number(record.id))}
          disabled={deletingId === record.id && deleteMutation.isLoading}
        >
          {deletingId === record.id && deleteMutation.isLoading
            ? "Deleting..."
            : "Delete"}
        </Menu.Item>
      );
    }

    // Show Update Status + Delete when status = "Approval Awaited" or "Rejected"
    if (
      record.renovationStatus === "Approval Awaited" 
    ) {
      menuItems.push(
        <Menu.Item
          key="status"
          icon={<EditOutlined />}
          onClick={() => handleUpdateStatus(record)}
        >
          Update Status
        </Menu.Item>,
        <Menu.Item
          key="delete"
          icon={<DeleteOutlined />}
          danger
          onClick={() => showDeleteConfirm(Number(record.id))}
          disabled={deletingId === record.id && deleteMutation.isLoading}
        >
          {deletingId === record.id && deleteMutation.isLoading
            ? "Deleting..."
            : "Delete"}
        </Menu.Item>
      );
    }

    // Show only Delete when status = "Approved"
    if (record.renovationStatus === "Approved" ||
      record.renovationStatus === "Rejected"
    ) {
      menuItems.push(
        <Menu.Item
          key="delete"
          icon={<DeleteOutlined />}
          danger
          onClick={() => showDeleteConfirm(Number(record.id))}
          disabled={deletingId === record.id && deleteMutation.isLoading}
        >
          {deletingId === record.id && deleteMutation.isLoading
            ? "Deleting..."
            : "Delete"}
        </Menu.Item>
      );
    }

    return (
      <Dropdown
        overlay={<Menu>{menuItems}</Menu>}
        trigger={["click"]}
      >
        <MoreOutlined className="text-lg cursor-pointer" />
      </Dropdown>
    );
  },
}

  ];

  return (
    <div className="p-4 bg-white rounded-[10px]">
      <div className="flex flex-col md:flex-row md:items-center  gap-3 mb-4  justify-end">
        <div className="flex items-center gap-2 ">
          <div className=" "></div>
        </div>
      </div>
      <Spin
        spinning={isFetching}
        tip={<span className="text-black">Loading...</span>}
      >
        <Table
          columns={columns}
          dataSource={formattedData}
          //pagination={false}
          pagination={{
            // current: currentPage,
            // pageSize: pageSize,
            //total: data?.total || 0,
                current: data?.data?.page || page,
    pageSize: pageSize,
    total: data?.data?.total || 0,

             showTotal: (total, range) =>
               `Showing ${range[0]} to ${range[1]} of ${total} entries`,
             onChange: (p, ps) => {
  setPage(p);
  setPageSize(ps);
}

          }}
          
          //onChange={handleTableChange}
          bordered={false}
          className="custom-table overflow-auto [&_.ant-pagination-item]:!border-gray-300 [&_.ant-pagination-item]:!text-gray-600 [&_.ant-pagination-item-active]:!bg-primary [&_.ant-pagination-item-active>a]:!text-white [&_.ant-pagination-prev]:!text-[#45B369] [&_.ant-pagination-next]:!text-[#EBECEF]"
        />
      </Spin>
      <AddRenovation
        isOpen={OpenEdit}
        renovationId={recordId}
        onClose={() => setOpenEditodal(false)}
      />
      <EditRenovationStatus
        isOpen={statusModal}
        renovationId={recordId}
        userData={selectedRecord}
        onClose={() => {
          setStatusModal(false);
          setSelectedRecord(null);
        }}
      />
    </div>
  );
};

export default RenovationTable;
