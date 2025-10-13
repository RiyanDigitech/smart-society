import React, { useState } from "react";
import { Table, Spin, Dropdown, Menu, Modal } from "antd";
import type { ColumnsType } from "antd/es/table";
import { DeleteOutlined, EditOutlined, MoreOutlined, PlusOutlined } from "@ant-design/icons";
import { EmergencyData } from "@/lib/types/emergency";
import EmergencyService from "@/services/EmergencyService/EmergencyService";
import AddEmergency from "./AddEmergency";
import UpdateEmergency from "./UpdateEmergency";




const EmergencyTable: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  //const [page, setPage] = useState<number>(1);
  //const [pageSize, setPageSize] = useState<number>(5);
  const [deletingId, setDeletingId] = useState(null);
  const [OpenEdit, setOpenEditodal] = useState(false);
  const [recordId, setrecordId] = useState("");
 
  
  const { useFetchEmergency,useDeleteEmergencyById} = EmergencyService();
  
  const deleteMutation = useDeleteEmergencyById();

  // const handleTableChange = (pagination: any) => {
  //   setPage(pagination.current);
  //   setPageSize(pagination.pageSize);
  // };

 const { data, isFetching } = useFetchEmergency();
 console.log("emergencydata",data)


  console.log(data);



  const formattedData: EmergencyData[] =
    data?.data.emergency?.map((item, index) => ({
      key: item.id.toString(),
      id: item.id,
  
      name: item.name,
    //   createdAt: item.createdAt,
    //   updatedAt: item.updatedAt,
      status:item.status,
      helpline_no:item.helpline_no
    })) || [];

  
    const showDeleteConfirm = (id: number) => {
  Modal.confirm({
    title: "Are you sure you want to Delete this Emergency?",
    
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


  const columns: ColumnsType<EmergencyData> = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      width: 70,
      render: (sl) => <span className="text-[#4b5563] ">{sl}</span>,
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (name) => <span className="text-[#4b5563] ">{name}</span>,
    },
    {
      title: "Helpline No",
      dataIndex: "helpline_no",
      key: "helpline_no",
      render: (helpline_no) => <span className="text-[#4b5563] ">{helpline_no}</span>,
    },
    // {
    //   title: "createdAt",
    //   dataIndex: "createdAt",
    //   key: "createdAt",
    //   render: (createdAt) => <span className="text-[#4b5563] ">{createdAt}</span>,
    // },
    // {
    //   title: "updatedAt",
    //   dataIndex: "updatedAt",
    //   key: "updatedAt",
    //   render: (updatedAt) => <span className="text-[#4b5563] ">{updatedAt}</span>,
    // },
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
                onClick= {()=>showDeleteConfirm(Number(record.id))}
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
            Add Emergency
          </button>
          <AddEmergency
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
          pagination={false}
          // pagination={{
          //   current: data?.data?.page || page,
          //   pageSize: pageSize,
          //   total: data?.data?.total || 0,

          //   showTotal: (total, range) =>
          //     `Showing ${range[0]} to ${range[1]} of ${total} entries`,
          //   onChange: (p, ps) => {
          //     setPage(p);
          //     setPageSize(ps);
          //   },
          // }}
          //onChange={handleTableChange}
          bordered={false}
          className="custom-table overflow-auto [&_.ant-pagination-item]:!border-gray-300 [&_.ant-pagination-item]:!text-gray-600 [&_.ant-pagination-item-active]:!bg-primary [&_.ant-pagination-item-active>a]:!text-white [&_.ant-pagination-prev]:!text-[#45B369] [&_.ant-pagination-next]:!text-[#EBECEF]"
        />
      </Spin>
      <UpdateEmergency
        open={OpenEdit}
        userData={recordId}
        onClose={() => setOpenEditodal(false)}
      />
    </div>
  );
};

export default EmergencyTable;
