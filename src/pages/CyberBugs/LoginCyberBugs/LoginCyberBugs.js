import React from 'react'
import { Button, Input, Tooltip } from 'antd';
import { InfoCircleOutlined, UserOutlined } from '@ant-design/icons';
import { withFormik } from 'formik';
import * as Yup from 'yup';
import { connect } from 'react-redux';
import { USER_SIGNIN_API } from '../../../redux/constants/Cyberbugs/CyberbugContant';
import { signinCyberbugsAction } from '../../../redux/actions/CyberBugs/CyberbusAction';



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
            <div className='d-flex flex-column justify-content-start align-items-center mt-5' style={{ height: window.innerHeight }}>
                <h3>Login CyberBugs</h3>
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
                {touched.email && errors.email ? (
                    <div className='text-danger'>{errors.email}</div>
                ) : null}
                <Input.Password placeholder="input password" name='password' className='mt-3 w-50' size="large" style={{ borderRadius: 0 }} onChange={handleChange} />
                {touched.password && errors.password ? (
                    <div className='text-danger'>{errors.password}</div>
                ) : null}
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

    validationSchema: Yup.object({
        email: Yup.string().email('Invalid email address').required('Required'),
        password: Yup.string()
            .min(6, 'Must be 6 characters or less').max(20, 'Must be 20 characters or less')
            .required('Required'),
    }),

    handleSubmit: ({email, password}, {props, setSubmitting }) => {
        props.dispatch(signinCyberbugsAction(email, password))
    },

    displayName: 'Login CyberBugs',
})(LoginCyberBugs);

export default connect () (LoginCyberBugsWithFormik);