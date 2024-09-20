import { UpdateStorageContext } from '@/context/UpdateStorageContext';
import html2canvas from 'html2canvas';
import * as icons from 'lucide-react';
import React, { useContext, useEffect, useState } from 'react';

export default function LogoPreview({downloadIcon}) {

    const BASE_URL = "https://logoexpress.tubeguruji.com";
    const [storageValue, setStorageValue] = useState();
    const { updateStorage, setUpdateStorage } = useContext(UpdateStorageContext);

    useEffect(() => {
        const storageData = JSON.parse(localStorage.getItem('value'));
        setStorageValue(storageData);
    }, [updateStorage]);

    useEffect(()=>{
        if(downloadIcon) {
            downloadLogo();
        }
    },[downloadIcon])

    const downloadLogo = ()=>{
        const downloadLogoDiv = document.getElementById('downloadLogo');

        html2canvas(downloadLogoDiv,{
            backgroundColor:null
        }).then(canvas => {
            const pngImage = canvas.toDataURL('image/png');
            const link = document.createElement('a');
            link.href = pngImage;
            link.download = 'logo.png';
            link.click();
        })
    }

    const Icon = ({ name, color, size, rotate }) => {
        const LucidIcon = icons[name];
        if (!LucidIcon) {
            return null;
        }
        return (
            <LucidIcon
                color={color}
                size={size}
                style={{ transform: `rotate(${rotate}deg)` }} 
            />
        );
    };

    return (
        <div className='w-full min-h-[90vh] flex justify-center items-center'>
            <div style={{ padding: storageValue?.bgPadding }} className='w-[500px] h-[500px] bg-gray-200'>
                <div id='downloadLogo'
                    style={{
                        borderRadius: storageValue?.bgRounded,
                        background: storageValue?.bgColor,
                    }}
                    className='w-full h-full bg-slate-400 flex justify-center items-center'
                >
                    {
                        storageValue?.icon?.includes(".png") ? <img style={{ transform: `rotate(${storageValue?.iconRotate}deg)` }} width={storageValue?.iconSize} src={BASE_URL+"/png/"+storageValue?.icon} alt="" /> : <Icon
                        name={storageValue?.icon}
                        color={storageValue?.iconColor}
                        size={storageValue?.iconSize}
                        rotate={storageValue?.iconRotate || 0} 
                    />
                    }
                    
                </div>
            </div>
        </div>
    );
}
