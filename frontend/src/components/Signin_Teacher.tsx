import React, { useState } from 'react';
import { SigninsInterface } from "../models/ISignin";
import { toast } from 'react-toastify';


function Signin_Teacher() {
  const [signin, setSignin] = useState<Partial<SigninsInterface>>({});



  const login = () => {
    const apiUrl = "http://localhost:8080/login_teacher";
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(signin),
    };

    fetch(apiUrl, requestOptions)
      .then((response) => response.json())
      .then((res) => {

      
          localStorage.setItem("token", res.data.token);//ยืนยัน
          localStorage.setItem("uid", res.data.id);//ส่ง id มาพร้อมกับ token
          localStorage.setItem("name", res.data.name);
          localStorage.setItem("role", "Teacher");
          toast.success("เข้าสู่ระบบสำเร็จ")
          window.location.reload()
          // navigate("/")
      })
      .catch((error) => {
        toast.error("รหัสประจำตัวคุณครูไม่ถูกต้อง")
      
      })
  };
  

  const handleInputChange = (
    event: React.ChangeEvent<{ id?: string; value: any }>
  ) => {
    const id = event.target.id as keyof typeof signin;
    const { value } = event.target;
    setSignin({ ...signin, [id]: value });

  };



  return (
    <div className="Auth-form-container">

    <form className="Auth-form">

      <div className="Auth-form-content">
        <h3 className="Auth-form-title">เข้าสู่ระบบ</h3>
        <div className="form-group mt-3">
          <label>รหัสประจำตัวคุณครู</label>
          <input
            type="string"
            name="codeid"
            id="codeid"
            onChange={handleInputChange}
            className="form-control mt-1"
            placeholder="กรุณากรอกรหัสประจำตัว"

          />
        </div>
        <div className="form-group mt-3">
          <label>รหัสผ่าน</label>
          <input
            type="password"
            name="password"
            id="password"
            className="form-control mt-1"
            placeholder="กรุณากรอกรหัสผ่าน"
            onChange={handleInputChange}
          />
        </div>
        <div className="d-grid gap-2 mt-3">
          <button onClick={login} type="button" className="btn btn-primary">
            ยืนยัน
          </button>
        </div>
      </div>
    </form>

  </div>

  )
}

export default Signin_Teacher;
