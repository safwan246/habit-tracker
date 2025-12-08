import React from 'react'
import Navbar from "../components/Navbar";
import MainBody from '../components/MainBody';
import SignupPage from './signup/page';
import LoginPage from './login/page';
import Homepage from '@/components/Homepage';



export default function Home() {
  return (
    <div>
      {/* <Navbar/>
      
      <MainBody/> */}

      <Homepage/>
      
      {/* <SignupPage/>
      <LoginPage/> */}
    
    </div>
  );
}


