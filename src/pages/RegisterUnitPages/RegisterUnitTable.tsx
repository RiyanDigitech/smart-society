import { Dropdown, Menu, Spin, Table, Tag } from 'antd';
import { EllipsisOutlined, EditOutlined, EyeOutlined } from '@ant-design/icons';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { getAllRegisterUsers } from '@/services/RegisterUnitServices/RegisterUnitServic';
import { useState } from 'react';
import { MdPassword } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';

import { lazy, Suspense } from 'react'

const AddRegisterUnit = lazy(() => import('./AddRegisterUnit'))
const EditRegisterUnitModal = lazy(() => import('./EditRegiserUnit'))
const ChangePasswordModal = lazy(() => import('./ChangePasswordModal'))

function RegisterUnitTable() {

  const [postModalOpen, setPostModalOpen] = useState(false);
  const [putModalOpen, setputModalOpen] = useState(false);
  const [changePasswordModal, setChangePasswordModal] = useState(false);
  const [registerId, setRegisterId] = useState(false);

  const naviagte = useNavigate()
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
      title: 'Total Members',
      dataIndex: 'totalMembers',
      key: 'totalMembers',
    },
    {
      title: 'Role',
      dataIndex: 'role',
      key: 'role',
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
      key: 'status',
      dataIndex: 'status',
      render: (status: any) => {
        let color = 'red'; // default
        if (status === 'Pending') {
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
            <Menu.Item
              key="delete"
              icon={<EyeOutlined />}
              onClick={() => handleViewDetails(record)}
            >
              View More
            </Menu.Item>
            <Menu.Item
              key="password"
              icon={<MdPassword />}
              onClick={() => handleChangePassword(record)}
            >
              Change Password
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
    queryKey: ['register'],
    queryFn: getAllRegisterUsers,
    placeholderData: keepPreviousData,
    staleTime: 5000
  });


  const tableData =
    data?.data?.register_unit?.map((item: any, index: any) => ({
      key: String(index),
      fullname: item.fullname,
      id: item.id,
      email: item.email,
      phone: item.phone,
      cnic: item.cnic,
      totalMembers: item.totalMembers,
      role: item.role,
      createdAt: item.createdAt,
      updatedAt: item.updatedAt,
      status: item.status,

    })) || [];


  const handleViewDetails = (record: any) => {
    console.log(record.id)
    naviagte(`/register-unit-detail/${record.id}`)
  }

  const handleEditModal = (record: any) => {
    setRegisterId(record.id)
    setputModalOpen(true)
  }

  const handleChangePassword = (record: any) => {
    setRegisterId(record.id)
    setChangePasswordModal(true)
  }

  return (
    <div className="p-8 bg-white">

      <div className='flex justify-between p-3'>
        <h2 className='underline font-semibold text-2xl'>Register Unit</h2>
        <button className='font-bold active:scale-110 bg-green-600 text-white rounded p-2'
          onClick={() => setPostModalOpen(true)}
        >Create Register Unit</button>
      </div>
      <Spin
        spinning={isLoading}
        tip="Loading..."
        className="text-green-600"
        size="large"
      // indicator={antIcon} // custom spinner
      >
        <Table
          className="custom-table overflow-auto [&_.ant-pagination-item]:!border-gray-300 [&_.ant-pagination-item]:!text-gray-600 [&_.ant-pagination-item-active]:!bg-[#EBECEF] [&_.ant-pagination-item-active]:!text-white [&_.ant-pagination-prev]:!text-[#45B369] [&_.ant-pagination-next]:!text-[#EBECEF]"
          columns={columns}
          dataSource={tableData}
          pagination={false}
        />
      </Spin>

      <Suspense>
        {/* Add Register Unit Modal */}
        {postModalOpen && (
          <AddRegisterUnit postModalOpen={postModalOpen}
            onClose={() => setPostModalOpen(false)} />
        )}
        {/* Edit Register Unit Modal */}
        {putModalOpen && (<EditRegisterUnitModal registerId={registerId} putModalOpen={putModalOpen}
          onClose={() => setputModalOpen(false)} />
        )}
        {/* Change Register User Password Modal */}
        {changePasswordModal && (
          <ChangePasswordModal registerId={registerId} changePasswordModal={changePasswordModal}
            onClose={() => setChangePasswordModal(false)} />
        )}

      </Suspense>
    </div>
  );
}

export default RegisterUnitTable;
