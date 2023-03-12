import React,{useEffect} from 'react';
import logo from './logo.svg';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import HomeNavbar from './components/HomeNavbars';
import CreateTeacher from './components/CreateTeacher';
import CreateStudent from './components/CreateStudent';
import TableTeacher from './components/TableTeacher';
import TeacherRecord from './components/TeacherRecord';
import TableStudent from './components/TableStudent';
import StudentRecordPromote from './components/StudentRecordPromote';
import SignInHome from './components/SigninHome';
import DashboardJump from './components/Dashboard_Jump';
import TableClassroom from './components/TableClassroom';
import "./App.css"
import UpdateStudent from './components/UpdateStudent';
import UpdateTeacher from './components/UpdateTeacher';
import StudentReocrdCreate from './components/StudentRecordCreate';
import TablePhysical from './components/TablePhysical';
function App() {

  const [token, setToken] = React.useState<String>("");
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setToken(token);
    }
  }, []);

  if (!token) {
    return  <div>
         <ToastContainer/>
         <SignInHome/>
      </div>
  }

  return (
                 
    <Router>
             <ToastContainer/>
       <HomeNavbar></HomeNavbar>

   <Routes>
    {/* <Route path="/" element={<CreateTeacher/>} /> */}
    <Route path="/createteacher" element={<CreateTeacher/>} />
    <Route path="/createstudent" element={<CreateStudent/>} />
    <Route path="/tablestudent" element={<TableStudent/>} />
    <Route path="/tableteacher" element={<TableTeacher/>} />
    <Route path="/teacherrecord" element={<TeacherRecord/>} />
    <Route path="/studentrecordpromote" element={<StudentRecordPromote/>} />
    <Route path="/studentrecordcreate" element={<StudentReocrdCreate/>} />
    <Route path="/dashboard" element={<DashboardJump/>} />
    <Route path="/tableclassroom" element={<TableClassroom/>} />
    <Route path="/update-student/:id" element={<UpdateStudent />} />
    <Route path="/update-teacher/:id" element={<UpdateTeacher />} />
    <Route path="/tablephysical" element={<TablePhysical />} />


    
   </Routes>
   </Router>
  );
}

export default App;
