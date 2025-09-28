import { useState } from 'react';

export const useAccessibilitySettings = () => {
    const [fontSize, setFontSize] = useState(18);
    const [lineSpacing, setLineSpacing] = useState(1.6);
    const [characterSpacing, setCharacterSpacing] = useState(0);

    return {
        fontSize,
        lineSpacing,
        characterSpacing,
        setFontSize,
        setLineSpacing,
        setCharacterSpacing,
    };
};