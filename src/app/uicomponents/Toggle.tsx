"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { MdOutlineWbSunny } from "react-icons/md";
import { IoMoonOutline } from "react-icons/io5";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Prevent hydration mismatch
  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return (
    <div className={` w-[262px] rounded-[22px] p-2 flex justify-between items-center ${
        theme === "light"? "bg-[#1C1D220A]":"bg-[#FFFFFF0A]"
    }`}>
      <button
        onClick={() => setTheme("light")}
        className={`flex items-center w-[127px] px-2 py-1 rounded-[22px] ${
          theme === "light" ? "bg-white shadow-xl text-black" : "text-[#FFFFFF80]"
        }`}
      >
        <MdOutlineWbSunny size={20} />
        <p className="pl-2">Light</p>
      </button>

      <button
        onClick={() => setTheme("dark")}
        className={`flex items-center w-[127px] px-2 py-1 rounded-[22px] ${
          theme === "dark" ? "bg-[#FFFFFF0F] shadow-xl  text-white" : "text-[#1C1D2280]"
        }`}
      >
        <IoMoonOutline size={20} />
        <p className="pl-2">Dark</p>
      </button>
    </div>
  );
}
