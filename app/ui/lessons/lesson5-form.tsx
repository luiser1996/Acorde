'use client';

import { User } from '@/app/lib/definitions';
import { CheckBadgeIcon, ExclamationCircleIcon } from '@heroicons/react/24/outline';
import { Button } from '@/app/ui/button';
import { completeLesson, getAchievements } from '@/app/lib/actions';
import { useState } from 'react';
import { nunito } from '../fonts';

// Formulario de la lección
export default function Lesson5Form({
  currentUser
}: {
  currentUser: User;
}) {
    const [selectedOption, setSelectedOption] = useState<string | null>(null);
    const [resultMessage, setResultMessage] = useState<string | null>(null);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const checkLesson5 = () => {
        if (selectedOption === 'relaxed') {
            setResultMessage('Cool! The "O" shape make your fingers to be in a natural relaxed way.');
            completeLesson(currentUser, 'ac3e04ed-d911-4c4f-b5a5-2524767de059');
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
            checkLesson5();
        }
    };

    const handleOptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedOption(event.target.value);
        setResultMessage(null);
        setErrorMessage(null);
    };
 
    return <form onSubmit={handleSubmit}>
        <div className="rounded-md shadow-md bg-gray-50 p-4 mt-4 md:p-6">
            <h2 className={`${nunito.className} font-semibold text-xl`}>What is a key aspect of maintaining proper left hand position?</h2>
            <div className="options">
                <div className="option mt-4 mb-4">
                    <input
                        type="radio"
                        id="option1"
                        name="options"
                        value="strength"
                        className="mr-4"
                        checked={selectedOption === 'strength'}
                        onChange={handleOptionChange}
                    />
                    <label htmlFor="option1">Placing your thumb on top of the guitar neck to add strength.</label>
                </div>
                <div className="option mb-4">
                    <input
                        type="radio"
                        id="option2"
                        name="options"
                        value="relaxed"
                        className="mr-4"
                        checked={selectedOption === 'relaxed'}
                        onChange={handleOptionChange}
                    />
                    <label htmlFor="option2">Ensuring your fingers are relaxed and making an &quot;O&quot; shape.</label>
                </div>
                <div className="option mb-4">
                    <input
                        type="radio"
                        id="option3"
                        name="options"
                        value="tense"
                        className="mr-4"
                        checked={selectedOption === 'tense'}
                        onChange={handleOptionChange}
                    />
                    <label htmlFor="option3">Keeping your fingers tense to produce a clearer sound.</label>
                </div>
                <div className="option mb-4">
                    <input
                        type="radio"
                        id="option4"
                        name="options"
                        value="stability"
                        className="mr-4"
                        checked={selectedOption === 'stability'}
                        onChange={handleOptionChange}
                    />
                    <label htmlFor="option4">Crossing your legs behind the chair legs for better stability.</label>
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