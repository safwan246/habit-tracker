import React from 'react'
import Navbar from "../components/Navbar";
import MainBody from '../components/MainBody';
import SignupPage from './signup/page';
import LoginPage from './login/page';

export default function Home() {
  return (
    <div>
      <Navbar/>
      
      <MainBody/>
      <SignupPage/>
      <LoginPage/>
    
    </div>
  );
}
