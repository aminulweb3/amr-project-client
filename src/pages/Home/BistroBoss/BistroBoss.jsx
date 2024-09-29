// src/pages/Home/BistroBoss/BistroBoss.jsx

import React from "react";
import rectangle9 from "../../../assets/home/chef-service.jpg";

const BistroBoss = () => {
  return (
    <div className="relative w-full py-16 md:py-24 lg:py-32">
      <div 
        className="absolute inset-0 bg-cover bg-right"
        style={{ backgroundImage: `url(${rectangle9})` }}
      >
        <div className="absolute inset-0 bg-black opacity-50"></div>
      </div>
      <div className="relative container mx-auto px-4">
        <div className="bg-white p-8 md:p-12 lg:p-16 shadow-md max-w-4xl mx-auto">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif mb-4 md:mb-6 text-center">
            Bistro Boss
          </h1>
          <p className="text-center text-gray-700 text-sm md:text-base lg:text-lg leading-relaxed">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus, libero accusamus laborum 
            deserunt ratione dolor officiis praesentium! Deserunt magni aperiam dolor eius dolore at, 
            nihil iusto ducimus incidunt quibusdam nemo.
          </p>
        </div>
      </div>
    </div>
  );
};

export default BistroBoss;
