import { useCallback } from 'react';

export const useSpeechSynthesis = () => {
    const speakText = useCallback((text: string) => {
        if ('speechSynthesis' in window) {
            const utterance = new SpeechSynthesisUtterance(text);
            utterance.rate = 0.8;
            utterance.pitch = 1;
            window.speechSynthesis.speak(utterance);
        }
    }, []);

    return { speakText };
};