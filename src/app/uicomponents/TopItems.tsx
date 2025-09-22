import React from 'react'
import { LuStretchHorizontal } from "react-icons/lu";
import {  BiPlus } from "react-icons/bi";
import { FiMoreHorizontal } from "react-icons/fi";

function TopItems() {
  return (
    <div className='flex justify-between w-full border-b-1 items-center'>
        <div className='flex justify-between gap-4 items-center'>
            <div className="flex items-center gap-2">
                <LuStretchHorizontal />
                <p>Board view</p>
            </div>
            <div className="flex items-center gap-2">
                <div className="rounded-[50%] p-2 bg-[#1C1D2214]">
                            <BiPlus className='text-[#1C1D22]' />
                        </div>
                <p>Add View</p>
            </div>

        </div>
        <div className="flex items-center gap-4">
            <p>filter</p>
            <p>sort</p>
            <div className="rounded-[50%] border-2 border-[#1C1D2214] p-1">
                <FiMoreHorizontal />
            </div>
            <button className='bg-[#1C1D22] rounded-[19px] w-[140px] text-white p-1 '>New Template</button>
        </div>
    </div>
  )
}

export default TopItems