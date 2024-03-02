import React, { useState } from 'react'
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    UploadOutlined,
    UserOutlined,
    VideoCameraOutlined,
    PlusOutlined,
    SearchOutlined
} from '@ant-design/icons';
import { Layout, Menu, Button, theme, Flex } from 'antd';
import {useDispatch, useSelector} from 'react-redux'
import FormCreateTaskCyberBugs from '../Form/FormCreateTask/FormCreateTaskCyberBugs';
const { Header, Sider, Content } = Layout;

export default function SideBarCyberBugs() {
    const [collapsed, setCollapsed] = useState(false);
    const dispatch = useDispatch();

    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();
    return (
        <Layout style={{flex: 'none'}}>
            <Sider trigger={null} collapsible collapsed={collapsed}>
                <div className='text-right'>
                    <Button
                        type="text"
                        icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                        onClick={() => setCollapsed(!collapsed)}
                        style={{
                            fontSize: '16px',
                            width: 64,
                            height: 64,
                            color: 'white'
                        }}

                    />
                </div>
                <div className="demo-logo-vertical" />
                <Menu
                    theme="dark"
                    mode="inline"
                    defaultSelectedKeys={['1']}
                    items={[
                        {
                            key: '1',
                            icon: <PlusOutlined />,
                            label: 'Create',
                            onClick:()=>{
                                dispatch({
                                    type: 'OPEN_FORM_CREATE_TASK',
                                    Component: <FormCreateTaskCyberBugs/>,
                                    title: 'Create task'
                                })
                            }
                        },
                        {
                            key: '2',
                            icon: <SearchOutlined />,
                            label: 'Search',
                        },
                    ]}
                />
            </Sider>
        </Layout>
    )
}
