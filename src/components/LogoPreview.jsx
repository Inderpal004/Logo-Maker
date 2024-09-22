import { UpdateStorageContext } from '@/context/UpdateStorageContext';
import html2canvas from 'html2canvas';
import * as icons from 'lucide-react';
import React, { useContext, useEffect, useState, useRef } from 'react';

export default function LogoPreview({ downloadIcon }) {
  const BASE_URL = "https://logoexpress.tubeguruji.com";
  const [storageValue, setStorageValue] = useState();
  const { updateStorage } = useContext(UpdateStorageContext);
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const downloadLogoRef = useRef(null);

  const handleImageLoad = () => {
    setIsImageLoaded(true);
  };

  useEffect(() => {
    const storageData = JSON.parse(localStorage.getItem('value'));
    setStorageValue(storageData);
    if (storageData?.icon?.includes(".png")) {
      setIsImageLoaded(false);
    } else {
      setIsImageLoaded(true);
    }
  }, [updateStorage]);

  useEffect(() => {
    if (downloadIcon) {
      downloadLogo();
    }
  }, [downloadIcon]);

  const downloadLogo = () => {
    if (!isImageLoaded) {
      console.error("Image not loaded yet.");
      return;
    }

    const downloadLogoDiv = downloadLogoRef.current;

    if (!downloadLogoDiv) {
      console.error("Download logo element not found.");
      return;
    }

    html2canvas(downloadLogoDiv, {
      backgroundColor: null,
      useCORS: true,
      allowTaint: false,
      scale: 2, 
      logging: true,
    })
      .then(canvas => {
        const pngImage = canvas.toDataURL('image/png');
        const link = document.createElement('a');
        link.href = pngImage;
        link.download = 'logo.png';
        link.click();
      })
      .catch(err => {
        console.error("html2canvas error:", err);
      });
  };

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

  const getProxiedImageURL = (url) => `https://api.allorigins.win/raw?url=${encodeURIComponent(url)}`;

  return (
    <div className='w-full min-h-[90vh] flex justify-center items-center'>
      <div style={{ padding: storageValue?.bgPadding }} className='w-[500px] h-[500px] bg-gray-200'>
        <div
          id='downloadLogo'
          ref={downloadLogoRef}
          style={{
            borderRadius: storageValue?.bgRounded,
            background: storageValue?.bgColor,
          }}
          className='w-full h-full bg-slate-400 flex justify-center items-center'
        >
          {storageValue?.icon?.includes(".png") ? (
            <img
              crossOrigin="anonymous"
              style={{ transform: `rotate(${storageValue?.iconRotate}deg)` }}
              width={storageValue?.iconSize}
              src={getProxiedImageURL(`${BASE_URL}/png/${storageValue?.icon}`)}
              onLoad={handleImageLoad}
              alt="Logo"
            />
          ) : (
            <Icon
              name={storageValue?.icon}
              color={storageValue?.iconColor}
              size={storageValue?.iconSize}
              rotate={storageValue?.iconRotate || 0}
            />
          )}
        </div>
      </div>
    </div>
  );
}
