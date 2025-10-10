import { Button, Dropdown, Menu, message, Modal, Spin, Table, Tag } from "antd";
import {
  DeleteOutlined,
  DownloadOutlined,
  EditOutlined,
  LoadingOutlined,
  MoreOutlined,
} from "@ant-design/icons";
import { DatePicker } from "antd";
import { useState } from "react";
import CommunityService from "@/services/communityservice/CommunityService";
import CommunityModal from "./CommunityModal";
import { ColumnsType } from "antd/es/table";


const { RangePicker } = DatePicker;
function CommunityTable() {
  const [open, setOpen] = useState(false);
  const [editingCommunity, setEditingCommunity] = useState<any | null>(null);
  // pagination state
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
//   const [filterRange, setFilterRange] = useState<[string | undefined, string | undefined]>([undefined, undefined]);
//   const [appliedRange, setAppliedRange] = useState<[string | undefined, string | undefined]>([undefined, undefined]);

//   const startDate = appliedRange[0];
//   const endDate = appliedRange[1];

  const { useGetCommunity, useDeleteCommunity } = CommunityService();
  const { data:community, isLoading } = useGetCommunity( page, pageSize);
  const deletecommunity = useDeleteCommunity();

//    const handleApplyFilter = () => {
//     setAppliedRange(filterRange);
//   };

const handleDelete = (postId: number, callbacks?: any) => {
  if (!postId) return;

  deletecommunity.mutate(
    { postId },
    {
      onSuccess: (res) => {
        if (res?.success) {
          message.success(res.message || "Deleted successfully");
          callbacks?.onSuccess?.();
        } else {
          message.error(res?.message || "Failed to delete post");
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


 const columns: ColumnsType<any> = [
  {
    title: "ID",
    dataIndex: "id",
    key: "id",
    width: 70,
    align: "center",
  },
  {
    title: "Type",
    dataIndex: "type",
    key: "type",
    render: (type: string) => (
      <Tag
        color={type === "pollpost" ? "green" : "blue"}
        className="capitalize font-semibold"
      >
        {type}
      </Tag>
    ),
  },
  {
    title: "Title / Text",
    key: "title",
    render: (record: any) =>
      record.type === "pollpost" ? (
        <span>{record.title || "-"}</span>
      ) : (
        <span>
          {record.text
            ? record.text.length > 30
              ? `${record.text.slice(0, 30)}...`
              : record.text
            : "-"}
        </span>
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
            alt="Post"
            className="w-16 h-16 object-cover rounded-md border cursor-pointer hover:scale-105 transition-transform"
            onClick={() => {
              Modal.info({
                title: "Post Preview",
                centered: true,
                width: "auto",
                content: (
                  <img
                    src={url}
                    alt="Post"
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
    title: "Description",
    dataIndex: "description",
    key: "description",
    render: (text: string) =>
      text ? (
        <span>
          {text.length > 25 ? `${text.slice(0, 25)}...` : text}
        </span>
      ) : (
        "-"
      ),
  },
  {
    title: "Poll Options",
    dataIndex: "options",
    key: "options",
    render: (options: string[]) =>
      options && options.length > 0 ? (
        <div className="flex flex-wrap gap-1">
          {options.map((opt, idx) => (
            <Tag color="green" key={idx} className="text-xs px-2 py-1">
              {opt}
            </Tag>
          ))}
        </div>
      ) : (
        "-"
      ),
  },
  {
    title: "Created By",
    key: "createdUser",
    render: (record: any) => {
      const user = record.createdUser || {};
      return (
        <div className="flex flex-col text-sm">
          <span className="font-medium text-gray-800">{user.fullName || "-"}</span>
          <span className="text-gray-500">{user.email || "-"}</span>
        </div>
      );
    },
  },
  {
    title: "Actions",
    key: "actions",
    align: "center",
    render: (_: any, record: any) => (
      <Dropdown
        overlay={
          <Menu>
            <Menu.Item
              key="edit"
              icon={<EditOutlined />}
              onClick={() => {
                setEditingCommunity(record);
                setOpen(true);
              }}
            >
              Edit
            </Menu.Item>
            <Menu.Item
              key="delete"
              icon={<DeleteOutlined />}
              danger
              onClick={() => {
                Modal.confirm({
                  title: "Confirm Deletion",
                  content: `Are you sure you want to delete "${record.text || record.title}"?`,
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
        <MoreOutlined className="text-lg cursor-pointer hover:text-green-600" />
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
          Community Post
        </div>
        <button className="bg-green-600 text-white py-2 px-3 rounded-lg" onClick={() => setOpen(true)}>Create Post</button>
      </div>
        {/* ✅ Summary Cards */}
      {/* <Summary /> */}

      {/* Top Controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
        {/* Left Controls */}
         {/* Date Filter */}
  {/* <div className="flex items-center gap-3 mb-4">
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
      </div> */}

        {/* <button
          className="flex bg-primary text-sm text-white px-6 py-2 rounded-lg shadow hover:bg-primary w-full sm:w-auto"
        >
          <DownloadOutlined className="mr-1 !text-white text-lg my-auto" /><span>Download</span>
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
            dataSource={community?.data?.posts || []}
            pagination={{
    current: community?.data?.page || page,
    pageSize: pageSize,
    total: community?.data?.total || 0,
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
      <CommunityModal
      open={open}
      onClose={() => {
        setOpen(false);
        setEditingCommunity(null); // reset when closing
      }}
      editingCommunity={editingCommunity}
    />
    </div>
  );
}

export default CommunityTable;
