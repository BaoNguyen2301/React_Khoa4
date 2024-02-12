import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { PlusOutlined } from '@ant-design/icons';
import { Button, Col, DatePicker, Drawer, Form, Input, Row, Select, Space } from 'antd';
const { Option } = Select;
const ModalCyberBugs = () => {

    const {visible, ComponentContentDrawer, callBackSubmit} = useSelector(state => state.DrawerReducer)

    const dispatch = useDispatch();


    const showDrawer = () => {
        dispatch({type: 'OPEN_DRAWER'})
    };
    const onClose = () => {
        dispatch({type: 'CLOSE_DRAWER'})
    };
    return (
        <>
            <Drawer
                title="Create a new account"
                width={720}
                onClose={onClose}
                open={visible}
                styles={{
                    body: {
                        paddingBottom: 80,
                    },
                }}
                extra={
                    <Space>
                        <Button onClick={onClose}>Cancel</Button>
                        <Button onClick={callBackSubmit} type="primary">
                            Submit
                        </Button>
                    </Space>
                }
            >
                <Form layout="vertical" hideRequiredMark>
                {ComponentContentDrawer}
                </Form>
            </Drawer>
        </>
    );
};
export default ModalCyberBugs;