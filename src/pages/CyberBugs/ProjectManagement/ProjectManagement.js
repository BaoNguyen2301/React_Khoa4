import React, { useState, useRef, useEffect } from 'react'
import { Button, Input, Space, Table, Tag } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import Highlighter from 'react-highlight-words';
import parse from 'html-react-parser';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { useSelector, useDispatch } from 'react-redux';


export default function ProjectManagement() {

  const projectList = useSelector(state => state.ProjectCyberBugsReducer.projectList)
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({
      type: 'GET_LIST_PROJECT_SAGA'
    })
    return () => {

    }
  }, [])


  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const searchInput = useRef(null);
  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };
  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText('');
  };
  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
      <div
        style={{
          padding: 8,
        }}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: 'block',
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
            }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{
              width: 90,
            }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({
                closeDropdown: false,
              });
              setSearchText(selectedKeys[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? '#1677ff' : undefined,
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{
            backgroundColor: '#ffc069',
            padding: 0,
          }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ''}
        />
      ) : (
        text
      ),
  });
  const columns = [
    {
      title: 'Id',
      dataIndex: 'id',
      key: 'id',
      width: '5%',
      ...getColumnSearchProps('id'),
      defaultSortOrder: 'descend',
      sorter: (a, b) => {
        return a.id - b.id
      },
    },
    {
      title: 'projectName',
      dataIndex: 'projectName',
      key: 'projectName',
      width: '20%',
      ...getColumnSearchProps('projectName'),
      sorter: (a, b) => {
        return a.projectName.trim().toLowerCase().length - b.projectName.trim().toLowerCase().length
      },
      sortDirections: ['descend', 'ascend'],
    },
    {
      title: 'category',
      dataIndex: 'categoryName',
      key: 'categoryName',
      ...getColumnSearchProps('categoryName'),
      sorter: (a, b) => {
        return a.projectName.trim().toLowerCase().length - b.projectName.trim().toLowerCase().length
      },
      sortDirections: ['descend', 'ascend'],
      // render: (text, record, index) => {
      //   let jsxContent = parse(text)
      //   return <div key={index}>
      //     {jsxContent}
      //   </div>
      // }
    },
    {
      title: 'creator',
      key: 'creator',
      dataIndex: 'creator',
      ...getColumnSearchProps('creator'),
      render: (text, record, index) => {
        return <Tag color="magenta">{text?.name}</Tag>
      },
      sorter: (a, b) => {
        return a.projectName.trim().toLowerCase().length - b.projectName.trim().toLowerCase().length
      },
      sortDirections: ['descend', 'ascend'],
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <Button type="primary"><EditOutlined /></Button>
          <Button type="primary" danger><DeleteOutlined /></Button>
        </Space>
      ),
    },
  ];
  return (
    <div style={{width:'78%'}}>
      <h3 className='my-3'>Project Management</h3>
      <Table columns={columns} rowKey={'id'} dataSource={projectList} />
    </div>
  )
};
