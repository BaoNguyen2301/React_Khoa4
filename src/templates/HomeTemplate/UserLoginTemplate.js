import React from 'react'
import { Route } from 'react-router-dom/cjs/react-router-dom.min';
import { Layout, Flex } from 'antd';

const { Header, Footer, Sider, Content } = Layout;

export const UserLoginTemplate = (props) => {
    let { Component, ...restRoute } = props;
    return <Route {...restRoute} render={(propsRoute) => {
        return <>
            <Flex gap="middle" wrap="wrap">
                <Layout >
                    <Sider width="60%" style={{height: window.innerHeight, backgroundImage: 'url(http://picsum.photos/2000)', backgroundSize: '100%'}}>
                        
                    </Sider>
                    <Content>
                        <Component {...propsRoute} />
                    </Content>
                </Layout>
            </Flex>

        </>
    }} />
}
