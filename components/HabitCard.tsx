import React from 'react';


const HabitCard = () => {
  return (
    <div className="w-full max-w-[340px] bg-white rounded-[32px] p-6 shadow-sm border border-gray-50">
      
      <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-50 text-emerald-600">
       
        <span className="text-xs font-semibold tracking-wide">health</span>
      </div>

    
      <div className="mt-4 mb-6">
        <h3 className="text-lg font-bold text-gray-900">sss</h3>
        <p className="text-sm text-gray-500 mt-1">ss</p>
      </div>

    
      <div className="flex items-center justify-between mt-auto">
       
        <div className="flex items-center gap-3">
        
          <span className="text-sm text-gray-500 font-medium">Daily</span>
        </div>

       
        <button className="bg-[#EE7F5E] hover:bg-[#d97253] text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition-colors shadow-sm">
          Check In
        </button>
      </div>
    </div>
    
  );
};

export default HabitCard;