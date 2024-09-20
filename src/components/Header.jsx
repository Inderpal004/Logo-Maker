import React from 'react';
import logo from "/logo.png"
import { Button } from './ui/button';
import { Download } from 'lucide-react';

export default function Header({DownloadIcon}) {
  return (
    <div className='flex justify-between items-center w-full p-2 shadow-md '>
        <img src={logo} alt="logo" className='w-40 cursor-pointer'/>
        <Button onClick={()=> DownloadIcon(Date.now())} className="flex items-center gap-2"> <Download className='w-[18px]'/> Downloads</Button>
    </div>
  )
}
