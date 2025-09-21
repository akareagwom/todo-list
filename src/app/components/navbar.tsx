import React from 'react';

interface Props {
  
}

const Navbar: React.FC<Props> = ({  }) => {
  return (
    <div className='bg-white shadow-xl text-[#1C1D22] text-[20px] font-700 font-bold  '>
      <div className="flex justify-between p-4">
        <h1>Welcome back, Vincent 👋</h1>
        <div className="w-[269px] flex justify-between items-center">

        </div>
      </div>
    </div>
  );
};

export default Navbar;