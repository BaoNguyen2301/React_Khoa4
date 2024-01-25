import React, { useState } from 'react'

export default function Login(props) {
  const [userLogin, setuserLogin] = useState({
    userName: '',
    PassWord: ''
  })
  console.log(userLogin)
  const handleChange = (event) => {
    const { name, value } = event.target;
    setuserLogin({
      ...userLogin,
      [name]: value
    })
  }
  const handleLogin = (event) => {
    event.preventDefault();
    if (userLogin.userName === '123' && userLogin.PassWord === '123') {
      props.history.push('/home');// chuyen ve tran chi dinh
      // props.history.goBack();// chuyen ve trang trc do
      // props.history.replace('/home'); tahy doi noi dung
    } else {
      alert('Login fail');
      return;
    }
  }
  return (
    <form className='container' onSubmit={handleLogin}>
      <h3 className='display-4'>LOGIN</h3>
      <div className='form-group'>
        <p>User Name</p>
        <input name='userName' className='form-control' onChange={handleChange} />
      </div>
      <div className='form-group'>
        <p>Password</p>
        <input name='PassWord' className='form-control' onChange={handleChange} />
      </div>
      <div className='form-group'>
        <button className='btn btn-success'>Login</button>
      </div>
    </form>
  )
}
