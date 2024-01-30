import React from 'react'

export default function Register() {
    return (
        <form action="/register" method="post">
            <div className="form-group">
                <label htmlFor="name">Tên</label>
                <input type="text" className="form-control" id="name" name="name" placeholder="Nhập tên của bạn" />
            </div>
            <div className="form-group">
                <label htmlFor="email">Email</label>
                <input type="email" className="form-control" id="email" name="email" placeholder="Nhập email của bạn" />
            </div>
            <div className="form-group">
                <label htmlFor="password">Mật khẩu</label>
                <input type="password" className="form-control" id="password" name="password" placeholder="Nhập mật khẩu của bạn" />
            </div>
            <div className="form-group">
                <label htmlFor="confirm_password">Xác nhận mật khẩu</label>
                <input type="password" className="form-control" id="confirm_password" name="confirm_password" placeholder="Nhập lại mật khẩu của bạn" />
            </div>
            <button type="submit" className="btn btn-primary">Đăng ký</button>
        </form>

    )
}
