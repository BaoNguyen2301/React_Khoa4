import React, { useState, useRef, useEffect } from 'react'
import { Button, Input, Space, Table, Tag, message, Popconfirm, Avatar, Popover, AutoComplete } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import Highlighter from 'react-highlight-words';
import parse from 'html-react-parser';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { useSelector, useDispatch } from 'react-redux';
import FormEditProjectCyberBugs from '../../../components/Form/FormEditProject/FormEditProjectCyberBugs';
import { NavLink } from 'react-router-dom/cjs/react-router-dom';


export default function ProjectManagement() {

  const projectList = useSelector(state => state.ProjectCyberBugsReducer.projectList)
  const { userSearch } = useSelector(state => state.UserCyberbugsReducer)
  const [value, setValue] = useState('')
  const searchRef = useRef(null)
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
      render: (text, record, index) => {
        return <NavLink to={`/projectdetail/${record.id}`}>{text}</NavLink>
      },
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
      title: 'members',
      dataIndex: 'members',
      key: 'members',
      render: (text, record, index) => {
        return <div>
          {record.members?.slice(0, 3).map((members, index) => {
            return <Popover placement="top" title='member' content={() => {
              return <table className='table'>
                <thead>
                  <tr>
                    <th>Id</th>
                    <th>avatar</th>
                    <th>name</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {record.members?.map((item, index) => {
                    return <tr key={index}>
                      <td>{item.userId}</td>
                      <td><img src={item.avatar} width={30} height={30}></img></td>
                      <td>{item.name}</td>
                      <td>
                        <Button type="primary" danger onClick={() => {
                          dispatch({
                            type: 'DELETE_USER_PROJECT_API',
                            userDelete: {
                              projectId: record.id,
                              userId: item.userId
                            }
                          })
                        }}><DeleteOutlined /></Button>
                      </td>
                    </tr>
                  })}
                </tbody>
              </table>
            }}>
              <Avatar src={members.avatar} />
            </Popover>
          })}
          {record.members?.length > 3 ? <Avatar>...</Avatar> : ''}
          <Popover placement="rightTop" title='Add user' content={() =>
            <AutoComplete
              options={userSearch?.map((user, index) => {
                return { label: user.name, value: user.userId.toString() }
              })}

              value={value}

              onChange={(text) => {
                setValue(text)
              }}

              onSelect={(valueSelect, option) => {
                setValue(option.label)
                if(searchRef.current){
                  clearTimeout(searchRef.current)
                }
                searchRef.current = setTimeout(() => {
                  dispatch({
                    type: 'ADD_USER_PROJECT_API',
                    userProject: {
                      "projectId": record.id,
                      "userId": valueSelect
                    }
                  })
                }, 300)
              }}

              onSearch={(value) => {
                dispatch({
                  type: 'GET_USER_API',
                  keyWord: value
                })
              }}
              placeholder="input here"
              style={{ width: 200 }}
            />}>
            <Avatar style={{ cursor: 'pointer' }}>+</Avatar>
          </Popover>
        </div>
      },
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <Button type="primary" onClick={() => {
            dispatch({
              type: 'OPEN_FORM_EDIT_PROJECT',
              Component: <FormEditProjectCyberBugs />
            })
            dispatch({
              type: 'EDIT_PROJECT',
              projectEditModel: record,
            })
          }}><EditOutlined /></Button>
          <Popconfirm
            title="Delete the task"
            description="Are you sure to delete this project?"
            onConfirm={() => {
              dispatch({
                type: 'DELETE_PROJECT_SAGA',
                idProject: record.id
              })
            }}
            okText="Yes"
            cancelText="No"
          >
            <Button type="primary" danger><DeleteOutlined /></Button>
          </Popconfirm>

        </Space>
      ),

    },
  ];
  return (
    <div style={{ width: '78%' }}>
      <h3 className='my-3'>Project Management</h3>
      <Table columns={columns} rowKey={'id'} dataSource={projectList} />
    </div>
  )
};
