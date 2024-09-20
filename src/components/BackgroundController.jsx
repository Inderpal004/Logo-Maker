import React, { useContext, useEffect, useState } from 'react';
import { Slider } from './ui/slider';
import ColorPickerBoxController from './ColorPickerController';
import { UpdateStorageContext } from '@/context/UpdateStorageContext';

export default function BackgroundController() {

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

  const [rounded, setRounded] = useState(storageValue.bgRounded || 0);
  const [padding, setPadding] = useState(storageValue.bgPadding || 0);
  const [bgColor, setBgColor] = useState(storageValue.bgColor || '');

  const { setUpdateStorage } = useContext(UpdateStorageContext);

  useEffect(() => {
    const updatedValue = {
      ...storageValue,
      bgRounded: rounded,
      bgPadding: padding,
      bgColor: bgColor
    };

    setUpdateStorage(updatedValue);
    localStorage.setItem('value', JSON.stringify(updatedValue));
  }, [rounded, padding, bgColor]);

  return (
    <div>
      <div className='py-2'>
        <label className='p-2 flex justify-between items-center'>
          Rounded <span>{rounded}px</span>
        </label>
        <Slider
          defaultValue={[rounded]} 
          max={250}
          step={1}
          onValueChange={(e) => setRounded(e[0])}
        />
      </div>

      <div className='py-2'>
        <label className='p-2 flex justify-between items-center'>
          Padding <span>{padding}px</span>
        </label>
        <Slider
          defaultValue={[padding]}
          max={180}
          step={1}
          onValueChange={(e) => setPadding(e[0])}
        />
      </div>

      <div className='py-2'>
        <label className='p-2 flex justify-between items-center'>
          Background Color
        </label>
        <ColorPickerBoxController
          hideController={true}
          selectedColor={(color) => setBgColor(color)} 
        />
      </div>
    </div>
  );
}
