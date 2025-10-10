import React, { useState } from "react";
import { Table, Spin, Dropdown, Menu, Modal } from "antd";
import type { ColumnsType } from "antd/es/table";
import DomesticStaffService from "@/services/DomesticStaffService/DomesticStaffService";
import { DomesticStaffData } from "@/lib/types/domesticstaff";
import { DeleteOutlined, MoreOutlined } from "@ant-design/icons";




const DomesticStaffTable: React.FC = () => {
  //const [isModalOpen, setIsModalOpen] = useState(false);
  //const [currentPage, setCurrentPage] = useState<number>(1);
  //const [pageSize, setPageSize] = useState<number>(5);
  const [deletingId, setDeletingId] = useState(null);

 
  
  const { useGetDomesticStaff,useDeleteDomesticStaff } = DomesticStaffService();
  
  const deleteMutation = useDeleteDomesticStaff();

 const { data, isFetching } = useGetDomesticStaff();
 console.log("domesticstaffdata",data)

 const items =  data?.data?.data ?? []; 

const formattedData = items.map(item => ({
  key: item.id?.toString() ?? "",
  id: item.id,
  name: item.name,
  number: item.number,
  cnic: item.cnic,
  role: item.role,
  createdAt: item.createdAt,
  //updatedAt: item.updatedAt,
}));

  
  const showDeleteConfirm = (id: number) => {
  Modal.confirm({
    title: "Are you sure you want to Delete this Domestic Staff?",
    
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



  const columns: ColumnsType<DomesticStaffData> = [
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
      title: "Number",
      dataIndex: "number",
      key: "number",
      render: (number) => <span className="text-[#4b5563] ">{number}</span>,
    },
    {
      title: "Cnic",
      dataIndex: "cnic",
      key: "cnic",
      render: (cnic) => <span className="text-[#4b5563] ">{cnic}</span>,
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
      render: (role) => <span className="text-[#4b5563] ">{role}</span>,
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
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Dropdown
          overlay={
            <Menu>
            
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
          <div className=" ">
           
          </div>
        
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
        //   pagination={{
        //     //current: currentPage,
        //     //pageSize: pageSize,
        //   total: data?.total || 0,

        //     showTotal: (total, range) =>
        //       `Showing ${range[0]} to ${range[1]} of ${total} entries`,
        //   }}
          //onChange={handleTableChange}
          bordered={false}
          className="custom-table overflow-auto [&_.ant-pagination-item]:!border-gray-300 [&_.ant-pagination-item]:!text-gray-600 [&_.ant-pagination-item-active]:!bg-primary [&_.ant-pagination-item-active>a]:!text-white [&_.ant-pagination-prev]:!text-[#45B369] [&_.ant-pagination-next]:!text-[#EBECEF]"
        />
      </Spin>
     
    </div>
  );
};

export default DomesticStaffTable;
