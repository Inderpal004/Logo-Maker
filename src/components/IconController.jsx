import React, { useContext, useEffect, useState } from 'react';
import { Slider } from "@/components/ui/slider";
import ColorPickerBoxController from './ColorPickerController';
import { UpdateStorageContext } from '@/context/UpdateStorageContext';
import IconList from './IconList';

export default function IconController() {
    const { updateStorage, setUpdateStorage } = useContext(UpdateStorageContext);

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

    const [size, setSize] = useState(storageValue.iconSize || 200);
    const [rotate, setRotate] = useState(storageValue.iconRotate || 0);
    const [color, setColor] = useState(storageValue.iconColor || "#fff");
    const [icon, setIcon] = useState(storageValue.icon || 'Smile');

    useEffect(() => {
        const updatedValue = {
            ...storageValue,
            iconSize: size,
            iconRotate: rotate,
            iconColor: color,
            icon: icon 
        };

        setUpdateStorage(updatedValue);
        localStorage.setItem('value', JSON.stringify(updatedValue));
    }, [size, rotate, color, icon]);


    return (
        <div>
            <IconList selectedIcon={(iconName) => setIcon(iconName)} />

            <div className='py-2'>
                <label className='p-2 flex justify-between items-center'>Size <span>{size}px</span></label>
                <Slider
                    defaultValue={[size]}
                    max={400}
                    step={1}
                    onValueChange={(e) => setSize(e[0])}
                />
            </div>

            <div className='py-2'>
                <label className='p-2 flex justify-between items-center'>Rotate <span>{rotate}°</span></label>
                <Slider
                    defaultValue={[rotate]}
                    max={360}
                    step={1}
                    onValueChange={(e) => setRotate(e[0])}
                />
            </div>

            <div className="py-2">
                <label className='p-2 flex justify-between items-center'>Icon Color</label>
                <ColorPickerBoxController
                    hideController={true}
                    selectedColor={(color) => setColor(color)}
                />
            </div>

        </div>
    );
}
