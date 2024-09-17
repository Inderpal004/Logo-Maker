import { Image, PencilRuler, Shield } from 'lucide-react';
import React, { useState } from 'react';

export default function Sidebar({ selectedIndex }) {

    const menuList = [
        {
            id: 1,
            name: "Icon",
            icon: PencilRuler
        },
        {
            id: 2,
            name: "Background",
            icon: Image
        },
        {
            id: 3,
            name: "Upgrade",
            icon: Shield
        }
    ];

    const [activeIndex, setActiveIndex] = useState(0);

    const handleClick = (index) => {
        setActiveIndex(index);
        selectedIndex(index);  
    }

    return (
        <div className='shadow-md h-screen py-3'>
            <div>
                {
                    menuList.map((menu, index) => (
                        <h2 
                            key={index} 
                            onClick={() => handleClick(index)} 
                            className={`p-3 flex items-center gap-2 text-lg px-7 my-2 cursor-pointer hover:bg-primary hover:text-white 
                            ${activeIndex === index ? 'bg-primary text-white' : 'bg-white text-gray-500'}`}
                        >
                            <menu.icon className='w-[20px]' /> {menu.name}
                        </h2>
                    ))
                }
            </div>
        </div>
    )
}
