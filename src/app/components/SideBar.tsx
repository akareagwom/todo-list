import React from 'react';
import { BsGrid } from "react-icons/bs";
import { FiUser, FiCalendar, FiMap, FiLogOut } from "react-icons/fi";
import { MdOutlineInsertChart } from "react-icons/md";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { BiSliderAlt, BiDotsHorizontal, BiPlus } from "react-icons/bi";
import { ProjectMenu, TaskMenu } from '../uicomponents/Dropdown';
import ThemeToggle from '../uicomponents/Toggle';
import Image from "next/image";


const SideBar = () => {
  return (
    <div className=' w-[408px] shadow flex'>
      <div className="w-[90px] text-[#FFFFFF] p-4 bg-[#1C1D22]">
        <div className="flex flex-col items-center my-4 gap-6">
          <Image
          className='w-6'
            src="/Ovals.svg"
            alt="Ovals"
            width={50}     
            height={50}     
          />
          <Image 
          className='w-6'
          alt='assets' 
          src="Logo.svg"
            width={50}     
            height={50}
          />
        </div>

        <div className="flex flex-col justify-between w-auto h-auto items-center ">
          <BsGrid className=' text-2xl font-bold my-4' />
          <FiUser className=' text-2xl font-bold my-4' />
          <FiCalendar className=' text-2xl font-bold my-4' />
          <MdOutlineInsertChart className=' text-2xl font-bold my-4' />
          <AiOutlineCloudUpload className=' text-2xl font-bold my-4' />
          <FiMap className=' text-2xl font-bold my-4' />
          <BiSliderAlt className=' text-2xl font-bold my-4' />
        </div>

        <div className="mt-[60%] flex flex-col justify-between w-auto h-auto items-center">
          <FiLogOut className='text-2xl font-bold my-4 ' />
        </div>
      </div>


      <div className="p-4 text-[#1C1D2280] font-bold w-full">
        <div className="flex  items-center  justify-between">
          <h1 className='text-[#1C1D22]'>Projects</h1>
          <div className="rounded-[50%] p-2 bg-[#1C1D2214]">
            <BiPlus className='text-[#1C1D22]' />
          </div>
        </div>
        <div className="flex  items-center  justify-between py-4">
          <h1>Team</h1>
          <div className=""></div>
        </div>

        <div className="flex w-full items-baseline  justify-between py-4">
          <h1>Projects</h1>
          <div className="relative">
            <ProjectMenu />
          </div>
        </div>

        <div className="flex  w-full items-baseline  justify-between py-4">
          <h1>Task</h1>
          <div className="">
            <TaskMenu />
          </div>
        </div>

        <div className="flex  items-center  justify-between py-4">
          <h1>Reminders</h1>
          <div className=""></div>
        </div>

        <div className="flex  items-center  justify-between py-4">
          <h1>Messenger</h1>
          <div className=""></div>
        </div>
        <div className="mt-[50%]">
          <ThemeToggle />
        </div>
      </div>
    </div>
  );
};

export default SideBar;