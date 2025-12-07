
import React from "react";
import Image from "next/image";
import cute from '../public/cute.jpg';
import HabitCard from "./HabitCard";

export default function MainBody() {
  return (
    <div className="min-h-screen bg-stone-50 pb-20">
   
      <div className="w-full mx-auto px-4 md:px-10 pt-8">

        <div className="relative h-72 md:h-75 w-full rounded-3xl shadow-xl shadow-stone-200 overflow-hidden">
            <Image
                src={cute}
                alt="Nature header"
                fill 
                className="object-cover"
                priority
            />
       
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>

          
            <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-12">
                <span className="text-orange-300 font-semibold tracking-widest text-sm uppercase mb-2">Daily Goals</span>
                <h1 className="text-4xl md:text-6xl font-bold text-white font-sans drop-shadow-lg">
                    Welcome to Habit Tracker!
                </h1>
            </div>
        </div>

     

      </div>
      <div className="p-8">

        <HabitCard/>
      </div>
    </div>
  );
}