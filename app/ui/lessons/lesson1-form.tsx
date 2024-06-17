'use client';

import { User } from '@/app/lib/definitions';
import { CheckBadgeIcon, ExclamationCircleIcon } from '@heroicons/react/24/outline';
import { Button } from '@/app/ui/button';
import { completeLesson, getAchievements } from '@/app/lib/actions';
import { useState } from 'react';
import { nunito } from '../fonts';

// Formulario de la lección
export default function Lesson1Form({
  currentUser
}: {
  currentUser: User;
}) {
    const [selectedOption, setSelectedOption] = useState<string | null>(null);
    const [resultMessage, setResultMessage] = useState<string | null>(null);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const checkLesson1 = () => {
        if (selectedOption === 'classical') {
            setResultMessage('Absolutely right! The nylon strings make it easier to play.');
            completeLesson(currentUser, '3fa0821d-fa5a-4fed-af83-0de49ec3700c');
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
            checkLesson1();
        }
    };

    const handleOptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedOption(event.target.value);
        setResultMessage(null);
        setErrorMessage(null);
    };
 
    return <form onSubmit={handleSubmit}>
        <div className="rounded-md shadow-md bg-gray-50 p-4 mt-4 md:p-6">
            <h2 className={`${nunito.className} font-semibold text-xl`}>Which type of guitar is recommended for beginners?</h2>
            <div className="options">
                <div className="option mt-4 mb-4">
                    <input
                        type="radio"
                        id="option1"
                        name="options"
                        value="acoustic"
                        className="mr-4"
                        checked={selectedOption === 'acoustic'}
                        onChange={handleOptionChange}
                    />
                    <label htmlFor="option1">Acoustic</label>
                </div>
                <div className="option mb-4">
                    <input
                        type="radio"
                        id="option2"
                        name="options"
                        value="electric"
                        className="mr-4"
                        checked={selectedOption === 'electric'}
                        onChange={handleOptionChange}
                    />
                    <label htmlFor="option2">Electric</label>
                </div>
                <div className="option mb-4">
                    <input
                        type="radio"
                        id="option3"
                        name="options"
                        value="classical"
                        className="mr-4"
                        checked={selectedOption === 'classical'}
                        onChange={handleOptionChange}
                    />
                    <label htmlFor="option3">Classical</label>
                </div>
                <div className="option mb-4">
                    <input
                        type="radio"
                        id="option4"
                        name="options"
                        value="ukelele"
                        className="mr-4"
                        checked={selectedOption === 'ukelele'}
                        onChange={handleOptionChange}
                    />
                    <label htmlFor="option4">Ukelele</label>
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