import React, { useState } from "react";
import { Table, Spin, Dropdown, Menu } from "antd";
import type { ColumnsType } from "antd/es/table";
import { VehicleData } from "@/lib/types/vehicle";
import VehicleService from "@/services/VehicleService/VehicleService";
import { EditOutlined, MoreOutlined } from "@ant-design/icons";
import EditVehicleStatus from "./EditVehicleStatus";

const VehicleTable: React.FC = () => {

  //const [currentPage, setCurrentPage] = useState<number>(1);
  //const [pageSize, setPageSize] = useState<number>(5);
  
  const [OpenEdit, setOpenEditodal] = useState(false);
  const [recordId, setrecordId] = useState("");

  const { useFetchVehicle } = VehicleService();

  // const handleTableChange = (pagination: any) => {
  //   setCurrentPage(pagination.current);
  //   setPageSize(pagination.pageSize);
  // };

  const { data, isFetching } = useFetchVehicle();
  console.log("Vehicledata", data);

  console.log("vehicle data", data);

  const formattedData: VehicleData[] =
    data?.data.register_unit?.flatMap((unit) =>
      unit.vehicle.map((item, index) => ({
        key: `${unit.id}-${index}`,
        id: unit.id, 
        name: item.name,
        type: item.type,
        color: item.color,
        model: item.model,
        plateNo: item.plateNo,
        vehicleStatus: item.vehicleStatus,
      }))
    ) || [];

 
  const handleEdit = (record: any) => {
    setOpenEditodal(true);
    setrecordId(record);
  };

  const columns: ColumnsType<VehicleData> = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      width: 70,
      render: (id) => <span className="text-[#4b5563] ">{id}</span>,
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (name) => <span className="text-[#4b5563] ">{name}</span>,
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
      render: (type) => <span className="text-[#4b5563] ">{type}</span>,
    },

    {
      title: "Color",
      dataIndex: "color",
      key: "color",
      render: (color) => <span className="text-[#4b5563] ">{color}</span>,
    },
    {
      title: "Model",
      dataIndex: "model",
      key: "model",
      render: (model) => <span className="text-[#4b5563] ">{model}</span>,
    },
    {
      title: "PlateNo",
      dataIndex: "plateNo",
      key: "plateNo",
      render: (plateNo) => <span className="text-[#4b5563] ">{plateNo}</span>,
    },
    {
      title: "VehicleStatus",
      dataIndex: "vehicleStatus",
      key: "vehicleStatus",
      render: (vehicleStatus) => (
        <span className="text-[#4b5563] ">{vehicleStatus}</span>
      ),
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
      <div className="flex flex-col md:flex-row md:items-center  gap-3 mb-4 ">
        <div className="flex items-center gap-2 ">
          <div className=" ">
            {/* <h2 className="underline font-semibold text-2xl">Vehicle</h2> */}
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
          pagination={{
            //current: currentPage,
            //pageSize: pageSize,
            //total: data?.total || 0,

            showTotal: (total, range) =>
              `Showing ${range[0]} to ${range[1]} of ${total} entries`,
          }}
          //onChange={handleTableChange}
          bordered={false}
          className="custom-table overflow-auto [&_.ant-pagination-item]:!border-gray-300 [&_.ant-pagination-item]:!text-gray-600 [&_.ant-pagination-item-active]:!bg-primary [&_.ant-pagination-item-active>a]:!text-white [&_.ant-pagination-prev]:!text-[#45B369] [&_.ant-pagination-next]:!text-[#EBECEF]"
        />
      </Spin>
      <EditVehicleStatus
        isOpen={OpenEdit}
        userData={recordId}
        onClose={() => setOpenEditodal(false)}
      />
    </div>
  );
};

export default VehicleTable;
