import React from 'react';
import { MdOutlineSearch, MdOutlineNotificationsNone, MdOutlineCalendarToday } from "react-icons/md";
import Image from "next/image";

const Navbar = () => {
  return (
    <div className=' text-[#1C1D22] text-[20px] font-700 font-bold  '>
      <div className="flex justify-between p-4">
        <h1>Welcome back, Vincent 👋</h1>
        <div className="w-[269px] flex justify-between text-2xl items-center">
          <MdOutlineSearch />
          <MdOutlineNotificationsNone />
          <MdOutlineCalendarToday />
          <p className='text-[16px] font-600 font-semibold text-[#1C1D2280] '>19 May 2022</p>
          <Image
            className='w-14 rounded-[50%] p-2'
            src="/Image.png"
            alt="Ovals"
            width={50}
            height={50}
          />
        </div>
      </div>
    </div>
  );
};

export default Navbar;