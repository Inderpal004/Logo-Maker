import { UpdateStorageContext } from '@/context/UpdateStorageContext';
import { Smile } from 'lucide-react';
import React, { useContext, useEffect, useState } from 'react';

export default function LogoPreview() {

    const [storageValue,setStorageValue] = useState();
    const {updateStorage,setUpdateStorage} = useContext(UpdateStorageContext);

    useEffect(()=>{
        const storageData = JSON.parse(localStorage.getItem('value'));
        setStorageValue(storageData);
    },[updateStorage]);

    

  return (
    <div className='bg-slate-500 w-full min-h-screen flex justify-center items-center'>
        <div className='w-[400px] h-[400px] outline-dotted outline-gray-300'>
            
            <div style={{borderRadius:storageValue?.bgRounded,
                background:storageValue?.bgColor,

            }} className='w-full h-full bg-slate-400 flex justify-center items-center'>
                <Smile style={{color:storageValue?.iconColor,
                    size:storageValue?.iconSize
                }}/>
            </div>

        </div>
    </div>
  )
}
