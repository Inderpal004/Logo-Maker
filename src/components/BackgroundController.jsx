import React, { useState } from 'react'
import { Slider } from './ui/slider'

export default function BackgroundController() {

    const [rounded,setRounded] = useState(0);

  return (
    <div>
         <div className='py-2'>
            <label className='p-2 flex justify-between items-center'>Rounded <span>{rounded}px</span></label>
            <Slider defaultValue={[0]} max={512} step={1} onValueChange={(e)=> setRounded(e[0])}/>
        </div>
      
    </div>
  )
}
