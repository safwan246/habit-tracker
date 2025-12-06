import React from 'react';
import { IoMdAdd, IoMdLogOut } from "react-icons/io";

export default function Navbar() {
  return (
    <nav className='sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-orange-100 flex justify-between items-center px-6 py-4 md:px-12'>
     
      <div className='flex items-center gap-2'>
        <div className='h-8 w-8 bg-orange-500 rounded-lg flex items-center justify-center'>
            <span className='text-white font-bold text-lg'>H</span>
        </div>
        <h1 className='text-gray-800 font-extrabold text-xl tracking-tight'>Habit Tracker</h1>
      </div>

    
      <div className='flex items-center gap-4'>
        
        
        <button className='flex items-center gap-2 text-gray-500 font-medium hover:text-orange-600 hover:bg-orange-50 px-4 py-2 rounded-full transition-all duration-200'>
            <IoMdLogOut size={20} />
            <span className="hidden sm:inline">Logout</span>
        </button>

        
        <button className='group bg-orange-500 text-white px-6 py-2.5 rounded-full font-medium shadow-lg  transform transition-all duration-300 hover:-translate-y-0.5 hover:bg-orange-600 flex items-center gap-2'>
          <IoMdAdd size={20}/>
          <span>New Habit</span>
        </button>
        
      </div>
    </nav>
  );
}