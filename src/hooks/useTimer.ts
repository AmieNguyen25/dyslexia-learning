import { useState, useEffect } from 'react';

export const useTimer = (isActive: boolean) => {
    const [timeOnTask, setTimeOnTask] = useState(0);

    useEffect(() => {
        if (isActive) {
            const timer = setInterval(() => {
                setTimeOnTask(prev => prev + 1);
            }, 1000);
            return () => clearInterval(timer);
        }
    }, [isActive]);

    const resetTimer = () => setTimeOnTask(0);

    return { timeOnTask, resetTimer };
};