import React from 'react'
import { Button, Input, Tooltip } from 'antd';
import { InfoCircleOutlined, UserOutlined } from '@ant-design/icons';
import { withFormik } from 'formik';
function LoginCyberBugs(props) {

    const {
        values,
        touched,
        errors,
        handleChange,
        handleBlur,
        handleSubmit,
    } = props;

    return (
        <form onSubmit={handleSubmit} className='container'>
            <div className='d-flex flex-column justify-content-center align-items-center' style={{ height: window.innerHeight }}>
                <h3>{props.displayName}</h3>
                <Input
                    placeholder="Enter your username"
                    prefix={<UserOutlined className="site-form-item-icon" />}
                    suffix={
                        <Tooltip title="Extra information">
                            <InfoCircleOutlined style={{ color: 'rgba(0,0,0,.45)' }} />
                        </Tooltip>
                    }
                    style={{ borderRadius: 0 }}
                    className='mt-3 w-50'
                    size="large"
                    name='email'
                    onChange={handleChange}
                />
                <Input.Password placeholder="input password" name='password' className='mt-3 w-50' size="large" style={{ borderRadius: 0 }} onChange={handleChange} />
                <Button htmlType='submit' type="primary" block className='mt-3 w-50' size="large" style={{ borderRadius: 0 }}>
                    Login
                </Button>
                <div>
                    <Button
                        shape="circle"
                        className='mt-3 mr-3 text-white'
                        size="large"
                        style={{ backgroundColor: 'rgb(102,117,223)' }}>
                        <i className="fab fa-facebook-f"></i>
                    </Button>
                    <Button type='primary' shape="circle" className='mt-3 text-white' size="large"><i className="fab fa-twitter"></i></Button>
                </div>
            </div>
        </form>
    )
}

const LoginCyberBugsWithFormik = withFormik({
    mapPropsToValues: () => ({
        email: '',
        password: ''
    }),
    
    handleSubmit: (values, { setSubmitting }) => {
        console.log(values)
    },

    displayName: 'Login CyberBugs',
})(LoginCyberBugs);

export default LoginCyberBugsWithFormik;