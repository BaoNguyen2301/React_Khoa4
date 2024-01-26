import React, { useState } from 'react'
import { Prompt } from 'react-router-dom/cjs/react-router-dom';

export default function Login(props) {
  const [userLogin, setuserLogin] = useState({
    userName: '',
    PassWord: '',
    status: false
  })
  console.log(userLogin)
  const handleChange = (event) => {
    const { name, value } = event.target;

    const newUserLogin = {
      ...userLogin,
      [name]: value,
    }

    let valid = false;
    for(let key in newUserLogin){
      if(key !== 'status'){
        if(newUserLogin[key].trim()=== ''){
          valid = true;
        }
      }
    }

    if(valid){
      newUserLogin.status = true
    }else{
      newUserLogin.status = false
    }

    setuserLogin(newUserLogin);
  }
  const handleLogin = (event) => {
    event.preventDefault();
    if (userLogin.userName === '123' && userLogin.PassWord === '123') {
      // props.history.push('/home');// chuyen ve tran chi dinh
      props.history.goBack();// chuyen ve trang trc do
      // props.history.replace('/home'); tahy doi noi dung
      localStorage.setItem('userLogin',JSON.stringify(userLogin));//bien thong tin nhap vao thanh chuoi

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
      <Prompt when={userLogin.status} message={(location)=>{
        return 'Bạn có chắc muốn rời khỏi trang này không!'
      }}></Prompt>
    </form>
  )
}
