import React, { useState } from "react";
import { Table, Spin, Dropdown, Menu, Modal } from "antd";
import type { ColumnsType } from "antd/es/table";
import {
  DeleteOutlined,
  EditOutlined,
  MoreOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { AnnoucementData } from "@/lib/types/annoucement";
import AnnoucementService from "@/services/AnnoucementService/AnnoucementService";
import AddAnnoucement from "./AddAnnoucement";
import UpdateAnnouncement from "./UpdateAnnoucement";

const AnnoucementTable: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  //const [currentPage, setCurrentPage] = useState<number>(1);
  //const [pageSize, setPageSize] = useState<number>(5);
  const [deletingId, setDeletingId] = useState(null);
  const [OpenEdit, setOpenEditodal] = useState(false);
  const [recordId, setrecordId] = useState("");

  const { useFetchAnnoucement, useDeleteAnnoucementById } =
    AnnoucementService();

  const deleteMutation = useDeleteAnnoucementById();

  // const handleTableChange = (pagination: any) => {
  //   setCurrentPage(pagination.current);
  //   setPageSize(pagination.pageSize);
  // };

  const { data, isFetching } = useFetchAnnoucement();
  console.log("Annoucementdata", data);

  console.log(data);

  const formattedData: AnnoucementData[] =
    data?.data.announcements?.map((item, index) => ({
      key: item.id.toString(),
      id: item.id,

      title: item.title,
      body: item.body,
      image: item.image,

      status: item.status,
      announcementStatus: item.announcementStatus,
      createdAt: item.createdAt,
      updatedAt: item.updatedAt,
    })) || [];

  const showDeleteConfirm = (id: number) => {
    Modal.confirm({
      title: "Are you sure you want to Delete this Announcement?",

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
    setrecordId(record);
  };

  const columns: ColumnsType<AnnoucementData> = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      width: 70,
      render: (sl) => <span className="text-[#4b5563] ">{sl}</span>,
    },
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      render: (title) => <span className="text-[#4b5563] ">{title}</span>,
    },

    {
      title: "Body",
      dataIndex: "body",
      key: "body",
      render: (body: string) =>
        body ? (
          <span className="text-[#4b5563]">
            {body.length > 30 ? `${body.slice(0, 30)}...` : body}
          </span>
        ) : (
          "-"
        ),
    },

    {
      title: "Image",
      dataIndex: "image",
      key: "image",
      render: (url: string) => (
        <img
          src={url}
          alt="img"
          className="w-10 h-10 object-cover rounded-full"
        />
      ),
    },
    {
      title: "AnnouncementStatus",
      dataIndex: "announcementStatus",
      key: "announcementStatus",
      render: (announcementStatus) => (
        <span className="text-[#4b5563] ">{announcementStatus}</span>
      ),
    },

    {
      title: "Created At",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (text: any) =>
        new Date(text).toLocaleString("en-GB", {
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
      render: (text: any) =>
        new Date(text).toLocaleString("en-GB", {
          day: "2-digit",
          month: "short",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        }),
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
      render: (_, record) => (
        <Dropdown
          overlay={
            <Menu>
              <Menu.Item
                key="edit"
                icon={<EditOutlined />}
                onClick={() => handleEdit(record)}
              >
                Edit
              </Menu.Item>
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
            </Menu>
          }
          trigger={["click"]}
        >
          <MoreOutlined className="text-lg cursor-pointer" />
        </Dropdown>
      ),
    },
  ];

  return (
    <div className="p-4 bg-white rounded-[10px]">
      <div className="flex flex-col md:flex-row md:items-center  gap-3 mb-4  justify-end">
        <div className="flex items-center gap-2 ">
          <div className=" "></div>
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-primary text-[16px] text-white px-3 py-1 rounded-lg shadow hover:bg-primary w-full md:w-auto my-auto"
          >
            <PlusOutlined className="mr-1 text-backgroundPrimary text-[16px] my-auto" />
            Add Announcement
          </button>
          <AddAnnoucement
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
          />
        </div>
      </div>
      <Spin
        spinning={isFetching}
        tip={<span className="text-black">Loading...</span>}
      >
        <Table
          columns={columns}
          dataSource={formattedData}
          pagination={{
            // current: currentPage,
            // pageSize: pageSize,
            total: data?.total || 0,

            showTotal: (total, range) =>
              `Showing ${range[0]} to ${range[1]} of ${total} entries`,
          }}
          //onChange={handleTableChange}
          bordered={false}
          className="custom-table overflow-auto [&_.ant-pagination-item]:!border-gray-300 [&_.ant-pagination-item]:!text-gray-600 [&_.ant-pagination-item-active]:!bg-primary [&_.ant-pagination-item-active>a]:!text-white [&_.ant-pagination-prev]:!text-[#45B369] [&_.ant-pagination-next]:!text-[#EBECEF]"
        />
      </Spin>
      <UpdateAnnouncement
        open={OpenEdit}
        userData={recordId}
        onClose={() => setOpenEditodal(false)}
      />
    </div>
  );
};

export default AnnoucementTable;
