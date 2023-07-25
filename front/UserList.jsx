import React, { useEffect, useState } from 'react';
import { Avatar, Checkbox, Space, Table, DatePicker, Modal, Button, message, Radio } from 'antd';
import { RobotFilled, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import UpdateForm from './UpdateForm';

const { RangePicker } = DatePicker;

const UserList = ({ onChangeSelected }) => {
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState({});
  const [filteredUsers, setFilteredUsers] = useState([]);

  const [searchValue, setSearchValue] = useState('');
  const [dateRange, setDateRange] = useState([]);
  const [deletedUser, setDeletedUser] = useState(null);
  const [roleFilter, setRoleFilter] = useState('');
  const [isEditingModalVisible, setIsEditingModalVisible] = useState(false)
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false)
  const [selectedUser, setSelectedUser] = useState({})

  const roles = ['admin', 'instructor', 'developer', 'analyst', 'recruiter'];

  function showEditModal(user) {
    setSelectedUser((prevUser) => {
      return user
    })

    setIsEditingModalVisible(!isEditingModalVisible)
  }
  function showDeleteModal(user) {
    setSelectedUser((prevUser) => {
      return user
    })

    setIsDeleteModalVisible(!isEditingModalVisible)
  }

  function changeSelected(record) {
    setSelectedUsers((prevSelectedUsers)=>{
      return record;
    })
    onChangeSelected(record)
  }
  const confirmDelete = async () => {
    try {
      // Send the delete request to delete the account
      await fetch(`http://localhost:3000/users/${selectedUser._id}`, {
        method: 'DELETE',
      });
  
      // Optionally, perform additional actions after successful deletion
      // For example, show a success message, update the user list, etc.
      message.success('Account deleted successfully');

      // Close the modal
      setIsDeleteModalVisible(false);
    } catch (error) {
      console.error('Error deleting account:', error);
      // Handle error if deletion fails
      // For example, show an error message, retry deletion, etc.
    }
  };
  

  const columns = [
    {
      title: '',
      dataIndex: 'radio',
      render: (_, record) => (
        <Radio checked={selectedUsers._id === record._id} onClick={() => changeSelected(record)} />
      ),
    },
    
    
    {
      title: 'Avatar',
      dataIndex: 'avatar',
      render: (avatar) => <Avatar src={avatar} />,
    },
    {
      title: 'Username',
      dataIndex: 'username',
      sorter: (a, b) => a.username.localeCompare(b.username),
      sortDirections: ['ascend', 'descend'],
      filteredValue: searchValue ? [searchValue] : null,
      onFilter: (value, record) =>
        record.username.toLowerCase().includes(value.toLowerCase()),
    },
    {
      title: 'First Name',
      dataIndex: 'firstname',
      sorter: (a, b) => a.firstname.localeCompare(b.firstname),
      sortDirections: ['ascend', 'descend'],
    },
    {
      title: 'Last Name',
      dataIndex: 'lastname',
      sorter: (a, b) => a.lastname.localeCompare(b.lastname),
      sortDirections: ['ascend', 'descend'],
    },
    {
      title: 'Birthdate',
      dataIndex: 'birthdate',
      sorter: (a, b) => new Date(a.birthdate) - new Date(b.birthdate),
      sortDirections: ['ascend', 'descend'],

      render: (birthdate) => new Date(birthdate).toLocaleDateString(),
    },
    {
      title: 'Role',
      dataIndex: 'role',
      sorter: (a, b) => a.role.localeCompare(b.role),
      sortDirections: ['ascend', 'descend'],
      filteredValue: roleFilter ? [roleFilter] : null,
      onFilter: (value, record) => record.role === value,
      render: (role) => role,
    },
    {
      title: 'Creation Date',
      dataIndex: 'creationDate',
      sorter: (a, b) => new Date(a.createdAt) - new Date(b.createdAt),
      sortDirections: ['ascend', 'descend'],
      filters: [
        { text: 'Today', value: 'today' },
        { text: 'This Week', value: 'thisWeek' },
        { text: 'This Month', value: 'thisMonth' },
      ],
      onFilter: (value, record) => {
        if (value === 'today') {
          const today = new Date().setHours(0, 0, 0, 0);
          const recordDate = new Date(record.createdAt).setHours(0, 0, 0, 0);
          return recordDate === today;
        }
        if (value === 'thisWeek') {
          const today = new Date().setHours(0, 0, 0, 0);
          const startOfWeek = new Date(today - (today.getDay() * 86400000)).setHours(0, 0, 0, 0);
          const endOfWeek = new Date(today + ((6 - today.getDay()) * 86400000)).setHours(23, 59, 59, 999);
          const recordDate = new Date(record.createdAt).setHours(0, 0, 0, 0);
          return recordDate >= startOfWeek && recordDate <= endOfWeek;
        }
        if (value === 'thisMonth') {
          const today = new Date().setHours(0, 0, 0, 0);
          const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1).setHours(0, 0, 0, 0);
          const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0).setHours(23, 59, 59, 999);
          const recordDate = new Date(record.createdAt).setHours(0, 0, 0, 0);
          return recordDate >= startOfMonth && recordDate <= endOfMonth;
        }
      },
      render: (createdAt) => new Date(createdAt).toLocaleDateString(),
    },
    {
      title: 'Edit',
      dataIndex: 'edit',
      render: (text, record) => (
        <Button onClick={() => showEditModal(record)}>
          <EditOutlined />
        </Button>
      ),
    },
    {
      title: 'Delete',
      dataIndex: 'delete',
      render: (text, record) => (
        <Button onClick={() => showDeleteModal(record)}>
          <DeleteOutlined />
        </Button>
      ),
    },
  ];

  const loadUsers = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:3000/users');
      const data = await response.json();
      setUsers(data);
      setFilteredUsers(data);
      setLoading(false);
    } catch (error) {
      console.error('Error while fetching users:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

 

  const handleSearch = (value) => {
    setSearchValue(value);
  };

  const handleDateFilter = (dates) => {
    setDateRange(dates);
  };

  useEffect(() => {
    const filtered = users.filter((user) => {
      const isUsernameMatch = user.username.toLowerCase().includes(searchValue.toLowerCase());
      if (dateRange.length === 0) {
        return isUsernameMatch;
      } else {
        const startDate = dateRange[0].startOf('day').toDate();
        const endDate = dateRange[1].endOf('day').toDate();
        const birthdate = new Date(user.birthdate);
        return isUsernameMatch && birthdate >= startDate && birthdate <= endDate;
      }
    });
    setFilteredUsers(filtered);
  }, [searchValue, dateRange]);



  return (
    <div>
      <Table
        dataSource={filteredUsers}
        columns={columns}
        loading={loading}
        rowKey="id"
        pagination={false}
      />
      <Modal

        visible={isEditingModalVisible}
        onCancel={() => setIsEditingModalVisible(false)}
        footer={null}
      >
        <UpdateForm usern={selectedUser} />
      </Modal>
      <Modal
        visible={isDeleteModalVisible}
        onCancel={() => setIsDeleteModalVisible(false)}
        footer={null}
      >
        <p>Are you sure you want to delete this account?</p>
        <Button type="primary" onClick={confirmDelete}>
          Confirm
        </Button>
      </Modal>

    </div>
  );
};

export default UserList;
