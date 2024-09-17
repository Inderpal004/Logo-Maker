import { Smile } from 'lucide-react'
import React, { useEffect } from 'react';
import { Slider } from "@/components/ui/slider"
import { useState } from 'react';
import ColorPickerBoxController from './ColorPickerController';

export default function IconController() {

    const [size,setSize] = useState(280);
    const [rotate,setRotate] = useState(0);
    const [color,setColor] = useState("#fff");
    
    const storageValue = (() => {
        const storedValue = localStorage.getItem('value');
        if (storedValue) {
            try {
                return JSON.parse(storedValue);
            } catch (error) {
                console.error('Error parsing JSON from localStorage:', error);
                return {};
            }
        }
        return {}; 
    })();

    useEffect(()=>{
        const updatedValue = {
            ...storageValue,
            iconSize:size,
            iconRotate:rotate,
            iconColor:color,
            icon:"Smile"
        }

        localStorage.setItem('value',JSON.stringify(updatedValue));

    },[size,rotate,color])

  return (
    <div>
        <div>
            <label>Icon</label>
            <div className='p-3 cursor-pointer bg-gray-200 rounded-md w-[50px] h-[50px] flex justify-center items-center my-2'>
            <Smile/>
            </div>
        </div>
        <div className='py-2'>
            <label className='p-2 flex justify-between items-center'>Size <span>{size}px</span></label>
            <Slider defaultValue={[280]} max={512} step={1} onValueChange={(e)=> setSize(e[0])}/>
        </div>

        <div className='py-2'>
            <label className='p-2 flex justify-between items-center'>Rotate <span>{rotate}°</span></label>
            <Slider defaultValue={[0]} max={360} step={1} onValueChange={(e)=> setRotate(e[0])}/>
        </div>

        <div className="py-2">
        <label className='p-2 flex justify-between items-center'>Icon Color</label>
            <ColorPickerBoxController hideController={true}
            selectedColor={(color)=> setColor(color)}
            />
        </div>
      
    </div>
  )
}
