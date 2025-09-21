"use client"
import { useState } from "react";
import { IoChevronForward } from "react-icons/io5";
import { MdHorizontalRule } from "react-icons/md";
import { PiLineVertical } from "react-icons/pi";

export const ProjectMenu = () => {
    const [options, setOptions] = useState(false);

    return (
        <div className="w-full">
            <button
                onClick={() => setOptions(!options)} >
                <IoChevronForward />
            </button>
            {options &&
                <div className="relative right-25  mt-2">
                   
                        
                        <div className="border-l-2">
                            <div className="flex items-center py-2">
                                <MdHorizontalRule/>
                                <button className="pl-4">
                                    <p>All projects (3)</p>
                                </button>
                            </div>
                            <div className="flex items-center py-2">
                                <MdHorizontalRule/>
                                <button className="pl-4">
                                    <p>Design System</p>
                                </button>
                            </div>
                            <div className="flex items-center py-2">
                                <MdHorizontalRule/>
                                <button className="pl-4">
                                    <p>User flow</p>
                                </button>
                            </div>
                            <div className="flex items-center py-2">
                                <MdHorizontalRule/>
                                <button className="pl-4">
                                    <p>Ux Research</p>
                                </button>
                            </div>
                        </div>

                </div>
            }
        </div>
    )
}


export const TaskMenu = () => {
    const [options, setOptions] = useState(false);

    return (
        <div className="w-full">
            <button
                onClick={() => setOptions(!options)} >
                <IoChevronForward />
            </button>
            {options &&
                <div className="relative right-25  mt-2">
                   
                        
                        <div className="border-l-2">
                            <div className="flex items-center py-2">
                                <MdHorizontalRule/>
                                <button className="pl-4">
                                    <p>All task (11)</p>
                                </button>
                            </div>
                            <div className="flex items-center py-2">
                                <MdHorizontalRule/>
                                <button className="pl-4">
                                    <p>Todo (4)</p>
                                </button>
                            </div>
                            <div className="flex items-center py-2">
                                <MdHorizontalRule/>
                                <button className="pl-4">
                                    <p>In progress (4)</p>
                                </button>
                            </div>
                            <div className="flex items-center py-2">
                                <MdHorizontalRule/>
                                <button className="pl-4">
                                    <p>Done(3)</p>
                                </button>
                            </div>
                        </div>

                </div>
            }
        </div>
    )
}