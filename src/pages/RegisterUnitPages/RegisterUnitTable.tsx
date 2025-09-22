import { Dropdown, Menu, Table, Tag } from 'antd';
import { EllipsisOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { useQuery } from '@tanstack/react-query';
import { getAllRegisterUsers } from '@/services/RegisterUnitServices/RegisterUnitServic';

function RegisterUnitTable() {
  const columns = [
    {
      title: 'Full Name',
      dataIndex: 'fullname',
      key: 'fullname',
      render: (text) => <a>{text}</a>,
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
    },
    {
      title: 'Updated At',
      dataIndex: 'updatedAt',
      key: 'updatedAt',
    },
    {
      title: 'Status',
      key: 'status',
      dataIndex: 'status',
      render: (status) => {
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
      render: (_, record) => {
        const menu = (
          <Menu>
            <Menu.Item
              key="edit"
              icon={<EditOutlined />}
              onClick={() => console.log('Edit', record)}
            >
              Edit
            </Menu.Item>
            <Menu.Item
              key="delete"
              icon={<DeleteOutlined />}
              onClick={() => console.log('Delete', record)}
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
    queryKey: ['register'],
    queryFn: getAllRegisterUsers,
  });

  // Prepare Table Data
  const tableData =
    data?.data?.register_unit?.map((item, index) => ({
      key: String(index),
      fullname: item.fullname,
      email: item.email,
      phone: item.phone,
      cnic: item.cnic,
      totalMembers: item.totalMembers,
      role: item.role,
      createdAt: item.createdAt,
      updatedAt: item.updatedAt,
      status: item.status,
    
    })) || [];

  return (
    <div className="p-8 bg-white">
      <Table
        loading={isLoading}
        columns={columns}
        dataSource={tableData}
        pagination={false}
      />
    </div>
  );
}

export default RegisterUnitTable;
