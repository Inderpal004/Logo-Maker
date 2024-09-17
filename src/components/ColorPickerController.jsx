import React, { useState } from 'react';
import ColorPicker from 'react-best-gradient-color-picker';

export default function ColorPickerBoxController({hideController = false,selectedColor}) {
    const [color, setColor] = useState('#000');

    return <ColorPicker value={color} onChange={(e)=> {setColor(e);selectedColor(e)}} 
    hideControls={hideController}
    hideEyeDrop hideAdvancedSliders hideColorGuide hideInputType
    />
}
