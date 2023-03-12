import React, { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import SignIn_Admin from './Signin_Admin';
import Signin_Teacher from './Signin_Teacher';
import Navbar_Admin from './NavbarAdmin';
import Navbar_Teacher from './NavbarTeacher';

export default function Navbars() {

  const [Admin, setAdmin] = React.useState<String>("");
  const [token, setToken] = React.useState<String>("");
  const [role, setRole] = React.useState<String>("");
  
  const signout = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  useEffect(() => {

    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    if (token ) {
      setToken(token);
    }
    if (role){
      setRole(role);
    }
  }, []);
    if (role==="Admin"){
  return (
    <Navbar_Admin></Navbar_Admin>
  );
    }
    else if (role==="Teacher") {
      return (
        <Navbar_Teacher></Navbar_Teacher>
      )

    }
  return <SignIn_Admin/> || <Signin_Teacher/>;
}

