import { useState } from 'react';
import { Dropdown, Input, Menu, message, Spin, Table, Tag } from 'antd';
import { EllipsisOutlined, EditOutlined, DeleteOutlined, EyeOutlined } from '@ant-design/icons';
import { keepPreviousData, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';
import { getAllComplaints } from '@/services/ComplaintServices/ComplaintServices';
import { deleteComplaint } from '../../services/ComplaintServices/ComplaintServices';
import SvgFilter from '@/components/common/FilterButton';

// Lazy Loading fro Better Performance
import { lazy, Suspense } from 'react';
const AddComplaint = lazy(() => import('./AddComplaint'));
const EditComplaintModal = lazy(() => import('./EditComplaintModal'));
const FiltersModal = lazy(() => import('./FiltersModal'));

function ComplaintTable() {

  const [postModalOpen, setPostModalOpen] = useState(false);
  const [putModalOpen, setputModalOpen] = useState(false);
  const [registerId, setRegisterId] = useState(false);
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [filterStatusSet, setFilterStatus] = useState("")
  const [search, setSearch] = useState(null)

  const naviagte = useNavigate()
  const columns = [
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
      render: (text: any) => <a>{text}</a>,
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
      render: (text) => {
        if (!text) return '-';
        const words = text.split(' ');
        return words.length > 6 ? words.slice(0, 6).join(' ') + '...' : text;
      },
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

  // React Query
  const { data, isLoading } = useQuery({
    queryKey: ['complaint', filterStatusSet, search],
    queryFn: () => getAllComplaints(filterStatusSet, search),
    placeholderData: keepPreviousData,
    staleTime: 5000,
  });

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

  const ShowFilterModal = () => {
    setIsFilterModalOpen(true)
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
    <div className="p-4 sm:p-6 md:p-8 bg-white w-full">

      {/* 🔍 Search & Filter Section */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-3">

        {/* Search Input */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-3 w-full sm:w-auto">
          <h2 className="underline font-semibold text-base sm:text-lg whitespace-nowrap">
            Search by Apartment No:
          </h2>

          <Input
            type="text"
            maxLength={4}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyPress={(e) => {
              if (e.target.value.length >= 4) {
                e.preventDefault();
              }
            }}
            className="border-gray-300 hover:border-green-600 w-full sm:w-40 md:w-56"
          />
        </div>

        {/* Filter Button */}
        <div className="flex justify-end">
          <button
            onClick={() => ShowFilterModal()}
            className="flex items-center justify-center border-2 border-[#edf2ef] rounded-lg px-3 py-2 bg-[#fafafa] text-[#1F53A4] font-medium hover:bg-gray-100 transition-all duration-200 w-full sm:w-auto"
          >
            <div style={{ fontSize: "22px", color: "#6B6B6B" }}>
              <SvgFilter />
            </div>
            <span className="text-[#6B6B6B] pl-2 font-semibold text-sm sm:text-base">Filters</span>
          </button>
        </div>
      </div>

      {/* 🧾 Title & Create Button */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-3 gap-3">
        <h2 className="underline font-semibold text-xl sm:text-2xl">Complaint</h2>
        <button
          className="font-bold bg-green-600 text-white rounded px-4 py-2 hover:bg-green-700 transition active:scale-105 w-full sm:w-auto"
          onClick={() => setPostModalOpen(true)}
        >
          Create Complaint
        </button>
      </div>

      {/* 📋 Table Section */}
      <div className="overflow-x-auto">
        <Spin
          spinning={isLoading}
          tip="Loading..."
          className="text-green-600"
          size="large"
        // indicator={antIcon}
        >
          <Table
            className="custom-table min-w-full text-sm [&_.ant-pagination-item]:!border-gray-300 [&_.ant-pagination-item]:!text-gray-600 [&_.ant-pagination-item-active]:!bg-[#45B369] [&_.ant-pagination-item-active]:!text-white"
            columns={columns}
            dataSource={tableData}
            pagination={false}
          />
        </Spin>
      </div>

      <Suspense fallback={<Spin size="large" />}>
        {postModalOpen && (
          <AddComplaint postModalOpen={postModalOpen} onClose={() => setPostModalOpen(false)} />
        )}
        {putModalOpen && (
          <EditComplaintModal registerId={registerId} putModalOpen={putModalOpen} onClose={() => setputModalOpen(false)} />
        )}
        {isFilterModalOpen && (
          <FiltersModal isOpen={isFilterModalOpen} onClose={() => setIsFilterModalOpen(false)} setFilterStatus={setFilterStatus} />
        )}
      </Suspense>

    </div>

  );
}

export default ComplaintTable;
