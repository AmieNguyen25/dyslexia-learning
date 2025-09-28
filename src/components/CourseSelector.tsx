import React from 'react';
import { ElementaryCourses } from './ElementaryCourses';
import { MiddleSchoolCourses } from './MiddleSchoolCourses';
import { HighSchoolCourses } from './HighSchoolCourses';
import { CollegeAdultCourses } from './CollegeAdultCourses';
import type { Course, OnboardingData } from '../types';

interface CourseSelectorProps {
    fontSize: number;
    lineSpacing: number;
    gradeLevel: OnboardingData['gradeLevel'];
    onCourseSelect: (course: Course) => void;
    onSpeakText: (text: string) => void;
    userProgress?: { [courseId: string]: number };
}

export const CourseSelector: React.FC<CourseSelectorProps> = ({
    fontSize,
    lineSpacing,
    gradeLevel,
    onCourseSelect,
    onSpeakText,
    userProgress
}) => {
    const renderCourseComponent = () => {
        const commonProps = {
            fontSize,
            lineSpacing,
            onCourseSelect,
            onSpeakText,
            userProgress
        };

        switch (gradeLevel) {
            case 'elementary':
                return <ElementaryCourses {...commonProps} />;
            case 'middle':
                return <MiddleSchoolCourses {...commonProps} />;
            case 'high':
                return <HighSchoolCourses {...commonProps} />;
            case 'college':
                return <CollegeAdultCourses {...commonProps} />;
            default:
                return <ElementaryCourses {...commonProps} />;
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
            <div className="max-w-7xl mx-auto p-6">
                {renderCourseComponent()}
            </div>
        </div>
    );
};