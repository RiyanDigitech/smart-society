import { useState } from 'react';
import { Dropdown, Input, Menu, message, Spin, Table, Tag, InputNumber } from 'antd';
import { EllipsisOutlined, EditOutlined, LoadingOutlined, DeleteOutlined, EyeOutlined } from '@ant-design/icons';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';
import { getAllComplaints } from '@/services/ComplaintServices/ComplaintServices';
import AddComplaint from './AddComplaint';
import { deleteComplaint } from '../../services/ComplaintServices/ComplaintServices';
import EditComplaintModal from './EditComplaintModal';
import SvgFilter from '@/components/common/FilterButton';
import FiltersModal from './FiltersModal';

function ComplaintTable() {
  
  const [postModalOpen, setPostModalOpen] = useState(false);
  const [putModalOpen, setputModalOpen] = useState(false);
  const [registerId, setRegisterId] = useState(false);
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);

  const naviagte = useNavigate()
  const columns = [
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
      render: (text: any) => <a>{text}</a>,
    },
    {
      title: 'description',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'unitNo',
      dataIndex: 'unitNo',
      key: 'unitNo',
    },
    {
      title: 'Created At',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (text: string) => dayjs(text).format("YYYY-MM-DD hh:mm A"),
    },
    {
      title: 'Updated At',
      dataIndex: 'updatedAt',
      key: 'updatedAt',
      render: (text: string) => dayjs(text).format("YYYY-MM-DD hh:mm A"),
    },
    {
      title: 'Priority',
      key: 'priority',
      dataIndex: 'priority',
      render: (status: any) => {
        let color = 'red'; // default
        if (status === 'Medium') {
          color = 'gold'; // yellow
        } else if (status === 'Urgent') {
          color = 'blue'; // green
        } else if (status === 'High') {
          color = 'green'; // green
        }
        return <Tag color={color}>{status?.toUpperCase()}</Tag>;
      },
    },
    {
      title: 'Complaint Status',
      key: 'complaintStatus',
      dataIndex: 'complaintStatus',
      render: (status: string) => {
        let color = '';

        switch (status) {
          case 'Resolved':
            color = 'blue';
            break;
          case 'Pending':
            color = 'gold';
            break;
          case 'InProgress':
            color = 'orange';
            break;
          case 'Assign':
            color = 'purple';
            break;
          case 'Closed':
            color = 'red';
            break;
          case 'Re Open':
            color = 'green';
            break;
          default:
            color = 'default';
        }

        return <Tag color={color}>{status?.toUpperCase()}</Tag>;
      },
    },

    {
      title: 'Action',
      key: 'action',
      render: (record: any) => {
        const menu = (
          <Menu>
            <Menu.Item
              key="edit"
              icon={<EditOutlined />}
              onClick={() => handleEditModal(record)}
            >
              Edit
            </Menu.Item>
            <Menu.Item
              key="view-more"
              icon={<EyeOutlined />}
              onClick={() => handleViewDetails(record)}
            >
              View More
            </Menu.Item>
            <Menu.Item
              key="delete"
              icon={<DeleteOutlined />}
              onClick={() => handleDelete(record)}
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


  const ShowFilterModal = () => {
    setIsFilterModalOpen(true)
  }
  // React Query
  const { data, isLoading } = useQuery({
    queryKey: ['complaint'],
    queryFn: getAllComplaints,
  });
  const antIcon = (
    <LoadingOutlined style={{ fontSize: 40, color: "#16a34a" }} spin />
  );
  // Prepare Table Data
  const tableData =
    data?.data?.complaints?.map((item: any, index: any) => ({
      key: String(index),
      id: item.id,
      title: item.title,
      description: item.description,
      type: item.type,
      //   phone: item.phone,
      //   cnic: item.cnic,
      unitNo: item.unitNo,
      complaintStatus: item.complaintStatus,
      createdAt: item.createdAt,
      updatedAt: item.updatedAt,
      priority: item.priority,

    })) || [];


  const handleEditModal = (record: any) => {
    setRegisterId(record.id)
    setputModalOpen(true)
  }

  const handleDelete = (record: any) => {
    deleteComplaintMutation.mutate(record.id)
  }

  const handleViewDetails = (record: any) => {
    console.log(record.id)
    naviagte(`/complaint-details/${record.id}`)
  }

  const queryClient = useQueryClient();
  const deleteComplaintMutation = useMutation({
    mutationFn: deleteComplaint,
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ["complaint"] });

      if (response?.message) {
        message.success(response.message);
      } else if (response?.error) {
        message.error(response.error);
      }
    },
    onError: (error: any) => {
      message.error(error?.response?.data?.message || "Something went wrong");
    },
  })

  return (
    <div className="p-8 bg-white">


      <div className='flex justify-start gap-6 p-3'>
        <h2 className='mt-2 underline'>Search by Apartment No :</h2>
        <InputNumber type='number'
          maxLength={4}
          // placeholder='123'
          onKeyPress={(e) => {
            if (e.target.value.length >= 4) {
              e.preventDefault();
            }
          }}
          className='border-gray-200 hover:border-green-600' />
      
       <div>
                    <button
                      onClick={() => ShowFilterModal()}
                      className="hidden xmd:flex  items-center justify-center border-[2px] border-[#edf2ef] rounded-lg px-2 py-2 bg-[#fafafa] text-[#1F53A4] font-medium xmd:px-4 xmd:py-3 lg:py-2  lg:w-[8vw] "
                    >
                      <div style={{ fontSize: "22px", color: "#6B6B6B" }}>
                        <SvgFilter />
                      </div>
                      <span className="text-[#6B6B6B] pl-2 font-semibold">Filters</span>
                    </button>
                  </div>
      </div>
      <div className='flex justify-between p-3'>
        <h2 className='underline font-semibold text-2xl'>Complaint</h2>
        <button className='font-bold active:scale-110 bg-green-600 text-white rounded p-2'
          onClick={() => setPostModalOpen(true)}
        >Create Complaint</button>
      </div>


      <Spin
        spinning={isLoading}
        tip="Loading..."
        className="text-green-600"
        size="large"
        indicator={antIcon} // custom spinner
      >
        <Table
          className="custom-table overflow-auto [&_.ant-pagination-item]:!border-gray-300 [&_.ant-pagination-item]:!text-gray-600 [&_.ant-pagination-item-active]:!bg-[#EBECEF] [&_.ant-pagination-item-active]:!text-white [&_.ant-pagination-prev]:!text-[#45B369] [&_.ant-pagination-next]:!text-[#EBECEF]"
          loading={isLoading}
          columns={columns}
          dataSource={tableData}
          pagination={false}
        />
      </Spin>

      {/* Add Register Unit Modal */}
      <AddComplaint postModalOpen={postModalOpen}
        onClose={() => setPostModalOpen(false)} />
      {/* Edit Register Unit Modal */}
      <EditComplaintModal registerId={registerId} putModalOpen={putModalOpen}
        onClose={() => setputModalOpen(false)} />
      {/* Change Register User Password Modal */}
      {/* <ChangePasswordModal registerId={registerId} changePasswordModal={changePasswordModal}
        onClose={() => setChangePasswordModal(false)} /> */}

        <FiltersModal   isOpen={isFilterModalOpen}
                          onClose={() => setIsFilterModalOpen(false)}  />
    </div>
  );
}

export default ComplaintTable;
