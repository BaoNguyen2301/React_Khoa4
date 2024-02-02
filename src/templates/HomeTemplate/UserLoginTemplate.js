import React from 'react'
import { Route } from 'react-router-dom/cjs/react-router-dom.min';
import { Layout, Flex } from 'antd';
import { useState, useEffect } from 'react';

const { Header, Footer, Sider, Content } = Layout;

export const UserLoginTemplate = (props) => {

    const [{width, height}, setSize] = useState({
        width: window.innerWidth,
        height: window.innerHeight
    })

    useEffect(() => {
      window.onresize = () =>{
        setSize({
            width: window.innerWidth,
            height: window.innerHeight
        })
      }
    
      return () => {
      
      }
    }, [])
    

    let { Component, ...restRoute } = props;
    return <Route {...restRoute} render={(propsRoute) => {
        return <>
            <Flex gap="middle" wrap="wrap">
                <Layout >
                    <Sider width={Math.round(width/2)} style={{height: `${height}`, backgroundImage: `url(http://picsum.photos/${Math.round(width/2)}/${height})`, backgroundSize: '100%'}}>
                        
                    </Sider>
                    <Content>
                        <Component {...propsRoute} />
                    </Content>
                </Layout>
            </Flex>

        </>
    }} />
}
