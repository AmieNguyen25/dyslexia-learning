import { useState } from 'react';

export const useAccessibilitySettings = () => {
    const [fontSize, setFontSize] = useState(18);
    const [lineSpacing, setLineSpacing] = useState(1.6);

    return {
        fontSize,
        lineSpacing,
        setFontSize,
        setLineSpacing,
    };
};