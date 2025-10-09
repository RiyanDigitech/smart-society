
import { Dropdown, Menu, message, Modal, Spin, Table, Tag } from 'antd';
import { EllipsisOutlined, EditOutlined , DeleteOutlined } from '@ant-design/icons';
import { keepPreviousData, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
// import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';
import { deleteSupplementary, getAllSupplementary } from '@/services/SupplementaryServices/SupplementaryServices';
import { lazy, Suspense, useState } from 'react';

const EditSupplimentModal = lazy(() => import('./EditSupplimentModal'))

function SupplementaryTable() {

    const [editModal, setEditModalOpen] = useState(false);
    const [supplimentID, setSupplimentId] = useState();
  //   const [putModalOpen, setputModalOpen] = useState(false);
  //   const [changePasswordModal, setChangePasswordModal] = useState(false);
  //   const [registerId, setRegisterId] = useState(false);

  //   const naviagte = useNavigate()
  const queryClient = useQueryClient();
  const columns = [
    {
      title: 'Full Name',
      dataIndex: 'fullname',
      key: 'fullname',
      render: (text: any) => <a>{text}</a>,
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: 'CNIC',
      dataIndex: 'cnic',
      key: 'cnic',
    },
    {
      title: 'Gender',
      dataIndex: 'gender',
      key: 'gender',
    },
    // {
    //   title: 'Gender',
    //   dataIndex: 'gender',
    //   key: 'gender',
    // },
    {
      title: 'Relation',
      dataIndex: 'relation',
      key: 'relation',
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
      title: 'Status',
      key: 'supplementryStatus',
      dataIndex: 'supplementryStatus',
      render: (status: any) => {
        let color = 'red'; // default
        if (status === 'pending') {
          color = 'gold'; // yellow
        } else if (status === 'Active') {
          color = 'green'; // green
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
            {/* <Menu.Item
              key="delete"
              icon={<EyeOutlined />}
              // onClick={() => handleViewDetails(record)}
            >
              View More
            </Menu.Item> */}
            <Menu.Item
              key="delete"
              icon={<DeleteOutlined />}
              danger
              onClick={() => {
                Modal.confirm({
                  title: "Confirm Deletion",
                  content: `Are you sure you want to delete "${record.fullname}"?`,
                  okText: "Yes",
                  cancelText: "No",
                  okButtonProps: {
                    className: "bg-green-600 text-white hover:!bg-green-700",
                  },
                  onOk: () => { deleteSupplementaryMutation.mutate(record.id) },
                });
              }}
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
    queryKey: ['supplementary'],
    queryFn: getAllSupplementary,
    placeholderData:keepPreviousData,
    staleTime:5000
  });
  // const antIcon = (
  //   <LoadingOutlined style={{ fontSize: 40, color: "#16a34a" }} spin />
  // );
  // Prepare Table Data
  const tableData =
    data?.data?.map((item: any, index: any) => ({
      key: String(index),
      fullname: item.fullName,
      id: item.id,
      email: item.email,
      phone: item.phone,
      cnic: item.cnic,
      relation: item.relation,
      gender: item.gender,
      // status: item.status,
      supplementryStatus: item.supplementryStatus,
      createdAt: item.createdAt,
      updatedAt: item.updatedAt,

    })) || [];

  const deleteSupplementaryMutation = useMutation({
    mutationFn: deleteSupplementary,
    onSuccess: (res: any) => {
      queryClient.invalidateQueries({ queryKey: ["supplementary"] });
      message.success(res.message || "Delete Supplementary Successfully!");

    },
    onError: (error) => { console.log(error) },
  })

  const handleEditModal = (record: any) => {
    setSupplimentId(record.id)
    setEditModalOpen(true)
  }


  //   const handleViewDetails = (record: any) => {
  //     console.log(record.id)
  //     naviagte(`/register-unit-detail/${record.id}`)
  //   }

  //   const handleEditModal = (record: any) => {
  //     setRegisterId(record.id)
  //     setputModalOpen(true)
  //   }

  //   const handleChangePassword = (record: any) => {
  //     setRegisterId(record.id)
  //     setChangePasswordModal(true)
  //   }

  return (
    <div className="p-8 bg-white">
      <div className='flex justify-between p-3'>
        <h2 className='underline font-semibold text-2xl'>Supplementary</h2>
        {/* <button className='font-bold active:scale-110 bg-green-600 text-white rounded p-2'
          onClick={() => setPostModalOpen(true)}
        >Create Supplementary</button> */}
      </div>
      <Spin
        spinning={isLoading}
        tip="Loading..."
        className="text-green-600"
        size="large"
      >
        <Table
          className="custom-table overflow-auto [&_.ant-pagination-item]:!border-gray-300 [&_.ant-pagination-item]:!text-gray-600 [&_.ant-pagination-item-active]:!bg-[#EBECEF] [&_.ant-pagination-item-active]:!text-white [&_.ant-pagination-prev]:!text-[#45B369] [&_.ant-pagination-next]:!text-[#EBECEF]"
          // loading={isLoading}
          columns={columns}
          dataSource={tableData}
          pagination={false}
        />
      </Spin>

      <Suspense>
        {editModal && (
          <EditSupplimentModal  supplimentID={supplimentID} editModal={editModal}
        onClose={() => setEditModalOpen(false)} />
        )}
      </Suspense>
    </div>
  );
}

export default SupplementaryTable;
