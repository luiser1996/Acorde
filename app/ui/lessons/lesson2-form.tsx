'use client';

import { User } from '@/app/lib/definitions';
import { CheckBadgeIcon, ExclamationCircleIcon } from '@heroicons/react/24/outline';
import { Button } from '@/app/ui/button';
import { completeLesson, getAchievements } from '@/app/lib/actions';
import { useState } from 'react';
import { nunito } from '../fonts';

// Formulario de la lección
export default function Lesson2Form({
  currentUser
}: {
  currentUser: User;
}) {
    const [selectedOption, setSelectedOption] = useState<string | null>(null);
    const [resultMessage, setResultMessage] = useState<string | null>(null);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const checkLesson2 = () => {
        if (selectedOption === 'bone') {
            setResultMessage('Correct! Bone is commonly used to make the Nut of a guitar.');
            completeLesson(currentUser, '301b5f60-8cde-4886-88da-a2d20a874ebd');
            getAchievements(currentUser);
        } else {
            setResultMessage(null);
            setErrorMessage('Incorrect! Please select the correct option.');
        }
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (selectedOption === null) {
            setErrorMessage('Please select an option.');
        } else {
            checkLesson2();
        }
    };

    const handleOptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedOption(event.target.value);
        setResultMessage(null);
        setErrorMessage(null);
    };
 
    return <form onSubmit={handleSubmit}>
        <div className="rounded-md shadow-md bg-gray-50 p-4 mt-4 md:p-6">
            <h2 className={`${nunito.className} font-semibold text-xl`}>What material is commonly used to make the Nut of a guitar?</h2>
            <div className="options">
                <div className="option mt-4 mb-4">
                    <input
                        type="radio"
                        id="option1"
                        name="options"
                        value="plastic"
                        className="mr-4"
                        checked={selectedOption === 'plastic'}
                        onChange={handleOptionChange}
                    />
                    <label htmlFor="option1">Plastic</label>
                </div>
                <div className="option mb-4">
                    <input
                        type="radio"
                        id="option2"
                        name="options"
                        value="bone"
                        className="mr-4"
                        checked={selectedOption === 'bone'}
                        onChange={handleOptionChange}
                    />
                    <label htmlFor="option2">Bone</label>
                </div>
                <div className="option mb-4">
                    <input
                        type="radio"
                        id="option3"
                        name="options"
                        value="metal"
                        className="mr-4"
                        checked={selectedOption === 'metal'}
                        onChange={handleOptionChange}
                    />
                    <label htmlFor="option3">Metal</label>
                </div>
                <div className="option mb-4">
                    <input
                        type="radio"
                        id="option4"
                        name="options"
                        value="wood"
                        className="mr-4"
                        checked={selectedOption === 'wood'}
                        onChange={handleOptionChange}
                    />
                    <label htmlFor="option4">Wood</label>
                </div>
            </div>
            <div className="mt-6 flex justify-end gap-4">
                <Button type="submit">Check Answer</Button>
            </div>
        </div>
        <div
            className="flex h-8 items-end space-x-1"
            aria-live="polite"
            aria-atomic="true"
        >
        {errorMessage && (
          <>
            <ExclamationCircleIcon className="h-5 w-5 text-red-500" />
            <p className="text-sm text-red-500">{errorMessage.toString()}</p>
          </>
        )}
        </div>
        <div
            className="flex h-8 items-end space-x-1"
            aria-live="polite"
            aria-atomic="true"
        >
        {resultMessage && (
          <>
            <CheckBadgeIcon className="h-5 w-5 text-green-500" />
            <p className="text-sm text-green-500">{resultMessage.toString()}</p>
          </>
        )}
        </div>
    </form>
}