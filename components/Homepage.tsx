"use client";

import { useRouter } from "next/navigation";

export default function Homepage() {
  const router=useRouter();
  
  const handleRender=()=>{
    router.push("/signup");
  }
  return (
    <main className="min-h-screen flex items-center justify-center bg-orange-100 px-4">
      
      <div className="w-full max-w-3xl bg-white/80   px-8 py-10 md:px-16 md:py-14 text-center border border-orange-100">
        
       
        <div className="flex items-center justify-center gap-3 mb-4">
          
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-gray-900">
            Build Good Habits.
            <span className="block text-orange-600">
              Become Better Every Day.
            </span>
          </h1>
        </div>

    
        <div className="mt-4 space-y-1 text-sm md:text-base text-gray-600">
          <p className="text-xl">Small daily actions make big changes.</p>
          <p className="text-xl">Consistency beats motivation.</p>
          <p className="text-xl font-medium">Track → Improve → Grow.</p>
        </div>

   
        <p className="mt-6 font-extrabold md:text-base text-gray-600 text-5xl">
          Create, track, and maintain healthy habits
          
        </p>

        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button onClick={handleRender} className="w-full sm:w-auto px-8 py-3 rounded-full text-sm md:text-base font-semibold text-white bg-orange-600 hover:bg-orange-700 hover:cursor-pointer">
            Get Started
           
          </button>

        
        </div>
      </div>
    </main>
  );
}
