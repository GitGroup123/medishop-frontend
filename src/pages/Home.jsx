// src/components/Hero.jsx
import React from 'react';
import doctorImg from '../assets/doctor.jpg'; // Make sure this image exists in src/assets/

const Home = () => {
  return (
<section id="home" className="bg-blue-50 pt-20  flex items-center">

  <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between w-full">
    {/* Left Text Section */}
    <div className="md:w-1/2 mb-10 md:mb-0">
     <h2 className="text-4xl font-bold text-blue-900 mb-4 leading-tight">
  Trusted Medical Equipment,<br /> Delivered to Your Door
    </h2>
      <p className="text-gray-700 mb-6">
       Simplifying your access to quality medical supplies and trusted care.
      </p>
      <button className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition">
        Get Started
      </button>
    </div>

    {/* Right Image Section */}
    <div className="md:w-1/2 flex justify-center">
      <img
        src={doctorImg}
        alt="Doctor"
        className="max-h-[450px] w-auto rounded-lg shadow-lg object-cover"
      />
    </div>
  </div>
</section>
  );
};

export default Home;
