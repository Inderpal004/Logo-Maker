import React, { useState } from 'react';
import ColorPicker from 'react-best-gradient-color-picker';

export default function ColorPickerBoxController({ hideController = false, selectedColor }) {
    const [color, setColor] = useState('#000');

    const handleColorChange = (e) => {
        setColor(e);
        selectedColor(e);
    };

    return (
        <ColorPicker
            value={color}
            onChange={handleColorChange}
            // hideControls={hideController}
            // hideEyeDrop
            // hideAdvancedSliders
            // hideColorGuide
            // hideInputType
            // hideGradientControls
        />
    );
}
